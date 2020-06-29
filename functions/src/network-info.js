const { TbtcSystem, web3 } = require("./web3")

module.exports.getTotalDepositsCount = async function () {
  let createdEvents = await TbtcSystem.getPastEvents("Created", {
    fromBlock: 7863015,
  })
  return createdEvents.length
}
