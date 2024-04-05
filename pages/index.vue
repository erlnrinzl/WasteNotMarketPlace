<template>
  <v-container fluid fill-height class="px-0 py-0">
    <v-responsive class="custom-secondary" min-height="90vh">
      <v-row class="py-14 custom-secondary">
        <v-col cols="10" offset="1">
          <v-card class="px-3 my-5" rounded="rounded-xl">
            <v-card-title>
              <span class="text-md-h4 text-h5 font-weight-bold">
                Kamu sudah mengumpulkan sampah sebanyak:
              </span>
            </v-card-title>
            <v-card-text>
              <div class="my-5 text-center">
                <span class="text-md-h2 text-h3 custom-primary--text font-weight-bold">{{ user.wasteCollected }}</span>
                <span class="ml-3 text-md-h2 text-h3 custom-secondary--text font-weight-bold">KG</span>
              </div>
              <div class="d-flex justify-end">
                <span><a href="/order" class="custom-primary--text font-weight-bold text-subtitle-1">Lihat Pesanan</a></span>
              </div>
              <hr>

              <v-row>
                <v-col sm="12" md="4" lg="4">
                  <div class="mr-10">
                    <span class="custom-primary--text font-weight-bold text-h6">Total Point:</span>
                    <span class="ml-3 custom-secondary--text font-weight-bold text-h6">{{ user.totalPoints }}</span>
                  </div>
                </v-col>
                <v-col sm="12" md="4" lg="4" class="text-center">
                  <div>
                    <div>
                      <span>Level Kamu</span>
                    </div>
                    <div>
                      <v-icon color="custom-primary font-weight-bold text-h6">
                        mdi-diamond
                      </v-icon>
                      <span class="custom-primary--text font-weight-bold text-h6">{{ user.level }}</span>
                    </div>
                  </div>
                </v-col>
              </v-row>

              <div class=" my-5">
                <v-progress-linear
                  :value="user.progress"
                  height="20"
                  color="custom-secondary"
                  rounded
                />
              </div>

              <div>
                <v-row>
                  <v-col md="3" sm="12" offset-md="9">
                    <div class="px-2 py-2 custom-border">
                      <div class="text-center">
                        <span class="ml-2 custom-secondary--text font-weight-bold text-h6 d-block">
                          {{ user.nextLevelPoint - user.totalPoints }} Point lagi
                        </span>
                        <span>Untuk naik ke level berikutnya!</span>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
            <hr>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>

    <v-responsive min-height="90vh" class="d-flex align-center">
      <v-row>
        <v-col sm="12" md="6" lg="6">
          <v-row>
            <v-col sm="12" md="10" offset-md="1">
              <v-img
                :src="require(`@/assets/images/Sign In.png`)"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col sm="12" md="6" lg="6">
          <v-container class="px-10 text-center" fill-height>
            <div>
              <div>
                <span class="custom-primary--text text-md-h2 text-h4 font-weight-bold">Pick Up</span>
              </div>
              <div class="my-5">
                <p class="text-md-h5 text-subtitle-1 font-weight-light text-right">
                  Layanan pickup adalah sebuah layanan di mana kamu dapat memilih jadwal yang tersedia untuk pengambilan barang-barang yang sudah tidak terpakai atau bekas di rumah anda
                </p>
              </div>
              <v-btn class="mx-5 my-4" color="custom-secondary" dark to="/pickup">
                <span class="mx-4">Mulai Pick Up</span>
                <v-icon>mdi-dolly</v-icon>
              </v-btn>
            </div>
          </v-container>
        </v-col>
      </v-row>
    </v-responsive>

    <v-responsive min-height="90vh" class="d-flex align-center custom-primary">
      <v-row class="custom-primary">
        <v-col sm="12" md="6" lg="6">
          <v-container class="px-10 text-center" fill-height>
            <div>
              <div class="mt-5 mb-3">
                <span class="white--text text-md-h2 text-h4 font-weight-bold">Deliver</span>
              </div>
              <div class="my-5">
                <p class="text-md-h5 text-subtitle-1 white--text font-weight-light text-left">
                  Layanan deliver adalah sebuah layanan di mana anda dapat mengirim barang anda ke lokasi dinas lingkungan yang diinginkan Anda
                </p>
              </div>
              <v-btn class="mx-5 my-4" color="custom-secondary" dark to="/deliver">
                <span class="mx-4">Mulai Deliver</span>
                <v-icon>mdi-hand-coin-outline</v-icon>
              </v-btn>
            </div>
          </v-container>
        </v-col>
        <v-col sm="12" md="6" lg="6">
          <v-row>
            <v-col sm="12" md="10" offset-md="1">
              <v-img
                :src="require(`@/assets/images/Sign In.png`)"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-responsive>

    <v-responsive height="90vh" class="d-flex align-center custom-secondary">
      <v-row class="custom-secondary">
        <v-col sm="12" md="7">
          <v-img
            :src="require(`@/assets/images/mockup.png`)"
            absolute
          />
        </v-col>
        <v-col sm="12" md="5">
          <v-container class="px-10 text-center outer-container" fill-height>
            <div class="hidden-lg-and-up">
              <span class="white--text text-md-h2 text-h4 font-weight-bold">Tertarik menampilkan produk hasil daur ulang anda di website kami?</span>
              <v-btn class="mx-5 mt-5" color="custom-primary" dark to="/about-us">
                <span class="mx-4">Hubungi Kami</span>
                <v-icon>mdi-phone</v-icon>
              </v-btn>
            </div>
            <div class="inner-container hidden-md-and-down">
              <div class="mt-5 mb-3">
                <span class="white--text text-h4 font-weight-bold">Tertarik menampilkan produk hasil daur ulang anda di website kami?</span>
              </div>
              <v-btn class="mx-5 mt-5" color="custom-primary" dark to="/about-us">
                <span class="mx-4">Hubungi Kami</span>
                <v-icon>mdi-phone</v-icon>
              </v-btn>
            </div>
          </v-container>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: ['authenticated'],
  data () {
    return {
      user: {
        totalPoints: 0,
        wasteCollected: 0,
        nextLevelPoint: 0,
        progress: 0,
        level: ''
      }
    }
  },
  async mounted () {
    const { data } = await this.$api.get('/auth')

    this.user.wasteCollected = data.wasteCollected
    this.user.totalPoints = data.totalPoints
    this.user.level = data.level.name
    this.user.nextLevelPoint = data.level.nextLevelPoint
    this.user.progress = Math.floor(data.totalPoints * 100 / data.level.nextLevelPoint)
  }
}
</script>

<style>
div.custom-border {
  border: 2px solid #00A699 !important;
  border-radius: 10px; /* Mengatur border menjadi bulat dengan radius 10px */
  padding: 5px;
}

div.outer-container {
  position: relative;
}

div.inner-container {
  position: absolute;
  left: -40vh;
  top: 20vh;
}
</style>
