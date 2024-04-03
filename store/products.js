export const state = () => ({ products: [] })

export const getters = {
  getProductById: state => (id) => {
    return state.products.find(product => product.id === id)
  }
}

export const mutations = {
  updateProducts (state, products) {
    state.products = products
  }
}

export const actions = {
  async fetchProducts ({ commit }) {
    const { data } = await this.$api.get('/products')
    commit('updateProducts', data)
  }
}
