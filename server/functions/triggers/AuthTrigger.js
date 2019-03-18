const functions = require('firebase-functions');
const {Database} = require('../helpers/firebaseApp');
const usersRef = Database.ref('users');

module.exports = {
    onCreateUser: functions.auth.user().onCreate(user => {
        let dataUser = user.providerData[0];
        return usersRef.child(user.uid).set({
            displayName: dataUser.displayName,
            email: dataUser.email,
            phoneNumber: dataUser.phoneNumber === undefined ? "" : dataUser.phoneNumber,
            photoURL: dataUser.photoURL,
            providerId: dataUser.providerId,
            uid: dataUser.uid
        });
    })
};