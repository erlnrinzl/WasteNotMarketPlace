<template>
  <v-carousel
    cycle
    height="710"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item v-for="(slide, index) in slides" :key="index">
      <v-sheet
        :color="'custom-primary'"
        height="100%"
      >
        <v-row
          class="fill-height"
          justify="center"
          align="center"
        >
          <v-col
            xs="12"
            m="7"
            class="pl-10"
          >
            <v-container class="px-10">
              <h2 class="text-h4 white--text font-weight-bold mb-5 p-5">
                {{ slide.title }}
              </h2>
              <v-spacer />
              <p class="text-h5 white--text font-weight-light p-3">
                {{ slide.description }}
              </p>
            </v-container>
          </v-col>
          <v-col
            xs="12"
            m="5"
          >
            <v-container class="p-10">
              <v-img
                :src="require(`@/assets/images/${slide.image}`)"
                max-height="442"
                max-width="442"
                class="rounded-xxl"
              />
            </v-container>
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data () {
    return {
      slides: [
        {
          title: 'Mengubah Sampah untuk Lingkungan yang Lebih Baik',
          description: 'Selamat datang di Waste Not! Kami adalah platform inovatif yang menghubungkan Anda dengan Dinas Lingkungan dan pengrajin lokal untuk menciptakan lingkungan kita yang lebih hijau dan berkelanjutan',
          image: 'Landing 1.jpg'
        },
        {
          title: 'Memenuhi SDGs untuk Masa Depan yang Lebih Hijau',
          description: 'Kami hadir sebagai solusi inovatif yang membantu mewujudkan beberapa tujuan utama Suistanable Development Goals.',
          image: 'Landing 2.jpg'
        },
        {
          title: 'Jalur Terpadu menuju Pengelolaan Sampah yang Efisien.',
          description: 'Dengan fokus pada tiga fitur utama kami: Pick-up, Deliver, dan Marketplace, kami menciptakan solusi terpadu untuk mengelola dan mendaur ulang sampah Anda dengan lebih efisien.',
          image: 'Landing 3.jpg'
        }
      ]
    }
  }
}
</script>
