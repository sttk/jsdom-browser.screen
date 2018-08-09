'use strict'

const { ScreenConfig } = require('../../src')

const configMap = new WeakMap()

module.exports = win => {
  let screenConfig = configMap.get(win._top)
  if (!screenConfig) {
    screenConfig = new ScreenConfig()
    configMap.set(win._top, screenConfig)
  }

  screenConfig.configure(win.screen)
}
