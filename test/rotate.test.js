'use strict'

const { expect } = require('chai')
const { Screen, ScreenConfig } = require('../src')

describe('Rotate screen', () => {
  it('Should change screen size according with device angle', () => {
    const screenConfig = new ScreenConfig({
      width: 1280,
      height: 1000,
      availTop: 23,
      availBottom: 56,
      availLeft: 4,
      availRight: 6,
      deviceAngle: -90,
    })
    const screen = Screen.create()
    screenConfig.configure(screen)

    expect(screen.width).to.equal(1280)
    expect(screen.height).to.equal(1000)
    expect(screen.availTop).to.equal(23)
    expect(screen.availLeft).to.equal(4)
    expect(screen.availWidth).to.equal(1280 - 4 - 6)
    expect(screen.availHeight).to.equal(1000 - 23 - 56)

    screenConfig.deviceAngle = 15
    expect(screenConfig.screenAngle).to.equal(0)
    expect(screenConfig.baseAngle).to.equal(270)

    expect(screen.width).to.equal(1000)
    expect(screen.height).to.equal(1280)
    expect(screen.availTop).to.equal(23)
    expect(screen.availLeft).to.equal(4)
    expect(screen.availWidth).to.equal(1000 - 4 - 6)
    expect(screen.availHeight).to.equal(1280 - 23 - 56)

    screenConfig.deviceAngle = 98
    expect(screenConfig.screenAngle).to.equal(90)
    expect(screenConfig.baseAngle).to.equal(270)

    expect(screen.width).to.equal(1280)
    expect(screen.height).to.equal(1000)
    expect(screen.availTop).to.equal(23)
    expect(screen.availLeft).to.equal(4)
    expect(screen.availWidth).to.equal(1280 - 4 - 6)
    expect(screen.availHeight).to.equal(1000 - 23 - 56)

    screenConfig.deviceAngle = 224
    expect(screenConfig.screenAngle).to.equal(180)
    expect(screenConfig.baseAngle).to.equal(270)

    expect(screen.width).to.equal(1000)
    expect(screen.height).to.equal(1280)
    expect(screen.availTop).to.equal(23)
    expect(screen.availLeft).to.equal(4)
    expect(screen.availWidth).to.equal(1000 - 4 - 6)
    expect(screen.availHeight).to.equal(1280 - 23 - 56)

    screenConfig.deviceAngle = 245
    expect(screenConfig.screenAngle).to.equal(270)
    expect(screenConfig.baseAngle).to.equal(270)

    expect(screen.width).to.equal(1280)
    expect(screen.height).to.equal(1000)
    expect(screen.availTop).to.equal(23)
    expect(screen.availLeft).to.equal(4)
    expect(screen.availWidth).to.equal(1280 - 4 - 6)
    expect(screen.availHeight).to.equal(1000 - 23 - 56)
  })
})
