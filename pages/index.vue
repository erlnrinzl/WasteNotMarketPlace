<template>
  <v-container fluid fill-height class="custom-secondary">
    <v-row>
      <v-col md="10" offset-md="1">
        <v-card class="px-3" rounded="rounded-xl">
          <v-card-title>
            <span class="text-h4 font-weight-bold">
              Kamu sudah mengumpulkan sampah sebanyak:
            </span>
          </v-card-title>
          <v-card-text>
            <div class="my-5 text-center">
              <span class="text-h2 custom-primary--text font-weight-bold">{{ user.weightCollected }}</span>
              <span class="ml-3 text-h2 custom-secondary--text font-weight-bold">KG</span>
            </div>
            <div class="d-flex justify-end">
              <span><a href="/order" class="custom-primary--text font-weight-bold text-subtitle-1">Lihat Pesanan</a></span>
            </div>
            <hr>

            <v-row>
              <v-col cols="4">
                <div class="mr-10">
                  <span class="custom-primary--text font-weight-bold text-h6">Total Point:</span>
                  <span class="ml-3 custom-secondary--text font-weight-bold text-h6">{{ user.point }}</span>
                </div>
              </v-col>
              <v-col cols="4" class="text-center">
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
              <v-col cols="4" />
            </v-row>

            <div class=" my-5">
              <v-progress-linear
                value="15"
                height="20"
                color="custom-secondary"
                rounded
              />
            </div>

            <div>
              <v-row>
                <v-col cols="3" offset-md="9">
                  <div class="px-2 py-2 custom-border">
                    <div class="text-center">
                      <span class="ml-2 custom-secondary--text font-weight-bold text-h6 d-block">
                        {{ user.targetPoint - user.point }}
                      </span>
                      <span class="custom-secondary--text font-weight-bold text-h6 d-block">Point Lagi</span>
                      <span>Dapatkan voucher E-Commerce sebesar 5K</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <hr>
        </v-card>

        <div class="my-5 text-center">
          <p class="white--text text-h5 font-weight-bold">
            Sudah siap menyalurkan sampah lagi?
          </p>
          <v-btn class="mx-5" color="custom-primary" dark>
            <span class="mx-4">Mulai Pick Up</span>
            <v-icon>mdi-dolly</v-icon>
          </v-btn>
          <v-btn class="mx-5" color="custom-primary" dark>
            <span class="mx-4">Mulai Deliver</span>
            <v-icon>mdi-hand-coin-outline</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      user: {
        point: 250,
        weightCollected: 14.5,
        level: 'Level 1',
        targetPoint: 500
      }
    }
  }
}
</script>

<style>
div.custom-border {
  border: 2px solid #00A699 !important;
  border-radius: 10px; /* Mengatur border menjadi bulat dengan radius 10px */
  padding: 5px;
}
</style>
