<template>
  <v-card>
    <v-card-title
      class="custom-primary custom-secondary--text text-h6 font-weight-bold overflow-hidden"
    >
      {{ product.name }}
    </v-card-title>
    <v-card-text class="custom-primary">
      <span class="text-subtitle-1 white--text">
        {{ 'Rp.' + currency(product.price) }}
      </span>
    </v-card-text>
    <div class="text-center product-wrapper pt-5 pb-5">
      <v-avatar size="25vh" class="mb-5 absolute-div">
        <img :src="product.productImage[0]">
      </v-avatar>
    </div>
    <v-card-actions class="px-3 pb-3 justify-space-between align-end">
      <div class="custom-secondary--text">
        Oleh:
        <span class="text-caption font-weight-bold">{{ product.seller.name }}</span>
      </div>
      <v-btn
        color="custom-secondary"
        dark
        small
        :to="{
          name: 'product-detail',
          params: {
            id: product.id
          }
        }"
      >
        Lihat Detail
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    currency (value) {
      return Intl.NumberFormat('en-US').format(value)
    }
  }
}
</script>

<style>
div.product-wrapper {
  position: relative;
  overflow: hidden;
  background-color: #00A699;
}

div.product-wrapper:before {
  content: '';
  position: absolute;
  left: 30%;
  width: 100%;
  height: 300%;
  background-color: rgb(255, 255, 255); /* fallback */
  background-color: white;
  top: -50%;
  -webkit-transform: rotate(63.38deg);
  -moz-transform: rotate(63.38deg);
  transform: rotate(63.38deg);
}
</style>
