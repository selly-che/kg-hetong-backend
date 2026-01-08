export default {
    namespaced: true,
    state: {
      selectIndex: "1-1",
    },
    mutations: {
      changeSelect(state:any, index:any) {
        state.selectIndex = index;
      },
    },
  };
  