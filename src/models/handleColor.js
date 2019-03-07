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
        if (border) {
          const borderStyle = {
            fillType: type,
            [type === 'Color' ? 'color' : 'gradient']: color,
          };
          if (layer.style.borders.length > 0) {
            const oldBorder = layer.style.borders[0];
            borderStyle.thickness = oldBorder.thickness;
            borderStyle.position = oldBorder.position;
          }
          layer.style.borders = [borderStyle];
        } else {
          layer.style.fills = [
            {
              fillType: type,
              fill: type, // fix new sketch version
              [type === 'Color' ? 'color' : 'gradient']: color,
            },
          ];
        }
      }
    });

    this.ui.success(`${border ? '描边' : '填充'}「${name}」`);
  }
}
