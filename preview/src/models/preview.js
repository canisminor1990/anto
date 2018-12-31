export default {
  namespace: "preview",
  state    : {},
  reducers : {
    save(state, action) {
      state = action.payload;
      return state;
    }
  },
  effects  : {
    * get(action, { call, put }) {
      yield put({
                  type   : "save",
                  payload: JSON.parse(localStorage.getItem("preview"))
                });
    }
  }
};
