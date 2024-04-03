export const state = () => ({
  user: null,
  role: null
})

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
    state.user = user
  },

  setRole: (state, role) => {
    state.role = role
  }
}

export const actions = {
  onAuthStateChangedAction: ({ commit, state }, { authUser, claims }) => {
    if (!authUser) {
      // remove state
      commit('setUser', null)
    } else {
      const { displayName, email, phoneNumber, photoURL, uid } = authUser
      console.log(authUser)
      console.log(claims)
      commit('setUser', {
        displayName,
        email,
        phoneNumber,
        photoURL,
        uid
      })
      commit('setRole', claims.role)
    }
  }

}
