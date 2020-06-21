const functions = require('firebase-functions')
const admin = require('firebase-admin')

if (process.env.NODE_ENV === 'production') {
  admin.initializeApp()
} else {
  const serviceAccount = require('./fireb-adminsdk.json')

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://popular-superheroes.firebaseio.com',
  })
}

exports.getDcHeroes = functions.https.onRequest((request, response) => {
  if (process.env.NODE_ENV !== 'production') {
    response.setHeader('Access-Control-Allow-Origin', '*')
  }

  admin
    .firestore()
    .collection('dc-heroes')
    .get()
    .then((snapshot) => {
      let heroes = []
      snapshot.forEach((doc) => {
        heroes.push({
          ...doc.data(),
          id: doc.id,
        })
      })
      response.status(200).json(heroes)
    })
    .catch((err) => {
      console.log('Error getting documents', err)
      response.status(500).json({ message: 'Wuuut happened' })
    })
})
