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
    *get(action, { call, put, select }) {
      const check = yield select(state => state.check);
      let url =
        'https://raw.githubusercontent.com/canisminor1990/anto-cloud/master/public/colors/data.json';
      if (check) url = 'http://anto.inc.alipay.net/static/colors.json';
      const result = yield call(() => request(url));
      yield put({
        type: 'save',
        payload: result.data,
      });
    },
  },
};
