const functions = require("firebase-functions")
const admin = require("firebase-admin")


let serviceAccount = require("./tbtc-bot-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tbtc-bot-143f1.firebaseio.com"
});


// admin.initializeApp(functions.config().firebase)

exports.db = admin.firestore()
exports.functions = functions