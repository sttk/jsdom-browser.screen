"use strict";

// https://www.w3.org/TR/cssom-view-1/#screen
class ScreenImpl {}

ScreenImpl.prototype.availWidth = 0;
ScreenImpl.prototype.availHeight = 0;
ScreenImpl.prototype.width = 0;
ScreenImpl.prototype.height = 0;
ScreenImpl.prototype.colorDepth = 24;
ScreenImpl.prototype.pixelDepth = 24;

exports.implementation = ScreenImpl;

