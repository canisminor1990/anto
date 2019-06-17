import _ from 'lodash';

const local = _.defaults(JSON.parse(localStorage.getItem('store')), {
  theme: 'black',
  mode: '交互',
  name: '花名',
  devMode: false,
});

export default {
  namespace: 'store',

  state: {
    ...local,
  },

  reducers: {
    updateSuccess(state, action) {
      const payload = action.payload;
      const newLocal = { ...state, ...payload };
      localStorage.setItem('store', JSON.stringify(newLocal));
      return newLocal;
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
