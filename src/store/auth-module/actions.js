import { firebaseAuth } from 'boot/firebase'
export async function signIn ({ commit }, payload) {
  const email = payload.email
  const password = payload.password

  await firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(function (user) {
      commit('SET_USER', user)
    })
    .catch(function (error) {
      throw error
    })
}

export async function signOut ({ commit }) {
  const vm = this
  await firebaseAuth.signOut()
    .then(() => {
      commit('SET_USER', {})
      vm.$router.replace({ name: 'login' })
    })
}
