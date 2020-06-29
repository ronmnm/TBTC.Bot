require("dotenv").config()
const { functions } = require("../../firebase")
const Telegraf = require("telegraf")
const TelegrafI18n = require("telegraf-i18n")
const path = require("path")
const { Extra, Markup, Stage, session } = Telegraf
const ScenesGenerator = require("./scenes")
const { depositCreatedListener } = require("../web3")
const { getMainKeyboard } = require("./keyboard")

// '1272748726:AAG4bGLDqTxQ1oOZTxOd91YS06nemUkrzSk' || 
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

const i18n = new TelegrafI18n({
  defaultLanguage: "en",
  allowMissing: false, // Default true
  directory: path.resolve(__dirname, "locales"),
  useSession: true,
})

bot.use(Telegraf.log())

let scenesGenerator = new ScenesGenerator()
const subscribeToCourtesy = scenesGenerator.subscribeToCourtesy()
const subscriptionsScene = scenesGenerator.subscriptionsScene()

const stage = new Telegraf.Stage([subscribeToCourtesy, subscriptionsScene])

bot.use(Telegraf.session())
bot.use(i18n.middleware())
bot.use(stage.middleware())

// START

bot.start(async ctx => {
  await ctx.replyWithHTML(ctx.i18n.t("greeting"))
  await ctx.replyWithHTML(ctx.i18n.t("start_page"), getMainKeyboard(ctx))
})

bot.hears(TelegrafI18n.match("keyboards.main.subscriptions"), ctx => {
  ctx.scene.enter("subscriptions")
})
bot.hears(TelegrafI18n.match("keyboards.main.network_info"), ctx => ctx.reply("network info here"))
bot.hears(TelegrafI18n.match("keyboards.main.about"), ctx => {
  let inlineKeyboard = Extra.markup(m =>
    m.inlineKeyboard([m.urlButton(ctx.i18n.t("keyboards.inline.github"), ctx.i18n.t("github_link"))])
  )
  ctx.replyWithHTML(ctx.i18n.t("about"), inlineKeyboard)
})
bot.hears(TelegrafI18n.match("keyboards.main.faq"), ctx => ctx.replyWithHTML(ctx.i18n.t("faq"), Extra.webPreview(false)))
bot.hears(TelegrafI18n.match("keyboards.main.home"), ctx => ctx.replyWithHTML(ctx.i18n.t("start_page")))


// bot.launch()

exports.botFunction = functions.https.onRequest(async (req, res) => {
  // console.log('req.body!!!!!!!!!!!!!!', req.body);
  bot
    .handleUpdate(req.body, res)
    .then(rv => {
      !rv && res.sendStatus(200)
      return res.end()
    })
    .catch(err => {
      console.error(err)
      return res.end()
    })
    

    // try {
    //   await bot.handleUpdate(req.body, res);
    // } catch (err) {
    //   console.log(err);
    //   res.sendStatus(500);
    // }
})
