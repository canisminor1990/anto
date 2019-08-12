import Sketch from '../sketch';
import { join } from 'path';
import fs from '@skpm/fs';

const home = require('os').homedir();
const buildPath = join(home, '.anto');

export default class devTest extends Sketch {
  constructor() {
    super();
    this.namespace = 'Test|devTest';
  }

  run() {
    const layer = this.selection.layers[0];
    fs.writeFileSync(join(buildPath, 'test.json'), JSON.stringify(layer));
    this.openPath(buildPath);
    this.ui.success('生产完成');
  }
}
