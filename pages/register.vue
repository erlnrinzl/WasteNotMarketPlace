<template>
  <v-container class="custom-primary" fluid fill-height>
    <v-row>
      <v-col md="4" offset-md="4">
        <v-card class="text-center px-3">
          <v-card-title class="mb-3 custom-primary--text text-h3 font-weight-medium justify-center">
            Daftar
          </v-card-title>
          <v-card-text class="text-left">
            <v-alert
              v-if="isError"
              class="red lighten-2 white--text"
            >
              {{ $t(message) }}
            </v-alert>
            <label for="fullname" class="custom-secondary--text font-weight-bold">Nama Lengkap</label>
            <v-form>
              <v-text-field
                v-model="formData.email"
                name="fullname"
                label="Nama Lengkap"
                type="text"
                outlined
                solo
              />
              <label for="radioGender" class="custom-secondary--text font-weight-bold">Jenis Kelamin</label>
              <v-radio-group
                v-model="formData.gender"
                mandatory
                name="radioGender"
              >
                <v-radio
                  label="Laki-laki"
                  value="male"
                />
                <v-radio
                  label="Perempuan"
                  value="female"
                />
              </v-radio-group>
              <label for="phone" class="custom-secondary--text font-weight-bold">Nomor Telepon</label>
              <v-form>
                <v-text-field
                  v-model="formData.phone"
                  name="phone"
                  label="Nomor Telepon"
                  type="phone"
                  outlined
                  solo
                />
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
                  <label for="password" class="custom-secondary--text font-weight-bold">Password</label>
                  <v-text-field
                    v-model="formData.password"
                    name="password"
                    label="password"
                    type="password"
                    outlined
                    solo
                  />
                  <label for="repassword" class="custom-secondary--text font-weight-bold">Konfirmasi Password</label>
                  <v-text-field
                    v-model="formData.rePassword"
                    name="repassword"
                    label="password"
                    type="password"
                    outlined
                    solo
                  />
                </v-form>
              </v-form>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-block">
            <v-spacer />
            <v-btn color="custom-secondary" dark block @click="onSubmit">
              <span v-if="!isDisabled">
                Daftar
              </span>
              <v-progress-circular v-else color="custom-secondary" indeterminate />
            </v-btn>
            <div class="text-center my-3">
              <span>Sudah punya akun? <a class="font-weight-black" href="/login">Masuk</a></span>
            </div>

          <!-- <v-btn @click="storeWelcomeScreen"> -->
            <!-- Store localStorage -->
            <!-- </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      heroLoginImg: 'Sign In.jpg',
      isDisabled: false,
      isError: false,
      message: '',
      formData: {
        name: '',
        gender: '',
        phone: '',
        email: '',
        password: '',
        rePassword: ''
      }
    }
  }
}
</script>
