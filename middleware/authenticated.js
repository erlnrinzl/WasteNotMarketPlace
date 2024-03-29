export default function ({ store, i18n }) {
  if (!store.getters['auth/authenticated']) {
    window.$nuxt.$router.push({
      name: 'login' + '___' + i18n.locale,
      params: {
        message: 'AUTH_REQUIRED'
      }
    })
  }
}
