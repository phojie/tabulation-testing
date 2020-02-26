import { fireDB } from 'boot/firebase'

export function addContestantAction (context, data) {
  const payload = data.data
  const repreRef = fireDB.collection('Owner/CKCM/Representative/').doc()
  const repreRefID = repreRef.id
  const representativeName = new Promise((resolve, reject) => {
    repreRef.set({
      keyIndex: repreRefID,
      eventKeyindex: data.eventId,
      name: payload.candidatesRepresent
    })
    resolve()
      .catch(error => {
        reject(error)
      })
  })

  const contestantsName = new Promise((resolve, reject) => {
    const contestantRef = fireDB.collection('Owner/CKCM/Contestants/').doc()
    const contestantID = contestantRef.id
    contestantRef.set({
      keyIndex: contestantID,
      representKeyIndex: repreRefID,
      eventKeyindex: data.eventId,
      gender: 'Male',
      fullname: payload.male.fullname,
      yearlevel: payload.male.yearlevel,
      age: payload.male.age,
      quotes: payload.male.quotes
    })
    resolve(payload)
      .catch(error => {
        reject(error)
      })
  })

  const contestantsName2 = new Promise((resolve, reject) => {
    const contestantRef = fireDB.collection('Owner/CKCM/Contestants/').doc()
    const contestantID = contestantRef.id
    contestantRef.set({
      keyIndex: contestantID,
      representKeyIndex: repreRefID,
      eventKeyindex: data.eventId,
      gender: 'Male',
      fullname: payload.male.fullname,
      yearlevel: payload.male.yearlevel,
      age: payload.male.age,
      quotes: payload.male.quotes
    })
    resolve(payload)
      .catch(error => {
        reject(error)
      })
  })
  return Promise.all([representativeName, contestantsName, contestantsName2]).then(function (payload) {
    return payload[1].candidatesRepresent
  })
}

export function getContestantAction (context, payload) {
  return new Promise((resolve, reject) => {
    const docRef = fireDB.collection('Owner/CKCM/Contestants').where('eventKeyindex', '==', payload)
    docRef.onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === 'added') {
          context.commit('contestantActionMutation', change.doc.data())
        }
        if (change.type === 'modified') {
          console.log('Modified city: ', change.doc.data())
        }
        if (change.type === 'removed') {
          console.log('Removed city: ', change.doc.data())
        }
      })
      resolve(snapshot.empty)
    })
  })
}
