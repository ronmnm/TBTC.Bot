require("dotenv").config()
const Web3 = require("web3")
const TBTCSystemJSON = require("@keep-network/tbtc/artifacts/TBTCSystem.json")
const BondedECDSAKeepJSON = require("@keep-network/keep-ecdsa/artifacts/BondedECDSAKeep.json")
const BondedECDSAKeepFactoryJSON = require("@keep-network/keep-ecdsa/artifacts/BondedECDSAKeepFactory.json")
const KeepBondingJSON = require("@keep-network/keep-ecdsa/artifacts/KeepBonding.json")
const TBTCTokenJSON = require("@keep-network/tbtc/artifacts/TBTCToken.json")
const TokenGrantJSON = require("@keep-network/keep-core/artifacts/TokenGrant.json")
const { lookupAddress } = require("./utils")

let path = `wss://ropsten.infura.io/ws/v3/${process.env.INFURA_TOKEN}`
// let provider = new Web3.providers.WebsocketProvider(path)
const provider = new Web3.providers.WebsocketProvider(path, {
  // @ts-ignore
  clientConfig: {
    keepalive: true,
    keepaliveInterval: 60000,
  },
})
const web3 = new Web3(provider)

// provider.on("error", e => console.log("WS Error", e))
// provider.on("end", e => {
//   console.log("WS closed")
//   console.log("Attempting to reconnect...")
//   provider = new Web3.providers.WebsocketProvider(path)

//   provider.on("connect", () => console.log("WSS Reconnected"))

//   web3.setProvider(provider)
// })

let KeepBondingAddress = lookupAddress(KeepBondingJSON)
// console.log('TBTCTokenJSON', lookupAddress(KeepBondingJSON));
const TbtcSystem = new web3.eth.Contract(TBTCSystemJSON.abi, lookupAddress(TBTCSystemJSON))
const KeepBonding = new web3.eth.Contract(KeepBondingJSON.abi, KeepBondingAddress)
const TokenGrant = new web3.eth.Contract(TokenGrantJSON.abi, lookupAddress(TokenGrantJSON))
const TBTCToken = new web3.eth.Contract(TBTCTokenJSON.abi, lookupAddress(TBTCTokenJSON))

// console.log(BondedSortitionPool.methods)
TokenGrant.methods
  .numGrants()
  .call()
  .then(res => console.log("numGrants", res))
// KeepBonding.getPastEvents("UnbondedValueDeposited", {
//   fromBlock: 7863015,
// }).then(res => console.log(res))
let operators = []
KeepBonding.getPastEvents("BondCreated", { fromBlock: 7863015 }).then(res => {
  // res.forEach(el => operators.push(el.returnValues.operator))
  // let opr = [...new Set(operators)]
  console.log(res)
})

const BondedECDSAKeepFactory = new web3.eth.Contract(
  BondedECDSAKeepFactoryJSON.abi,
  "0x17cadDF97A1D1123eFb7b233cB16c76C31A96e02"
)

function createBondedECDSAKeepInstance(address) {
  return new web3.eth.Contract(BondedECDSAKeepJSON.abi, address)
}

module.exports = {
  web3,
  TbtcSystem,
  TBTCToken,
  BondedECDSAKeepFactory,
  createBondedECDSAKeepInstance,
  KeepBondingAddress,
}
