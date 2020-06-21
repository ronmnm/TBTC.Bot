const { web3, TbtcSystem } = require('./web3')
/**
 * Creates event listener and sends notification message to the TBTC Deposits channel when new Deposit created
 * @param bot - Telegraf instance
 */
module.exports.depositCreatedListener = async function (bot) {
  let currentBlock = await web3.eth.getBlockNumber()
  console.log("depositCreatedListener started")

  TbtcSystem.events.Created({ fromBlock: currentBlock }, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      let html = `
New deposit created!
Transaction: <a href="https://ropsten.etherscan.io/tx/${result.transactionHash}">Link</a>
`
      bot.telegram.sendMessage("@tbtc_deposits", html, { parse_mode: "HTML", disable_web_page_preview: true })
      console.log(result)
    }
  })
}
