<template>
  <div>
    <CarouselBanner />
    <v-container class="d-flex justify-center">
      <div class="my-16">
        <div class="mt-16 text-center">
          <h2 class="text-h2 font-weight-bold">
            Pencapaian
          </h2>
        </div>
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
    </v-container>
    <div class="custom-secondary py-1">
      <v-container class="py-16">
        <div class="text-center">
          <h3 class="white--text text-h3 font-weight-medium">
            Jenis Sampah
          </h3>
        </div>
        <v-row class="my-7 d-flex justify-center">
          <v-col v-for="(item, index) in wastes" :key="index" class="text-center px-16 mx-2">
            <span class="text-h4 white--text">{{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }}</span>
          </v-col>
        </v-row>
      </v-container>
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
          image: ''
        },
        {
          name: 'kardus',
          image: ''
        },
        {
          name: 'Plastik',
          image: ''
        },
        {
          name: 'kaleng',
          image: ''
        },
        {
          name: 'kain',
          image: ''
        }
      ]
    }
  }
}
</script>
