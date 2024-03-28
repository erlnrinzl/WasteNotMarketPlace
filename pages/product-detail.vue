<template>
  <v-row class="my-5">
    <v-col md="6">
      <v-container class="px-10 py-5">
        <v-row>
          <v-col md="8" offset-md="2">
            <v-img
              :src="require(`@/assets/images/${changePreview}`)"
            />
          </v-col>
        </v-row>
        <hr class="my-5">
        <div>
          <v-row>
            <v-col v-for="(image, index) in product.photos" :key="index" cols="3">
              <v-img
                :src="require(`@/assets/images/${image}`)"
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
            v-for="market in product.seller.marketPlace"
            :key="market.id"
            rounded
            :class="market.name.toLowerCase() + ' pr-0 mr-2'"
            dark
            :to="market.to"
          >
            {{ market.name }}
            <div class="icon-round ml-3">
              <v-icon right class="inner-icon mx-0" :class="market.name.toLowerCase() + '-icon'">
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
  data () {
    return {
      selectedImage: 0,
      product: {
        id: 4,
        name: 'Tempat ATK',
        seller: {
          name: 'Eggan OY',
          marketPlace: [
            {
              id: 1,
              name: 'Shopee',
              to: ''
            },
            {
              id: 2,
              name: 'Tokopedia',
              to: ''
            },
            {
              id: 3,
              name: 'Lazada',
              to: ''
            }
          ]
        },
        thumbnail: 'Tempat ATK.jpg',
        description: 'Lampu tidur dari sendok plastik adalah inovasi kreatif yang terbuat dari daur ulang bahan bekas, memberikan pencahayaan lembut dan suasana nyaman di ruangan. Desainnya yang ramah lingkungan dan unik membuatnya menjadi pilihan hiasan dekoratif yang menarik di rumah.',
        photos: [
          'Tempat ATK.jpg',
          'Lampu Sendok 1.jpg'
        ],
        price: 150000
      }

    }
  },
  computed: {
    changePreview () {
      return this.product.photos[this.selectedImage]
    }
  },
  mounted () {
    try {
      // this.product = products.filter(product => product.id === this.$route.params.id)
    } catch (error) {
      // console.error(error)
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
