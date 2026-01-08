// store/modules/common.ts
export interface CommonState {
  isCollapse: boolean;
}

const state: CommonState = {
  isCollapse: false
};

const mutations = {
  TOGGLE_SIDEBAR(state: CommonState) {
    state.isCollapse = !state.isCollapse;
  },
  
  SET_SIDEBAR_STATUS(state: CommonState, status: boolean) {
    state.isCollapse = status;
  }
};

const actions = {
  toggleSidebar({ commit }: { commit: any }) {
    commit('TOGGLE_SIDEBAR');
  },
  
  setSidebarStatus({ commit }: { commit: any }, status: boolean) {
    commit('SET_SIDEBAR_STATUS', status);
  }
};

const getters = {
  isCollapse: (state: CommonState) => state.isCollapse
};

export default {
  namespaced: true, // 启用命名空间
  state,
  mutations,
  actions,
  getters
};