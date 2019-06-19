import _ from 'lodash';
import Sketch from '../sketch';

export default class handleColor extends Sketch {
  constructor() {
    super();
    this.namespace = '色板|handleColor';
  }

  shapeBorder(layer, fill) {
    const oldStyle = _.assign(layer.style.borders[0]);
    layer.style.borders = [_.assign(oldStyle, fill)];
  }

  shapeFill(layer, fill) {
    layer.style.fills = [fill];
  }

  textColor(layer, fill) {
    layer.style.textColor = fill.color;
    layer.style.fills = [];
  }

  run(e) {
    if (this.selection.isEmpty) return this.ui.warn('请选择图形');
    const { border, color } = JSON.parse(e);
    const fill = {
      fillType: 'Color',
      color: color,
    };
    _.forEach(this.selection.layers, layer => {
      if (!layer.type) return;
      if (layer.type === 'ShapePath') {
        border ? this.shapeBorder(layer, fill) : this.shapeFill(layer, fill);
      }
      if (layer.type === 'Text') {
        this.textColor(layer, fill);
      }
    });

    this.ui.success(`${border ? '描边' : '填充'}「${fill.color}」`);
  }
}
