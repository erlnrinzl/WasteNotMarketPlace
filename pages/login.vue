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
                v-model="snackbar"
                :timeout="4000"
                color="custom-primary"
                outlined
                elevation="24"
                top
                center
              >
                {{ snackbarText }}
              </v-snackbar>
              <v-card class="text-center px-3">
                <v-card-title class="mb-3 custom-primary--text text-h3 font-weight-bold justify-center">
                  Masuk
                </v-card-title>
                <v-card-text class="text-left">
                  <v-alert
                    v-if="isError"
                    class="red lighten-2 white--text"
                  >
                    {{ message }}
                  </v-alert>
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
              <v-btn @click="snackbar = !snackbar">
                click me
              </v-btn>
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
      heroLoginImg: 'Sign In.jpg',
      isDisabled: false,
      isError: false,
      snackbar: false,
      snackbarText: '',
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
      }
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
        this.$router.push('/')
      } catch (error) {
        console.log('the error is', error)
        console.log('the error response is', error.response)
        this.snackbar = true
        this.snackbarText = 'error messages'

        // this.message = error.response.data.message
      } finally {
        this.isDisabled = false
      }
    },
    async forgetPassword () {
      try {
        const { email } = this.formData
        await sendPasswordResetEmail(this.$fire.auth, email)
      } catch (error) {
        this.isError = true
        this.message = error.response.data.message
      }
    },
    storeWelcomeScreen () {
      localStorage.setItem('welcomeScreen', true)
    }
  }
}
</script>
