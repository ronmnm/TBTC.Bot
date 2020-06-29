const { botFunction, bot } = require("../src/telegram/bot")
const { depositCreatedListener } = require("../src/web3-listeners")
const { functions } = require("../firebase")

// exports.bot = bot

exports.botFunction = botFunction

// const Telegraf = require("telegraf")
// const { functions } = require("./firebase")

// const bot = new Telegraf("1241796191:AAEAW_etkMGmlZ3IFVuXm0-fMkEru16MUCA")

// bot.start(async ctx => {
//   ctx.reply("Helllo")
// })
// bot.on("message", ctx => {
//   ctx.reply("your message delivered")
// })

// exports.botTest = functions.https.onRequest(async (req, res) => {
//   try {
//     await bot.handleUpdate(req.body, res)
//   } catch (err) {
//     console.log(err)
//     res.sendStatus(500)
//   }
// })
