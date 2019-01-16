import _ from 'lodash';
import Sketch from '../sketch';

export default class handleFrontBackLite extends Sketch {
  constructor() {
    super();
    this.namespace = '置顶置底|handleFrontBackLite';
  }

  run(name) {
    if (this.selection.isEmpty) return this.ui.warn('请选择图形');

    _.forEach(this.selection.layers, layer => {
      if (name === '置顶') {
        if (this.isTop(layer) && !this.needBreak(layer)) this.changeParent(layer);
        layer.moveToFront();
      } else {
        if (this.isBottom(layer) && !this.needBreak(layer)) this.changeParent(layer);
        layer.moveToBack();
      }
    });

    this.sortOrder();
    this.ui.success(`所选图层已${name}`);
  }

  needBreak(layer) {
    return layer.parent.type === 'Page' || layer.parent.type === 'Artboard';
  }

  changeParent(layer) {
    this.changeBasis(layer, { from: layer.parent, to: layer.parent.parent });
    layer.parent = layer.parent.parent;
  }

  isTop(layer) {
    const Parent = layer.parent;
    return layer.id === Parent.layers[Parent.layers.length - 1].id;
  }

  isBottom(layer) {
    const Parent = layer.parent;
    return layer.id === Parent.layers[0].id;
  }
}
