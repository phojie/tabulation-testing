import { fireDB } from 'boot/firebase'
import capitalize from 'lodash/capitalize'
export function addEventAction (context, payload) {
  return new Promise((resolve, reject) => {
    const docRef = fireDB.collection('Events/').doc()
    const docRefID = docRef.id
    docRef.set({
      keyIndex: docRefID,
      eventTitle: capitalize(payload.title),
      schedule: payload.schedule
    })
      .then(function () {
        resolve(payload)
      })
      .catch(function (error) {
        reject(error)
        console.error('Error writing document: ', error)
      })
  })
}
