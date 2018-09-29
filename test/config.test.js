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
      width: 1280, height: 1000, availBottom: 40, deviceAngle: -90
    }
    const screenConfig = new ScreenConfig(initConfig)
    expect(screenConfig.width).to.equal(1280)
    expect(screenConfig.height).to.equal(1000)
    expect(screenConfig.availTop).to.equal(0)
    expect(screenConfig.availLeft).to.equal(0)
    expect(screenConfig.availRight).to.equal(0)
    expect(screenConfig.availBottom).to.equal(40)
    expect(screenConfig.deviceAngle).to.equal(-90)
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
    const screenConfig = new ScreenConfig({ deviceAngle: -90 })
    expect(screenConfig.deviceAngle).to.equal(-90)
    expect(screenConfig.screenAngle).to.equal(90)
    expect(screenConfig.baseAngle).to.equal(90)

    screenConfig.deviceAngle = 0
    expect(screenConfig.deviceAngle).to.equal(0)
    expect(screenConfig.screenAngle).to.equal(0)
    expect(screenConfig.baseAngle).to.equal(90)

    screenConfig.deviceAngle = -90
    expect(screenConfig.deviceAngle).to.equal(-90)
    expect(screenConfig.screenAngle).to.equal(90)
    expect(screenConfig.baseAngle).to.equal(90)


    screenConfig.deviceAngle = -180
    expect(screenConfig.deviceAngle).to.equal(-180)
    expect(screenConfig.screenAngle).to.equal(180)
    expect(screenConfig.baseAngle).to.equal(90)

    screenConfig.deviceAngle = -270
    expect(screenConfig.deviceAngle).to.equal(-270)
    expect(screenConfig.screenAngle).to.equal(270)
    expect(screenConfig.baseAngle).to.equal(90)

    screenConfig.deviceAngle = -360
    expect(screenConfig.deviceAngle).to.equal(-360)
    expect(screenConfig.screenAngle).to.equal(0)
    expect(screenConfig.baseAngle).to.equal(90)

    screenConfig.deviceAngle = -10
    expect(screenConfig.deviceAngle).to.equal(-10)
    expect(screenConfig.screenAngle).to.equal(0)
    expect(screenConfig.baseAngle).to.equal(90)

    screenConfig.deviceAngle = -100
    expect(screenConfig.deviceAngle).to.equal(-100)
    expect(screenConfig.screenAngle).to.equal(90)
    expect(screenConfig.baseAngle).to.equal(90)

    screenConfig.deviceAngle = -200
    expect(screenConfig.deviceAngle).to.equal(-200)
    expect(screenConfig.screenAngle).to.equal(180)
    expect(screenConfig.baseAngle).to.equal(90)

    screenConfig.deviceAngle = -300
    expect(screenConfig.deviceAngle).to.equal(-300)
    expect(screenConfig.screenAngle).to.equal(270)
    expect(screenConfig.baseAngle).to.equal(90)

    screenConfig.deviceAngle = -380
    expect(screenConfig.deviceAngle).to.equal(-380)
    expect(screenConfig.screenAngle).to.equal(0)
    expect(screenConfig.baseAngle).to.equal(90)

    screenConfig.deviceAngle = 10
    expect(screenConfig.deviceAngle).to.equal(10)
    expect(screenConfig.screenAngle).to.equal(0)
    expect(screenConfig.baseAngle).to.equal(90)

    screenConfig.deviceAngle = 210
    expect(screenConfig.deviceAngle).to.equal(210)
    expect(screenConfig.screenAngle).to.equal(180)
    expect(screenConfig.baseAngle).to.equal(90)
  })

  it('Should calculate screen angle from device angle', () => {
    expect(ScreenConfig.calcScreenAngle(0)).to.equal(0)
    expect(ScreenConfig.calcScreenAngle(-90)).to.equal(90)
    expect(ScreenConfig.calcScreenAngle(-180)).to.equal(180)
    expect(ScreenConfig.calcScreenAngle(-270)).to.equal(270)
    expect(ScreenConfig.calcScreenAngle(-360)).to.equal(0)
    expect(ScreenConfig.calcScreenAngle(90)).to.equal(270)
    expect(ScreenConfig.calcScreenAngle(180)).to.equal(180)
    expect(ScreenConfig.calcScreenAngle(270)).to.equal(90)
    expect(ScreenConfig.calcScreenAngle(360)).to.equal(0)
  })

  it('Should share private data with other screen config', () => {
    const config1 = new ScreenConfig()
    const config2 = new ScreenConfig(config1)
    const config3 = new ScreenConfig(config1, { sharePrivate: true })

    expect(config1.width).to.equal(1024)
    expect(config1.height).to.equal(768)
    expect(config1.availTop).to.equal(0)
    expect(config1.availLeft).to.equal(0)
    expect(config1.availRight).to.equal(0)
    expect(config1.availBottom).to.equal(0)
    expect(config1.deviceAngle).to.equal(0)
    expect(config1.screenAngle).to.equal(0)
    expect(config1.baseAngle).to.equal(0)

    expect(config2.width).to.equal(1024)
    expect(config2.height).to.equal(768)
    expect(config2.availTop).to.equal(0)
    expect(config2.availLeft).to.equal(0)
    expect(config2.availRight).to.equal(0)
    expect(config2.availBottom).to.equal(0)
    expect(config2.deviceAngle).to.equal(0)
    expect(config2.screenAngle).to.equal(0)
    expect(config2.baseAngle).to.equal(0)

    expect(config3.width).to.equal(1024)
    expect(config3.height).to.equal(768)
    expect(config3.availTop).to.equal(0)
    expect(config3.availLeft).to.equal(0)
    expect(config3.availRight).to.equal(0)
    expect(config3.availBottom).to.equal(0)
    expect(config3.deviceAngle).to.equal(0)
    expect(config3.screenAngle).to.equal(0)
    expect(config3.baseAngle).to.equal(0)

    config1.width = 2048
    config2.height = 1600
    config3.availTop = 10
    config1.availLeft = 20
    config2.availRight = 30
    config3.availBottom = 40
    config1.deviceAngle = -100

    expect(config1.width).to.equal(2048)
    expect(config1.height).to.equal(768)
    expect(config1.availTop).to.equal(10)
    expect(config1.availLeft).to.equal(20)
    expect(config1.availRight).to.equal(0)
    expect(config1.availBottom).to.equal(40)
    expect(config1.deviceAngle).to.equal(-100)
    expect(config1.screenAngle).to.equal(90)
    expect(config1.baseAngle).to.equal(0)

    expect(config2.width).to.equal(1024)
    expect(config2.height).to.equal(1600)
    expect(config2.availTop).to.equal(0)
    expect(config2.availLeft).to.equal(0)
    expect(config2.availRight).to.equal(30)
    expect(config2.availBottom).to.equal(0)
    expect(config2.deviceAngle).to.equal(0)
    expect(config2.screenAngle).to.equal(0)
    expect(config2.baseAngle).to.equal(0)

    expect(config3.width).to.equal(2048)
    expect(config3.height).to.equal(768)
    expect(config3.availTop).to.equal(10)
    expect(config3.availLeft).to.equal(20)
    expect(config3.availRight).to.equal(0)
    expect(config3.availBottom).to.equal(40)
    expect(config3.deviceAngle).to.equal(-100)
    expect(config3.screenAngle).to.equal(90)
    expect(config3.baseAngle).to.equal(0)
  })
})
