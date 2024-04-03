export const state = () => ({ user: null, role: null })

export const getters = {
  authenticated: state => !!state.user
}

export const mutations = {
  setUser: (state, user) => {
    state.user = user
  },

  setRole: (state, role) => {
    state.role = role
  }
}
