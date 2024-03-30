<template>
  <v-container class="py-10 px-5">
    <div class="pb-2 d-flex justify-space-between">
      <span class="custom-secondary--text text-h5 font-weight-bold">Perbarui Informasi Akun</span>
      <div>
        <a class="custom-primary--text" href="/account">
          <span class="text-subtitle-2 font-weight-bold">Batal</span>
        </a>
      </div>
    </div>
    <hr>
    <v-form>
      <v-row class="py-5">
        <v-col cols="4">
          <label for="fullname" class="custom-secondary--text font-weight-bold">Nama Lengkap</label>
          <v-text-field
            v-model="userData.email"
            name="fullname"
            label="Nama Lengkap"
            type="text"
            outlined
            solo
          />
          <label for="email" class="custom-secondary--text font-weight-bold">Email</label>
          <v-text-field
            v-model="userData.email"
            name="email"
            label="email"
            type="email"
            outlined
            solo
            @keyup="checkEmail"
          />
          <label for="phone" class="custom-secondary--text font-weight-bold">Nomor Telepon</label>
          <v-text-field
            v-model="userData.phone"
            name="phone"
            label="Nomor Telepon"
            type="phone"
            outlined
            solo
          />
          <v-row>
            <v-col cols="6">
              <v-btn
                :to="{
                  name: 'product-detail',
                  params: {
                    id: userData.id
                  }
                }"
                class="custom-primary--text mr-3"
                block
              >
                Batal
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn color="custom-secondary" dark block @click="onSubmit">
                <span v-if="!isDisabled">
                  Submit
                </span>
                <v-progress-circular v-else color="custom-secondary" indeterminate />
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>

    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card class="py-5 custom-primary text-center">
        <div class="px-16">
          <v-icon class="text-h1" dark>
            mdi-check-circle-outline
          </v-icon>
          <v-card-title class="px-10 text-h5 white--text">
            Informasi Sukses Diperbarui
          </v-card-title>
        </div>
        <v-card-actions class="justify-center">
          <v-btn
            color="custom-secondary"
            dark
            @click="dialog = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      isDisabled: false,
      userData: {
        id: '',
        name: 'Calvin Andrew Widjaja',
        email: 'calvin043@gmail.com',
        phone: '081296112422'
      },
      rules: {
        name: [
          v => !!v || 'Masukan nama lengkap anda!'
        ],
        phone: [
          v => !!v || 'Masukan nomor telepon anda!'
        ],
        email: [
          v => !!v || 'Email is wajib diisi!',
          v => /.+@.+/.test(v) || 'Email salah!',
          v => !!this.emailExist || 'Email telah terdaftar'
        ]
      }
    }
  },
  methods: {
    checkEmail () {
      // this.$axios.$post('url', this.formData.email)
      //   .then((response) => {
      //     this.emailExist = false
      //   }).catch((error) => {
      //     console.error(error)
      //     this.emailExist = true
      //   })
    },
    onSubmit () {
      this.isDisabled = true
      // this.$axios.$post('url', this.userData).then((response) => {
      //   console.log(response)
      //   this.isDisabled = false
      //   this.dialog = true
      // }).catch((error) => {
      //   this.isDisabled = false
      //   console.error(error)
      // })
    },
    closeDialog () {
      this.dialog = false
      this.$router.push('/account')
    }
  }
}
</script>
