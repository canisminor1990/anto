import _ from 'lodash';
import Sketch from '../sketch';

class handleDash extends Sketch {
  constructor() {
    super();
    this.namespace = '虚实|handleDash';
  }

  run() {
    if (this.selection.isEmpty) return this.ui.warn('请选择线条');
    _.forEach(this.selection.layers, l => {
      if (l.type !== 'ShapePath') return;
      const dash = l.style.borderOptions.dashPattern;
      if (!dash || dash.length === 0 || dash.toString() === [0, 0, 0, 0].toString()) {
        l.style.borderOptions.dashPattern = [4, 6, 4, 6];
        this.ui.success('变成虚线');
      } else {
        l.style.borderOptions.dashPattern = [0, 0, 0, 0];
        this.ui.success('变成实线');
      }
    });
  }
}

export default new handleDash();
