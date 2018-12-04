import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import Settings from 'sketch/settings';
import _ from 'lodash';
import { find, setByValue, removeLayer, GroupOrder } from './utils';

export default () => {
  console.log('[Start]', 'handleTitle');

  const document = sketch.getSelectedDocument();
  const page = document.selectedPage;
  const mode = Settings.settingForKey('panel-mode');

  const Artboards = _.filter(
    page.layers,
    layer =>
      layer.type === 'Artboard' &&
      layer.name[0] !== '@' &&
      layer.frame.width >= 750 / 2 &&
      layer.frame.width <= 750 * 3
  );
  if (Artboards.length === 0) return UI.message('找不到可用画板');

  // 找到Library
  const libraries = sketch.Library.getLibraries();

  const library = find(libraries, 'name', 'AFUX 输出组件');
  if (!library) return UI.message('请检查Library是否存在');

  // 找到Symbol
  const symbolReferences = library.getImportableSymbolReferencesForDocument(document);
  const master = find(symbolReferences, 'name', `${mode} / 标题`);
  if (!master) return UI.message('请检查Symbol是否存在');

  // 导入
  removeLayer(page, '@画板标题');
  const Group = new sketch.Group({
    name: '@画板标题',
    parent: page,
    frame: {
      x: -50000,
      y: -50000,
      width: 100000,
      height: 100000,
    },
    layers: [],
  });
  const symbolMaster = master.import();

  // 遍历
  Artboards.forEach(Artboard => {
    const instance = symbolMaster.createNewInstance();
    instance.parent = Group;
    instance.frame.x = Artboard.frame.x;
    instance.frame.y = Artboard.frame.y - 150;
    instance.frame.width = Artboard.frame.width;
    instance.frame = instance.frame.changeBasis({ from: page, to: Group });
    // 设置override
    const titleId = '标题';
    setByValue(instance, titleId, Artboard.name);
  });

  Group.locked = true;
  GroupOrder(page);

  UI.message('生成成功');
};
