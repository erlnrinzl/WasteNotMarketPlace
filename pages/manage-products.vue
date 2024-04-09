<template>
  <v-container>
    <div class="text-center">
      <h2 class="text-h4 font-weight-bold">
        Produkmu
      </h2>
    </div>
    <v-row class="pt-5">
      <v-col cols="12" md="7" lg="7">
        <v-btn color="custom-primary" dark to="/upload-product">
          <v-icon class="mr-2">
            mdi-tray-arrow-up
          </v-icon>
          Unggah Produk
        </v-btn>
      </v-col>
      <v-col cols="7" md="3" lg="3">
        <v-autocomplete
          v-model="selectedSearch"
          label="Cari Produk Daur Ulang"
          append-icon=""
          prepend-icon="mdi-magnify"
          placeholder="Tulis untuk mencari"
          :search-input.sync="search"
          :loading="isLoading"
          :items="itemsSearch"
          item-text="name"
          item-value="id"
          return-object
          hide-no-data
          hide-details="auto"
          outlined
          solo
          dense
          flat
        />
      </v-col>
      <v-col cols="5" md="2" lg="2">
        <v-select
          v-model="sortBy"
          flat
          dense
          solo
          outlined
          hide-details
          :items="keys"
          label="Urutkan"
          append-icon="mdi-swap-vertical"
        />
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="products"
      :search="search"
      :sort-by="sortBy"
      :rtl="false"
      class="elevation-1 mt-3"
    >
      <template slot="item.detailProduct" slot-scope="{ item }">
        <v-row class="pa-2 align-center">
          <v-col cols="12" md="4" lg="4">
            <v-img :src="item.productImage[0]" :aspect-ratio="10/8" />
          </v-col>

          <v-col cols="12" md="8" lg="8" class="px-3">
            <p class="mb-0 custom-secondary--text text-body-1 text-md-h4 text-lg-h4 font-weight-bold">
              {{ item.name }}
            </p>
            <span class="custom-primary--text text-body-2 text-md-h4 text-lg-h4 font-weight-bold">
              {{ 'Rp.' + currency(item.price) }}
            </span>
            <p class="mt-1 text-caption hidden-xs-only">
              {{ item.description }}
            </p>
          </v-col>
        </v-row>
      </template>

      <template slot="item.shopee" slot-scope="{ item }">
        <router-link
          v-if="getMarketData(item.marketplaces, 'shopee')"
          :to="getMarketData(item.marketplaces, 'shopee').url"
          :class="getMarketData(item.marketplaces, 'shopee').name.toLowerCase() + '-icon'"
          class="text-caption"
        >
          {{ 'Link ' + getMarketData(item.marketplaces, 'shopee').name }}
        </router-link>
      </template>

      <template slot="item.tokopedia" slot-scope="{ item }">
        <router-link
          v-if="getMarketData(item.marketplaces, 'tokopedia')"
          :to="getMarketData(item.marketplaces, 'tokopedia').url"
          :class="getMarketData(item.marketplaces, 'tokopedia').name.toLowerCase() + '-icon'"
          class="text-caption"
        >
          {{ 'Link ' + getMarketData(item.marketplaces, 'tokopedia').name }}
        </router-link>
      </template>

      <template slot="item.lazada" slot-scope="{ item }">
        <router-link
          v-if="getMarketData(item.marketplaces, 'lazada')"
          :to="getMarketData(item.marketplaces, 'lazada').url"
          :class="getMarketData(item.marketplaces, 'lazada').name.toLowerCase() + '-icon'"
          class="text-caption"
        >
          {{ 'Link ' + getMarketData(item.marketplaces, 'lazada').name }}
        </router-link>
      </template>

      <template slot="item.actions" slot-scope="{ item }">
        <div>
          <v-btn
            class="mr-3 custom-primary--text"
            x-small
            :to="{
              name: 'edit-product',
              params: {
                id: item.id
              }
            }"
          >
            Edit
          </v-btn>
          <v-btn color="red darken-1" x-small dark @click="deleteDialog(item)">
            Delete
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card class="py-5">
        <v-card-title>
          <v-row>
            <v-col cols="2" class="d-flex align-center">
              <v-icon class="text-h3" color="red lighten-1">
                mdi-delete-alert-outline
              </v-icon>
            </v-col>
            <v-col cols="10" class="word-wrap text-left">
              Apakah anda yakin membuang produk ini?
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <span class="font-weight-bold">Nama Produk:</span>
          <span>{{ selectedDelete.name }}</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red lighten-1"
            dark
            @click="deleteProductConfirm(selectedDelete.id)"
          >
            Buang
          </v-btn>
          <v-btn
            @click="dialog = false"
          >
            Batal
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth-seller'],
  data () {
    return {
      products: [],
      dialog: false,
      search: null,
      isLoading: false,
      itemsSearch: [],
      selectedSearch: null,
      selectedDelete: 'lampu sendok',
      sortBy: 'name',
      keys: [
        'Name',
        'Price',
        'Date Added'
      ],
      headers: [
        {
          text: 'Detail Produk',
          value: 'detailProduct'
        },
        {
          text: 'Shopee',
          value: 'shopee'
        },
        {
          text: 'Tokopedia',
          value: 'tokopedia'
        },
        {
          text: 'Lazada',
          value: 'lazada'
        },
        {
          text: 'Aksi',
          value: 'actions',
          sortable: false
        }
      ]
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
    }
  },
  watch: {
    search (value) {
      this.isLoading = true
      setTimeout(() => {
        this.itemsSearch = this.products.filter((product) => {
          this.isLoading = false
          return product.name
        })
      }, 800)
    }
  },
  async mounted () {
    const { data } = await this.$api.get('/products/seller')
    this.products = data
  },
  methods: {
    async deleteProductConfirm (id) {
      await this.$api.delete(`/products/${id}`)
      this.$router.go()
    },
    deleteDialog (product) {
      this.dialog = true
      this.selectedDelete = product
    },
    currency (value) {
      return Intl.NumberFormat('en-US').format(value)
    },
    getMarketData (marketplaces, marketToFind) {
      return marketplaces.find(market => market.name.toLowerCase() === marketToFind.toLowerCase())
    }
  }
}
</script>
