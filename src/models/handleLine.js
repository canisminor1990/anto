import _ from 'lodash';
import Sketch from '../sketch';

const GroupName = '@交互连线';

export default class handleLine extends Sketch {
  constructor() {
    super();
    this.namespace = '变向|handleChange';
    this.lineStyle = {
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
  }

  run() {
    if (this.selection.isEmpty) return this.ui.warn('请选择图层');
    if (this.selection.length > 2) return this.ui.warn('不能大于两个图层');

    // 上色
    if (this.selection.length === 1) {
      const layer = this.selection.layers[0];
      if (layer.type !== 'ShapePath') return this.ui.warn('单图层时只可选取连线');
      layer.style = this.lineStyle;
      return;
    }

    // 清除缓存线
    const aId = this.selection.layers[0].id;
    const bId = this.selection.layers[1].id;
    const newName = [this.selection.layers[0].name, this.selection.layers[1].name].join('-');
    const oldLine = this.getLine(aId, bId);
    if (oldLine) {
      this.lineStyle = oldLine.style;
      oldLine.remove();
    }

    // 连线
    const path = [];
    _.forEach(this.selection.layers, layer => {
      const rect = layer.frame;
      const newRect = rect.changeBasis({ from: layer.parent });
      const data = {
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

    // 画线
    const linePath = NSBezierPath.bezierPath();
    const newPath = this.handlePath(path);
    for (let i = 0; i < newPath.length; i++) {
      i === 0
        ? linePath.moveToPoint(NSMakePoint(newPath[i].x, newPath[i].y))
        : linePath.lineToPoint(NSMakePoint(newPath[i].x, newPath[i].y));
    }

    // 原生线条
    const lineSh = MSShapePathLayer.layerWithPath(MSPath.pathWithBezierPath(linePath));
    const tempName = '@tempLine' + Math.random();
    lineSh.setName(tempName);
    this.native.page.addLayers([lineSh]);

    this.selectionClear();

    const Groups = this.layer.get(this.page, GroupName);
    const Group = Groups[0] || this.create.group({ name: GroupName });
    Group.parent = this.page;
    Group.locked = true;

    const Line = this.layer.globalGet(this.document, tempName)[0];
    Line.selected = true;
    Line.name = newName;
    Line.style = this.lineStyle;
    this.changeBasis(Line, { from: this.page, to: Group });
    Line.parent = Group;
    this.setLine(aId, bId, Line.id);

    this.sortOrder();

    this.ui.success('连线成功');
  }

  handlePath(path) {
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
}
