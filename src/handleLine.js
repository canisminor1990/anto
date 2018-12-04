import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import _ from 'lodash';
import { find, GroupOrder } from './utils';

let LineStyle = {
  borders: [
    {
      color: '#2A72FF',
      thickness: 3,
    },
  ],
  borderOptions: {
    endArrowhead: 'FilledArrow',
    lineJoin: 'Round',
  },
};

export default context => {
  console.log('[Start]', 'handleLine');
  const app = NSDocumentController.sharedDocumentController();
  const nativeDocument = app.currentDocument();
  const nativePage = nativeDocument.currentPage();

  const document = sketch.getSelectedDocument();
  const page = document.selectedPage;
  const selection = document.selectedLayers;
  if (selection.isEmpty) return UI.message('请选择图层');
  if (selection.length > 2) return UI.message('不能大于两个图层');
  if (selection.length === 1) {
    const layer = selection.layers[0];
    if (layer.type !== 'ShapePath') return UI.message('单图层时只可选取连线');
    layer.style = LineStyle;
  } else {
    const path = [];
    let Name;
    selection.forEach(layer => {
      const rect = layer.frame;
      const newRect = rect.changeBasis({ from: layer.parent });
      const data = {
        id: layer.id,
        x: newRect.x,
        y: newRect.y,
        width: rect.width,
        height: rect.height,
      };
      data.center = {
        x: data.x + data.width / 2,
        y: data.y + data.height / 2,
      };
      path.push(data);
    });
    var linePath = NSBezierPath.bezierPath();
    const newPath = handlePath(path);

    // 清除缓存线
    Name = [path[0].id, path[1].id].join('/');
    const layers = document.getLayersNamed(Name);
    if (layers.length > 0)
      _.forEach(layers, layer => {
        LineStyle = layer.style;
        layer.remove();
      });

    for (let i = 0; i < newPath.length; i++) {
      i === 0
        ? linePath.moveToPoint(NSMakePoint(newPath[i].x, newPath[i].y))
        : linePath.lineToPoint(NSMakePoint(newPath[i].x, newPath[i].y));
    }

    // 原生线条
    const lineSh = MSShapePathLayer.layerWithPath(MSPath.pathWithBezierPath(linePath));
    const tempName = '@tempLine' + Math.random();
    lineSh.setName(tempName);
    nativePage.addLayers([lineSh]);

    const Groups = find(page.layers, 'name', '@交互连线');
    const Group =
      Groups ||
      new sketch.Group({
        name: '@交互连线',
        frame: {
          x: -50000,
          y: -50000,
          width: 100000,
          height: 100000,
        },
        parent: page,
        layers: [],
      });

    const Line = document.getLayersNamed(tempName)[0];
    const rect = Line.frame;
    const newRect = rect.changeBasis({ from: page, to: Group });
    selection.clear();

    Line.selected = true;
    Line.name = Name;
    Line.style = LineStyle;
    Line.frame = newRect;
    Line.parent = Group;

    Group.locked = true;
    GroupOrder(page);
    UI.message('连线成功');
  }
};

function handlePath(path) {
  const p1 = path[0];
  const p2 = path[1];
  const pointS = {};
  const pointE = {};
  let point2;
  let point3;

  if (Math.abs(p1.center.x - p2.center.x) > (p1.width + p2.width) / 2 && p1.x !== p2.x) {
    if (p1.x < p2.x) {
      pointS.x = p1.x + p1.width;
      pointE.x = p2.x;
    } else {
      pointS.x = p1.x;
      pointE.x = p2.x + p2.width;
    }
    pointS.y = p1.center.y;
    pointE.y = p2.center.y;
    point2 = {
      x: pointS.x - (pointS.x - pointE.x) / 2,
      y: pointS.y,
    };
    point3 = {
      x: pointS.x - (pointS.x - pointE.x) / 2,
      y: pointE.y,
    };
  } else {
    if (p1.y < p2.y) {
      pointS.y = p1.y + p1.height;
      pointE.y = p2.y;
    } else {
      pointS.y = p1.y;
      pointE.y = p2.y + p2.height;
    }
    pointS.x = p1.center.x;
    pointE.x = p2.center.x;
    point2 = {
      x: pointS.x,
      y: pointS.y - (pointS.y - pointE.y) / 2,
    };
    point3 = {
      x: pointE.x,
      y: pointS.y - (pointS.y - pointE.y) / 2,
    };
  }

  return [pointS, point2, point3, pointE];
}
