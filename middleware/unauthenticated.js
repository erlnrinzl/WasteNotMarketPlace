export default function ({ store }) {
  if (store.getters['auth/authenticated']) {
    window.$nuxt.$router.push({
      name: 'IndexPage'
    })
  }
}
