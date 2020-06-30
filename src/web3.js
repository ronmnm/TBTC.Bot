require("dotenv").config()
const Web3 = require("web3")
const TBTCSystemJSON = require("@keep-network/tbtc/artifacts/TBTCSystem.json")
const BondedECDSAKeepJSON = require("@keep-network/keep-ecdsa/artifacts/BondedECDSAKeep.json")
const BondedECDSAKeepFactoryJSON = require("@keep-network/keep-ecdsa/artifacts/BondedECDSAKeepFactory.json")
const KeepBondingJSON = require("@keep-network/keep-ecdsa/artifacts/KeepBonding.json")
const TBTCTokenJSON = require("@keep-network/tbtc/artifacts/TBTCToken.json")
const { lookupAddress } = require("./utils")

let path = `wss://ropsten.infura.io/ws/v3/${process.env.INFURA_TOKEN}`
let provider = new Web3.providers.WebsocketProvider(path)
const web3 = new Web3(provider)

provider.on("error", e => console.log("WS Error", e))
provider.on("end", e => {
  console.log("WS closed")
  console.log("Attempting to reconnect...")
  provider = new Web3.providers.WebsocketProvider(path)

  provider.on("connect", () => console.log("WSS Reconnected"))

  web3.setProvider(provider)
})

let KeepBondingAddress = lookupAddress(KeepBondingJSON)
// console.log('TBTCTokenJSON', lookupAddress(KeepBondingJSON));
const TbtcSystem = new web3.eth.Contract(TBTCSystemJSON.abi, lookupAddress(TBTCSystemJSON))
const KeepBonding = new web3.eth.Contract(KeepBondingJSON.abi, KeepBondingAddress)
const TBTCToken = new web3.eth.Contract(TBTCTokenJSON.abi, lookupAddress(TBTCTokenJSON))
console.log(TBTCToken.methods);
TBTCToken.methods.totalSupply().call().then(res => console.log('total supply',res))


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
