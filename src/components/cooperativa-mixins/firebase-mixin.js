import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js'

require('firebase/auth')
require('firebase/firestore')

let firebaseApp = require('firebase/app')

let firebaseMixin = (superClass) => class extends superClass {
  constructor () {
    super()
    this._init()
  }

  static get properties () {
    return {
      apiKey: {
        type: Object,
        value: process.env.apiKey
      },
      authDomain: {
        type: Object,
        value: process.env.authDomain
      },
      databaseURL: {
        type: Object,
        value: process.env.databaseURL
      },
      projectId: {
        type: Object,
        value: process.env.projectId
      },
      storageBucket: {
        type: Object,
        value: process.env.storageBucket
      },
      messagingSenderId: {
        type: Object,
        value: process.env.messagingSenderId
      },
    }
  }

  _init () {
    this.set('initializeApp', firebaseApp.initializeApp({
      apiKey: this.apiKey,
      authDomain: this.authDomain,
      databaseURL: this.databaseURL,
      projectId: this.projectId,
      storageBucket: this.storageBucket,
      messagingSenderId: this.messagingSenderId
    }))
    this.set('firebase', firebaseApp)
  }

  initializeApp () {
    return this.initializeApp
  }
}

export const FirebaseMixin = dedupingMixin(firebaseMixin)

/*
let googleProvider = new firebase.auth.GoogleAuthProvider()
let facebookProvider = new firebase.auth.FacebookAuthProvider()
let cooperativaDatabase = firebase.firestore()

cooperativaDatabase.settings({
  timestampsInSnapshots: true
})

facebookProvider.setCustomParameters({
  'display': 'popup'
})
* */
