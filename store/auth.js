export const state = () => ({ user: null })

export const getters = {
  authenticated: state => !!state.user
}

export const mutations = {
  setUser: (state, user) => {
    state = { ...state, user }
  }
}
