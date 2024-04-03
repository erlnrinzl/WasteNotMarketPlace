const BASE_API_URL = process.env.NODE_ENV === 'production'
  ? 'https://us-central1-wastenot-c13cd.cloudfunctions.net/api'
  : 'http://127.0.0.1:5001/wastenot-c13cd/us-central1/api'

export default function ({ $axios, $fire }, inject) {
  const api = $axios.create()
  api.setBaseURL(BASE_API_URL)

  api.onRequest(async (config) => {
    if ($fire.auth.currentUser) {
      const token = await $fire.auth.currentUser.getIdToken()
      config.headers.common.Authorization = `Bearer ${token}`
    }

    return config
  })

  inject('api', api)
}
