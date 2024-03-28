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
}
