const Scene = require("telegraf/scenes/base")
const web3utils = require("web3-utils")
const { Telegraf } = require("telegraf")
const { match } = require("telegraf-i18n")
const { web3 } = require("../web3")
const { getMainKeyboard, getBackKeyboard, getBackSubscrKeyboard, getDeleteInlineButton } = require("./keyboard")
const { setSubscriberToDB, getAllSubscriptionsList, deleteAddressFromDB } = require("../database")
const { Extra, Markup, Stage, session } = Telegraf

const { leave } = Stage

class ScenesGenerator {
  /**
   * Returns 'Subscriptions scene'
   */
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
      await ctx.replyWithHTML(ctx.i18n.t("keyboards.main.subscriptions"), getBackSubscrKeyboard(ctx))
    })

    // Go back to start page
    subscriptions.hears(match("keyboards.inline.back"), ctx => {
      ctx.scene.leave()
      ctx.replyWithHTML(ctx.i18n.t("start_page"), getMainKeyboard(ctx))
    })

    // Get subscriptions list
    subscriptions.hears(match("keyboards.inline.my_subscriptions"), async ctx => {
      let id = ctx.from.id
      try {
        let courtesySubscriptions = await getAllSubscriptionsList(ctx, "CourtesyT")
        let filteredSubscriptions = courtesySubscriptions.filter(item => id === item.data.userId)
        
        if (filteredSubscriptions.length > 0) {
          filteredSubscriptions.forEach(item => {
            ctx.replyWithHTML(
              ctx.i18n.t("courtesy_subscr_title") + ` <code>${item.docId}</code>`, // docId is eth account
              getDeleteInlineButton(ctx, Extra, item.docId, 1) // 1 - CourtesyT collection
            ) 
          })
        } else {
          ctx.reply("You don't have any subscriptions yet.")
        }
      } catch (err) {
        console.log(err)
        ctx.reply("Error when getting subscription list")
      }
    })

    //
    subscriptions.action(/S_TO_COURTESY/, async ctx => {
      ctx.scene.enter("courtesy")
      ctx.answerCbQuery()
    })
    subscriptions.action(/D/, async ctx => { // D - delete
      try {
        await deleteAddressFromDB(ctx)
        ctx.reply('Successfully deleted')
      } catch (err) {
        console.log(err)
        ctx.reply('Something went wrong...')
      }
      
      ctx.answerCbQuery()
    })


    subscriptions.on("message", ctx => ctx.reply("Select option please"))

    return subscriptions
  }

  /**
   * Subscribe to courtesy calls scene
   */
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
        try {
          await setSubscriberToDB(ctx, "CourtesyT", address)
          ctx.reply(ctx.i18n.t("congrats"))
        } catch (err) {
          console.log("Error when setting data to firestore", err)
          ctx.reply("Something went wrong...")
        }
      } else {
        ctx.reply(ctx.i18n.t("not_eth_address"))
      }
    })
    courtesy.on("message", ctx => ctx.reply(ctx.i18n.t("not_eth_address")))
    return courtesy
  }
}

module.exports.ScenesGenerator = ScenesGenerator
