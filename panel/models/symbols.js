import { request } from '../utils/request';

export default {
  namespace: 'symbols',
  state: {},
  reducers: {
    save(state, action) {
      state = action.payload;
      return state;
    },
  },
  effects: {
    *get(action, { call, put, select }) {
      const check = yield select(state => state.check);
      let uxUrl =
        'https://raw.githubusercontent.com/canisminor1990/anto-cloud/master/public/ux/data.json';
      let uiUrL =
        'https://raw.githubusercontent.com/canisminor1990/anto-cloud/master/public/ui/data.json';
      if (check) {
        uxUrl = 'http://anto.inc.alipay.net/static/ux/data.json';
        uiUrL = 'http://anto.inc.alipay.net/static/ui/data.json';
      }
      const ux = yield call(() => request(uxUrl));
      const ui = yield call(() => request(uiUrL));
      yield put({
        type: 'save',
        payload: { ux: ux.data, ui: ui.data },
      });
    },
  },
};
