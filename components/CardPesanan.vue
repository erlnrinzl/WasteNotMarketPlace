<template>
  <v-card
    outlined
    rounded="rounded-lg"
    @click="onClick"
  >
    <v-card-title class="py-1 d-flex justify-space-between">
      <div>
        <span class="custom-primary--text text-h5 font-weight-bold">
          {{ orderData.type }}
        </span>
      </div>
      <div class="custom-secondary--text text-subtitle-2">
        <p class="px-0 py-0 mb-0 font-weight-bold">
          {{ orderData.date }}
        </p>
        <p class="px-0 py-0 mb-0">
          {{ orderData.time }}
        </p>
      </div>
    </v-card-title>
    <hr>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-img
            :src="orderData.wasteImageUrl"
            contain
          />
        </v-col>
        <v-col cols="6">
          <div>
            <p class="mb-0 custom-secondary--text font-weight-bold text-body-1">
              {{ orderData.bank?.name }}
            </p>
          </div>
        </v-col>

        <template v-if="orderData.status.toLowerCase() !== 'selesai'">
          <v-col cols="6">
            <div>
              <span class="custom-secondary--text text-h5 font-weight-regular">Status</span>
            </div>
          </v-col>
          <v-col cols="6">
            <div>
              <span class="orange--text font-weight-bold">{{ orderData.status }}</span>
            </div>
          </v-col>
        </template>

        <template v-else>
          <v-col cols="6">
            <div class="text-center">
              <p class="my-0 text-subtitle-1">
                Total Berat
              </p>
              <span class="custom-primary--text font-weight-bold">{{ orderData.totalWeight + " Kg" }}</span>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="text-center">
              <p class="my-0 text-subtitle-1">
                Poin
              </p>
              <span class="custom-primary--text font-weight-bold">{{ "+" + orderData.totalPoints }}</span>
            </div>
          </v-col>
        </template>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    orderData: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClick (id) {
      this.$router.push({
        name: 'order-detail',
        params: {
          id: this.orderData.id,
          type: this.orderData.type
        }
      })
    }
  }
}
</script>
