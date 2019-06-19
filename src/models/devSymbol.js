import Sketch from '../sketch';
import { join } from 'path';
import fs from '@skpm/fs';
import _ from 'lodash';

const home = require('os').homedir();
const buildPath = join(home, '.anto');

export default class devSymbol extends Sketch {
  constructor() {
    super();
    this.namespace = '生产|handleBuild';
  }

  run() {
    const Tree = {};
    const libBuildPath = join(buildPath, this.fileName);
    try {
      fs.unlinkSync(libBuildPath);
    } catch (e) {}
    console.log(libBuildPath);
    const sortedArtboards = _.sortBy(this.page.layers, ['frame.y', 'frame.x']);
    _.forEach(sortedArtboards, artboard => {
      const imgTree = [];
      const sortedLayers = _.sortBy(artboard.layers, ['frame.y', 'frame.x']);
      _.forEach(sortedLayers, l => {
        const data = l.name.split(' / ');
        if (!data.length || data.length < 3) return;
        if (!Tree[data[0]]) Tree[data[0]] = {};
        // imgTree.push(data);
        imgTree.push({
          name: data,
          id: l.id,
        });
        Tree[data[0]][data[1]] = imgTree;

        this.export(l, {
          output: join(libBuildPath, 'img'),
          'use-id-for-name': true,
        });
      });
    });
    console.log(Tree);
    fs.writeFileSync(join(libBuildPath, 'data.json'), JSON.stringify(Tree));
    this.openPath(libBuildPath);
    this.ui.success('生产完成');
  }
}
