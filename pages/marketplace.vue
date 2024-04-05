<template>
  <v-container class="my-5 px-3">
    <v-row>
      <v-col cols="12" sm="12" md="8" lg="8">
        <h4 class="text-h4 custom-primary--text font-weight-bold">
          Produk Daur Ulang
        </h4>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4" class="py-0">
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
        <CardMarketplaceProduct :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: ['authenticated'],
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
    ...mapState('products', { products: 'products' })
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
    this.fetchProducts()
  },
  methods: {
    ...mapActions({
      fetchProducts: 'products/fetchProducts'
    })
  }
}
</script>
