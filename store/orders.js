import { getTime, talkDate } from '~/utils/date'

export const state = () => ({
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
  async fetchOrders ({ commit }) {
    const unfinisihedOrders = []
    const finishedOrders = []

    const { data: pickups } = await this.$api.get('/pickups')
    const { data: delivers } = await this.$api.get('/delivers')

    pickups.forEach((pickup) => { pickup.type = 'Pick Up' })
    delivers.forEach((deliver) => { deliver.type = 'Deliver' })

    const orders = [...pickups, ...delivers]
    orders.forEach((order) => {
      let date

      order.totalPoints = order.wastes.reduce((t, c) => { return t + c.wastePoint }, 0)
      order.totalWeight = order.wastes.reduce((t, c) => { return t + c.wasteWeight }, 0)

      if (order.status === 'Selesai') {
        date = new Date(order.createdTime)
        finishedOrders.push(order)
      } else {
        date = new Date(order.updatedTime)
        unfinisihedOrders.push(order)
      }

      order.date = talkDate(date)
      order.time = getTime(date)
    })

    commit('updateOrders', unfinisihedOrders)
    commit('updateFinishedOrders', finishedOrders)
  }

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
