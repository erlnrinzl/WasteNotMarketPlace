<template>
  <div>
    <CarouselBanner id="about-us" />

    <!-- Divider -->

    <v-container id="achievement" class="d-flex justify-center">
      <v-responsive min-height="90vh" class="d-flex align-center">
        <div class="my-16">
          <v-container class="mt-16 text-center">
            <span class="text-h3 font-weight-bold">
              Pencapaian
            </span>
          </v-container>
          <v-row class="my-16 d-flex justify-center">
            <v-col
              v-for="(item, index) in achievements"
              :key="index"
              class="text-center px-16 mx-2"
            >
              <div class="mb-6">
                <span class="text-h2 font-weight-medium custom-primary--text">{{ item.title }}</span>
              </div>
              <div>
                <p>{{ item.description }}</p>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-responsive>
    </v-container>

    <!-- Divider -->
    <div id="our-services">
      <v-responsive min-height="90vh" class="custom-secondary d-flex align-center">
        <div class="pb-10">
          <div class="my-5 text-center">
            <h3 class="white--text text-h3 font-weight-bold">
              Layanan Unggulan Kami
            </h3>
          </div>
          <div>
            <v-row class="mt-10 px-10 justify-center">
              <v-col
                v-for="(item, index) in services"
                :key="index"
                outlined
                cols="12"
                sm="12"
                md="4"
                lg="4"
              >
                <v-card height="100%" class="pt-3">
                  <v-img
                    :src="require(`@/assets/images/${item.image}`)"
                    height="20vh"
                    contain
                  />
                  <v-card-title class="justify-center">
                    {{ item.name }}
                  </v-card-title>
                  <v-card-text class="text-center">
                    {{ item.description }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-responsive>
    </div>
  </div>
</template>

<script>
import CarouselBanner from '../components/CarouselBanner.vue'

export default {
  name: 'IndexPage',
  components: {
    CarouselBanner
  },
  // middleware: ['unauthenticated'],
  data () {
    return {
      achievements: [
        {
          title: '5 Ton+',
          description: 'Sampah yang berhasil dikumpulkan melalui WasteNot'
        },
        {
          title: '150+',
          description: 'Dinas lingkungan yang telah bekerja sama dengan WasteNot dan telah merasakan manfaatnya'
        },
        {
          title: '50rb+',
          description: 'Pengguna yang telah berpartisipasi menyalurkan sampah daur ulang mereka melalui WasteNot'
        }
      ],
      wastes: [
        {
          name: 'kertas',
          image: 'kertas.png'
        },
        {
          name: 'kardus',
          image: 'kardus.png'
        },
        {
          name: 'plastik',
          image: 'botol.png'
        },
        {
          name: 'kaleng',
          image: 'kaleng.png'
        },
        {
          name: 'kain',
          image: 'kain.png'
        }
      ],
      services: [
        {
          name: 'Pick Up',
          image: 'pickup logo.png',
          description: 'Layanan pickup adalah opsi untuk memilih jadwal pengambilan barang bekas di rumah Anda.'
        },
        {
          name: 'Deliver',
          image: 'deliver logo.png',
          description: 'Layanan deliver adalah opsi untuk mengirim barang Anda ke lokasi dinas lingkungan yang Anda inginkan.'
        },
        {
          name: 'Marketplace',
          image: 'marketplace logo.png',
          description: 'Layanan marketplace menampilkan produk-produk hasil daur ulang dari berbagai penjual.'
        }
      ]
    }
  }
}
</script>
