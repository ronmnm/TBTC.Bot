const { web3, TbtcSystem, BondedECDSAKeepFactory, createBondedECDSAKeepInstance } = require("./web3")
const { db } = require("../firebase")
const { getAllSubscriptionsList } = require("./database")

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

/**
 * Listen for deposit contract events
 * @param {*} bot - Telegraf instance
 */
module.exports.courtesyCallListener = async function (bot) {
  console.log("courtesyCallListener started")

  // console.log(BondedECDSAKeepFactory.events);
  // let courtesySubscriptions = await getAllSubscriptionsList("CourtesyT")
  let keeps = []
  BondedECDSAKeepFactory.getPastEvents("BondedECDSAKeepCreated", {
    fromBlock: 7863015,
  }).then(ev => {
    ev.forEach(el => keeps.push({ keepAddress: el.returnValues.keepAddress, members: el.returnValues.members }))
    let keepsF = []
    for(let i = 0; keeps.length > i; i++){
      keeps[i].members.forEach(member => {
        if(member === '0x319fcCd4E77e23f9524d4a449Cb7B79840462F37')
        keepsF.push(keeps[i])
      })
    }
    console.log(keepsF)
    console.log(keeps)
  })

  let createdE = await TbtcSystem.getPastEvents("Created", {
    // filter: { _depositContractAddress: depositAddress },
    fromBlock: 7863015,
  })
  // console.log(createdE);

  let createdEFilt = createdE.map(el => el.returnValues._keepAddress)
  createdEFilt.forEach(async el => {
    BondedECDSAKeep = createBondedECDSAKeepInstance(el)
    const members = await BondedECDSAKeep.methods.getMembers().call()
    // console.log(members);
  })

  function checkArrays(membersArray, subscribers) {
    let matchedSubscribers = []
    for (let i1 = 0; membersArray.length > i1; i1++) {
      for (let i2 = 0; subscribers.length > i2; i2++) {
        if (membersArray[i1] === subscribers[i2].docId) {
          matchedSubscribers.push(subscribers[i2])
        }
      }
    }
    return matchedSubscribers
  }

  // console.log("check", check(members, courtesySubscriptions))

  let currentBlock = await web3.eth.getBlockNumber()
  TbtcSystem.events.CourtesyCalled({ fromBlock: currentBlock }, async (err, result) => {
    if (err) {
      console.log(err)
    } else {
      let depositAddress = result.returnValues._depositContractAddress
      let BondedECDSAKeep
      try {
        let keepAddress = (
          await TbtcSystem.getPastEvents("Created", {
            filter: { _depositContractAddress: depositAddress },
            fromBlock: 7863015,
          })
        )[0].returnValues._keepAddress
        BondedECDSAKeep = createBondedECDSAKeepInstance("0xfEaF3D76a460dbD17834FF6Bf0b08f42A45b2dC8")
      } catch (err) {
        console.log(err)
      }
      const members = await BondedECDSAKeep.methods.getMembers().call()

      let courtesySubscriptions = await getAllSubscriptionsList("CourtesyT")
      let filtered = courtesySubscriptions.filter(item => item.docId === addr) // subscribers to send notification to

      filtered.forEach(item => {
        console.log(item)
        bot.telegram.sendMessage(item.data.userId, "html", { parse_mode: "HTML", disable_web_page_preview: true })
      })

      // console.log(result)
    }
  })
}

// "Created" event object for _depositContractAddress where event happened
// let createdEventForAddress = await TbtcSystem.getPastEvents("Created", {
//   filter: { _depositContractAddress: "0xcFaE4E97B10E333c6c09eb10de2d1D2F2D0c4c35" },
//   fromBlock: 7863015,
// })
// console.log(createdEventForAddress);

// let keepAddress = createdEventForAddress[0].returnValues._keepAddress
// const BondedECDSAKeep = createBondedECDSAKeepInstance(keepAddress)
// const members = await BondedECDSAKeep.methods.getMembers().call()
// // console.log(members)
