<template>
  <v-container class="custom-primary" fluid fill-height>
    <v-row>
      <v-col md="4" offset-md="4">
        <v-card class="text-center px-3">
          <v-snackbar
            v-model="showToast"
            :timeout="4000"
            color="red lighten-1"
            outlined
            elevation="24"
            top
            center
          >
            {{ errorMessage }}
          </v-snackbar>
          <v-form>
            <v-card-title class="mb-3 custom-primary--text text-h3 font-weight-medium justify-center">
              Daftar
            </v-card-title>
            <v-card-text class="text-left">
              <label for="fullname" class="custom-secondary--text font-weight-bold">Nama Lengkap</label>
              <v-text-field
                v-model="formData.name"
                :rules="rules.name"
                name="fullname"
                label="Nama Lengkap"
                type="text"
                outlined
                solo
              />
              <label for="radio_gender" class="custom-secondary--text font-weight-bold">Jenis Kelamin</label>
              <v-radio-group
                v-model="formData.gender"
                mandatory
                name="radio_gender"
              >
                <v-radio
                  label="Laki-Laki"
                  value="Laki Laki"
                />
                <v-radio
                  label="Perempuan"
                  value="Perempuan"
                />
              </v-radio-group>
              <label for="phone" class="custom-secondary--text font-weight-bold">Nomor Telepon</label>
              <v-form>
                <v-text-field
                  v-model="formData.phone"
                  :rules="rules.phone"
                  name="phone"
                  label="Nomor Telepon"
                  type="phone"
                  outlined
                  solo
                >
                  <span
                    slot="prepend"
                    class="text-body-1 font-weight-regular"
                  >
                    +62
                  </span>
                </v-text-field>
                <label for="email" class="custom-secondary--text font-weight-bold">Email</label>
                <v-text-field
                  v-model="formData.email"
                  :rules="rules.email"
                  name="email"
                  label="email"
                  type="email"
                  outlined
                  solo
                  @keyup="checkEmail"
                />
                <label for="password" class="custom-secondary--text font-weight-bold">Password</label>
                <v-text-field
                  v-model="formData.password"
                  :rules="rules.password"
                  name="password"
                  label="password"
                  type="password"
                  outlined
                  solo
                />
                <label for="retype_Password" class="custom-secondary--text font-weight-bold">Konfirmasi Password</label>
                <v-text-field
                  v-model="formData.retype_Password"
                  :rules="rules.retype_Password"
                  name="retype_Password"
                  label="password"
                  type="password"
                  outlined
                  solo
                />
              </v-form>
            </v-card-text>
            <v-card-actions class="d-block px-4">
              <v-spacer />
              <v-btn color="custom-secondary" dark block @click="onSubmit">
                <span v-if="!isDisabled">
                  Daftar
                </span>
                <v-progress-circular v-else color="custom-secondary" indeterminate />
              </v-btn>
              <div class="text-center my-3">
                <span>Sudah punya akun? <v-btn class="font-weight-black" to="/login" color="primary" text small>Masuk</v-btn></span>
              </div>

            <!-- <v-btn @click="storeWelcomeScreen"> -->
            <!-- Store localStorage -->
            <!-- </v-btn> -->
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
      <PopUp
        :color="isError ? 'red darken-1' : 'custom-secondary'"
        :icon="isError ? 'mdi-close' : 'mdi-check'"
        :show="dialog"
        :title="popUpTitle"
        :message="popUpMessage"
        @close="closePopUpRedirect"
      />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: ['unauthenticated'],
  data () {
    return {
      emailExist: false,
      message: '',
      formData: {
        name: '',
        gender: '',
        phone: '',
        email: '',
        password: '',
        retype_Password: ''
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
          v => /.+@.+/.test(v) || 'Email salah!'
        ],
        password: [
          v => !!v || 'Password is required!',
          v => v.length >= 6 || 'Password minimal 6 characters!'
        ],
        retype_Password: [
          v => !!v || 'Re-type your password!',
          v => v === this.formData.password || 'Re-password harus identik dengan Password!'
        ]
      },
      isError: false,
      showToast: false,
      errorMessage: '',
      isDisabled: false,
      dialog: false,
      popUpTitle: '',
      popUpMessage: ''
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
    closePopUpRedirect () {
      this.dialog = false
      if (this.isError) {
        this.isError = false
      } else {
        this.$router.push('/login')
      }
    },
    async onSubmit () {
      this.isDisabled = true
      try {
        const { email, password, phone, name, retype_Password: confirmPassword, gender } = this.formData
        const phoneNumber = `+62${phone}`
        await this.$api.post('/auth/register', { name, email, password, phoneNumber, confirmPassword, gender })

        this.isError = false
        this.popUpTitle = 'Sukses!'
        this.popUpMessage = `akun ${email} telah berhasil dibuat, silahkan login`
        this.dialog = true
      } catch (error) {
        this.isError = true
        this.errorMessage = error.response.data.message
        this.showToast = true
      } finally {
        this.isDisabled = false
      }
    }
  }
}
</script>
