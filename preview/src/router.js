import { Route, Router } from 'dva/router';
import App from './routes';

export default ({ app, history }) => {
  history.listen(() => window.scrollTo(0, 0));
  return (
    <Router history={history}>
      <Route exact path="/" component={App} />
    </Router>
  );
};
