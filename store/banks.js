export const state = () => ({
  banks: [
    {
      id: 1,
      name: 'Dinas Lingkungan Hidup Cilandak',
      distance: 4.5,
      mapsUrl: '',
      address: 'Jl. Terusan Gaharu 1 No.2 4, RT.9/RW.11, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan,  12430',
      schedule: {
        day: 'Senin - Sabtu',
        time: '07.00 - 17.00'
      }
    },
    {
      id: 2,
      name: 'Dinas Lingkungan Hidup Cilandak',
      distance: 4.5,
      mapsUrl: '',
      address: 'Jl. Terusan Gaharu 1 No.2 4, RT.9/RW.11, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan,  12430',
      schedule: {
        day: 'Senin - Sabtu',
        time: '07.00 - 17.00'
      }
    }
  ]
})

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
