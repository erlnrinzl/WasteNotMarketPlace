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
          item-text="title"
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
    <v-row class="my-0">
      <v-col cols="7">
        Detail Product
      </v-col>
      <v-col cols="1" class="font-weight-bold hidden-xs-only">
        Shopee
      </v-col>
      <v-col cols="1" class="font-weight-bold hidden-xs-only">
        Tokopedia
      </v-col>
      <v-col cols="1" class="font-weight-bold hidden-xs-only">
        Lazada
      </v-col>
      <v-col cols="2" class="text-center font-weight-bold hidden-xs-only">
        Aksi
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="12"
        md="12"
        lg="12"
        class="mb-5"
      >
        <CardProduct :product="product" @open-dialog="deleteDialog" />
      </v-col>
    </v-row>

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
            <v-col cols="10" class="text-left">
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
            @click="deleteProduct(selectedDelete.id)"
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
      ]
    }
  },
  async mounted () {
    const { data } = await this.$api.get('/products/seller')
    this.products = data
  },
  methods: {
    async deleteProduct (id) {
      await this.$api.delete(`/products/${id}`)
      this.$router.go()
    },
    deleteDialog (id) {
      this.dialog = true
      this.selectedDelete = this.products.find(product => product.id === id)
    }
  }
}
</script>
