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
app.model(require('./models/preview').default);

// 2. Plugins
app.use(createLoading());

// 3. Router
app.router(require('./router').default);

// 4. Start
app.start('#root');

