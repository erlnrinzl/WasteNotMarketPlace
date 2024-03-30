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
            <v-col cols="1">
              <span class="rounded-lg py-3 px-5 text-h6 custom-primary white--text">
                1
              </span>
            </v-col>
            <v-col cols="11">
              <span class="text-h6 white--text">Lengkapi Form Berikut</span>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col md="5" class="px-10">
        <v-container class="ml-5">
          <label for="product-name" class="white--text font-weight-bold">Nama Produk</label>
          <v-text-field
            v-model="formData.name"
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
            name="product-price"
            label="Harga Produk"
            type="text"
            class="mt-3"
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
        </v-container>
      </v-col>

      <v-col md="7" class="px-10">
        <v-container>
          <label for="product-image" class="white--text font-weight-bold">Gambar Produk</label>
          <v-file-input
            v-model="selectedFile"
            name="product-image"
            label="Gambar Produk"
            prepend-icon="mdi-camera"
            class="mt-3"
            accept="image/*"
            outlined
            solo
            @change="onFileChange"
          />
          <v-row>
            <v-col>
              <v-img
                v-if="imageUrl"
                :src="imageUrl"
                width="200"
                height="200"
                contain
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col cols="2" offset-md="5" class="mb-10">
        <v-btn class="custom-primary" block>
          <span>
            Kirim
          </span>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data () {
    return {
      formName: 'Unggah Produk',
      formData: {
        name: '',
        price: 0,
        description: '',
        shopee: '',
        tokopedia: '',
        lazada: ''
      },
      selectedFile: null,
      imageUrl: ''
    }
  },
  methods: {
    onFileChange (event) {
      this.selectedFile = event.target.files[0]
      this.previewImage()
    },
    previewImage () {
      const reader = new FileReader()
      reader.readAsDataURL(this.selectedFile)
      reader.onload = (e) => {
        this.imageUrl = e.target.result
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
