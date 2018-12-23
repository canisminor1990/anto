import _ from 'lodash';
import Sketch from '../sketch';

class handleChange extends Sketch {
  constructor() {
    super();
    this.namespace = '变向|handleChange';
  }

  run() {
    if (this.selection.isEmpty) return this.ui.warn('请选择线条');
    _.forEach(this.selection.layers, l => {
      if (l.type !== 'ShapePath') return;
      const Start = l.style.borderOptions.startArrowhead;
      const End = l.style.borderOptions.endArrowhead;
      l.style.borderOptions.startArrowhead = End;
      l.style.borderOptions.endArrowhead = Start;
    });
    this.ui.success('变向成功');
  }
}

export default new handleChange();
