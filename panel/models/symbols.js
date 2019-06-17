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
    *get(action, { call, put }) {
      const ux = yield call(() => request(`http://anto.inc.alipay.net/static/ux/data.json`));
      const ui = yield call(() => request(`http://anto.inc.alipay.net/static/ui/data.json`));
      yield put({
        type: 'save',
        payload: { ux: ux.data, ui: ui.data },
      });
    },
  },
};
