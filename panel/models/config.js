export default {
  namespace: 'config',

  state: {
    setting: false,
  },

  reducers: {
    updateSuccess(state, action) {
      const payload = action.payload;
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
