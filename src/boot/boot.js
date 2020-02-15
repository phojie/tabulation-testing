import { firebaseAuth, firebase } from './firebase'

export default ({ app, router, Vue, store }) => {
  // Register the Firebase authentication listener
  firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function () {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      // return this.$firebase.auth().signInWithEmailAndPassword(email, password)
      // alert('relogin')
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      console.log(errorCode, errorMessage)
    })

  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      // Signed in. Let Vuex know.
      store.commit('auth/SET_USER', user)
      // The .catch ignore error if .replace is redirecting to dashboard and we
      // are already at that route.
      // https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
      router.replace({ name: 'dashboard' }).catch(() => { })
      // new Vue(app) /* eslint-disable-line no-new */
    } else {
      // Signed out. Let Vuex know.
      store.commit('auth/RESET_USER')
      router.replace({ name: 'login' }).catch(() => { })
      // new Vue(app) /* eslint-disable-line no-new */
    }
  })
}
