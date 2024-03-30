export const state = () => ({
  /*
   *   product object: {
   *     id: Number,
   *     title: String,
   *     seller: String,
   *     thumbnail: imgURL,
   *     preface: String
   *   }
   */

  products: []
})

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
  // contoh fetching data product

  // fetchProducts ({ commit }) {
  //   return this.$axios.$get('url-etc').then((response) => {
  //     commit('updateProducts', response.products)
  //   })
  // },

  // fetchProductById ({ commit }, productId) {
  //   this.$axios.$get(`url/${productId}`).then((response) => {
  //     commit('setProduct', response.data)
  //   })
  // }

}
