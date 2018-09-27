'use strict'

const { ScreenConfig } = require('../../src')
const Config = require('class-config-base')

const $configManager = new Config.Manager()

module.exports = win => {
  let screenConfig
  const rootScreen = win._top.screen
  const rootScreenConfig = $configManager.getConfig(rootScreen)
  if (rootScreenConfig) {
    screenConfig = new ScreenConfig(rootScreenConfig, { sharePrivate: true })
  } else {
    screenConfig = new ScreenConfig({ $configManager })
  }
  screenConfig.configure(win.screen)
}
