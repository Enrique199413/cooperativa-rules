import { PolymerElement, html } from '@polymer/polymer/polymer-element'
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout'
import '@polymer/app-layout/app-drawer/app-drawer'
import '@polymer/app-layout/app-toolbar/app-toolbar'
import '@polymer/app-layout/app-header/app-header'
import '@polymer/app-layout/app-header-layout/app-header-layout'
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/iron-icons/iron-icons'
import '@polymer/paper-styles/paper-styles'

import css from './style.pcss'
import template from './template.html'

let firebase = require('firebase/app')
require('firebase/firestore')
let firebaseui = require('firebaseui')

let config = {
  apiKey: 'AIzaSyCxjkmjCkNxZ_LlC8kps4SoOe3qFg_OTdg',
  authDomain: 'cooperativa-rules.firebaseapp.com',
  databaseURL: 'https://cooperativa-rules.firebaseio.com',
  projectId: 'cooperativa-rules',
  storageBucket: 'cooperativa-rules.appspot.com',
  messagingSenderId: '712552363216'
}

let cooperativaFirebaseApp = firebase.initializeApp(config)

let cooperativaDatabase = firebase.firestore()

cooperativaDatabase.settings({
  timestampsInSnapshots: true
})

export default class CooperativaLayout extends PolymerElement {
  static get properties () {
    return {
      name: {
        type: String,
        value: 'EnriqueLC'
      },
      appVersion: {
        type: String,
        value: process.env.appVersion
      },
      ENV: {
        type: String,
        value: process.env.NODE_ENV
      },
    }
  }

  static get template () {
    return html([`<style>${css}</style> ${template}`])
  }

  writeDatabase () {
    //TODO modularize on mixin
    cooperativaDatabase.collection('users').add({
      first: 'Alan',
      last: 'Turing',
      birthday: new Date(),
      email: 'jcjiron4@gmail.com'
    })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
  }

  getDatabase () {
    //TODO modularize on mixin
    cooperativaDatabase.collection('users').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
      })
    })
  }

  constructor () {
    super()
  }
}

window.customElements.define('cooperativa-layout', CooperativaLayout)
