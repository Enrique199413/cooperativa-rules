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
import { FirebaseAuthMixin } from '../cooperativa-mixins/firebase-auth-mixin'
import { FirebaseFirestoreMixin } from '../cooperativa-mixins/firebase-firestore-mixin'

import ReduxMixin from '../cooperativa-mixins/redux-mixin'
import { bindActionCreators } from 'polymer-redux'

require('../cooperativa-redux/cooperativa-store')

export default class CooperativaLayout extends ReduxMixin(FirebaseFirestoreMixin(FirebaseAuthMixin(PolymerElement))) {
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
      user: {
        type: Object
      }
    }
  }

  //TODO perform that code and re-write more simple
  static mapStateToProps (state, element) {
    return {
      user: state.user
    }
  }

  //TODO perform that code and re-write more simple
  static mapDispatchToEvents (dispatch, element) {
    return bindActionCreators(
      {
        setUser (event) {
          return {
            type: 'SET_USER',
            user: event.detail
          }
        }
      },
      dispatch
    )
  }

  static get template () {
    return html([`<style>${css}</style> ${template}`])
  }

  loginGoogle () {
    this.authAuthenticateWithProvider(this.providers.googleProvider).then(result => {
      //TODO try change this dispatch action
      this.dispatchEvent(
        new CustomEvent('set-user', {
          detail: result.user,
          bubbles: true,
          composed: true
        })
      )
    }).catch((error) => {
      console.log(error)
    })
  }

  loginFacebook () {
    this.authAuthenticateWithProvider(this.providers.facebookProvider).then(result => {
      this.user = result.user
    }).catch((error) => {
      console.log(error)
    })
  }

  writeDatabase () {
    let params = {
      first: 'Alan',
      last: 'Turing',
      birthday: new Date(),
      email: 'jcjiron4@gmail.com'
    }

    this.collectionActions('add', 'users', params).then(docRef => {
      console.log('Document written with ID: ', docRef.id)
    }).catch(error => {
      console.error('Error adding document: ', error)
    })
  }

  getDatabase () {
    this.collectionActions('get', 'users').then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
      })
    }).catch(error => {
      console.error('Error adding document: ', error)
    })
  }

  constructor () {
    super()
  }
}

window.customElements.define('cooperativa-layout', CooperativaLayout)
