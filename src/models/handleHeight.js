import _ from 'lodash';
import Sketch from '../sketch';

class handleHeight extends Sketch {
  constructor() {
    super();
    this.namespace = '调高|handleHeight';
  }

  run() {
    if (this.selection.isEmpty) return this.ui.warn('请选择画板或图层');
    if (this.selection.layers.length > 1) return this.ui.warn('请选择一个画板或图层');
    // 找画板
    let artboard;
    if (this.selection.layers[0].type !== 'Artboard') {
      artboard = this.layer.getArtboard(this.selection.layers[0]);
      if (!artboard) return this.ui.warn('请选择一个画板或图层');
    } else {
      artboard = this.selection.layers[0];
    }
    // 计算高度
    let maxHeight = 0;
    _.forEach(artboard.layers, l => {
      const height = l.frame.y + l.frame.height;
      if (height > maxHeight) maxHeight = height;
    });
    artboard.frame.height = maxHeight;

    this.ui.success('高度已适配');
  }
}

export default new handleHeight();
