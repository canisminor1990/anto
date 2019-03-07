import _ from 'lodash';
import Options from './options';
import Sketch from './sketch';
// 组件
import handleSymbol from './models/handleSymbol';
import handleLocalSymbol from './models/handleLocalSymbol';
import handleBuildLocalSymbol from './models/handleBuildLocalSymbol';
// 色板
import handleColor from './models/handleColor';
// 注释
import handleNote from './models/handleNote';
// 连线
import handleLine from './models/handleLine';
import handleDash from './models/handleDash';
import handleChange from './models/handleChange';
// 图层
import handleFrontBackLite from './models/handleFrontBackLite';
import handleFrontBack from './models/handleFrontBack';
import handleSort from './models/handleSort';
import handleLayout from './models/handleLayout';
import handleHeight from './models/handleHeight';
import handleBlender from './models/handleBlender';
// 制版
import handleIgnore from './models/handleIgnore';
import handleNumber from './models/handleNumber';
import handleTitle from './models/handleTitle';
import handlePlate from './models/handlePlate';
import handleExport from './models/handleExport';

export default class Router extends Sketch {
  constructor(browserWindow) {
    super();
    this.namespace = '路由|Router';
    this.browserWindow = browserWindow;
    this.webContents = browserWindow.webContents;
    this.width = Options.width;
    this.height = Options.height;
  }

  sendWebview(key, data) {
    this.browserWindow.webContents.executeJavaScript(
      `localStorage.setItem("${key}",'${JSON.stringify(data)}')`
    );
  }

  panel() {
    this.webContents.on('openPanel', e =>
      this.browserWindow.setSize(e ? this.width + e : this.width * 2, this.height)
    );
    this.webContents.on('closePanel', () =>
      this.browserWindow.setSize(this.width, this.height, true)
    );
  }

  symbol() {
    this.webContents.on('handleSymbol', e => new handleSymbol().start(e));
    this.webContents.on('handleLocalSymbol', e => new handleLocalSymbol().start(e));
    this.webContents.on('handleBuildLocalSymbol', () => {
      const symbol = new handleBuildLocalSymbol().build();
      this.sendWebview('local-symbols', symbol);
    });
  }

  color() {
    this.webContents.on('handleColor', e => new handleColor().start(e));
  }

  note() {
    this.webContents.on('setHeader', () => new handleNote().start('header'));
    this.webContents.on('setSubHeader', () => new handleNote().start('subheader'));
    this.webContents.on('setText', () => new handleNote().start('text'));
    this.webContents.on('setBlock', () => new handleNote().start('block'));
    this.webContents.on('setList', () => new handleNote().start('list'));
    this.webContents.on('setUl', () => new handleNote().start('ul'));
    this.webContents.on('setPoint', () => new handleNote().start('point'));
    this.webContents.on('setRound', () => new handleNote().start('round'));
    this.webContents.on('setIf', () => new handleNote().start('if'));
    this.webContents.on('setChangelog', () => new handleNote().start('changelog'));
  }

  line() {
    this.webContents.on('handleLine', () => new handleLine().start());
    this.webContents.on('handleChange', () => new handleChange().start());
    this.webContents.on('handleDash', () => new handleDash().start());
  }

  layer() {
    this.webContents.on('handleTopLite', () => new handleFrontBackLite().start('置顶'));
    this.webContents.on('handleBottomLite', () => new handleFrontBackLite().start('置底'));
    this.webContents.on('handleTop', () => new handleFrontBack().start('置顶'));
    this.webContents.on('handleBottom', () => new handleFrontBack().start('置底'));
    this.webContents.on('handleSort', () => new handleSort().start());
    this.webContents.on('handleLayout', () => new handleLayout().start());
    this.webContents.on('handleHeight', () => new handleHeight().start());
    this.webContents.on('handleBlender', () => new handleBlender().start());
  }

  plate() {
    this.webContents.on('handleIgnore', () => new handleIgnore().start());
    this.webContents.on('handleNumber', () => new handleNumber().start());
    this.webContents.on('handleTitle', () => new handleTitle().start());
    this.webContents.on('handlePlate', () => new handlePlate().start());
    this.webContents.on('handleExport', () => new handleExport().start());
  }

  word() {
    this.webContents.on('handleWord', e => {
      this.ui.success(`「${e}」已复制到剪切板`);
    });
  }

  yuque() {
    this.webContents.on('handleYuque', () => {
      const url = 'https://www.yuque.com/canisminor/anto/readme';
      this.openUrl(url);
    });
  }

  config() {
    this.webContents.on('changeMode', e => {
      this.setting.set('panel-mode', e);
      this.ui.success(`切换到「${e}模式」`);
    });

    this.webContents.on('closeSetting', e => {
      this.browserWindow.setSize(this.width, this.height, true);
      if (!e) return;
      console.log('[setting]', e);
      _.forEach(e, (value, key) => this.setting.set(`config-${key}`, value));
      this.ui.success(`保存设置成功`);
    });
  }

  run() {
    this.panel();
    this.symbol();
    this.color();
    this.note();
    this.line();
    this.layer();
    this.plate();
    this.yuque();
    this.word();
    this.config();
  }
}
