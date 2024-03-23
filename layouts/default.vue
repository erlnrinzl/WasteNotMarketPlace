<template>
  <v-app>
    <v-navigation-drawer
      v-model="sideDrawer"
      app
      class="hidden-sm-and-up"
      disable-resize-watcher
      height="10vh"
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
        <v-icon>mdi-send-variant-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>

    <v-footer class="custom-primary">
      <v-row>
        <v-col cols="6">
          <p class="text-h3 font-weight-medium white--text">
            WasteNot
          </p>
          <v-btn
            v-for="contact in contactInfo"
            :key="contact.name"
            fab
            small
            :to="contact.to"
            class="mx-2"
          >
            <v-icon dark>
              {{ contact.icon }}
            </v-icon>
          </v-btn>

          <p class="white--text mt-5 mb-0">
            Hubungi kami: <span class="font-weight-bold">contact@wastenot.ac.id</span>
          </p>

          <div>
            <span class="white--text text-subtitle-2">Copyright &copy; {{ new Date().getFullYear() }} WasteNot</span>
          </div>
        </v-col>
        <v-col cols="6">
          <p class="white--text text-h6 font-weight-light">
            Menu
          </p>
          <p v-for="item in menu" :key="item.name">
            <a class="white--text font-weight-bold text-decoration-none" :href="item.to">{{ item.name }}</a>
          </p>
        </v-col>
      </v-row>
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
      ],
      contactInfo: [
        {
          name: 'instagram',
          icon: 'mdi-instagram',
          to: ''
        },
        {
          name: 'twitter',
          icon: 'mdi-twitter',
          to: ''
        },
        {
          name: 'facebook',
          icon: 'mdi-facebook',
          to: ''
        }
      ],
      menu: [
        {
          name: 'About Us',
          to: ''
        },
        {
          name: 'Milestone',
          to: ''
        },
        {
          name: 'Waste Category',
          to: ''
        }
      ]
    }
  }
}
</script>
