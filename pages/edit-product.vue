<template>
  <v-form>
    <v-row class="custom-secondary">
      <v-col cols="12">
        <v-container class="my-5">
          <div class="text-center">
            <h4 class="text-h4 font-weight-bold white--text">
              {{ 'Form ' + formName }}
            </h4>
          </div>
        </v-container>
      </v-col>

      <v-col cols="12">
        <v-container>
          <v-row class="align-center">
            <v-col cols="12">
              <div class="mr-2 d-inline-block">
                <span class="rounded-lg py-3 px-5 text-h6 custom-primary white--text">
                  1
                </span>
              </div>
              <span class="text-h6 white--text">
                Lengkapi Form Berikut
              </span>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col cols="12">
        <v-container>
          <v-row class="px-3">
            <v-col cols="12" md="5" lg="5">
              <label for="product-name" class="white--text font-weight-bold">Nama Produk</label>
              <v-text-field
                v-model="formData.name"
                :rules="formRules.productName"
                name="product-name"
                label="Nama Produk"
                type="text"
                class="mt-3"
                outlined
                solo
              />
              <label for="product-price" class="white--text font-weight-bold">Harga Produk</label>
              <v-text-field
                v-model="formData.price"
                :rules="formRules.price"
                name="product-price"
                label="Harga Produk"
                type="number"
                class="mt-3"
                outlined
                solo
              >
                <span
                  slot="prepend"
                  class="white--text text-body-1 font-weight-regular"
                >
                  Rp
                </span>
              </v-text-field>
              <label for="description" class="white--text font-weight-bold">Deskripsi Produk</label>
              <v-textarea
                v-model="formData.description"
                :rules="formRules.description"
                name="description"
                label="Deskripsi Produk"
                class="mt-3"
                rows="3"
                outlined
                solo
              />
              <label for="product-link" class="white--text font-weight-bold">Link Shopee</label>
              <v-icon class="white--text">
                mdi-link-variant
              </v-icon>
              <v-text-field
                v-model="formData.shopee"
                name="product-link"
                label="Link Produk"
                type="text"
                class="mt-3"
                outlined
                solo
              />
              <label for="product-link" class="white--text font-weight-bold">Link Tokopedia</label>
              <v-icon class="white--text">
                mdi-link-variant
              </v-icon>
              <v-text-field
                v-model="formData.tokopedia"
                name="product-link"
                label="Link Produk"
                type="text"
                class="mt-3"
                outlined
                solo
              />
              <label for="product-link" class="white--text font-weight-bold">Link Lazada</label>
              <v-icon class="white--text">
                mdi-link-variant
              </v-icon>
              <v-text-field
                v-model="formData.lazada"
                name="product-link"
                label="Link Produk"
                type="text"
                class="mt-3"
                outlined
                solo
              />
            </v-col>

            <v-col cols="12" md="7" lg="7">
              <label for="product-image" class="white--text font-weight-bold">Gambar Produk</label>
              <v-file-input
                v-model="image"
                :rules="formRules.images"
                name="product-image"
                label="Gambar Produk"
                prepend-icon="mdi-camera"
                class="mt-3"
                accept="image/*"
                outlined
                solo
                @change="onFileChange"
              />
              <v-row v-if="image">
                <v-col cols="4">
                  <v-img
                    :src="imageUrl"
                    width="200"
                    height="200"
                    contain
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col cols="4" md="2" offset="4" offset-md="5" class="mb-10">
        <v-container>
          <v-btn class="custom-primary white--text" block @click="onSubmit">
            <span v-if="!isDisabled">
              Kirim
            </span>
            <v-progress-circular v-else color="custom-secondary" indeterminate />
          </v-btn>
        </v-container>
      </v-col>
      <PopUp
        :color="isError ? 'red darken-1' : 'custom-secondary'"
        :icon="isError ? 'mdi-close' : 'mdi-check'"
        :show="dialog"
        :title="popUpTitle"
        :message="popUpMessage"
        @close="closePopUpRedirect"
      />
    </v-row>
  </v-form>
</template>

<script>
export default {
  // middleware: ['authenticated'],
  data () {
    return {
      isDisabled: false,
      formName: 'Edit Produk',
      formData: {
        name: '',
        price: null,
        description: '',
        shopee: '',
        tokopedia: '',
        lazada: ''
      },
      formRules: {
        productName: [
          v => !!v || 'Masukan nama produk!'
        ],
        price: [
          v => !!v || 'Masukan harga produk!'
        ],
        description: [
          v => !!v || 'Masukan deskripsi produk!'
        ]
      },
      image: null,
      imageUpload: [],
      imageUrl: '',
      dialog: false,
      isError: false,
      popUpTitle: '',
      popUpMessage: ''
    }
  },
  async mounted () {
    const { id } = this.$route.params
    const { data } = await this.$api.get(`/products/${id}`)
    const { marketplaces, productImage } = data

    this.formData = data
    marketplaces.forEach((market) => {
      this.formData[market.name.toLowerCase()] = market.url
    })
    this.image = productImage[0]
    this.imageUpload = productImage[0]
    this.imageUrl = productImage[0]
  },
  methods: {
    onFileChange (file) {
      if (file) {
        if (file.length > 1) {
          this.imageUpload = []
          this.imageUrl = ''
        } else {
          this.image = file
          this.imageUpload = file
          this.imageUrl = ''

          this.previewImage(file)
        }
      }
    },
    previewImage (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        this.imageUrl = e.target.result
      }
    },
    openPopUp (title, message) {
      this.dialog = true
      this.popUpTitle = title
      this.popUpMessage = message
    },
    closePopUpRedirect () {
      this.dialog = false
      if (this.isError) {
        this.isError = false
      } else {
        this.$router.go(-1)
      }
    },
    async onSubmit () {
      this.isDisabled = true

      try {
        const marketplaces = []

        if (this.formData.shopee) { marketplaces.push({ name: 'Shopee', url: this.formData.shopee }) }
        if (this.formData.tokopedia) { marketplaces.push({ name: 'Tokopedia', url: this.formData.tokopedia }) }
        if (this.formData.lazada) { marketplaces.push({ name: 'Lazada', url: this.formData.lazada }) }

        const formData = new FormData()

        formData.append('productImage1', this.imageUpload)
        formData.append('name', this.formData.name)
        formData.append('description', this.formData.description)
        formData.append('price', this.formData.price)
        await formData.append('marketplaces', JSON.stringify(marketplaces))

        const { data } = await this.$api.put(`/products/${this.formData.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        console.log(data)
        const title = 'Berhasil Submit'
        const message = 'Produk anda telah berhasil diperbarui!'

        this.openPopUp(title, message)
        this.isError = false
      } catch (error) {
        const title = 'Error!'
        this.isError = true
        console.log(error.message)
        this.openPopUp(title, error.response.data.message)
      } finally {
        this.isDisabled = false
      }
    }
  }
}
</script>

<style>
.v-input__icon.v-input__icon--prepend .v-icon {
  color: white;
}

</style>
