// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"MgTz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset = exports.detectCollisionPaddle = exports.detectCollision = void 0;
var useBall = function useBall(_ref) {
  var position = _ref.position,
    size = _ref.size,
    speed = _ref.speed;
  var x = position.x,
    y = position.y;
  return {
    sizeBall: size,
    bottomOfBall: y + size,
    leftSideOfBall: x,
    rightSideOfBall: x + size,
    topOfBall: y,
    ballSpeedX: speed.x,
    ballSpeedY: speed.y
  };
};
var useGame = function useGame(_ref2) {
  var position = _ref2.position,
    width = _ref2.width,
    height = _ref2.height;
  var x = position.x,
    y = position.y;
  return {
    bottomOfObject: y + height,
    leftSideOfObject: x,
    rightSideOfObject: x + width,
    topOfObject: y
  };
};
var detectCollision = exports.detectCollision = function detectCollision(ball, gameObject) {
  var _useBall = useBall(ball),
    bottomOfBall = _useBall.bottomOfBall,
    leftSideOfBall = _useBall.leftSideOfBall,
    rightSideOfBall = _useBall.rightSideOfBall,
    topOfBall = _useBall.topOfBall,
    ballSpeedX = _useBall.ballSpeedX,
    ballSpeedY = _useBall.ballSpeedY;
  var _useGame = useGame(gameObject),
    bottomOfObject = _useGame.bottomOfObject,
    leftSideOfObject = _useGame.leftSideOfObject,
    rightSideOfObject = _useGame.rightSideOfObject,
    topOfObject = _useGame.topOfObject;
  if (bottomOfBall >= topOfObject && topOfBall <= bottomOfObject && rightSideOfBall >= leftSideOfObject && leftSideOfBall <= rightSideOfObject) {
    if (ballSpeedX >= 0 && ballSpeedY < 0 && bottomOfObject - topOfBall < rightSideOfBall - leftSideOfObject || ballSpeedX <= 0 && ballSpeedY < 0 && bottomOfObject - topOfBall < rightSideOfObject - leftSideOfBall || ballSpeedX >= 0 && ballSpeedY > 0 && bottomOfBall - topOfObject < rightSideOfBall - leftSideOfObject || ballSpeedX <= 0 && ballSpeedY > 0 && bottomOfBall - topOfObject < rightSideOfObject - leftSideOfBall) {
      console.log("caso Y");
      return 1;
    }
    if (ballSpeedX > 0 && ballSpeedY <= 0 && bottomOfObject - topOfBall > rightSideOfBall - leftSideOfObject || ballSpeedX < 0 && ballSpeedY <= 0 && bottomOfObject - topOfBall > rightSideOfObject - leftSideOfBall || ballSpeedX > 0 && ballSpeedY >= 0 && bottomOfBall - topOfObject > rightSideOfBall - leftSideOfObject || ballSpeedX < 0 && ballSpeedY >= 0 && bottomOfBall - topOfObject > rightSideOfObject - leftSideOfBall) {
      console.log("caso X");
      return 2;
    }
  }
  return false;
};
var detectCollisionPaddle = exports.detectCollisionPaddle = function detectCollisionPaddle(ball, gameObject) {
  var _useBall2 = useBall(ball),
    bottomOfBall = _useBall2.bottomOfBall,
    leftSideOfBall = _useBall2.leftSideOfBall,
    sizeBall = _useBall2.sizeBall;
  var _useGame2 = useGame(gameObject),
    leftSideOfObject = _useGame2.leftSideOfObject,
    rightSideOfObject = _useGame2.rightSideOfObject,
    topOfObject = _useGame2.topOfObject;
  var hitPosition = 0;
  if (bottomOfBall >= topOfObject && leftSideOfBall + sizeBall >= leftSideOfObject && leftSideOfBall <= rightSideOfObject) {
    hitPosition = leftSideOfBall - leftSideOfObject;
    if (hitPosition <= 20) {
      return 1;
    }
    if (hitPosition > 20 && hitPosition <= 50) {
      return 2;
    }
    if (hitPosition > 50 && hitPosition <= 75) {
      return 3;
    }
    if (hitPosition > 75 && hitPosition <= 100) {
      return 4;
    }
    if (hitPosition > 100 && hitPosition <= 130) {
      return 5;
    }
    if (hitPosition >= 130) {
      return 6;
    }
  }
  return 0;
};
var reset = exports.reset = function reset(_ref3) {
  var gameWidth = _ref3.gameWidth,
    gameHeight = _ref3.gameHeight,
    width = _ref3.width,
    height = _ref3.height;
  console.log({
    gameWidth: gameWidth,
    gameHeight: gameHeight,
    width: width,
    height: height
  });
  return {
    x: gameWidth / 2 - width / 2,
    y: gameHeight - height - 10
  };
};
},{}],"LNJM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("./utils");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Paddle = /*#__PURE__*/function () {
  function Paddle(_ref) {
    var gameWidth = _ref.gameWidth,
      gameHeight = _ref.gameHeight;
    _classCallCheck(this, Paddle);
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 150;
    this.height = 20;
    this.maxSpeed = 10;
    this.speed = 0;
    this.reset();
    this.position = (0, _utils.reset)({
      gameWidth: gameWidth,
      gameHeight: gameHeight,
      width: this.width,
      height: this.height
    });
  }
  return _createClass(Paddle, [{
    key: "reset",
    value: function reset() {
      this.position = (0, _utils.reset)({
        gameWidth: this.gameWidth,
        gameHeight: this.gameHeight,
        width: this.width,
        height: this.height
      });
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this.speed = -this.maxSpeed;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.speed = this.maxSpeed;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.speed = 0;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(document.getElementById("img_paddle"), this.position.x, this.position.y, this.width, this.height);
    }
  }, {
    key: "update",
    value: function update() {
      this.position.x += this.speed;
      if (this.position.x < 0) {
        this.position.x = 0;
      }
      if (this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;
    }
  }]);
}();
var _default = exports.default = Paddle;
},{"./utils":"MgTz"}],"oWfU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("./utils");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Ball = /*#__PURE__*/function () {
  function Ball(game) {
    _classCallCheck(this, Ball);
    this.game = game;
    this.size = 16;
    this.reset();
    this.state = 0;
  }
  return _createClass(Ball, [{
    key: "go",
    value: function go() {
      if (this.state === 1) {
        return;
      }
      this.speed = {
        x: 5,
        y: -7
      };
      this.state = 1;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.position = (0, _utils.reset)(_objectSpread(_objectSpread({}, this.game), {}, {
        width: this.size,
        height: this.size
      }));
      this.speed = {
        x: 0,
        y: 0
      };
      this.state = 0;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(document.getElementById("img_ball"), this.position.x, this.position.y, this.size, this.size);
    }
  }, {
    key: "update",
    value: function update() {
      this.position.x += this.speed.x;
      this.position.y += this.speed.y;
      if (this.state === 0) {
        this.position.x = this.game.paddle.position.x + 67;
        this.position.y = this.game.paddle.position.y - 20;
      } else {
        // wall collision on left or right
        if (this.position.x > this.game.gameWidth - this.size || this.position.x < 0) {
          this.speed.x = -this.speed.x;
        }
        // wall collision on top
        if (this.position.y < 0) {
          this.speed.y = -this.speed.y;
        }

        // bottom of game
        if (this.position.y + this.size > this.game.gameHeight) {
          this.game.lives -= 1;
          this.reset();
          this.game.paddle.reset();
        }
        switch ((0, _utils.detectCollisionPaddle)(this, this.game.paddle)) {
          case 1:
            this.speed.x = -9;
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
            break;
          case 2:
            if (this.speed.x < 0) {
              this.speed.x = -6;
            } else {
              this.speed.x += -6;
            }
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
            break;
          case 3:
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
            break;
          case 4:
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
            break;
          case 5:
            if (this.speed.x > 0) {
              this.speed.x = 6;
            } else {
              this.speed.x += 6;
            }
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
            break;
          case 6:
            this.speed.x = 9;
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
            break;
          default:
        }
      }
    }
  }]);
}();
var _default = exports.default = Ball;
},{"./utils":"MgTz"}],"ZVAT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("./utils");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Brick = /*#__PURE__*/function () {
  function Brick(game, position, str) {
    _classCallCheck(this, Brick);
    this.game = game;
    this.position = position;
    this.width = 80;
    this.height = 24;
    this.str = str;
    this.markedForDeletion = false;
  }
  return _createClass(Brick, [{
    key: "update",
    value: function update() {
      var _this = this;
      var initUpdate = function initUpdate(cord) {
        _this.game.ball.speed[cord] = -_this.game.ball.speed[cord];
        if (_this.str <= 1) {
          _this.markedForDeletion = true;
        } else {
          _this.str -= 1;
        }
      };
      switch ((0, _utils.detectCollision)(this.game.ball, this)) {
        case 1:
          initUpdate("y");
          break;
        case 2:
          initUpdate("x");
          break;
        default:
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(document.getElementById("img_brick".concat(this.str)), this.position.x, this.position.y, this.width, this.height);
    }
  }]);
}();
var _default = exports.default = Brick;
},{"./utils":"MgTz"}],"A3yf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildLevel = void 0;
var _Brick = _interopRequireDefault(require("./Brick"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var LEVELS_ARRAY = [[[3, 3, 3, 3, 3, 3, 3, 3, 3, 3], [3, 3, 3, 3, 3, 3, 3, 3, 3, 3], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]], [[3, 0, 0, 2, 2, 2, 2, 0, 0, 3], [1, 3, 0, 0, 2, 2, 0, 0, 3, 1], [1, 1, 3, 0, 0, 0, 0, 3, 1, 1], [1, 1, 1, 3, 0, 0, 3, 1, 1, 1], [1, 1, 1, 3, 0, 0, 3, 1, 1, 1], [1, 1, 1, 3, 0, 0, 3, 1, 1, 1], [1, 1, 3, 0, 0, 0, 0, 3, 1, 1], [1, 3, 0, 0, 2, 2, 0, 0, 3, 1], [3, 0, 0, 2, 2, 2, 2, 0, 0, 3]]];
var buildLevel = exports.buildLevel = function buildLevel(game, currentLevelNumber) {
  return LEVELS_ARRAY[currentLevelNumber].reduce(function (bricks, row, rowIndex) {
    return row.reduce(function (all, brick, brickIndex) {
      return [].concat(_toConsumableArray(all), [new _Brick.default(game, {
        x: 80 * brickIndex,
        y: 75 + 24 * rowIndex
      }, brick)]);
    }, bricks);
  }, []);
};
},{"./Brick":"ZVAT"}],"xCaP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Paddle = _interopRequireDefault(require("./Paddle"));
var _Ball = _interopRequireDefault(require("./Ball"));
var _buildLevel = require("./buildLevel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  YOUWIN: 5
};
var PAUSED = GAMESTATE.PAUSED,
  RUNNING = GAMESTATE.RUNNING,
  MENU = GAMESTATE.MENU,
  GAMEOVER = GAMESTATE.GAMEOVER,
  NEWLEVEL = GAMESTATE.NEWLEVEL,
  YOUWIN = GAMESTATE.YOUWIN;
var Game = /*#__PURE__*/function () {
  function Game(gameWidth, gameHeight) {
    var _this = this;
    _classCallCheck(this, Game);
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = MENU;
    this.paddle = new _Paddle.default(this);
    this.ball = new _Ball.default(this);
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 4;
    this.currentLevelNumber = 0;
    document.addEventListener("keydown", function (_ref) {
      var keyCode = _ref.keyCode;
      switch (keyCode) {
        case 37:
          _this.paddle.moveLeft();
          break;
        case 39:
          _this.paddle.moveRight();
          break;
        case 32:
          _this.ball.go();
          break;
        case 13:
          _this.togglePause();
          _this.start();
          break;
        default:
      }
    });
    document.addEventListener("keyup", function (_ref2) {
      var keyCode = _ref2.keyCode;
      switch (keyCode) {
        case 37:
          if (_this.paddle.speed < 0) {
            _this.paddle.stop();
          }
          break;
        case 39:
          if (_this.paddle.speed > 0) {
            _this.paddle.stop();
          }
          break;
        default:
      }
    });
  }
  return _createClass(Game, [{
    key: "start",
    value: function start() {
      if (this.gamestate !== MENU && this.gamestate !== NEWLEVEL) {
        return;
      }
      this.bricks = (0, _buildLevel.buildLevel)(this, this.currentLevelNumber);
      this.ball.reset();
      this.gameObjects = [this.ball, this.paddle];
      this.gamestate = RUNNING;
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      if (this.lives === 0) {
        this.gamestate = GAMEOVER;
      }
      if (this.gamestate === PAUSED || this.gamestate === MENU || this.gamestate === GAMEOVER) return;
      if (this.bricks.length === 0) {
        this.currentLevelNumber += 1;
        if (this.currentLevelNumber > 1) {
          this.gamestate = YOUWIN;
        } else {
          this.gamestate = NEWLEVEL;
          this.start();
        }
      }
      [].concat(_toConsumableArray(this.gameObjects), _toConsumableArray(this.bricks)).forEach(function (object) {
        return object.update(deltaTime);
      });
      this.bricks = this.bricks.filter(function (brick) {
        return !brick.markedForDeletion;
      });
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      var _this2 = this;
      var drawIt = function drawIt(id) {
        ctx.drawImage(document.getElementById(id), 0, 0, _this2.gameWidth, _this2.gameHeight);
      };
      drawIt("img_bg");
      ctx.drawImage(document.getElementById("img_lives"), 0, 0, 100, 50);
      for (var i = 2; i <= this.lives; i += 1) {
        ctx.drawImage(document.getElementById("img_ball"), i * 20 + 60, 17, 16, 16);
      }
      [].concat(_toConsumableArray(this.gameObjects), _toConsumableArray(this.bricks)).forEach(function (brick) {
        return brick.draw(ctx);
      });
      if (this.gamestate === PAUSED) {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
      }
      if (this.gamestate === MENU) {
        drawIt("img_bgmenu");
      }
      if (this.gamestate === GAMEOVER) {
        drawIt("img_gameover");
      }
      if (this.gamestate === YOUWIN) {
        drawIt("img_youwin");
      }
    }
  }, {
    key: "togglePause",
    value: function togglePause() {
      if (this.gamestate === MENU) {
        return;
      }
      this.gamestate = this.gamestate === PAUSED ? RUNNING : PAUSED;
    }
  }]);
}();
var _default = exports.default = Game;
},{"./Paddle":"LNJM","./Ball":"oWfU","./buildLevel":"A3yf"}],"A2T1":[function(require,module,exports) {
"use strict";

var _Game = _interopRequireDefault(require("./js/Game"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var game = new _Game.default(GAME_WIDTH, GAME_HEIGHT);
var lastTime = 0;
function gameLoop(timestamp) {
  var deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime);
  game.draw(ctx);
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
},{"./js/Game":"xCaP"}]},{},["A2T1"], null)
//# sourceMappingURL=app.9fd2d2b9.js.map