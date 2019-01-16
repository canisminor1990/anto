import _ from 'lodash';
import Sketch from '../sketch';

export default class handleIgnore extends Sketch {
  constructor() {
    super();
    this.namespace = '排除|handleIgnore';
  }

  run() {
    if (this.selection.isEmpty) return this.ui.warn('请选择图形');

    const GlobalStatus = this.isIgnore(this.selection.layers[0]);

    _.forEach(this.selection.layers, layer => {
      if (!layer.name) return;
      GlobalStatus ? this.setActive(layer) : this.setIgnore(layer);
    });

    this.ui.success(GlobalStatus ? '「激活」成功' : '「排除」成功');
  }

  isIgnore(layer) {
    return layer.name ? layer.name[0] === '@' : false;
  }

  setActive(layer) {
    layer.name = layer.name.replace(/^@/g, '');
    if (this.isIgnore(layer)) this.setActive(layer);
  }

  setIgnore(layer) {
    this.setActive(layer);
    layer.name = '@' + layer.name;
  }
}
