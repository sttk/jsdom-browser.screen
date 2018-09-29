'use strict'

const { expect } = require('chai')
const calcScreenAngle = require('../../src/lib/calc-screen-angle')

describe('lib/calc-screen-angle', () => {

  it('Should return 0 when -45 < deviceAngle <= 45', () => {
    for (let angle = -44; angle <= 45; angle++) {
      expect(calcScreenAngle(angle)).to.equal(0)
    }
  })


  it('Should return 90 when -135 < deviceAngle <= -45', () => {
    for (let angle = -134; angle <= -45; angle++) {
      expect(calcScreenAngle(angle)).to.equal(90)
    }
  })

  it('Should return 180 when -225 < deviceAngle < -135', () => {
    for (let angle = -224; angle < -135; angle++) {
      expect(calcScreenAngle(angle)).to.equal(180)
    }
  })

  it('Should return 270 when -315 < deviceAngle <= -225', () => {
    for (let angle = -314; angle <= -225; angle++) {
      expect(calcScreenAngle(angle)).to.equal(270)
    }
  })

  it('Should return 0 when -405 <= deviceAngle < -315', () => {
    for (let angle = -404; angle <= -315; angle++) {
      expect(calcScreenAngle(angle)).to.equal(0)
    }
  })


  it('Should return 270 when 45 < deviceAngle <= 135', () => {
    for (let angle = 46; angle <= 135; angle++) {
      expect(calcScreenAngle(angle)).to.equal(270)
    }
  })

  it('Should return 180 when 135 < deviceAngle <= 225', () => {
    for (let angle = 136; angle <= 225; angle++) {
      expect(calcScreenAngle(angle)).to.equal(180)
    }
  })

  it('Should return 90 when 225 < deviceAngle <= 315', () => {
    for (let angle = 226; angle <= 315; angle++) {
      expect(calcScreenAngle(angle)).to.equal(90)
    }
  })

  it('Should return 0 when 315 < deviceAngle <= 405', () => {
    for (let angle = 316; angle <= 405; angle++) {
      expect(calcScreenAngle(angle)).to.equal(0)
    }
  })
})
