import { request } from '../utils/request';

export default {
  namespace: 'colors',
  state: [],
  reducers: {
    save(state, action) {
      state = action.payload;
      return state;
    },
  },
  effects: {
    *get(action, { call, put }) {
      const result = yield call(() => request(`http://anto.inc.alipay.net/static/colors.json`));
      yield put({
        type: 'save',
        payload: result.data,
      });
    },
  },
};
