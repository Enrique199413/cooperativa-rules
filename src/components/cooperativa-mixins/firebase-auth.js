import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js'
import { FirebaseMixin } from './firebase-mixin'

require('firebase/auth')

let firebaseAuthMixin = (superClass) => class extends FirebaseMixin(superClass) {
  constructor () {
    super()
    this._verifyConnection()
    this.getProviders()
  }

  static get properties () {
    return {
      facebookConfiguration: {
        type: String,
        value: {
          'display': 'popup'
        }
      },
      providers: {
        type: Object,
        value: {}
      }
    }
  }

  _verifyConnection () {
    if (!this.initializeApp.options) {
      throw new Error('FirebaseAuthMixin: Verify credentials on Firebase')
    }
  }

  getProviders () {
    this.providers.facebookProvider = new this.firebase.auth.FacebookAuthProvider()
    this.providers.googleProvider = new this.firebase.auth.GoogleAuthProvider()
    this.providers.facebookProvider.setCustomParameters(this.facebookConfiguration)
  }

  async authAuthenticateWithProvider (provider) {
    return await this.firebase.auth().signInWithPopup(provider)
  }

}

export const FirebaseAuthMixin = dedupingMixin(firebaseAuthMixin)
