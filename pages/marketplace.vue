<template>
  <v-container class="my-5 px-3">
    <v-row>
      <v-col cols="8">
        <h4 class="text-h4 custom-primary--text font-weight-bold">
          Produk Daur Ulang
        </h4>
      </v-col>
      <v-col cols="4">
        <v-autocomplete
          v-model="selectedSearch"
          label="Cari Produk Daur Ulang"
          placeholder="Tulis untuk mencari"
          :search-input.sync="search"
          :loading="isLoading"
          :items="itemsSearch"
          item-text="title"
          item-value="id"
          return-object
          hide-no-data
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="product in filteredProduct"
        :key="product.id"
        sm="6"
        md="4"
        lg="3"
        class="px-3"
      >
        <v-card>
          <v-card-title class="custom-primary custom-secondary--text text-h5 font-weight-bold">
            {{ product.name }}
          </v-card-title>
          <v-card-text class="custom-primary text-subtitle-1 white--text">
            {{ product.preface }}
          </v-card-text>
          <div class="text-center product-wrapper pt-5 pb-5">
            <v-avatar size="25vh" class="mb-5 absolute-div">
              <v-img
                :src="require(`@/assets/images/${product.thumbnail}`)"
              />
            </v-avatar>
          </div>
          <v-card-actions class="px-3 pb-3 justify-space-between align-end">
            <div class="custom-secondary--text">
              Oleh:
              <span class="font-weight-bold">{{ product.seller }}</span>
            </div>
            <v-btn
              color="custom-secondary"
              dark
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  // middleware: ['authenticated'],
  data () {
    return {
      search: null,
      isLoading: false,
      itemsSearch: [],
      selectedSearch: null
    }
  },
  computed: {
    filteredProduct () {
      if (this.selectedSearch) {
        return this.products.filter(product =>
          product.id === this.selectedSearch.id
        )
      }
      return this.products
    },
    ...mapState('products', {
      products: 'products'
    })
  },
  watch: {
    search (value) {
      this.isLoading = true
      setTimeout(() => {
        this.itemsSearch = this.products.filter((product) => {
          this.isLoading = false
          return product.title
        })
      }, 800)
    }
  },
  mounted () {
    // this.fetchProducts()
  },
  methods: {
    ...mapActions({
      fetchProducts: 'products/fetchProducts'
    })
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
  left: 0%;
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
