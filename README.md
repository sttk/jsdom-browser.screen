# [jsdom-browser.screen][repo-url] [![NPM][npm-img]][npm-url] [![MIT License][mit-img]][mit-url] [![WPT][wpt-img]][wpt-url] [![Build Status][travis-img]][travis-url] [![Build Status][appveyor-img]][appveyor-url] [![Coverage Status][coverage-img]][coverage-url]

The implementation of [the Screen API][spec-url] for [jsdom-browser][jsdom-browser-url].

[jsdom-browser][jsdom-browser-url] is a simulator of a Web browser with [JSDOM][jsdom-url].

> This module is implemented along the [CSSOM View Module W3C Working Draft, 17 March 2016][latest-spec-url]. This specification may become older than the [latest version][latest-spec-url].


## Install

```sh
$ npm install jsdom-browser.screen
```


## Usage

### Creates a `ScreenConfig` object

```js
const { ScreenConfig } = require('jsdom-browser.screen')

const screenConfig = new ScreenConfig({
  width: 1280,
  height: 800,
  availTop: 23,
  availLeft: 0,
  availRight: 0,
  availBottom: 0,
  deviceAngle: 90,
})
```

### Configures a `Screen` object

```js
const { JSDOM } = require('jsdom')
const window = new JSDOM().window
screenConfig.configure(window.screen)

window.screen.width  // => 1280
window.screen.height  // => 800
window.screen.availTop // => 23
window.screen.availLeft // => 0
window.screen.availWidth // => 1280
window.screen.availHeight // => 777

screenConfig.width  // => 1280
screenConfig.height  // => 800
screenConfig.availTop  // => 23
screenConfig.availLeft  // => 0
screenConfig.availRight  // => 0
screenConfig.availBottom  // => 0
screenConfig.deviceAngle  // => 90
screenConfig.screenAngle  // => 90  // calculates device angle to 90 * n (n = 0〜3)
screenConfig.baseAngle  // => 90   // is initial screen angle
```

### Rotate screen

> This function is not described in the specification, but is needed
> to implement [Screen Orientation API][orientation-spec-url].

```js
screenConfig.deviceAngle = 200

window.screen.width  // => 800
window.screen.height  // => 1280
window.screen.availTop // => 23
window.screen.availLeft // => 0
window.screen.availWidth // => 800
window.screen.availHeight // => 1257

screenConfig.width  // => 1280
screenConfig.height  // => 800
screenConfig.availTop  // => 23
screenConfig.availLeft  // => 0
screenConfig.availRight  // => 0
screenConfig.availBottom  // => 0
screenConfig.deviceAngle  // => 200
screenConfig.screenAngle  // => 180
screenConfig.baseAngle  // => 90
```


## WebIDL

> See [The Screen interface in CSSOM View Module][webidl-url].

```
interface Screen {
  readonly attribute long availWidth;
  readonly attribute long availHeight;
  readonly attribute long width;
  readonly attribute long height;
  readonly attribute unsigned long colorDepth;
  readonly attribute unsigned long pixelDepth;
};
```

## API

### <u>class Screen</u>

Is the implementation of the Screen API.

`Screen` represents information about the screen of the monitor device.

#### <u>.width : number</u>

(read only)

Is the width of the output device, in CSS pixels.

#### <u>.height : number</u>

(read only)

Is the height of the output device, in CSS pixels.

#### <u>.availTop : number</u>

(read only)

The available top position of the rendering surface of the monitor device, in CSS pixels. This property is not specified in the specification, but is supported by most browsers.

#### <u>.availLeft : number</u>

(read only)

The available left position of the rendering surface of the monitor device, in CSS pixels. This property is not specified in the specification, but is supported by most browsers.

#### <u>.availWidth : number</u>

(read only)

The available width of the rendering surface of the monitor device, in CSS pixels.

#### <u>.availHeight : number</u>

(read only)

The available height of the rendering surface of the monitor device, in CSS pixels.

#### <u>.colorDepth : number</u>

(read only)

This value is always 24. This is useless but are included for compatiility.

#### <u>.pixelDepth : number</u>

(read only)

This value is always 24. This is useless but are included for compatiility.


### <u>class ScreenConfig</u>

Is the class to configure a `Screen` object.

#### <u>*constructor* (initConfig) : ScreenConfig</u>

Creates a new instance of this class.

**Parameters:**

| Parameter    | Type                       | Description                      |
|:-------------|:--------------------------:|:---------------------------------|
| *initConfig* | object &#124; ScreenConfig | An object to initialize a new instance.|

#### <u>.width : number</u>

Is the full width of the monitor device.

#### <u>.height : number</u>

Is the full height of the monitor device.

#### <u>.availTop : number</u>

Is the top position of available area from top side of the monitor device.

#### <u>.availLeft : number</u>

Is the left position of available area from left side of the monitor device.

#### <u>.availRight : number</u>

Is the right position of available area from right side of the monitor device.

#### <u>.availBottom : number</u>

Is the bottom position of available area from right side of the monitor device.

#### <u>.deviceAngle : number</u>

Is the angle from natural orientation of the monitor device.

#### <u>.screenAngle : number</u>

(read only)

Is the angle among 0, 90, 180, 360 degrees from natural orientation of the monitor device.

#### <u>.baseAngle : number</u>

Is the initial screen angle from natural orientation of the monitor device.

## License

Copyright (C) 2018 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.


[repo-url]: https://github.com/sttk/jsdom-browser.screen/

[npm-img]: https://img.shields.io/badge/npm-v0.0.0-blue.svg
[npm-url]: https://www.npmjs.org/package/jsdom-browser.screen/

[mit-img]: https://img.shields.io/badge/license-MIT-green.svg
[mit-url]: https://opensource.org/licenses/MIT

[wpt-img]: https://img.shields.io/badge/web--platform--tests-pass-brightgreen.svg
[wpt-url]: https://github.com/web-platform-tests/wpt

[travis-img]: https://travis-ci.org/sttk/jsdom-browser.screen.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/jsdom-browser.screen

[appveyor-img]: https://ci.appveyor.com/api/projects/status/github/sttk/jsdom-browser.screen?branch=master&svg=true
[appveyor-url]: https://ci.appveyor.com/project/sttk/jsdom-browser-screen

[coverage-img]: https://coveralls.io/repos/github/sttk/jsdom-browser.screen/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/sttk/jsdom-browser.screen?branch=master

[spec-url]: https://www.w3.org/TR/2016/WD-cssom-view-1-20160317/#the-screen-interface
[webidl-url]: https://www.w3.org/TR/2016/WD-cssom-view-1-20160317/#screen
[latest-spec-url]: https://www.w3.org/TR/cssom-view-1/#the-screen-interface
[orientation-spec-url]: https://www.w3.org/TR/screen-orientation/

[jsdom-url]: https://github.com/jsdom/jsdom
[jsdom-browser-url]: https://github.com/sttk/jsdom-browser

