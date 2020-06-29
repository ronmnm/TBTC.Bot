const functions = require("firebase-functions")
const admin = require("firebase-admin")

// let serviceAccount = require("./tbtc-bot-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
  databaseURL: "https://tbtc-bot-143f1.firebaseio.com",
})

// admin.initializeApp(functions.config().firebase)

exports.db = admin.firestore()
exports.functions = functions
