import fs from '@skpm/fs';
import _ from 'lodash';
import Sketch from '../sketch';
import { join } from 'path';

export default class handleBuildLocalSymbol extends Sketch {
  constructor() {
    super();
    this.namespace = '本地组件预览|handleBuildLocalSymbol';
  }

  build() {
    console.log('[start]', this.namespace);
    const data = [];
    const home = require('os').homedir();
    const path = join(home, 'localSymbols');
    try {
      fs.unlinkSync(path);
    } catch (e) {}
    _.forEach(this.symbols, symbol => {
      this.export(symbol, {
        overwriting: true,
        'use-id-for-name': true,
        output: path,
        scales: '0.5',
        formats: 'jpg',
        compression: 0.5,
      });
    });

    _.forEach(this.symbols, symbol => {
      let img = fs.readFileSync(join(path, `${symbol.id}@0.5x.jpg`));
      img = Buffer.from(img).toString('base64');
      const base64 = 'data:jpg;base64,' + img;
      data.push({
        name: symbol.name,
        id: symbol.id,
        path: base64,
      });
    });
    console.log('[end]', this.namespace);
    this.ui.success('本地组件刷新成功');
    return {
      time: String(new Date()),
      data: data,
    };
  }
}
