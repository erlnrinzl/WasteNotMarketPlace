export default function ({ app, store }) {
  const userRole = store.getters['auth/getRole']
  if (!app.$fire.auth.currentUser) {
    window.$nuxt.$router.push({
      name: 'landing',
      params: {
        message: 'AUTH_REQUIRED'
      }
    })
  } else if (userRole === 'seller') {
    window.$nuxt.$router.push({
      name: 'manage-products'
    })
  } else if (userRole === 'admin') {
    window.$nuxt.$router.push({
      name: 'manage-partners'
    })
  }
}
