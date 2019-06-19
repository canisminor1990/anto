import { request } from '../utils/request';
import _ from 'lodash';

export default {
  namespace: 'username',
  state: [],
  reducers: {
    save(state, action) {
      state = action.payload;
      return state;
    },
  },
  effects: {
    *get(action, { call, put }) {
      const name = action.payload;
      const result = yield call(() =>
        request(`http://anto.inc.alipay.net/api/user/search?keyword=${name}`)
      );
      const names = [];
      _.forEach(result.data.result, value => {
        if (value.nick && value.nick !== '') names.push(value.nick);
      });
      yield put({
        type: 'save',
        payload: names,
      });
    },
  },
};
