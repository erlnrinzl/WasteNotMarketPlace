<template>
  <v-container>
    <div class="mb-5">
      <v-tabs
        v-model="tabs"
        color="custom-primary"
      >
        <v-tab href="#tab-berlangsung" class="custom-secondary--text font-weight-bold">
          Berlangsung
        </v-tab>
        <v-tab href="#tab-selesai" class="custom-secondary--text font-weight-bold">
          Selesai
        </v-tab>
      </v-tabs>
    </div>
    <hr>
    <v-tabs-items
      v-model="tabs"
    >
      <v-tab-item :value="'tab-berlangsung'">
        <v-row class="py-5">
          <v-col
            v-for="order in orders"
            :key="order.id"
            cols="12"
            sm="6"
            md="4"
            lg="4"
          >
            <CardPesanan :order-data="order" />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item :value="'tab-selesai'">
        <v-row class="py-5">
          <v-col
            v-for="order in finishedOrders"
            :key="order.id"
            cols="12"
            sm="6"
            md="4"
            lg="4"
          >
            <CardPesanan :order-data="order" />
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: ['authenticated'],
  data () {
    return {
      tabs: null
    }
  },
  computed: {
    ...mapState('orders', {
      orders: 'orders',
      finishedOrders: 'finishedOrders'
    })
  },
  mounted () {
    this.fetchOrders()
  },
  methods: {
    ...mapActions({
      fetchOrders: 'orders/fetchOrders'
    })
  }
}
</script>
