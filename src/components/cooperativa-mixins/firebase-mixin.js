import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js'

require('firebase/auth')
require('firebase/firestore')

let firebaseApp = require('firebase/app')

let firebaseMixin = (superClass) => class extends superClass {
  constructor () {
    super()
    this._initFirebase()
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

  _initFirebase () {
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
