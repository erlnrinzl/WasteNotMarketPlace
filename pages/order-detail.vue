<template>
  <v-container class="py-10 px-5">
    <div class="pb-2 d-flex justify-space-between">
      <span class="custom-secondary--text text-h5 font-weight-bold">Detail Pesanan</span>
      <span class="custom-primary--text text-h5 font-weight-bold">{{ orderData.type.charAt(0).toUpperCase() + orderData.type.slice(1) }}</span>
    </div>
    <hr>
    <v-row class="py-5">
      <v-col lg="4" md="4" sm="6">
        <DetailLabel label-name="Deliver ID" :label-value="orderData.id" />
        <DetailLabel label-name="Nama Pengirim" :label-value="orderData.sender.name" />
        <DetailLabel label-name="Nomor Telepon Pengirim" :label-value="orderData.sender.phone" />
        <DetailLabel label-name="Alamat Pengirim" :label-value="orderData.sender.address" />
      </v-col>
      <v-col lg="4" md="4" sm="6">
        <DetailLabel label-name="Tanggal Pengiriman" :label-value="orderData.date" />
        <DetailLabel label-name="Waktu Pengiriman" :label-value="orderData.time" />
        <DetailLabel :label-name="orderData.unitPolls.unitType" :label-value="orderData.unitPolls.name" />
      </v-col>
      <v-col lg="4" md="4" sm="12">
        <v-card outlined>
          <v-card-title class="custom-secondary--text">
            Detail Berat Sampah
          </v-card-title>
          <v-list>
            <v-list-item v-for="(item, index) in orderData.items" :key="index" dense>
              <v-list-item-content class="py-1">
                <v-list-item-title>
                  <div class="d-flex justify-space-between">
                    <span class="custom-secondary--text">{{ item.title }}</span>
                    <span class="custom-secondary--text font-weight-bold">{{ item.berat + ' Kg' }}</span>
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
                    <span class="custom-primary--text font-weight-bold">{{ subTotalWeight() + ' Kg' }}</span>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense>
              <v-list-item-content class="py-1">
                <v-list-item-title>
                  <div class="d-flex justify-space-between">
                    <span class="custom-secondary--text font-weight-bold">Total Poin</span>
                    <span class="custom-primary--text font-weight-bold">{{ '+' + orderData.poin }}</span>
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
export default {
  // middleware: ['authenticated'],
  data () {
    return {
      orderData: {
        id: '000000000001',
        type: 'deliver',
        date: '24 Agustus 2024',
        time: '10.43',
        image: 'imageUrl',
        unitPolls: {
          unitType: 'Dinas Lingkungan',
          name: 'Dinas Lingkungan Hidup Cilandak'
        },
        status: 'Selesai',
        totalBerat: 1.5,
        poin: 25,
        sender: {
          name: 'Calvin Andrew Widjaja',
          phone: '081296112422',
          address: 'Jl. Rawa Belong No. 17'
        },
        items: [
          {
            title: 'Botol Plastik',
            berat: 0.5
          },
          {
            title: 'Plastik',
            berat: 0.5
          },
          {
            title: 'Kain',
            berat: 0.5
          }
        ]
      }
    }
  },
  methods: {
    subTotalWeight () {
      return this.orderData.items.reduce((total, item) => {
        return (total + item.berat)
      }, 0)
    }
  }
}

</script>
