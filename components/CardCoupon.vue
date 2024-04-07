<template>
  <v-card
    outlined
    :rounded="'rounded-xl'"
  >
    <v-row class="pa-2">
      <v-col cols="8" class="d-flex justify-space-between">
        <div class="px-2 coupon-wrapper">
          <div class="coupon-title-wrapper">
            <p class="mb-1 text-subtitle-2 font-weight-bold">
              {{ coupon.name }}
            </p>
          </div>
          <div v-if="!coupon.isClaimed" class="d-flex justify-end">
            <p class="mb-0 custom-primary--text text-caption font-weight-bold">
              {{ coupon.point + ' Poin' }}
            </p>
          </div>
        </div>
        <v-divider vertical />
      </v-col>
      <v-col cols="4" class="text-center">
        <div v-if="coupon.isClaimed">
          <p class="mb-1 text-caption">
            Tanggal Exp
          </p>
          <p class="mb-1 text-caption font-weight-bold">
            {{ coupon.expUsed }}
          </p>
          <v-btn
            color="custom-primary"
            x-small
            dark
            block
            @click="onClickBtn"
          >
            Klaim
          </v-btn>
        </div>
        <div v-else>
          <p class="mb-1 text-caption">
            Sampai Dengan
          </p>
          <p class="mb-1 text-caption font-weight-bold">
            {{ coupon.expClaim }}
          </p>
          <v-btn
            color="custom-primary"
            x-small
            dark
            block
            @click="onClickBtn"
          >
            Tukar
          </v-btn>
        </div>
      </v-col>
      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="custom-secondary">
            <v-container>
              <div class="text-center">
                <v-icon class="text-h1 white--text">
                  mdi-check
                </v-icon>
              </div>
              <div class="text-center">
                <p class="text-h6 white--text">
                  Berhasil {{ coupon.isClaimed ? 'Diklaim' : 'Ditukarkan' }}
                </p>
              </div>
            </v-container>
          </v-card-title>
          <v-card-text class="py-2">
            <div class="text-center">
              Detail Voucher sudah dikirimkan ke email anda!
            </div>
          </v-card-text>
          <v-card-actions class="pb-3 justify-center">
            <v-btn
              color="custom-primary"
              small
              dark
              @click="dialog = false"
            >
              Tutup
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    coupon: {
      type: Object,
      default () {
        return {
          id: null,
          name: '',
          value: 0,
          point: 0,
          expClaim: '',
          expUsed: '',
          isClaimed: false
        }
      }
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    onClickBtn () {
      this.dialog = true
      this.$emit('onclick', this.coupon.id)
    }
  }
}
</script>

<style>
.coupon-wrapper {
  width: 100%;
}

.coupon-title-wrapper {
  min-height: 3rem;
}
</style>
