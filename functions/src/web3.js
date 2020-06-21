require("dotenv").config()
const Web3 = require("web3")
const TBTCSystemJSON = require("@keep-network/tbtc/artifacts/TBTCSystem.json")


let provider = new Web3.providers.WebsocketProvider(
  `wss://ropsten.infura.io/ws/v3/${process.env.INFURA_TOKEN}`
)
const web3 = new Web3(provider)

let TbtcSystem = new web3.eth.Contract(TBTCSystemJSON.abi, "0x2b70907b5C44897030ea1369591ddcd23C5d85d6")

module.exports = {
  web3,
  TbtcSystem
}