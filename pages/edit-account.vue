<template>
  <v-container class="py-10 px-5">
    <div class="pb-2 d-flex justify-space-between">
      <span class="custom-secondary--text text-h5 font-weight-bold">Perbarui Informasi Akun</span>
      <div>
        <router-link to="/account" class="custom-primary--text">
          <span class="text-subtitle-2 font-weight-bold">Batal</span>
        </router-link>
      </div>
    </div>
    <hr>
    <v-form>
      <v-row class="py-5">
        <v-col cols="12" sm="6" md="4" lg="4">
          <label for="fullname" class="custom-secondary--text font-weight-bold">Nama Lengkap</label>
          <v-text-field
            v-model="user.displayName"
            name="fullname"
            label="Nama Lengkap"
            type="text"
            outlined
            solo
          />
          <label for="email" class="custom-secondary--text font-weight-bold">Email</label>
          <v-text-field
            v-model="user.email"
            name="email"
            label="email"
            type="email"
            outlined
            solo
            @keyup="checkEmail"
          />
          <label for="phone" class="custom-secondary--text font-weight-bold">Nomor Telepon</label>
          <v-text-field
            v-model="user.phoneNumber"
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
                  name: 'account',
                  params: {
                    id: user.uid
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
  middleware: ['authenticated'],
  data () {
    return {
      dialog: false,
      isDisabled: false,
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
  computed: {
    user () {
      return { ...this.$store.state.auth.user }
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
    async onSubmit () {
      this.isDisabled = true

      try {
        await this.$api.put('/auth', {
          name: this.user.displayName,
          email: this.user.email,
          phoneNumber: this.user.phoneNumber
        })

        this.dialog = true
      } catch (error) {
        console.log(error)
      } finally {
        this.isDisabled = false
      }
    },
    closeDialog () {
      this.dialog = false
      this.$router.push('/account')
    }
  }
}
</script>
