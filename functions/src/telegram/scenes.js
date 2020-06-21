const Scene = require("telegraf/scenes/base")
const web3utils = require("web3-utils")
const { Telegraf } = require("telegraf")
const { match } = require("telegraf-i18n")
const { web3 } = require("../web3")
// const { homeScreen } = require("./commands")
const { getMainKeyboard, getBackKeyboard } = require("./keyboard")
const { Extra, Markup, Stage, session } = Telegraf

const { leave } = Stage

class ScenesGenerator {
  subscriptionsScene() {
    let subscriptions = new Scene("subscriptions")

    subscriptions.enter(async ctx => {
      const buttons = Extra.HTML().markup(m =>
        m.inlineKeyboard(
          [
            [m.callbackButton(ctx.i18n.t("buttons.courtesy"), JSON.stringify({ a: "S_TO_COURTESY" }), false)],
            [m.callbackButton(ctx.i18n.t("buttons.redemption"), JSON.stringify({ a: "S_TO_REDEMPTION" }), false)],
          ],
          {}
        )
      )
      await ctx.replyWithHTML(ctx.i18n.t("subscriptions"), buttons)
      await ctx.replyWithHTML(ctx.i18n.t("keyboards.main.subscriptions"), getBackKeyboard(ctx))
    })

    // subscriptions.leave(ctx => {
    //   let mainKeyboard = getMainKeyboard(ctx)
    //   ctx.reply("...", mainKeyboard)
    // })

    subscriptions.hears(match("keyboards.inline.back"), ctx => {
      ctx.scene.leave()
      ctx.replyWithHTML(ctx.i18n.t("start_page"), getMainKeyboard(ctx))
    })

    subscriptions.action(/S_TO_COURTESY/, async ctx => {
      ctx.scene.enter("courtesy")
      ctx.answerCbQuery()
    })

    subscriptions.on("message", ctx => ctx.reply("Select option please"))

    return subscriptions
  }

  subscribeToCourtesy() {
    let courtesy = new Scene("courtesy")
    courtesy.enter(ctx => {
      ctx.reply(ctx.i18n.t("send_courtesy_addr"), getBackKeyboard(ctx))
    })
    courtesy.hears(match("keyboards.inline.back"), ctx => {
      ctx.scene.enter("subscriptions")
    })
    courtesy.on("text", async ctx => {
      let address = ctx.message.text

      if (web3utils.isAddress(address)) {
        let balance = await web3.eth.getBalance(address)
        ctx.reply(`your address is ${address}, Balance: ${balance}`)
        // ctx.scene.leave()
      } else {
        ctx.reply(ctx.i18n.t("not_eth_address"))
      }
    })
    courtesy.on("message", ctx => ctx.reply("its not address"))
    return courtesy
  }

  
}

module.exports = ScenesGenerator
