export const getters = {
    isAuthenticated(state) {
      return state.auth.loggedIn;
    },
  
    loggedInUser(state) {
      return state.auth.user;
    },
  }

export const mutations = {
  updateUserPreferences(state, payload) {
    this._vm.$set(state.auth.user, 'preferences', payload);
  }
}