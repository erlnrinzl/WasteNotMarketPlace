<template>
  <v-app dark>
    <v-app-bar app>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-carousel
      cycle
      height="710"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(slide, index) in slides" :key="index">
        <v-sheet
          :color="colors[0]"
          height="100%"
        >
          <v-row
            class="fill-height"
            justify="center"
            align="center"
          >
            <v-col
              cols="7"
              class="pl-10"
            >
              <v-container class="px-10">
                <h2 class="text-h4 mb-5 p-5">
                  Mengubah Sampah untuk Lingkungan yang Lebih Baik
                </h2>
                <v-spacer />
                <p class="text-h5 font-weight-light p-3">
                  Selamat datang di Waste Not! Kami adalah platform inovatif yang menghubungkan Anda dengan Dinas Lingkungan dan pengrajin lokal untuk menciptakan lingkungan kita yang lebih hijau dan berkelanjutan
                </p>
              </v-container>
            </v-col>
            <v-col
              cols="5"
            >
              <img :src="imageSrc" alt="Carousel Image" class="d-block w-100">
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      imageSrc: '.assets/images/Landing 1',
      title: 'WasteNot',
      colors: [
        'primary'
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth'
      ]
    }
  }
}
</script>
