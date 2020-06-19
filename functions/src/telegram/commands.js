const emoji = require("node-emoji")
const { Extra } = require("telegraf")

let icons = {
  star: emoji.get("star"),
  v: emoji.get("v"),
  rocket: emoji.get("rocket")
}

module.exports.homeScreen = function (ctx) {
  let { first_name } = ctx.from
  let html = `
<b>Welcome on board ${first_name}!</b>

<i>Note: project under active development, bugs and inconsistencies may happen.</i>

<b>Available commands:</b>

  /start
  /help
  /about
  /faq

  <b>Operator:</b>
    /subscribe_ecdsa

  <b>Depositor:</b>

  <b>TBTC Network Info</b>
    /tbtc_network
  `
  ctx.replyWithHTML(html)
}

module.exports.helpScreen = function (ctx) {
  let html = `
/start
/help
/about

/deposit
  `
  ctx.replyWithHTML(html)
}

module.exports.aboutScreen = function (ctx) {
  let html = `
  ${icons.rocket}  <b>TBTC.Bot</b>  ${icons.rocket}

Thanks for coming! ${icons.v}

For now the main feature of this bot is creating subscription for ECDSA node runners (operators) to deposits state changes they serve.

To get started just send to the bot your ETH operator address, it will store in database and send notification about related to that address state changes.
Available events: 
  - deposit enters courtesy call status (when...)

Send feedback @ronmnm

<a href="https://github.com/ronmnm/TBTC.Bot">Github Repository</a>
  `
  ctx.replyWithHTML(html, Extra.webPreview(false))
}
