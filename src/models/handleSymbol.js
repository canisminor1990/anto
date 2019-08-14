import _ from 'lodash';
import Sketch from '../sketch';

export default class handlSymbol extends Sketch {
  constructor() {
    super();
    this.namespace = '组件|handlSymbol';
  }

  run(e) {
    const data = JSON.parse(e);

    // 找到Library
    const library = this.library.get(data.libname);
    const libDocument = library.getDocument();
    const symbol = libDocument.getLayerWithID(data.id);

    // 制作临时组件
    const copySymbol = symbol.duplicate();
    const name = ['✱', 'Temp', copySymbol.name].join(' / ');
    const masterArtboard = this.create.artboard({
      name: name,
      frame: copySymbol.frame,
      parent: libDocument.pages[1],
      layers: [],
      flowStartPoint: true,
    });
    copySymbol.frame.x = 0;
    copySymbol.frame.y = 0;
    copySymbol.parent = masterArtboard;
    const tempMaster = this.create.symbolMaster(masterArtboard);

    // 引入
    const master = this.library.getSymbol(library, name);
    if (!master) return this.ui.warn('请检查Symbol是否存在');
    const symbolMaster = master.import();
    const instance = symbolMaster.createNewInstance();
    instance.parent = this.page;
    const group = instance.detach();
    const inner = group.name[0] !== '✱' ? group.duplicate() : group.layers[0];
    group.remove();
    tempMaster.remove();
    masterArtboard.remove();

    // 定位拖入位置
    let image = _.filter(
      this.layer.globalGet(this.document, data.name),
      l => l.type === 'Image'
    )[0];
    if (!image) {
      image = _.filter(this.selection.layers, l => l.type === 'Image')[0];
    }
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

    this.selectionClear();
    this.selectionSet(inner);

    if (inner.layers) {
      _.forEach(inner.layers, l => {
        if (l.name === '@Bg') {
          l.remove();
        }
      });
      if (inner.layers.length === 1) {
        const innerChild = inner.layers[0];
        innerChild.parent = inner.parent;
        this.changeBasis(innerChild, { from: inner, to: inner.parent });
        innerChild.selected = true;
        inner.remove();
      }
    }
  }
}
