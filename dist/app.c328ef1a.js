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
})({"js/utils.js":[function(require,module,exports) {
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

var detectCollision = function detectCollision(ball, gameObject) {
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

exports.detectCollision = detectCollision;

var detectCollisionPaddle = function detectCollisionPaddle(ball, gameObject) {
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

exports.detectCollisionPaddle = detectCollisionPaddle;

var reset = function reset(_ref3) {
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

exports.reset = reset;
},{}],"js/Paddle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

  _createClass(Paddle, [{
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

  return Paddle;
}();

var _default = Paddle;
exports.default = _default;
},{"./utils":"js/utils.js"}],"js/Ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ball = /*#__PURE__*/function () {
  function Ball(game) {
    _classCallCheck(this, Ball);

    this.game = game;
    this.size = 16;
    this.reset();
    this.state = 0;
  }

  _createClass(Ball, [{
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
        } // wall collision on top


        if (this.position.y < 0) {
          this.speed.y = -this.speed.y;
        } // bottom of game


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

  return Ball;
}();

var _default = Ball;
exports.default = _default;
},{"./utils":"js/utils.js"}],"js/Brick.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

  _createClass(Brick, [{
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

  return Brick;
}();

var _default = Brick;
exports.default = _default;
},{"./utils":"js/utils.js"}],"js/buildLevel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildLevel = void 0;

var _Brick = _interopRequireDefault(require("./Brick"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var LEVELS_ARRAY = [[[3, 3, 3, 3, 3, 3, 3, 3, 3, 3], [3, 3, 3, 3, 3, 3, 3, 3, 3, 3], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]], [[3, 0, 0, 2, 2, 2, 2, 0, 0, 3], [1, 3, 0, 0, 2, 2, 0, 0, 3, 1], [1, 1, 3, 0, 0, 0, 0, 3, 1, 1], [1, 1, 1, 3, 0, 0, 3, 1, 1, 1], [1, 1, 1, 3, 0, 0, 3, 1, 1, 1], [1, 1, 1, 3, 0, 0, 3, 1, 1, 1], [1, 1, 3, 0, 0, 0, 0, 3, 1, 1], [1, 3, 0, 0, 2, 2, 0, 0, 3, 1], [3, 0, 0, 2, 2, 2, 2, 0, 0, 3]]];

var buildLevel = function buildLevel(game, currentLevelNumber) {
  return LEVELS_ARRAY[currentLevelNumber].reduce(function (bricks, row, rowIndex) {
    return row.reduce(function (all, brick, brickIndex) {
      return [].concat(_toConsumableArray(all), [new _Brick.default(game, {
        x: 80 * brickIndex,
        y: 75 + 24 * rowIndex
      }, brick)]);
    }, bricks);
  }, []);
};

exports.buildLevel = buildLevel;
},{"./Brick":"js/Brick.js"}],"js/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Paddle = _interopRequireDefault(require("./Paddle"));

var _Ball = _interopRequireDefault(require("./Ball"));

var _buildLevel = require("./buildLevel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

  _createClass(Game, [{
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

  return Game;
}();

var _default = Game;
exports.default = _default;
},{"./Paddle":"js/Paddle.js","./Ball":"js/Ball.js","./buildLevel":"js/buildLevel.js"}],"app.js":[function(require,module,exports) {
"use strict";

var _Game = _interopRequireDefault(require("./js/Game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
},{"./js/Game":"js/Game.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51054" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map