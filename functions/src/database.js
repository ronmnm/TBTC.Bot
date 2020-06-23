const { db } = require("../firebase")

/**
 * Function to set new subscriber to DB 
 * @param {Object} ctx - context object
 * @param {String} collectionName -To which collection set the data
 * @param {String} address - Eth address
 */
module.exports.setSubscriberToDB = async function (ctx, collectionName, address) {
  let data = {
    userId: ctx.from.id,
    first_name: ctx.from.first_name || null,
    last_name: ctx.from.last_name || null,
    username: ctx.from.username,
    language_code: ctx.from.language_code,
    time: Date.now(),
  }

  return await db.collection(collectionName).doc(String(address)).set(data) // .set(data, { merge: true })
}

/**
 * Function returns all subscribers from requested collection
 * @param {Object} ctx - context object
 * @param {String} collectionName - Collection name to get data from
 */
module.exports.getAllSubscriptionsList = async function (ctx, collectionName) {
  let collectionRef = db.collection(collectionName)
  let snapshot = await collectionRef.get()

  let allSubscriptions = []
  snapshot.forEach(doc => {
    allSubscriptions.push({ docId: doc.id, data: doc.data() })
  })

  return allSubscriptions
}

module.exports.deleteAddressFromDB = async function (ctx) {
  let buttonObject = JSON.parse(ctx.match.input)
  let addressToDelete = buttonObject.p // payload
  let collectionName
  switch (buttonObject.c) { // c - collection alias
    case 1:
      collectionName = "CourtesyT"
      break;
    default:
      break;
  }
  return await db.collection(collectionName).doc(addressToDelete).delete();
}