import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import Settings from 'sketch/settings';
import _ from 'lodash';
import { find, setByValue, removeLayer } from './utils';

export default () => {
  console.log('[Start]', 'handleTitle');

  const document = sketch.getSelectedDocument();
  const selectPage = document.selectedPage;
  const mode = Settings.settingForKey('panel-mode');

  // 找到Library
  const libraries = sketch.Library.getLibraries();

  const library = find(libraries, 'name', 'AFUX 输出组件');
  if (!library) return UI.message('请检查Library是否存在');

  // 找到Symbol
  const symbolReferences = library.getImportableSymbolReferencesForDocument(document);
  const master = find(symbolReferences, 'name', `${mode} / 标题`);
  if (!master) return UI.message('请检查Symbol是否存在');

  // 导入
  removeLayer(selectPage, '@画板标题');
  const Group = new sketch.Group({
    name: '@画板标题',
    parent: selectPage,
    layers: [],
  });
  const symbolMaster = master.import();
  const Artboards = _.filter(
    selectPage.layers,
    layer =>
      layer.type === 'Artboard' &&
      layer.name[0] !== '@' &&
      layer.frame.width >= 750 / 2 &&
      layer.frame.width <= 750 * 3
  );
  if (Artboards.length === 0) return UI.message('找不到可用画板');
  Artboards.forEach(Artboard => {
    const instance = symbolMaster.createNewInstance();
    instance.parent = Group;
    instance.frame.x = Artboard.frame.x;
    instance.frame.y = Artboard.frame.y - 150;
    instance.frame.width = Artboard.frame.width;
    // 设置override
    const titleId = '标题';
    setByValue(instance, titleId, Artboard.name);
  });
  Group.moveToFront();
  Group.locked = true;
};
