'use strict'

const { expect } = require('chai')
const { ScreenConfig } = require('../src')

describe('screen/config', () => {

  it('Should create ScreenConfig object', () => {
    const screenConfig = new ScreenConfig()
    expect(screenConfig.width).to.equal(1024)
    expect(screenConfig.height).to.equal(768)
    expect(screenConfig.availTop).to.equal(0)
    expect(screenConfig.availLeft).to.equal(0)
    expect(screenConfig.availRight).to.equal(0)
    expect(screenConfig.availBottom).to.equal(0)
    expect(screenConfig.deviceAngle).to.equal(0)
    expect(screenConfig.screenAngle).to.equal(0)
    expect(screenConfig.baseAngle).to.equal(0)
  })

  it('Should create ScreenConfig object with initConfig', () => {
    const initConfig = {
      width: 1280, height: 1000, availBottom: 40, deviceAngle: 90
    }
    const screenConfig = new ScreenConfig(initConfig)
    expect(screenConfig.width).to.equal(1280)
    expect(screenConfig.height).to.equal(1000)
    expect(screenConfig.availTop).to.equal(0)
    expect(screenConfig.availLeft).to.equal(0)
    expect(screenConfig.availRight).to.equal(0)
    expect(screenConfig.availBottom).to.equal(40)
    expect(screenConfig.deviceAngle).to.equal(90)
    expect(screenConfig.screenAngle).to.equal(90)
    expect(screenConfig.baseAngle).to.equal(90)
  })

  it('Should be able to change property values', () => {
    const screenConfig = new ScreenConfig()

    screenConfig.width = 1280
    screenConfig.height = 1000
    screenConfig.availTop = 23
    screenConfig.availLeft = 4
    screenConfig.availRight = 4
    screenConfig.availBottom = 5

    expect(screenConfig.width).to.equal(1280)
    expect(screenConfig.height).to.equal(1000)
    expect(screenConfig.availTop).to.equal(23)
    expect(screenConfig.availLeft).to.equal(4)
    expect(screenConfig.availRight).to.equal(4)
    expect(screenConfig.availBottom).to.equal(5)
    expect(screenConfig.deviceAngle).to.equal(0)
    expect(screenConfig.screenAngle).to.equal(0)
    expect(screenConfig.baseAngle).to.equal(0)
  })

  it('Should be limitted by each property range', () => {
    const screenConfig = new ScreenConfig()

    screenConfig.width = 1280
    screenConfig.height = 1000
    screenConfig.availTop = -10
    screenConfig.availLeft = -10
    screenConfig.availRight = -10
    screenConfig.availBottom = -10

    expect(screenConfig.width).to.equal(1280)
    expect(screenConfig.height).to.equal(1000)
    expect(screenConfig.availTop).to.equal(0)
    expect(screenConfig.availLeft).to.equal(0)
    expect(screenConfig.availRight).to.equal(0)
    expect(screenConfig.availBottom).to.equal(0)
    expect(screenConfig.deviceAngle).to.equal(0)
    expect(screenConfig.screenAngle).to.equal(0)
    expect(screenConfig.baseAngle).to.equal(0)
  })

  it('Should ignore to set invalid property values', () => {
    const screenConfig = new ScreenConfig({
      width: 1000,
      height: 500,
      availTop: 10,
      availLeft: 20,
      availRight: 30,
      availBottom: 40,
    })

    expect(screenConfig.width).to.equal(1000)
    expect(screenConfig.height).to.equal(500)
    expect(screenConfig.availTop).to.equal(10)
    expect(screenConfig.availLeft).to.equal(20)
    expect(screenConfig.availRight).to.equal(30)
    expect(screenConfig.availBottom).to.equal(40)
    expect(screenConfig.deviceAngle).to.equal(0)
    expect(screenConfig.screenAngle).to.equal(0)
    expect(screenConfig.baseAngle).to.equal(0)

    screenConfig.width = undefined
    screenConfig.height = null
    screenConfig.availTop = NaN
    screenConfig.availLeft = 'a'
    screenConfig.availRight = []
    screenConfig.availBottom = {}

    expect(screenConfig.width).to.equal(1000)
    expect(screenConfig.height).to.equal(500)
    expect(screenConfig.availTop).to.equal(10)
    expect(screenConfig.availLeft).to.equal(20)
    expect(screenConfig.availRight).to.equal(30)
    expect(screenConfig.availBottom).to.equal(40)
    expect(screenConfig.deviceAngle).to.equal(0)
    expect(screenConfig.screenAngle).to.equal(0)
    expect(screenConfig.baseAngle).to.equal(0)
  })

  it('Should calculate screenAngle to 90 * n', () => {
    const screenConfig = new ScreenConfig({ deviceAngle: 90 })
    expect(screenConfig.deviceAngle).to.equal(90)
    expect(screenConfig.screenAngle).to.equal(90)
    expect(screenConfig.baseAngle).to.equal(90)
    expect(ScreenConfig.calcScreenAngle(90)).to.equal(90)

    screenConfig.deviceAngle = 0
    expect(screenConfig.deviceAngle).to.equal(0)
    expect(screenConfig.screenAngle).to.equal(0)
    expect(screenConfig.baseAngle).to.equal(90)
    expect(ScreenConfig.calcScreenAngle(0 - 90)).to.equal(270)

    screenConfig.deviceAngle = 90
    expect(screenConfig.deviceAngle).to.equal(90)
    expect(screenConfig.screenAngle).to.equal(90)
    expect(screenConfig.baseAngle).to.equal(90)
    expect(ScreenConfig.calcScreenAngle(90 - 90)).to.equal(0)


    screenConfig.deviceAngle = 180
    expect(screenConfig.deviceAngle).to.equal(180)
    expect(screenConfig.screenAngle).to.equal(180)
    expect(screenConfig.baseAngle).to.equal(90)
    expect(ScreenConfig.calcScreenAngle(180 - 90)).to.equal(90)

    screenConfig.deviceAngle = 270
    expect(screenConfig.deviceAngle).to.equal(270)
    expect(screenConfig.screenAngle).to.equal(270)
    expect(screenConfig.baseAngle).to.equal(90)
    expect(ScreenConfig.calcScreenAngle(270 - 90)).to.equal(180)

    screenConfig.deviceAngle = 360
    expect(screenConfig.deviceAngle).to.equal(360)
    expect(screenConfig.screenAngle).to.equal(0)
    expect(screenConfig.baseAngle).to.equal(90)
    expect(ScreenConfig.calcScreenAngle(0 - 90)).to.equal(270)

    screenConfig.deviceAngle = 10
    expect(screenConfig.deviceAngle).to.equal(10)
    expect(screenConfig.screenAngle).to.equal(0)
    expect(screenConfig.baseAngle).to.equal(90)
    expect(ScreenConfig.calcScreenAngle(0 - 90)).to.equal(270)

    screenConfig.deviceAngle = 100
    expect(screenConfig.deviceAngle).to.equal(100)
    expect(screenConfig.screenAngle).to.equal(90)
    expect(screenConfig.baseAngle).to.equal(90)
    expect(ScreenConfig.calcScreenAngle(90 - 90)).to.equal(0)

    screenConfig.deviceAngle = 200
    expect(screenConfig.deviceAngle).to.equal(200)
    expect(screenConfig.screenAngle).to.equal(180)
    expect(screenConfig.baseAngle).to.equal(90)
    expect(ScreenConfig.calcScreenAngle(180 - 90)).to.equal(90)

    screenConfig.deviceAngle = 300
    expect(screenConfig.deviceAngle).to.equal(300)
    expect(screenConfig.screenAngle).to.equal(270)
    expect(screenConfig.baseAngle).to.equal(90)
    expect(ScreenConfig.calcScreenAngle(270 - 90)).to.equal(180)

    screenConfig.deviceAngle = 380
    expect(screenConfig.deviceAngle).to.equal(380)
    expect(screenConfig.screenAngle).to.equal(0)
    expect(screenConfig.baseAngle).to.equal(90)
    expect(ScreenConfig.calcScreenAngle(0 - 90)).to.equal(270)

    screenConfig.deviceAngle = -10
    expect(screenConfig.deviceAngle).to.equal(-10)
    expect(screenConfig.screenAngle).to.equal(0)
    expect(screenConfig.baseAngle).to.equal(90)
    expect(ScreenConfig.calcScreenAngle(0 - 90)).to.equal(270)

    screenConfig.deviceAngle = -210
    expect(screenConfig.deviceAngle).to.equal(-210)
    expect(screenConfig.screenAngle).to.equal(180)
    expect(screenConfig.baseAngle).to.equal(90)
    expect(ScreenConfig.calcScreenAngle(180 - 90)).to.equal(90)
  })
})
