import { message } from 'antd';
import dva from 'dva';
import createLoading from 'dva-loading';
import './index.css';

// 1. Initialize
const app = dva({
  onError(e) {
    message.error(e.message, 3);
  },
});

// 2. Models
app.model(require('./models/check').default);
app.model(require('./models/username').default);
app.model(require('./models/store').default);
app.model(require('./models/config').default);
app.model(require('./models/symbols').default);
app.model(require('./models/colors').default);
app.model(require('./models/docs').default);

// 2. Plugins
app.use(createLoading());

// 3. Router
app.router(require('./router').default);

// 4. Start
app.start('#root');

// 5. Func
document.addEventListener('contextmenu', e => e.preventDefault());
