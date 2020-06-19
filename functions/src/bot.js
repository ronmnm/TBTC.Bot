require("dotenv").config()
// const { functions } = require("../firebase")
const emoji = require("node-emoji")

const { Telegraf } = require("telegraf")
const { Extra, Markup, Stage, session } = Telegraf
const ScenesGenerator = require("./scenes")
const { homeScreen, helpScreen, aboutScreen } = require("./telegram/commands")

const bot = new Telegraf(process.env.TELEGRAM_TOKEN_TEST || "1241796191:AAEwBDVdVQjkQljxoLnSfbU1rP0zgcGRQvk")
bot.use(Telegraf.log())

let curScene = new ScenesGenerator()
const addressScene = curScene.enterAddress()

const stage = new Stage([addressScene])

bot.use(session())
bot.use(stage.middleware())



// Standart commands
bot.start(homeScreen)
bot.help(helpScreen)
bot.command('/about', aboutScreen)

// bot.s

// bot.
bot.hears("hi", ctx => {
  html = `
<b>bl  ${emoji.get("hash")}a aga</b>
First name: ${ctx.from.first_name}
  `
  // bot.replyWithHTML(html)
  bot.telegram.sendMessage("389076460", html, { parse_mode: "HTML" })
})
bot.command("deposit", ctx => {
  ctx.scene.enter("addr")
})

bot.launch()
exports.bot
// exports.bot = functions.region("europe-west1").https.onRequest(
//   (req, res) => bot.handleUpdate(req.body, res).then( rv => !rv && res.sendStatus(200))
// )
