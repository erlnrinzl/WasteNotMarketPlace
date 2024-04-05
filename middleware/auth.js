export default function ({ app, route, redirect, store }) {
  const publicRoute = ['landing', 'login', 'register']

  // on protected route
  if (!publicRoute.includes(route.path)) {
    // no user found, redirect to landing
    if (!app.$fire.auth.currentUser) {
      window.$nuxt.$router.push({
        name: 'landing',
        params: {
          message: 'AUTH_REQUIRED'
        }
      })
    } else {
      const userRole = store.getters['auth/getRole']
      // console.log(userRole)
      // eslint-disable-next-line no-lonely-if
      if (userRole === 'seller') {
        return redirect('/manage-products')
        // window.$nuxt.$router.push({
        //   name: 'manage-products'
        // })
      } else if (userRole === 'admin') {
        window.$nuxt.$router.push({
          name: 'manage-partners'
        })
      } else {
        window.$nuxt.$router.push({
          name: 'index'
        })
      }
    }
  } else if (!app.$fire.auth.currentUser) {
    // on public route
    // no user found, leave them on sign in page
  } else {
    const userRole = store.getters['auth/getRole']
    // on public route and user found, redirect them to designated home
    // eslint-disable-next-line no-lonely-if
    if (userRole === 'seller') {
      window.$nuxt.$router.push({
        name: 'manage-products'
      })
    } else if (userRole === 'admin') {
      window.$nuxt.$router.push({
        name: 'manage-partners'
      })
    } else {
      window.$nuxt.$router.push({
        name: 'index'
      })
    }
  }
}
