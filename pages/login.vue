<template>
  <v-container fluid fill-height class="align-stretch">
    <v-row>
      <v-col cols="12" md="6" lg="6">
        <v-container fluid fill-height>
          <v-img :src="require(`@/assets/images/${heroLoginImg}`)" />
        </v-container>
      </v-col>
      <v-col cols="12" md="6" lg="6" class="custom-primary">
        <v-container fluid fill-height>
          <v-row>
            <v-col md="8" offset-md="2">
              <v-snackbar
                v-model="showToast"
                :timeout="4000"
                :color="isError ? 'red lighten-1' : 'custom-primary'"
                outlined
                elevation="24"
                top
                center
              >
                {{ errorMessage }}
              </v-snackbar>
              <v-card class="text-center px-3">
                <v-card-title class="mb-3 custom-primary--text text-h3 font-weight-bold justify-center">
                  Masuk
                </v-card-title>
                <v-card-text class="text-left">
                  <label for="email" class="custom-secondary--text font-weight-bold">Email</label>
                  <v-form>
                    <v-text-field
                      v-model="formData.email"
                      :rules="rules.email"
                      name="email"
                      label="email"
                      type="email"
                      outlined
                      solo
                    />
                    <label for="email" class="custom-secondary--text font-weight-bold">Password</label>
                    <v-text-field
                      v-model="formData.password"
                      :rules="rules.password"
                      name="password"
                      label="password"
                      type="password"
                      outlined
                      solo
                    />
                    <div class="text-right">
                      <v-btn text small color="primary" @click="forgetPassword">
                        <span>Lupa Password</span>
                      </v-btn>
                    </div>
                  </v-form>
                </v-card-text>
                <v-card-actions class="d-block px-4">
                  <v-spacer />
                  <v-btn color="custom-secondary" dark block @click="onSubmit">
                    <span v-if="!isDisabled">
                      Login
                    </span>
                    <v-progress-circular v-else color="custom-secondary" indeterminate />
                  </v-btn>
                  <div class="text-center my-3">
                    <span>Belum punya akun? <v-btn class="font-weight-black" color="primary" to="/register" text small>Daftar</v-btn></span>
                  </div>
                </v-card-actions>
              </v-card>
              <!-- <v-btn @click="snackbar = !snackbar">
                click me
              </v-btn> -->
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'

export default {
  name: 'IndexPage',
  middleware: ['unauthenticated'],
  data () {
    return {
      heroLoginImg: 'Sign In.png',
      message: '',
      formData: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          v => !!v || 'Email is required!',
          v => /.+@.+/.test(v) || 'Invalid email!'
        ],
        password: [
          v => !!v || 'Password is required!',
          v => v.length >= 6 || 'Password must be at least 6 characters!'
        ]
      },
      isError: false,
      showToast: false,
      errorMessage: '',
      isDisabled: false
    }
  },
  mounted () {
    if (this.$route.params.message === 'AUTH_REQUIRED') {
      this.isError = true
      this.message = this.$route.params.message
    }
  },
  methods: {
    async onSubmit () {
      this.isDisabled = true

      try {
        const { email, password } = this.formData

        await signInWithEmailAndPassword(this.$fire.auth, email, password)
        this.isError = false
        this.$router.go('/')
      } catch (error) {
        this.isError = true
        this.errorMessage = error.code
        this.showToast = true
      } finally {
        this.isDisabled = false
      }
    },
    async forgetPassword () {
      try {
        const { email } = this.formData
        await sendPasswordResetEmail(this.$fire.auth, email)
        this.isError = false
        this.errorMessage = 'The reset link sent to ' + email
        this.showToast = true
      } catch (error) {
        this.isError = true
        this.errorMessage = error.response.data.message
        this.showToast = true
      }
    },
    storeWelcomeScreen () {
      localStorage.setItem('welcomeScreen', true)
    }
  }
}
</script>
