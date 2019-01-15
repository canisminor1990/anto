import _ from 'lodash';
import Sketch from '../sketch';

export default class handleColor extends Sketch {
  constructor() {
    super();
    this.namespace = '色板|handleColor';
  }

  run(e) {
    if (this.selection.isEmpty) return this.ui.warn('请选择图形');
    const { border, type, color, name } = JSON.parse(e);

    _.forEach(this.selection.layers, layer => {
      if (!layer.type) return;
      if (layer.type === 'ShapePath' || layer.type === 'Text') {
        if (type === 'Gradient') {
          color.from = {
            x: 0,
            y: 0,
          };
          color.to = {
            x: 1,
            y: 1,
          };
        }
        layer.style[border ? 'borders' : 'fills'] = [
          {
            fillType: type,
            [type === 'Color' ? 'color' : 'gradient']: color,
          },
        ];
      }

      if (layer.type === 'Text' && type === 'Color') {
      }
    });

    this.ui.success(`${border ? '描边' : '填充'}「${name}」`);
  }
}
