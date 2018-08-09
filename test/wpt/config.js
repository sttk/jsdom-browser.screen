'use strict'

const path = require('path')

const setup = require('./setup')

const testcases = require('./testcases')
const testsDir = path.resolve(__dirname, 'tests/css/cssom-view')
const filter = testPath => Boolean(testcases[testPath])

module.exports = { setup, filter, testsDir }
