const BASE_API_URL = 'https://us-central1-wastenot-c13cd.cloudfunctions.net/api'

export default function ({ $axios, $auth }, inject) {
  const api = $axios.create()
  api.setBaseURL(BASE_API_URL)

  api.onRequest(async (config) => {
    if ($auth.currentUser) {
      const token = await $auth.currentUser.getIdToken()
      config.headers.common.Authorization = `Bearer ${token}`
    }

    return config
  })

  inject('api', api)
}
