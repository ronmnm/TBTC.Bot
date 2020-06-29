const functions = require("firebase-functions")
const admin = require("firebase-admin")

// let serviceAccount = require("./tbtc-bot-firebase-adminsdk.json");

// admin.initializeApp({
//   credential: admin.credential.cert({
//     private_key: process.env.FIREBASE_PRIVATE_KEY,
//     client_email: process.env.FIREBASE_CLIENT_EMAIL,
//     project_id: process.env.FIREBASE_PROJECT_ID,
//   }),
//   databaseURL: "https://tbtc-bot-143f1.firebaseio.com",
// })

// admin.initializeApp(functions.config().firebase)

exports.db = {} // admin.firestore()
exports.functions = functions
