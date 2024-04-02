export const state = () => ({ user: null, role: null })

export const getters = {
  authenticated: state => !!state.user
}

export const mutations = {
  setUser: (state, user) => {
    state = { ...state, user }
  },

  setRole: (state, role) => {
    state = { ...state, role }
  }
}
