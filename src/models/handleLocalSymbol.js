import _ from 'lodash';
import Sketch from '../sketch';

export default class handleLocalSymbol extends Sketch {
  constructor() {
    super();
    this.namespace = '本地组件|handleLocalSymbol';
  }

  run(id) {
    const master = this.layer.getById(this.document, id);
    const instance = master.createNewInstance();

    // 定位拖入位置
    let image = _.filter(this.layer.globalGet(this.document, id), l => l.type === 'Image')[0];
    if (!image) {
      image = _.filter(this.selection.layers, l => l.type === 'Image')[0];
    }

    instance.parent = image.parent;
    instance.frame.x = image.frame.x;
    instance.frame.y = image.frame.y;
    image.remove();

    this.selectionClear();
    this.selectionSet(instance);
  }
}
