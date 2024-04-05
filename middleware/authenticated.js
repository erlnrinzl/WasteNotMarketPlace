export default function ({ store }) {
  const userRole = store.getters['auth/getRole']
  if (!store.getters['auth/authenticated']) {
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
