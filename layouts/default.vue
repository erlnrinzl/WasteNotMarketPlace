<template>
  <v-app>
    <v-navigation-drawer
      v-if="renderNavbar"
      v-model="sideDrawer"
      app
      class="hidden-sm-and-up"
      disable-resize-watcher
      height="100vh"
    >
      <v-list v-if="!renderNavLoggedIn">
        <v-list-item
          v-for="(item, i) in navigationMenuLoggedOff"
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
          :to="'/'"
        >
          <v-btn depressed class="custom-secondary white--text" :to="'/login'" active>
            <span class="mr-3">Pergi Ke Aplikasi</span>
            <v-icon>mdi-send-variant-outline </v-icon>
          </v-btn>
        </v-list-item>
      </v-list>

      <v-list v-else>
        <v-list-item
          v-for="(item, i) in navMenuList"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="authenticated">
          <v-btn
            color="custom-primary"
            block
            dark
            small
            @click="logout"
          >
            Log Out
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar v-if="renderNavbar" app>
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

      <v-toolbar-items v-if="!renderNavLoggedIn" class="hidden-xs-only">
        <v-btn v-for="(menu, index) in navigationMenuLoggedOff" :key="index" :to="menu.to" text>
          {{ menu.title }}
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items v-else class="hidden-xs-only">
        <v-btn v-for="(menu, index) in navMenuList" :key="index" :to="menu.to" text>
          <span :class="$route.path === menu.to ? 'font-weight-black': ''" class="custom-secondary--text">
            {{ menu.title }}
          </span>
        </v-btn>
      </v-toolbar-items>

      <v-spacer />

      <v-btn v-if="!renderNavLoggedIn" depressed class="custom-secondary white--text hidden-xs-only" :to="'/login'">
        <span class="mr-3">Pergi Ke Aplikasi</span>
        <v-icon>mdi-send-variant-outline</v-icon>
      </v-btn>
      <v-btn
        v-if="authenticated"
        class="hidden-xs-only"
        color="custom-primary"
        dark
        small
        @click="logout"
      >
        Log Out
      </v-btn>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>

    <v-footer v-if="renderFooter" class="custom-primary">
      <v-row>
        <v-col cols="12" md="6" lg="6">
          <div class="ml-4">
            <p class="text-md-h4 text-h6 font-weight-medium white--text">
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
          </div>
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <div class="ml-4">
            <p class="white--text text-h6 font-weight-light">
              Menu
            </p>
            <v-row>
              <v-col v-for="menu in footerMenu" :key="menu.title" cols="6" class="py-0 my-0">
                <p class="mb-1">
                  <router-link
                    class="white--text font-weight-bold text-decoration-none"
                    style="cursor: pointer"
                    :to="menu.to"
                  >
                    {{ menu.title }}
                  </router-link>
                </p>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import { signOut } from 'firebase/auth'

export default {
  name: 'DefaultLayout',
  data () {
    return {
      title: 'WasteNot',
      sideDrawer: false,
      navigationMenuLoggedOff: [
        {
          title: 'Tentang Kami',
          to: '#about-us'
        },
        {
          title: 'Pencapaian',
          to: '#achievement'
        },
        {
          title: 'Layanan Unggulan',
          to: '#our-services'
        }
      ],
      navigationMenu: [
        {
          title: 'Home',
          to: '/'
        },
        {
          title: 'Pick-Up',
          to: '/pickup'
        },
        {
          title: 'Deliver',
          to: '/deliver'
        },
        {
          title: 'Marketplace',
          to: '/marketplace'
        },
        {
          title: 'Pesanan',
          to: '/order'
        },
        {
          title: 'Akun',
          to: '/account'
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
      ]
    }
  },
  computed: {
    ...mapGetters('auth', {
      authenticated: 'authenticated',
      getRole: 'getRole'
    }),
    renderNavbar () {
      if (this.$route.path === '/login' || this.$route.path === '/register') {
        return false
      }

      return true
    },
    renderFooter () {
      if (this.$route.path === '/login' || this.$route.path === '/register') {
        return false
      } else if (this.getRole === 'seller' || this.getRole === 'bank' || this.getRole === 'admin') {
        return false
      }
      return true
    },
    renderNavLoggedIn () {
      if (this.$route.path === '/landing') {
        return false
      }
      return true
    },
    navMenuList () {
      if (this.getRole === 'seller') {
        return [
          {
            title: 'Seller',
            to: '/manage-products'
          }
        ]
      } else if (this.getRole === 'admin') {
        return [
          {
            title: 'Partners',
            to: '/manage-partners'
          }
        ]
      }
      return this.navigationMenu
    },
    footerMenu () {
      if (this.authenticated) {
        return this.navigationMenu
      }
      return this.navigationMenuLoggedOff
    },
    ...mapGetters('auth', {
      authenticated: 'authenticated',
      getRole: 'getRole'
    })
  },
  methods: {
    async logout () {
      await signOut(this.$fire.auth)
      this.$router.push('/login')
    }
  }
}
</script>
