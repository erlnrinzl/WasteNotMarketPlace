export default function ({ app, route, redirect }) {
  if (route.path !== '/login') {
    // on protected route
    if (!app.$fire.auth.currentUser) {
      return redirect('/login')
    }
  } else if (route.path === '/login') {
    if (!app.$fire.auth.currentUser) {
      // stay at login page
    } else {
      return redirect('/')
    }
  }
}
