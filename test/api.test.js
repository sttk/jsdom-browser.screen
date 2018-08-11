'use strict'

const { expect } = require('chai')
const { ScreenConfig, Screen } = require('../src')

describe('screen', () => {
  it('Should get property values specified by screenConfig', () => {
    const screenConfig = new ScreenConfig()
    const screen = Screen.create()
    screenConfig.configure(screen)

    expect(screen.width).to.equal(1024)
    expect(screen.height).to.equal(768)
    expect(screen.availLeft).to.equal(0)
    expect(screen.availTop).to.equal(0)
    expect(screen.availWidth).to.equal(1024)
    expect(screen.availHeight).to.equal(768)
    expect(screen.colorDepth).to.equal(24)
    expect(screen.pixelDepth).to.equal(24)

    expect(screen.toString()).to.equal('[object Screen]')
  })

  it('Should be raad-only properties', () => {
    const screenConfig = new ScreenConfig()
    const screen = Screen.create()
    screenConfig.configure(screen)

    screenConfig.width = 1280
    screenConfig.height = 1000
    screenConfig.availTop = 23
    screenConfig.availLeft = 5
    screenConfig.availRight = 5
    screenConfig.availBottom = 7

    expect(screen.width).to.equal(1280)
    expect(screen.height).to.equal(1000)
    expect(screen.availLeft).to.equal(5)
    expect(screen.availTop).to.equal(23)
    expect(screen.availWidth).to.equal(1270)
    expect(screen.availHeight).to.equal(970)
    expect(screen.colorDepth).to.equal(24)
    expect(screen.pixelDepth).to.equal(24)

    screen.width = 999
    screen.height = 999
    screen.availTop = 9
    screen.availLeft = 9
    screen.availWidth = 1000
    screen.availHeight = 1000
    screen.colorDepth = 99
    screen.pixelDepth = 99

    expect(screen.width).to.equal(1280)
    expect(screen.height).to.equal(1000)
    expect(screen.availLeft).to.equal(5)
    expect(screen.availTop).to.equal(23)
    expect(screen.availWidth).to.equal(1270)
    expect(screen.availHeight).to.equal(970)
    expect(screen.colorDepth).to.equal(24)
    expect(screen.pixelDepth).to.equal(24)
  })
})
