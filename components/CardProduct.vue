<template>
  <v-card>
    <v-row class="align-center">
      <v-col cols="12" sm="2" md="2" lg="2">
        <div class="px-3">
          <v-img
            :src="require(`@/assets/images/${product.photos[0]}`)"
          />
        </div>
      </v-col>
      <v-col cols="12" sm="5" md="5" lg="5" class="px-3">
        <p class="mb-0 custom-secondary--text text-h4 font-weight-bold">
          {{ product.name }}
        </p>
        <span class="custom-primary--text text-h4 font-weight-bold">
          {{ 'Rp. ' + currency(product.price) }}
        </span>
        <p class="mt-1 text-caption hidden-xs-only">
          {{ product.description }}
        </p>
      </v-col>
      <v-col
        v-for="market in product.seller.marketPlace"
        :key="market.id"
        cols="12"
        sm="1"
        md="1"
        lg="1"
        class="px-3"
      >
        <a
          :href="market.to"
          :class="market.name.toLowerCase() + '-icon'"
        >
          {{ 'Link ' + market.name }}
        </a>
      </v-col>
      <v-col cols="12" sm="2" md="2" lg="2">
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
