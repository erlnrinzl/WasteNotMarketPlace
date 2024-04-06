<template>
  <v-container>
    <div class="mb-5">
      <v-tabs
        v-model="tabs"
        color="custom-primary"
      >
        <v-tab href="#tab-my-point" class="custom-secondary--text font-weight-bold">
          Point Saya
        </v-tab>
        <v-tab href="#tab-exchange-point" class="custom-secondary--text font-weight-bold">
          Tukar Poin
        </v-tab>
      </v-tabs>
    </div>

    <hr>

    <v-tabs-items
      v-model="tabs"
    >
      <v-tab-item :value="'tab-my-point'">
        <v-row>
          <v-col cols="12" md="4" lg="4">
            <div class="mr-10">
              <span class="custom-primary--text font-weight-bold text-h6">Total Point:</span>
              <span class="ml-3 custom-secondary--text font-weight-bold text-h6">{{ user.totalPoints }}</span>
            </div>
          </v-col>
          <v-col cols="12" md="4" lg="4" class="text-center">
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

        <div class="my-3">
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

        <hr class="my-3">
        <v-row>
          <v-col v-for="(coupon, index) in claimedCoupon" :key="index" cols="12" md="4" lg="4">
            <CardCoupon :coupon="coupon" @onclick="claimCoupon" />
          </v-col>
        </v-row>
      </v-tab-item>

      <v-tab-item :value="'tab-exchange-point'">
        <v-row>
          <v-col cols="12" md="4" lg="4">
            <div class="mr-10">
              <span class="custom-primary--text font-weight-bold text-h6">Total Point:</span>
              <span class="ml-3 custom-secondary--text font-weight-bold text-h6">{{ user.totalPoints }}</span>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(coupon, index) in availableCoupon" :key="index" cols="12" md="4" lg="4">
            <CardCoupon :coupon="coupon" @onclick="exchangeCoupon" />
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      tabs: null,
      user: {
        totalPoints: 0,
        wasteCollected: 0,
        nextLevelPoint: 0,
        progress: 0,
        level: ''
      },
      claimedCoupon: [
        {
          id: 1,
          name: 'Voucher E-Commerce Rp5.000',
          value: '5000',
          point: 100,
          expClaim: '27-7-2024',
          expUsed: '27-7-2024',
          isClaimed: true
        },
        {
          id: 2,
          name: 'Voucher E-Commerce Rp5.000',
          value: '5000',
          point: 100,
          expClaim: '27-7-2024',
          expUsed: '27-7-2024',
          isClaimed: true
        }
      ],
      availableCoupon: [
        {
          id: 1,
          name: 'Voucher E-Commerce Rp5.000',
          value: '5000',
          point: 100,
          expClaim: '27-7-2024',
          expUsed: '27-7-2024',
          isClaimed: false
        },
        {
          id: 4,
          name: 'Badge “Kesadaran Lingkungan”',
          value: '5000',
          point: 100,
          expClaim: '27-7-2024',
          expUsed: '27-7-2024',
          isClaimed: false
        }
      ]
    }
  },
  async mounted () {
    // fetch user coupon and available coupon

    const { data } = await this.$api.get('/auth')

    this.user.wasteCollected = data.wasteCollected
    this.user.totalPoints = data.totalPoints
    this.user.level = data.level.name
    this.user.nextLevelPoint = data.level.nextLevelPoint
    this.user.progress = Math.floor(data.totalPoints * 100 / data.level.nextLevelPoint)
  },
  methods: {
    claimCoupon (id) {
    // axios to claim coupon by coupon id
      console.log('claimCoupon id ', id)
    },
    exchangeCoupon (id) {
    // axios to exchange coupon by coupon id
      console.log('exchangeCoupon id ', id)
    }
  }
}
</script>

<style>
div.custom-border {
  border: 2px solid #00A699 !important;
  border-radius: 10px;
  padding: 5px;
}

</style>
