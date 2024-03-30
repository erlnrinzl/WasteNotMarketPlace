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

  orders: [],
  finishedOrders: []
})

export const getters = {
  getOrderById: state => (id) => {
    return state.orders.find(order => order.id === id)
  }
}

export const mutations = {
  updateOrders (state, orders) {
    state.orders = orders
  },
  updateFinishedOrders (state, finishedOrders) {
    state.finishedOrders = finishedOrders
  }
}

export const actions = {
  // contoh fetching data order

  // fetchOrders ({ commit }) {
  //   return this.$axios.$get('url-etc').then((response) => {
  //     commit('updateOrders', response.orders)
  //   })
  // },

  // fetchFinishedOrders ({ commit }) {
  //   return this.$axios.$get('url-etc').then((response) => {
  //     commit('updateFinishedOrders', response.orders)
  //   })
  // },

  // fetchOrderById ({ commit }, orderId) {
  //   this.$axios.$get(`url/${orderId}`).then((response) => {
  //     commit('setOrder', response.data)
  //   })
  // }
}
