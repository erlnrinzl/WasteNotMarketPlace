<template>
  <v-container class="py-10 px-5">
    <v-row class="pb-2">
      <v-col cols="12" md="8" lg="8">
        <span class="custom-secondary--text text-h5 font-weight-bold">Informasi Akun</span>
      </v-col>
      <v-col cols="6" sm="6" md="2" lg="2">
        <div>
          <router-link to="/edit-account" class="custom-primary--text">
            <span class="text-subtitle-2 font-weight-bold">Perbarui Akun</span>
          </router-link>
        </div>
      </v-col>
      <v-col cols="6" sm="6" md="2" lg="2">
        <v-btn
          color="custom-primary"
          block
          dark
          small
          @click="logout"
        >
          Log Out
        </v-btn>
      </v-col>
    </v-row>
    <hr>

    <v-list>
      <v-list-item dense>
        <v-list-item-content class="py-1">
          <v-list-item-title>
            <div class="mt-3">
              <p class="mb-0 custom-secondary--text text-h6 font-weight-bold">
                Nama Lengkap
              </p>
              <span class="text-subtitle-1">{{ userData.displayName }}</span>
            </div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item dense>
        <v-list-item-content class="py-1">
          <v-list-item-title>
            <div class="mt-3">
              <p class="mb-0 custom-secondary--text text-h6 font-weight-bold">
                Email
              </p>
              <span class="text-subtitle-1">{{ userData.email }}</span>
            </div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item dense>
        <v-list-item-content class="py-1">
          <v-list-item-title>
            <div class="mt-3">
              <p class="mb-0 custom-secondary--text text-h6 font-weight-bold">
                Nomor Telepon
              </p>
              <span class="text-subtitle-1">{{ userData.phoneNumber }}</span>
            </div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { signOut } from 'firebase/auth'

export default {
  middleware: ['authenticated'],
  computed: {
    userData () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    onClick (id) {
      this.$router.push({
        name: 'order-detail',
        params: {
          id: this.orderData.id
        }
      })
    },
    async logout () {
      await signOut(this.$fire.auth)
      this.$router.push('/login')
    }
  }
}
</script>
