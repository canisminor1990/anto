import Sketch from '../sketch';
import { join } from 'path';
import fs from '@skpm/fs';
import _ from 'lodash';
import { hexToRgba } from 'hex-and-rgba';

const home = require('os').homedir();
const buildPath = join(home, '.anto');

export default class devColor extends Sketch {
  constructor() {
    super();
    this.namespace = '颜色|devColor';
  }

  run() {
    const Tree = {};
    const sortedArtboards = _.sortBy(this.page.layers, ['frame.y', 'frame.x']);
    _.forEach(sortedArtboards, artboard => {
      if (!Tree[artboard.name]) Tree[artboard.name] = [];
      const sortedLayers = _.sortBy(artboard.layers, ['frame.y', 'frame.x']);
      _.forEach(sortedLayers, l => {
        const color = l.style.fills[0].color;
        const rgba = hexToRgba(color);
        console.log(rgba);
        Tree[artboard.name].push({
          name: l.name,
          desc:
            rgba[3] === 1
              ? color.slice(0, 7)
              : `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3].toFixed(2)})`,
          color: color,
        });
      });
    });
    console.log(Tree);
    fs.writeFileSync(join(buildPath, 'colors.json'), JSON.stringify(Tree));
    this.openPath(buildPath);
    this.ui.success('生产完成');
  }
}
