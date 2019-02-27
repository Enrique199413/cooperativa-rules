import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js'
import { FirebaseFirestoreMixin } from './firebase-firestore-mixin'
import { FirebaseAuthMixin } from './firebase-auth-mixin'

let userModelMixin = (superClass) => class extends FirebaseFirestoreMixin(FirebaseAuthMixin(superClass)) {
  constructor () {
    super()
  }

  static get properties () {
    return {
      currentUser: {
        type: Object
      }
    }
  }

  saveUser (user) {
    let params = {}
    params.providers = {}
    console.log(this.getUserByUid(user.uid))
    if (user.providerData.length > 0) {
      params.fullName = user.displayName
      params.firstLogin = new Date()
      params.email = user.providerData[0].email
      if (user.provider === 'facebook.com') {
        params.providers.facebook = user.uid
      } else {
        params.providers.google = user.uid
      }
    }

    return this.collectionActions('add', 'users', params)
  }

  getUserByUid (uid) {
    this.firebase.auth().getUser(uid)
      .then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully fetched user data:', userRecord.toJSON())
        return true
      })
      .catch(function (error) {
        console.log('Error fetching user data:', error)
        return false
      })
  }
}

export const UserModelMixin = dedupingMixin(userModelMixin)
