import BrowserWindow from 'sketch-module-web-view';
import _ from 'lodash';
import Options from './options';
import Router from './router';
import Sk from './sketch';

const isDev = process.env.NODE_ENV === 'development';
const Sketch = new Sk();
const Panel = isDev ? 'http://localhost:8000' : 'index.html';

export const onRun = context => {
  const browserWindow = new BrowserWindow(Options);
  browserWindow.setSize(Options.width, Options.height);

  // 加载完成后显示
  browserWindow.once('ready-to-show', () => {
    const mode = Sketch.setting.get('panel-mode');
    if (!mode) Sketch.setting.set('panel-mode', '交互');
    const Positon = Sketch.setting.get('panel-position');
    if (_.isArray(Positon)) browserWindow.setPosition(Positon[0], browserWindow.getPosition()[1]);
    browserWindow.webContents.executeJavaScript(
      `localStorage.setItem("version","${String(context.plugin.version())}")`
    );
    browserWindow.show();
  });

  // 保存移动位置
  browserWindow.on('move', () => {
    const Positon = browserWindow.getPosition();
    Sketch.setting.set('panel-position', [Positon[0], Positon[1]]);
  });

  // Webview On
  new Router(browserWindow).start();

  // 开始
  browserWindow.loadURL(Panel);
};

export default onRun;
