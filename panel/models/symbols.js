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
      const tabs = yield call(() => request('http://100.88.232.163/static/tabs.json'));
      const tabsData = tabs.data;
      let data = {};
      for (let i = 0; i < tabsData.length; i++) {
        const libdata = yield call(() =>
          request(`http://100.88.232.163/static/${tabsData[i].dirname}/data.json`)
        );
        data[tabsData[i].dirname] = {
          data: libdata.data,
          ...tabsData[i],
        };
      }
      yield put({
        type: 'save',
        payload: data,
      });
    },
  },
};
