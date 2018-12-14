import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import { find } from './utils';
import _ from 'lodash';

export default e => {
  console.log('[Start]', 'handlSymbol');

  const data = JSON.parse(e);
  const document = sketch.getSelectedDocument();
  const page = document.selectedPage;
  const selection = document.selectedLayers;

  // 找到Library
  const libraries = sketch.Library.getLibraries();
  const library = find(libraries, 'name', 'AFUX 交互组件 Demo');
  if (!library) return UI.message('请检查Library是否存在');
  const libDocument = library.getDocument();
  const libPage = _.filter(libDocument.pages, p => p.name === 'B 组件库')[0];
  const artboard = _.filter(libPage.layers, l => l.name === data.type)[0];
  const symbol = _.filter(artboard.layers, l => l.name === data.layer)[0];

  // 找到SymbolLibrary
  const masterLibrary = find(libraries, 'name', 'AFUX 交互组件');
  if (!masterLibrary) return UI.message('请检查Library是否存在');
  const symbolReferences = masterLibrary.getImportableSymbolReferencesForDocument(document);

  if (symbol.type === 'SymbolInstance') {
    const master = find(symbolReferences, 'name', symbol.master.name);
    if (!master) return UI.message('请检查Symbol是否存在');
    const symbolMaster = master.import();
    const instance = symbolMaster.createNewInstance();

    instance.overrides = symbol.overrides;
    instance.parent = page;
  } else if (symbol.type === 'Group') {
    _.forEach(symbol.layers, s => {
      if (s.type !== 'SymbolInstance') return;
      const master = find(symbolReferences, 'name', s.master.name);
      if (!master) return UI.message('请检查Symbol是否存在');
      const symbolMaster = master.import();
      const instance = symbolMaster.createNewInstance();

      instance.overrides = s.overrides;
      instance.parent = page;
    });
  }
};
