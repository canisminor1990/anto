import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import Settings from 'sketch/settings';
import moment from 'moment';
import _ from 'lodash';
import { find, setByValue, removeLayer } from './utils';

export default context => {
  console.log('[Start]', 'handleExport');

  const page = context.document.currentPage();
  const document = sketch.getSelectedDocument();
  const selectPage = document.selectedPage;
  const selection = document.selectedLayers;
  const mode = Settings.settingForKey('panel-mode');
  const author = Settings.settingForKey('config-name');

  // 找到Library
  const libraries = sketch.Library.getLibraries();
  const library = find(libraries, 'name', 'AFUX 输出组件');
  if (!library) return UI.message('请检查Library是否存在');

  // 找到Symbol
  const symbolReferences = library.getImportableSymbolReferencesForDocument(document);
  const master = find(symbolReferences, 'name', `${mode} / 画板`);
  if (!master) return UI.message('请检查Symbol是否存在');

  // 导入
  removeLayer(selectPage, '@制版');
  removeLayer(selectPage, '@画板投影');
  const ShadowGroup = new sketch.Group({
    name: '@画板投影',
    parent: selectPage,
    layers: [],
  });
  const symbolMaster = master.import();
  let Artboards;
  if (_.filter(selection.layers, l => l.type && l.type === 'Artboard').length === 0) {
    Artboards = _.filter(selectPage.layers, layer => layer.name[0] !== '@');
  } else {
    Artboards = selection;
  }

  if (Artboards.length === 0) return UI.message('找不到可用画板');
  let x = Infinity;
  let y = Infinity;
  let x2 = -Infinity;
  let y2 = -Infinity;

  const Padding = 400;
  Artboards.forEach(Artboard => {
    const rect = Artboard.frame;
    if (rect.x < x) x = rect.x;
    if (rect.y < y) y = rect.y;
    if (rect.x + rect.width > x2) x2 = rect.x + rect.width;
    if (rect.y + rect.height > y2) y2 = rect.y + rect.height;
    if (mode === '交互' && Artboard.type === 'Artboard') {
      const ShapeShadow = new sketch.Shape({
        name: Artboard.name,
        frame: Artboard.frame,
        style: {
          fills: [
            {
              color: '#ffffff',
              fill: 'Color',
            },
          ],
          borders: [],
          shadows: [
            {
              color: '#00000022',
              y: 40,
              blur: 100,
              spread: -20,
            },
          ],
        },
        parent: ShadowGroup,
      });
    }
  });

  const instance = symbolMaster.createNewInstance();
  instance.frame.x = x - Padding;
  instance.frame.y = y - Padding * 2.1;
  instance.frame.width = x2 - x + 2 * Padding;
  instance.frame.height = y2 - y + 3.7 * Padding;
  instance.parent = selectPage;
  instance.locked = true;

  // 设置override-title
  const titleId = '标题';
  const timeId = '日期';
  const nameId = '花名';

  const newTitle = selectPage.name + `（${mode}）`;

  setByValue(instance, titleId, newTitle);
  setByValue(instance, timeId, moment().format('YYYY-MM-DD'));
  if (author && author.length > 0) setByValue(instance, nameId, author);

  const Group = new sketch.Group({
    name: '@制版',
    parent: selectPage,
    layers: [instance],
  });

  ShadowGroup.locked = true;
  Group.locked = true;
  ShadowGroup.moveToBack();
  Group.moveToBack();

  // 原生切片
  const sliceLayer = MSSliceLayer.new();
  sliceLayer.setName([moment().format('MMDD'), newTitle].join(' '));
  sliceLayer.setIsLocked(true);
  sliceLayer.setIsVisible(false);
  const sliceFrame = sliceLayer.frame();
  sliceFrame.setX(instance.frame.x);
  sliceFrame.setY(instance.frame.y);
  sliceFrame.setWidth(instance.frame.width);
  sliceFrame.setHeight(instance.frame.height);
  makeLayerExportable(sliceLayer, mode);
  MSLayerMovement.moveToFront([sliceLayer]);
  page.layers().forEach(l => {
    if (String(l.name()) === '@制版') {
      console.log(l.name());
      l.addLayers([sliceLayer]);
      sliceLayer.select_byExtendingSelection(true, true);
    }
  });
};

function makeLayerExportable(layer, mode) {
  const size = layer.exportOptions().addExportFormat();
  size.setAbsoluteSize(0);
  size.setVisibleScaleType(0);
  size.setFileFormat('png');
  size.setNamingScheme(0);
  size.setScale(mode === '交互' ? 0.5 : 1);
}
