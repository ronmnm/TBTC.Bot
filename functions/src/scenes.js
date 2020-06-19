const Scene = require("telegraf/scenes/base")
const web3utils = require("web3-utils")
const { Telegraf } = require("telegraf")
const emoji = require("node-emoji")
const web3 = require("./web3")
const { homeScreen } = require("./telegram/commands")
const { Extra, Markup, Stage, session } = Telegraf

class ScenesGenerator {
  enterAddress() {
    let address = new Scene("addr")

    address.enter(ctx => {
      // ctx.replyWithHTML()
      console.log("ctx.session.state)", ctx.session.state)
      ctx.replyWithHTML(
        `please send eth <b>address</b>`,
        // Markup.inlineKeyboard([Markup.callbackButton(`${emoji.get("arrow_left")} Back`, "back")]).extra()
        Markup.keyboard([[`${emoji.get("arrow_left")} Back`, "forward"], ["shoto"]])
          .oneTime()
          .resize()
          .extra()
      )
      // Markup.keyboard.
    })
    // address.action('back', ctx => {
    //   ctx.scene.leave()
    //   homeScreen(ctx)
    // })

    address.hears(`${emoji.get("arrow_left")} Back`, ctx => {
      ctx.scene.leave()
      homeScreen(ctx)
    })

    address.command("back", async ctx => {
      await ctx.scene.leave()
      homeScreen(ctx)
    })

    address.command("special", ctx => {
      return ctx.reply(
        "Special buttons keyboard",
        Extra.markup(markup => {
          return markup
            .resize()
            .keyboard([markup.contactRequestButton("Send contact"), markup.locationRequestButton("Send location")])
        })
      )
    })

    address.on("text", async ctx => {
      let address = ctx.message.text

      if (web3utils.isAddress(address)) {
        let balance = await web3.eth.getBalance(address)
        ctx.reply(`your address is ${address}, Balance: ${balance}`)
        ctx.scene.leave()
      } else {
        ctx.reply(`This is not eth address, try again`)
      }
    })

    address.on("message", ctx => ctx.reply("better send me an address"))

    return address
  }
}

module.exports = ScenesGenerator
