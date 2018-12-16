import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import { find } from './utils';
import _ from 'lodash';

export default e => {
  console.log('[Start]', 'handlSymbol');

  const data = JSON.parse(e);
  const document = sketch.getSelectedDocument();
  const page = document.selectedPage;

  // 找到Library
  const libraries = sketch.Library.getLibraries();
  const library = find(libraries, 'name', 'AFUX 交互组件');
  if (!library) return UI.message('请检查Library是否存在');
  const libDocument = library.getDocument();
  const libPage = _.filter(libDocument.pages, p => p.name === 'B 控件库')[0];
  const artboard = _.filter(libPage.layers, l => l.name === data.type)[0];
  const symbol = _.filter(artboard.layers, l => l.name === data.layer)[0];

  console.log(symbol.name, symbol);
  const copySymbol = symbol.duplicate();
  console.log(2, copySymbol);
  const name = ['✱', 'Temp', copySymbol.name].join(' / ');
  const masterArtboard = new sketch.Artboard({
    name: name,
    frame: copySymbol.frame,
    parent: libPage,
    layers: [],
    flowStartPoint: true,
  });
  copySymbol.frame.x = 0;
  copySymbol.frame.y = 0;
  copySymbol.parent = masterArtboard;
  sketch.SymbolMaster.fromArtboard(masterArtboard);
  const symbolReferences = library.getImportableSymbolReferencesForDocument(document);
  const master = find(symbolReferences, 'name', name);
  if (!master) return UI.message('请检查Symbol是否存在');
  const symbolMaster = master.import();
  const instance = symbolMaster.createNewInstance();
  instance.parent = page;
  const group = instance.detach();
  const inner = group.name[0] !== '✱' ? group.duplicate() : group.layers[0];
  group.remove();
  const image = _.filter(document.getLayersNamed(data.name), l => l.type === 'Image')[0];
  if (image) {
    inner.parent = image.parent;
    inner.frame.x = image.frame.x;
    inner.frame.y = image.frame.y;
    image.remove();
  } else {
    inner.parent = group.parent;
    inner.frame.x = group.frame.x;
    inner.frame.y = group.frame.y;
  }
  if (inner.layers) {
    _.forEach(inner.layers, l => {
      if (l.name === '@Bg') {
        l.remove();
      }
    });
    if (inner.layers.length === 1) {
      const innerChild = inner.layers[0];
      innerChild.parent = inner.parent;
      innerChild.frame = innerChild.frame.changeBasis({ from: inner, to: inner.parent });
      inner.remove();
    }
  }
};
