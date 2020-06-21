const { Markup } = require("telegraf")

module.exports.getMainKeyboard = function ({ i18n }) {
  let mainKeyboard = Markup.keyboard([
    [i18n.t("keyboards.main.subscriptions"), i18n.t("keyboards.main.network_info")],
    [i18n.t("keyboards.main.about"), i18n.t("keyboards.main.faq"), i18n.t("keyboards.main.home")],
  ])
  mainKeyboard = mainKeyboard.resize().extra()
  return mainKeyboard
}


module.exports.getBackKeyboard = function ({ i18n }) {
  let backKeyboard = Markup.keyboard([[i18n.t("keyboards.inline.back")]])
  backKeyboard = backKeyboard.resize().extra()
  return backKeyboard
}

