import { request } from '../utils/request';

export default {
  namespace: 'check',
  state: false,
  reducers: {
    save(state, action) {
      state = action.payload;
      return state;
    },
  },
  effects: {
    *get(action, { call, put }) {
      let check = false;
      try {
        const result = yield call(() => request('http://anto.inc.alipay.net/api/check'));
        console.log(result);
        if (result.data && result.data.check) check = true;
      } catch (e) {
        console.log(e);
      }
      yield put({
        type: 'save',
        payload: check,
      });
    },
  },
};
