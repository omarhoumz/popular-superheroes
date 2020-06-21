const functions = require('firebase-functions')
const admin = require('firebase-admin')

const fetch = require('node-fetch')

console.log({ env: process.env.NODE_ENV })

if (process.env.NODE_ENV === 'production') {
  admin.initializeApp()
} else {
  const serviceAccount = require('./fireb-adminsdk.json')

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://popular-superheroes.firebaseio.com',
  })
}

const NETLIFY_BUILD_HOOK = functions.config().netlify
  ? functions.config().netlify.build_hook
  : ''

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
        heroes.push(Object.assign({}, doc.data(), { id: doc.id }))
      })

      response.status(200).json(heroes)
      return null
    })
    .catch((err) => {
      console.log('Error getting documents', err)
      response.status(500).json({ message: 'Wuuut happened' })
    })
})

function triggerBuild() {
  const requestOptions = {
    method: 'POST',
  }

  fetch(NETLIFY_BUILD_HOOK, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error))
}

exports.triggerBuildOnDcHeroesCreated = functions.firestore
  .document('dc-heroes/{heroId}')
  .onCreate(async (snapshot) => {
    triggerBuild()
  })

exports.triggerBuildOnDcHeroesUpdated = functions.firestore
  .document('dc-heroes/{heroId}')
  .onUpdate(async (change) => {
    // const newValue = change.after.data()
    // const name = newValue.name

    // ...or the previous value before this update
    // const previousValue = change.before.data()

    triggerBuild()
  })
