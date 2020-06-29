require("dotenv").config()
const Web3 = require("web3")
const TBTCSystemJSON = require("@keep-network/tbtc/artifacts/TBTCSystem.json")
const BondedECDSAKeepJSON = require("@keep-network/keep-ecdsa/artifacts/BondedECDSAKeep.json")
const BondedECDSAKeepFactoryJSON = require("@keep-network/keep-ecdsa/artifacts/BondedECDSAKeepFactory.json")
const { lookupAddress } = require("./utils")

let provider = new Web3.providers.WebsocketProvider(`wss://ropsten.infura.io/ws/v3/${process.env.INFURA_TOKEN}`)
const web3 = new Web3(provider)

// console.log('TBTCSystemJSON',lookupAddress(BondedECDSAKeepFactoryJSON));

// "0x25B60668E7a0967a86223828D20f93714D91Ee4B"
const TbtcSystem = new web3.eth.Contract(TBTCSystemJSON.abi, lookupAddress(TBTCSystemJSON))
const BondedECDSAKeepFactory = new web3.eth.Contract(BondedECDSAKeepFactoryJSON.abi, "0x17cadDF97A1D1123eFb7b233cB16c76C31A96e02")

function createBondedECDSAKeepInstance(address) {
  return new web3.eth.Contract(BondedECDSAKeepJSON.abi, address)
}

module.exports = {
  web3,
  TbtcSystem,
  BondedECDSAKeepFactory,
  createBondedECDSAKeepInstance,
}
