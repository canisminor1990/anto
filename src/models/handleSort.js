import _ from 'lodash';
import Sketch from '../sketch';

export default class handleSort extends Sketch {
  constructor() {
    super();
    this.namespace = '排序|handleSort';
  }
  run() {
    const sortedArtboards = _.sortBy(this.artboards, ['frame.y', 'frame.x']);
    _.forEach(sortedArtboards, layer => layer.moveToBack());
    this.sortOrder();
    this.ui.success('排序成功');
  }
}
