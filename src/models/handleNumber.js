import _ from 'lodash';
import Sketch from '../sketch';

export default class handleNumber extends Sketch {
  constructor() {
    super();
    this.namespace = '序号|handleNumber';
  }
  run() {
    if (this.selection.isEmpty) return this.ui.warn('请选择图层');
    const sortedLayers = _.sortBy(this.selection.layers, ['frame.y', 'frame.x']);
    _.forEach(sortedLayers, (layer, index) => {
      layer.moveToBack();
      let name = String(layer.name).split('|');
      name.length > 1 ? (name = name[1]) : (name = layer.name);
      layer.name = [index, name].join('|');
    });
    this.sortOrder();
    this.ui.success('序号标注成功');
  }
}
