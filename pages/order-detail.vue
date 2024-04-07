<template>
  <v-container v-if="order" class="py-10 px-5">
    <div class="pb-2 d-flex justify-space-between">
      <span class="custom-secondary--text text-h5 font-weight-bold">Detail Pesanan</span>
      <span class="custom-primary--text text-h5 font-weight-bold">{{ order.type }}</span>
    </div>
    <hr>
    <v-row class="py-5">
      <v-col lg="4" md="4" cols="6">
        <DetailLabel class="overflow-hidden text-truncate" :label-name="order.type.toLowerCase() === 'deliver' ? 'Deliver ID' : 'Pick Up ID'" :label-value="order.id" />
        <DetailLabel label-name="Nama Pengirim" :label-value="user.name" />
        <DetailLabel label-name="Nomor Telepon Pengirim" :label-value="user.phone" />
        <DetailLabel :label-name="user.address ? 'Alamat Pengirim' : ''" :label-value="user.address" />
      </v-col>
      <v-col lg="4" md="4" cols="6">
        <DetailLabel label-name="Tanggal Pengiriman" :label-value="order.date" />
        <DetailLabel label-name="Waktu Pengiriman" :label-value="order.time" />
        <DetailLabel label-name="" :label-value="order.bank?.name" />
      </v-col>
      <v-col lg="4" md="4" cols="12">
        <v-card outlined>
          <v-card-title class="custom-secondary--text">
            Detail Berat Sampah
          </v-card-title>
          <v-list>
            <v-list-item v-for="(item, index) in order.wastesUpdate" :key="index" dense>
              <v-list-item-content class="py-1">
                <v-list-item-title>
                  <div class="d-flex justify-space-between">
                    <span class="custom-secondary--text">{{ item.wasteName }}</span>
                    <span class="custom-secondary--text font-weight-bold">{{ item.wasteWeight + ' Kg' }}</span>
                  </div>
                </v-list-item-title>
                <hr class="my-2">
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense>
              <v-list-item-content class="py-1">
                <v-list-item-title>
                  <div class="d-flex justify-space-between">
                    <span class="custom-secondary--text font-weight-bold">Total Berat</span>
                    <span class="custom-primary--text font-weight-bold">{{ order.totalWeight + ' Kg' }}</span>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense>
              <v-list-item-content class="py-1">
                <v-list-item-title>
                  <div class="d-flex justify-space-between">
                    <span class="custom-secondary--text font-weight-bold">Total Poin</span>
                    <span class="custom-primary--text font-weight-bold">{{ '+' + order.totalPoints }}</span>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getTime, talkDate } from '~/utils/date'

export default {
  middleware: ['authenticated'],
  data () {
    return {
      order: null,
      user: null
    }
  },
  async created () {
    const orderId = this.$route.params.id
    const orderType = this.$route.params.type

    const api = orderType === 'Deliver' ? 'delivers' : 'pickups'
    const { data } = await this.$api.get(`/${api}/${orderId}`)

    this.order = data

    const date = new Date(data.updatedTime)
    this.order.date = talkDate(date)
    this.order.time = getTime(date)

    this.order.totalPoints = data.wastes.reduce((t, c) => { return t + c.wastePoint }, 0)
    this.order.totalWeight = data.wastes.reduce((t, c) => { return t + c.wasteWeight }, 0)

    this.order = { ...this.order, type: orderType }

    this.user = this.order.sender ?? this.order.requester
  }
}

</script>
