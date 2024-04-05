export default function ({ app, store }) {
  if (!app.$fire.auth.currentUser) {
    window.$nuxt.$router.push({
      name: 'landing'
    })
  } else if (store.getters['auth/getRole'] !== 'seller') {
    window.$nuxt.$router.push({
      name: 'index'
    })
  }
}
