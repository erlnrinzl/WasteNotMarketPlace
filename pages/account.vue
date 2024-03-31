<template>
  <v-container class="py-10 px-5">
    <div class="pb-2 d-flex justify-space-between">
      <span class="custom-secondary--text text-h5 font-weight-bold">Informasi Akun</span>
      <div>
        <a class="custom-primary--text" href="/edit-account">
          <span class="text-subtitle-2 font-weight-bold">Perbarui Akun</span>
        </a>
      </div>
    </div>
    <hr>

    <v-list>
      <v-list-item dense>
        <v-list-item-content class="py-1">
          <v-list-item-title>
            <div class="mt-3">
              <p class="mb-0 custom-secondary--text text-h6 font-weight-bold">
                Nama Lengkap
              </p>
              <span class="text-subtitle-1">{{ userData.name }}</span>
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
              <span class="text-subtitle-1">{{ userData.phone }}</span>
            </div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  // middleware: ['authenticated'],
  data () {
    return {
      userData: {
        name: 'Calvin Andrew Widjaja',
        email: 'calvin043@gmail.com',
        phone: '081296112422'
      }
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
    }
  }
}
</script>
