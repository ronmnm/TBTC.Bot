const functions = require("firebase-functions")
const admin = require("firebase-admin")

admin.initializeApp(functions.config().firebase)

// exports.db = admin.firestore()
exports.functions = functions