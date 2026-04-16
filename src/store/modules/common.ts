// store/modules/common.ts
export interface CommonState {
  isCollapse: boolean;
  userName: string;
}

const state: CommonState = {
  isCollapse: false,
  userName: '123456'
};

const mutations = {
  TOGGLE_SIDEBAR(state: CommonState) {
    state.isCollapse = !state.isCollapse;
  },
  
  SET_SIDEBAR_STATUS(state: CommonState, status: boolean) {
    state.isCollapse = status;
  },

  SET_USER_NAME(state: CommonState, userName: string) {
    state.userName = userName;
  },

  CLEAR_USER_NAME(state: CommonState) {
    state.userName = '';
  }
};

const actions = {
  toggleSidebar({ commit }: { commit: any }) {
    commit('TOGGLE_SIDEBAR');
  },
  
  setSidebarStatus({ commit }: { commit: any }, status: boolean) {
    commit('SET_SIDEBAR_STATUS', status);
  },

  setUserName({ commit }: { commit: any }, userName: string) {
    commit('SET_USER_NAME', userName);
  },

  clearUserName({ commit }: { commit: any }) {
    commit('CLEAR_USER_NAME');
  }
};

const getters = {
  isCollapse: (state: CommonState) => state.isCollapse,
  userName: (state: CommonState) => state.userName
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};