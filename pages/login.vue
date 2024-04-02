<template>
  <v-container fluid fill-height class="align-stretch">
    <v-row>
      <v-col md="6">
        <v-container fluid fill-height>
          <v-img :src="require(`@/assets/images/${heroLoginImg}`)" />
        </v-container>
      </v-col>
      <v-col md="6" class="custom-primary">
        <v-container fluid fill-height>
          <v-row>
            <v-col md="8" offset-md="2">
              <v-card class="text-center px-3">
                <v-card-title class="mb-3 custom-primary--text text-h3 font-weight-medium justify-center">
                  Masuk
                </v-card-title>
                <v-card-text class="text-left">
                  <v-alert
                    v-if="isError"
                    class="red lighten-2 white--text"
                  >
                    {{ $t(message) }}
                  </v-alert>
                  <label for="email" class="custom-secondary--text font-weight-bold">Email</label>
                  <v-form>
                    <v-text-field
                      v-model="formData.email"
                      name="email"
                      label="email"
                      type="email"
                      outlined
                      solo
                    />
                    <label for="email" class="custom-secondary--text font-weight-bold">Password</label>
                    <v-text-field
                      v-model="formData.password"
                      name="password"
                      label="password"
                      type="password"
                      outlined
                      solo
                    />
                    <div class="text-right">
                      <span><a href="/login">
                        Lupa Password
                      </a></span>
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
                    <span>Belum punya akun? <a class="font-weight-black" href="/register">Daftar</a></span>
                  </div>

                <!-- <v-btn @click="storeWelcomeScreen"> -->
                  <!-- Store localStorage -->
                  <!-- </v-btn> -->
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'IndexPage',
  // middleware: ['unauthenticated'],
  data () {
    return {
      heroLoginImg: 'Sign In.jpg',
      isDisabled: false,
      isError: false,
      message: '',
      formData: {
        email: '',
        password: ''
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
        await signInWithEmailAndPassword(this.$auth, email, password)

        // store passed welcome screen
        if (!localStorage.welcomeScreen) {
          this.storeWelcomeScreen()
          this.$router.push('/register')
        }

        this.$router.push('/')
      } catch (error) {
        this.isError = true
        this.message = error.response.data.message
      } finally {
        this.isDisabled = false
      }
    },
    storeWelcomeScreen () {
      localStorage.setItem('welcomeScreen', true)
    }
  }
}
</script>
