export const state = () => ({ banks: [] })

export const getters = {
  getProductById: state => (id) => {
    return state.banks.find(product => product.id === id)
  }
}

export const mutations = {
  updateBanks (state, banks) {
    state.banks = banks
  }
}

export const actions = {
  async fetchBanks ({ commit }) {
    const { data } = await this.$api.get('/banks')
    commit('updateBanks', data)
  }
}
