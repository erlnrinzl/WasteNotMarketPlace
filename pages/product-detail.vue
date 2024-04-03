<template>
  <v-row v-if="product" class="my-5">
    <v-col md="6">
      <v-container class="px-10 py-5">
        <v-row>
          <v-col md="8" offset-md="2">
            <v-img
              :src="product.productImage[selectedImage]"
            />
          </v-col>
        </v-row>
        <hr class="my-5">
        <div>
          <v-row>
            <v-col v-for="(image, index) in product.productImage" :key="index" cols="3">
              <v-img
                :src="image"
                @click="selectedImage = index"
              />
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <v-col md="6">
      <v-container class="px-10 py-5">
        <h3 class="custom-primary--text text-h3 font-weight-bold">
          {{ product.name }}
        </h3>
        <div class="d-flex justify-end">
          <div class="text-subtitle-2">
            <span>Oleh</span>
            <span class="custom-secondary--text font-weight-bold">{{ product.seller.name }}</span>
          </div>
        </div>
        <hr class="mb-3 mt-2">
        <p>{{ product.description }}</p>
        <hr class="mb-2 mt-3">
        <div>
          <p class="mb-1 text-h5 font-weight-bold">
            Harga
          </p>
          <span class="text-h5 font-weight-bold">
            Rp.
            <span class="custom-primary--text">{{ currency(product.price) }}</span>
          </span>
        </div>
        <div class="mt-3">
          <v-btn
            v-for="marketplace in product.marketplaces"
            :key="marketplace.name"
            rounded
            :class="marketplace.name.toLowerCase() + ' pr-0 mr-2'"
            dark
            :href="marketplace.url"
            target="_blank"
          >
            {{ marketplace.name }}
            <div class="icon-round ml-3">
              <v-icon right class="inner-icon mx-0" :class="marketplace.name.toLowerCase() + '-icon'">
                mdi-shopping-outline
              </v-icon>
            </div>
          </v-btn>
        </div>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ['authenticated'],
  data () {
    return {
      selectedImage: 0,
      product: null
    }
  },
  async created () {
    const productId = this.$route.params.id
    const { data } = await this.$api.get(`/products/${productId}`)

    this.product = data
  },
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

.icon-round {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 5vh;
  background-color: white;
}

.inner-icon {
  position: relative !important;
}
</style>
