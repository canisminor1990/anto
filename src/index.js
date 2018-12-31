import UI from 'sketch/ui';
import Settings from 'sketch/settings';
import BrowserWindow from 'sketch-module-web-view';
import _ from 'lodash';
import handleLine from './models/handleLine';
import handleDash from './models/handleDash';
import handleChange from './models/handleChange';
import handleFrontBack from './models/handleFrontBack';
import handleTitle from './models/handleTitle';
import handlePlate from './models/handlePlate';
import handleExport from './models/handleExport';
import handleNote from './models/handleNote';
import handleSort from './models/handleSort';
import handleLayout from './models/handleLayout';
import handleSymbol from './models/handleSymbol';
import handleHeight from './models/handleHeight';

const isDev = process.env.NODE_ENV === 'development';
const Panel = isDev ? 'http://localhost:8000' : 'index.html';
const width = 48;
const height = 700;

export const onRun = context => {
  const mode = Settings.settingForKey('panel-mode');
  if (!mode) Settings.setSettingForKey('panel-mode', '交互');

  const options = {
    identifier: 'anto.tools',
    width: width,
    height: height,
    alwaysOnTop: true,
    movable: true,
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    title: null,
    show: false,

    backgroundColor: '#222222',
  };

  const browserWindow = new BrowserWindow(options);
  browserWindow.setSize(width, height);

  // 加载完成后显示
  browserWindow.once('ready-to-show', () => {
    const Positon = Settings.settingForKey('panel-position');
    if (_.isArray(Positon)) browserWindow.setPosition(Positon[0], browserWindow.getPosition()[1]);
    browserWindow.webContents.executeJavaScript(
      `localStorage.setItem("version","${String(context.plugin.version())}")`
    );
    browserWindow.show();
  });

  // 保存移动位置
  browserWindow.on('move', () => {
    const Positon = browserWindow.getPosition();
    Settings.setSettingForKey('panel-position', [Positon[0], Positon[1]]);
  });

  /// //////////////////////////////////////////////////////////////////////////
  // Webview数据交互
  /// //////////////////////////////////////////////////////////////////////////

  const webContents = browserWindow.webContents;

  // 组件
  webContents.on('handleSymbol', e => new handleSymbol().start(e));

  // 制标
  webContents.on('handleTitle', () => new handleTitle().start());

  // 制版
  webContents.on('handlePlate', () => new handlePlate().start());

  // 导出
  webContents.on('handleExport', () => new handleExport().start());

  // 语雀
  webContents.on('handleYuque', () => {
    const url = 'https://www.yuque.com/canisminor/anto/readme';
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));
  });

  // 变更模式
  webContents.on('changeMode', e => {
    Settings.setSettingForKey('panel-mode', e);
    UI.message(`切换到「${e}模式」`);
  });

  // 连线
  webContents.on('handleLine', () => new handleLine().start());
  webContents.on('handleChange', () => new handleChange().start());
  webContents.on('handleDash', () => new handleDash().start());

  // 图层
  webContents.on('handleTop', () => new handleFrontBack().start('置顶'));
  webContents.on('handleBottom', () => new handleFrontBack().start('置底'));
  webContents.on('handleSort', () => new handleSort().start());
  webContents.on('handleLayout', () => new handleLayout().start());
  webContents.on('handleHeight', () => new handleHeight().start());

  // 注释
  webContents.on('setHeader', () => new handleNote().start('header'));
  webContents.on('setSubHeader', () => new handleNote().start('subheader'));
  webContents.on('setText', () => new handleNote().start('text'));
  webContents.on('setBlock', () => new handleNote().start('block'));
  webContents.on('setList', () => new handleNote().start('list'));
  webContents.on('setUl', () => new handleNote().start('ul'));
  webContents.on('setPoint', () => new handleNote().start('point'));
  webContents.on('setRound', () => new handleNote().start('round'));
  webContents.on('setIf', () => new handleNote().start('if'));
  webContents.on('setChangelog', () => new handleNote().start('changelog'));

  // 工具栏大小
  webContents.on('openSetting', () => browserWindow.setSize(width + 250, height));
  webContents.on('openSymbol', () => browserWindow.setSize(width + 368, height));
  webContents.on('openPanel', () => browserWindow.setSize(width * 2, height));
  webContents.on('closePanel', () => browserWindow.setSize(width, height, true));

  // 设置
  webContents.on('closeSetting', e => {
    browserWindow.setSize(width, height, true);
    if (!e) return;
    console.log('[setting]', e);
    _.forEach(e, (value, key) => Settings.setSettingForKey(`config-${key}`, value));
  });

  // 开始
  browserWindow.loadURL(Panel);
};

export default onRun;
