const { Markup } = require("telegraf")

/**
 * Returns main keyboard
 * @param {Object} ctx.i18n library context
 */
module.exports.getMainKeyboard = function ({ i18n }) {
  let mainKeyboard = Markup.keyboard([
    [i18n.t("keyboards.main.subscriptions"), i18n.t("keyboards.main.network_info")],
    [i18n.t("keyboards.main.about"), i18n.t("keyboards.main.faq"), i18n.t("keyboards.main.home")],
  ])
  mainKeyboard = mainKeyboard.resize().extra()
  return mainKeyboard
}

/**
 * Returns back keyboard
 * @param {Object} ctx.i18n library context
 */
module.exports.getBackKeyboard = function ({ i18n }) {
  let backKeyboard = Markup.keyboard([[i18n.t("keyboards.inline.back")]])
  backKeyboard = backKeyboard.resize().extra()
  return backKeyboard
}

/**
 * Returns back + 'show subscriptions' keyboard
 * @param {Object} ctx.i18n library context
 */
module.exports.getBackSubscrKeyboard = function ({ i18n }) {
  let backKeyboard = Markup.keyboard([[i18n.t("keyboards.inline.back"), i18n.t("keyboards.inline.my_subscriptions")]])
  backKeyboard = backKeyboard.resize().extra()
  return backKeyboard
}

/**
 * Function returns inline keyboard (button) 'Delete'
 * @param {Object} ctx - context object
 * @param {Object?} Extra - Extra from Telegraf.js
 */
module.exports.getDeleteInlineButton = function (ctx, Extra, address, collectionName) {
  const deleteButton = Extra.HTML().markup(m =>
    m.inlineKeyboard(
      [
        [
          m.callbackButton(
            ctx.i18n.t("buttons.delete_from_db"),
            JSON.stringify({ a:"D", p: address, c: collectionName}), // 64 bytes, D - delete
            false
          ),
        ],
      ],
      {}
    )
  )
  return deleteButton
}
