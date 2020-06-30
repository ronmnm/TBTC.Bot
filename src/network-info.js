const { TbtcSystem, TBTCToken, web3, KeepBondingAddress } = require("./web3")

module.exports.getNetworkData = async function () {
  let createdEvents = await TbtcSystem.getPastEvents("Created", {
    fromBlock: 7863015,
  })

  let bondedETHWei = await web3.eth.getBalance(KeepBondingAddress)
  let bondedETH = Number(web3.utils.fromWei(bondedETHWei, "ether")).toFixed(2)

  let tbtcMinted = await TBTCToken.methods.totalSupply().call()

  return { depositsCount: createdEvents.length, bondedETH, tbtcMinted }
}
