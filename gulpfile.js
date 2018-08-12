'use strict'

const ghelp = require('gulp-showhelp')
const { task, src, dest, series, watch } = require('gulp')
const plumber = require('gulp-plumber')
const eslint = require('gulp-eslint')
const mocha = require('gulp-mocha')
const replace = require('gulp-replace')
const del = require('del')
const path = require('path')
const fs = require('fs')
const Webidl2js = require('webidl2js')
const wptRunner = require('wpt-runner')
const wptConfig = require('./test/wpt/config')


function help (done) {
  ghelp.show()
  done()
}
help.description = 'Shows help message.'


const idlDir = path.resolve(__dirname, 'src/idl')
const implDir = path.resolve(__dirname, 'src/idl')
const tempDir = path.resolve(__dirname, 'src/idl/temp')
const outDir = path.resolve(__dirname, 'src/idl/generated')

function idl2js_prepare (done) {
  idl2js_clean().then(() => {
    fs.mkdir(tempDir, done)
  })
}

function idl2js_clean () {
  return del(tempDir, { force: true })
}

function idl2js_convert () {
  const webidl2js = new Webidl2js({
    implSuffix: '-impl',
    suppressErrors: true,
  })
  webidl2js.addSource(idlDir, implDir)
  return webidl2js.generate(tempDir)
}

function idl2js_replace () {
  return src([`${tempDir}/*.js`, '!**/utils.js'])
    .pipe(replace(
      '"./utils.js"',
      '"jsdom/lib/jsdom/living/generated/utils.js"'
    ))
    .pipe(replace(
      '"./EventTarget.js"',
      '"jsdom/lib/jsdom/living/generated/EventTarget.js"'
    ))
    .pipe(dest(outDir))
}

const idl2js =
  series(idl2js_prepare, idl2js_convert, idl2js_replace, idl2js_clean)
idl2js.displayName = 'idl2js'
idl2js.description = 'Converts WebIDLs to javascript codes.'


const tests = ['test/**/*.test.js', '!test/wpt']
const srcs = ['src/**/*.js'].concat(tests)

function lint () {
  return src(srcs)
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
}
lint.description = 'Lints js source files.'

function test () {
  return src(tests)
    .pipe(plumber())
    .pipe(mocha({ checkLeaks: true }))
}
test.description = 'Runs tests.'


function wpt () {
  const { testsDir, setup, filter } = wptConfig
  return wptRunner(testsDir, { setup, filter })
}
wpt.description = 'Runs web-platform-tests.'


function watchLint () {
  return watch(srcs, lint)
}
watchLint.displayName = 'watch:lint'
watchLint.description = 'Watches file changes, then lints.'

function watchTest () {
  return watch(srcs, series(lint, test))
}
watchTest.displayName = 'watch:test'
watchTest.description = 'Watches file changes, then lints and tests.'


const build = series(idl2js, lint, test, wpt)
build.displayName = 'default'
build.description = 'Builds this package.'


for (let fn of [
  help, idl2js, lint, test, wpt, watchLint, watchTest, build
]) {
  task(fn.displayName || fn.name, fn).help = fn.description
}
