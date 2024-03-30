<template>
  <v-card>
    <v-row class="align-center">
      <v-col cols="2">
        <div class="ml-3">
          <v-img
            :src="require(`@/assets/images/${product.photos[0]}`)"
          />
        </div>
      </v-col>
      <v-col cols="5">
        <p class="mb-0 custom-secondary--text text-h4 font-weight-bold">
          {{ product.name }}
        </p>
        <span class="custom-primary--text text-h4 font-weight-bold">
          {{ 'Rp. ' + currency(product.price) }}
        </span>
        <p class="mt-1 text-caption">
          {{ product.description }}
        </p>
      </v-col>
      <v-col
        v-for="market in product.seller.marketPlace"
        :key="market.id"
        cols="1"
      >
        <a
          :href="market.to"
          :class="market.name.toLowerCase() + '-icon'"
        >
          Link Shopee
        </a>
      </v-col>
      <v-col cols="2">
        <v-btn
          class="mr-3 custom-primary--text"
          small
          :to="{
            name: '/edit-product',
            params: {
              id: product.id
            }
          }"
        >
          Edit
        </v-btn>
        <v-btn color="red darken-1" small dark @click="$emit('open-dialog', product.id)">
          Delete
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    currency (value) {
      return Intl.NumberFormat('en-US').format(value)
    }
  }
}
</script>

<style>
.shopee {
  background-color: #EE4D2D !important;
}

.shopee-icon {
  color: #EE4D2D !important;
}

.tokopedia {
  background-color: #00A600 !important;
}

.tokopedia-icon {
  color: #00A600 !important;
}

.lazada {
  background-color: #154DC5 !important;
}

.lazada-icon {
  color: #154DC5 !important;
}
</style>
