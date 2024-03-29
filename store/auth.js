export const state = () => ({
  access_token: null,
  refresh_token: null,
  fullname: null
})

export const getters = {
  authenticated: (state) => {
    if (state.access_token) {
      return true
    }
    return false
  }
}

export const mutations = {
  setAccessToken: (state, accessToken) => {
    state.access_token = accessToken
  },
  setRefreshToken: (state, refreshToken) => {
    state.refresh_token = refreshToken
  },
  setFullName: (state, fullname) => {
    state.fullname = fullname
  }
}
