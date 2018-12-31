import _ from 'lodash';
import Sketch from '../sketch';

export default class handleLayout extends Sketch {
  constructor() {
    super();
    this.namespace = '对齐|handleLayout';
    this.option = {
      marginX: 100,
      marginY: 300,
    };
  }

  run() {
    const sortedArtboards = _.sortBy(this.artboards, ['frame.y', 'frame.x']);
    let X = sortedArtboards[0].frame.x;
    _.forEach(sortedArtboards, (layer, i) => {
      layer.moveToBack();
      if (i === 0) return;
      const preLayer = sortedArtboards[i - 1];
      const minY = Math.abs(layer.frame.y - preLayer.frame.y);
      if (minY < (preLayer.frame.height / 3) * 2 || minY < (layer.frame.height / 3) * 2) {
        layer.frame.y = preLayer.frame.y;
        layer.frame.x = preLayer.frame.x + preLayer.frame.width + this.option.marginX;
      } else {
        layer.frame.x = X;
        layer.frame.y = preLayer.frame.y + preLayer.frame.height + this.option.marginY;
      }
    });
    this.sortOrder();
    this.ui.success('对齐成功');
  }
}
