import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import Settings from 'sketch/settings';
import BrowserWindow from 'sketch-module-web-view';
import _ from 'lodash';
import handleLine from './handleLine';
import handleDash from './handleDash';
import handleChange from './handleChange';
import handleTop from './handleTop';
import handleBottom from './handleBottom';
import handleTitle from './handleTitle';
import handleExport from './handleExport';
import handleNote from './handleNote';
import handleSort from './handleSort';
import handleLayout from './handleLayout';

const isDev = process.env.NODE_ENV === 'development';
const Panel = isDev ? 'http://localhost:8000' : 'index.html';
const width = 48;
const height = 700;

export const onRun = context => {
  const mode = Settings.settingForKey('panel-mode');
  if (!mode) Settings.setSettingForKey('panel-mode', '交互');

  const options = {
    identifier: 'afux.tools',
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
    hasShadow: false,
    backgroundColor: '#222222',
  };

  const browserWindow = new BrowserWindow(options);

  // 加载完成后现实
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

  // Webview数据交互
  const webContents = browserWindow.webContents;
  webContents.on('handleTitle', () => handleTitle());
  webContents.on('handleExport', () => handleExport());
  webContents.on('changeMode', e => {
    Settings.setSettingForKey('panel-mode', e);
    UI.message(`切换到「${e}模式」`);
  });

  // 连线
  webContents.on('handleLine', () => handleLine());
  webContents.on('handleChange', () => handleChange());
  webContents.on('handleDash', () => handleDash());

  // 图层
  webContents.on('handleTop', () => handleTop());
  webContents.on('handleBottom', () => handleBottom());
  webContents.on('handleSort', () => handleSort());
  webContents.on('handleLayout', () => handleLayout());

  // 注释
  webContents.on('setHeader', () => handleNote('header'));
  webContents.on('setText', () => handleNote('text'));
  webContents.on('setBlock', () => handleNote('block'));
  webContents.on('setList', () => handleNote('list'));
  webContents.on('setUl', () => handleNote('ul'));
  webContents.on('setPoint', () => handleNote('point'));
  webContents.on('setRound', () => handleNote('round'));
  webContents.on('setIf', () => handleNote('if'));
  webContents.on('setChangelog', () => handleNote('changelog'));

  // Panel
  webContents.on('openPanel', () => {
    browserWindow.setSize(width * 2, height);
  });
  webContents.on('closePanel', () => {
    browserWindow.setSize(width, height, true);
  });

  webContents.on('openSetting', () => {
    browserWindow.setSize(width + 250, height);
  });
  webContents.on('closeSetting', e => {
    browserWindow.setSize(width, height, true);
    if (e) {
      console.log(e);
      _.forEach(e, (value, key) => {
        Settings.setSettingForKey(`config-${key}`, value);
      });
    }
  });

  // 开始
  browserWindow.loadURL(Panel);
};

export default onRun;
