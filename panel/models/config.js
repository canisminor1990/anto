import _ from 'lodash';

export default {
  namespace: 'config',

  state: {
    symbol: false,
    color: false,
    line: false,
    note: false,
    layer: false,
    plate: false,
    word: false,
    dev: false,
    setting: false,
  },

  reducers: {
    updateSuccess(state, action) {
      const payload = action.payload;
      _.forEach(payload, (value, key) => {
        if (value) {
          _.forEach(state, (v, k) => {
            if (state[k] !== key) state[k] = false;
          });
        }
      });
      return { ...state, ...payload };
    },
  },

  effects: {
    *update(action, { put }) {
      const payload = action.payload;
      console.log('update', payload);
      yield put({ type: 'updateSuccess', payload });
    },
  },
};
