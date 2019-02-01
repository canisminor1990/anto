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
    const path = join(this.pluginResourcesPath, 'localSymbols');
    try {
      fs.unlinkSync(path);
    } catch (e) {}
    _.forEach(this.symbols, symbol => {
      data.push({
        name: symbol.name,
        id: symbol.id,
      });

      this.export(symbol, {
        overwriting: true,
        'use-id-for-name': true,
        'save-for-web': true,
        output: path,
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
