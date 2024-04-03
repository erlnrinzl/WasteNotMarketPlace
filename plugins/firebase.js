import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCr7b5iXtkghyyZgwWCGh62cxLBCaVM8Jo',
  authDomain: 'wastenot-c13cd.firebaseapp.com',
  projectId: 'wastenot-c13cd',
  storageBucket: 'wastenot-c13cd.appspot.com',
  messagingSenderId: '881650790886',
  appId: '1:881650790886:web:1b4b6d02fad949829d6627',
  measurementId: 'G-EFZW7R00SD'
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const firestore = getFirestore(app)

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099')
}

export default function ({ store }, inject) {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const { claims } = await user.getIdTokenResult()

      store.commit('auth/setUser', user)
      store.commit('auth/setRole', claims.role)
    }
  })

  inject('auth', auth)
  inject('firestore', firestore)
}
