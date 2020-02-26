// // import { fireDB } from 'boot/firebase'
// const faker = require('faker')
// const { fireDB } = require('./firebase')

// const fakeIt = () => {
//   const docRef = fireDB.collection('Owner/CKCM/Events/').doc()
//   const myid = docRef.id
//   return docRef.set({
//     eventTitle: faker.lorem.words(),
//     schedule: faker.date.future(),
//     keyIndex: myid
//   })
// }

// Array(20).fill(0).forEach(fakeIt)

// console.log(fakeIt)
