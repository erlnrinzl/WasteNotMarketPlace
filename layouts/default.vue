<template>
  <v-app>
    <v-navigation-drawer
      v-model="sideDrawer"
      app
      class="hidden-sm-and-up"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in navigationMenu"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="'/app'"
        >
          <v-btn depressed class="custom-secondary white--text" :to="'/app'">
            <span class="mr-3">Pergi Ke Aplikasi</span>
            <v-icon>mdi-send-variant-outline </v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <!-- hamburger icon -->
      <span class="hidden-sm-and-up mr-3">
        <v-app-bar-nav-icon @click.stop="sideDrawer = !sideDrawer" />
      </span>

      <v-toolbar-title>
        <router-link
          to="/"
          style="cursor: pointer"
          class="text-decoration-none"
        >
          <h1 class="text-h3 font-weight-bold custom-secondary--text">
            {{ title }}
          </h1>
        </router-link>
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="(menu, index) in navigationMenu" :key="index" :to="menu.to" text>
          {{ menu.title }}
        </v-btn>
      </v-toolbar-items>

      <v-spacer />

      <v-btn depressed class="custom-secondary white--text hidden-xs-only" :to="'/app'">
        <span class="mr-3">Pergi Ke Aplikasi</span>
        <v-icon>mdi-send-variant-outline </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>

    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      title: 'WasteNot',
      sideDrawer: false,
      navigationMenu: [
        {
          title: 'Tentang Kami',
          to: '/about'
        },
        {
          title: 'Pencapaian',
          to: '/achievement'
        },
        {
          title: 'Jenis Sampah',
          to: '/about-wastes'
        }
      ]
    }
  }
}
</script>
