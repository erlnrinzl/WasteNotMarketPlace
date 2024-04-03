export const state = () => ({ user: null, role: null })

export const getters = {
  authenticated: (state) => { return !!state.user },
  getUser: (state) => {
    return state.user
  },
  getRole: (state) => {
    return state.role
  }
}

export const mutations = {
  setUser: (state, user) => {
    state.user = user ? { ...state.user, ...user } : null
  },

  setRole: (state, role) => {
    state.role = role
  }
}

export const actions = {
  onAuthStateChangedAction: ({ commit }, { authUser, claims }) => {
    if (!authUser) {
      commit('setUser', null)
      commit('setRole', null)
    } else {
      const { displayName, email, phoneNumber, photoURL, uid } = authUser

      commit('setUser', { displayName, email, phoneNumber, photoURL, uid })
      commit('setRole', claims.role)
    }
  }

}
