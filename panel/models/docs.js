import { request } from '../utils/request';

export default {
  namespace: 'docs',
  state: [],
  reducers: {
    save(state, action) {
      state = action.payload;
      return state;
    },
  },
  effects: {
    *get(action, { call, put }) {
      const result = yield call(() => request(`http://anto.inc.alipay.net/static/docs.json`));
      yield put({
        type: 'save',
        payload: result.data,
      });
    },
  },
};
