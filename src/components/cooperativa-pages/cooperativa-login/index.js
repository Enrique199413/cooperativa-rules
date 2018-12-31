import { PolymerElement, html } from '@polymer/polymer/polymer-element'
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout'
import '@polymer/app-layout/app-drawer/app-drawer'
import '@polymer/app-layout/app-toolbar/app-toolbar'
import '@polymer/app-layout/app-header/app-header'
import '@polymer/app-layout/app-header-layout/app-header-layout'
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/iron-icons/iron-icons'
import '@polymer/paper-styles/paper-styles'
import '@polymer/app-route/app-location.js'
import '@polymer/app-route/app-route.js'

import template from './template.html'
import { FirebaseAuthMixin } from '../../cooperativa-mixins/firebase-auth-mixin'

import ReduxMixin from '../../cooperativa-mixins/redux-mixin'
import { bindActionCreators } from 'polymer-redux'

export default class CooperativaLogin extends ReduxMixin(FirebaseAuthMixin(PolymerElement)) {
  static get properties () {
    return {
      user: {
        type: Object,
        value: {}
      }
    }
  }

  //TODO perform that code and re-write more simple
  static mapStateToProps (state, element) {
    return {
      user: state.userReducer.user
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

  static get template () {
    return html([`${template}`])
  }

  constructor () {
    super()
  }
}

window.customElements.define('cooperativa-login', CooperativaLogin)
