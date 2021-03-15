// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({28:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class Paddle {
  constructor(game) {
    this.image = document.getElementById("img_paddle");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 150;
    this.height = 20;

    this.maxSpeed = 10;
    this.speed = 0;

    this.reset();

    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10
    };
  }

  reset() {
    this.position = {
      x: this.gameWidth / 2 - this.width / 2,
      y: this.gameHeight - this.height - 10
    };
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.x += this.speed;
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;
  }
}

exports.default = Paddle;
},{}],32:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const useBall = exports.useBall = ({ position, size, speed }) => {
  const { x, y } = position;
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

const useGame = exports.useGame = ({ position, width, height }) => {
  const { x, y } = position;
  return {
    bottomOfObject: y + height,
    leftSideOfObject: x,
    rightSideOfObject: x + width,
    topOfObject: y
  };
};
},{}],29:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

function detectCollisionPaddle(ball, gameObject) {
  const { bottomOfBall, leftSideOfBall, sizeBall } = (0, _utils.useBall)(ball);
  const { leftSideOfObject, rightSideOfObject, topOfObject } = (0, _utils.useGame)(gameObject);

  let hitPosition = 0;

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
}

exports.default = detectCollisionPaddle;
},{"./utils":32}],27:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collisionDetectionPaddle = require("./collisionDetectionPaddle");

var _collisionDetectionPaddle2 = _interopRequireDefault(_collisionDetectionPaddle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Ball {
  constructor(game) {
    this.image = document.getElementById("img_ball");
    this.paddle = game.paddle;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.size = 16;
    this.reset();
    this.state = 0;
  }

  go() {
    if (this.state === 1) {
      return;
    }
    this.speed = { x: 5, y: -7 };
    this.state = 1;
  }

  reset() {
    this.position = {
      x: this.gameWidth / 2 - this.size / 2,
      y: this.gameHeight - this.size - 10
    };
    this.speed = { x: 0, y: 0 };
    this.state = 0;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
  }

  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (this.state === 0) {
      this.position.x = this.paddle.position.x + 67;
      this.position.y = this.paddle.position.y - 20;
    } else {
      // wall collision on left or right
      if (this.position.x > this.gameWidth - this.size || this.position.x < 0) {
        this.speed.x = -this.speed.x;
      }
      // wall collision on top
      if (this.position.y < 0) {
        this.speed.y = -this.speed.y;
      }

      // bottom of game
      if (this.position.y + this.size > this.gameHeight) {
        this.game.lives -= 1;
        this.reset();
        this.paddle.reset();
      }

      switch ((0, _collisionDetectionPaddle2.default)(this, this.game.paddle)) {
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
}

exports.default = Ball;
},{"./collisionDetectionPaddle":29}],31:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

function detectCollision(ball, gameObject) {
  const {
    bottomOfBall,
    leftSideOfBall,
    rightSideOfBall,
    topOfBall,
    ballSpeedX,
    ballSpeedY
  } = (0, _utils.useBall)(ball);
  const {
    bottomOfObject,
    leftSideOfObject,
    rightSideOfObject,
    topOfObject
  } = (0, _utils.useGame)(gameObject);

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
}

exports.default = detectCollision;
},{"./utils":32}],30:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collisionDetection = require("./collisionDetection");

var _collisionDetection2 = _interopRequireDefault(_collisionDetection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Brick {
  constructor(game, position, str) {
    this.image1 = document.getElementById("img_brick");
    this.image2 = document.getElementById("img_brick2");
    this.image3 = document.getElementById("img_brick3");
    this.game = game;
    this.position = position;
    this.width = 80;
    this.height = 24;
    this.str = str;
    this.markedForDeletion = false;
  }

  update() {
    switch ((0, _collisionDetection2.default)(this.game.ball, this)) {
      case 1:
        this.game.ball.speed.y = -this.game.ball.speed.y;
        if (this.str <= 1) {
          this.markedForDeletion = true;
        } else {
          this.str -= 1;
        }
        break;
      case 2:
        this.game.ball.speed.x = -this.game.ball.speed.x;
        if (this.str <= 1) {
          this.markedForDeletion = true;
        } else {
          this.str -= 1;
        }
        break;
      default:
    }
  }

  draw(ctx) {
    switch (this.str) {
      case 1:
        ctx.drawImage(this.image1, this.position.x, this.position.y, this.width, this.height);
        break;

      case 2:
        ctx.drawImage(this.image2, this.position.x, this.position.y, this.width, this.height);
        break;

      case 3:
        ctx.drawImage(this.image3, this.position.x, this.position.y, this.width, this.height);
        break;
      default:
    }
  }
}

exports.default = Brick;
},{"./collisionDetection":31}],26:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.level2 = exports.level1 = exports.buildLevel = undefined;

var _brick = require("./brick");

var _brick2 = _interopRequireDefault(_brick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildLevel = exports.buildLevel = (game, level) => {
  return level.reduce((bricks, row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      switch (brick) {
        case 1:
          bricks.push(new _brick2.default(game, {
            x: 80 * brickIndex,
            y: 75 + 24 * rowIndex
          }, 1));
          break;

        case 2:
          bricks.push(new _brick2.default(game, {
            x: 80 * brickIndex,
            y: 75 + 24 * rowIndex
          }, 2));
          break;

        case 3:
          bricks.push(new _brick2.default(game, {
            x: 80 * brickIndex,
            y: 75 + 24 * rowIndex
          }, 3));
          break;
        default:
      }
    });

    return bricks;
  }, []);
};

const level1 = exports.level1 = [[3, 3, 3, 3, 3, 3, 3, 3, 3, 3], [3, 3, 3, 3, 3, 3, 3, 3, 3, 3], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

const level2 = exports.level2 = [[3, 0, 0, 2, 2, 2, 2, 0, 0, 3], [1, 3, 0, 0, 2, 2, 0, 0, 3, 1], [1, 1, 3, 0, 0, 0, 0, 3, 1, 1], [1, 1, 1, 3, 0, 0, 3, 1, 1, 1], [1, 1, 1, 3, 0, 0, 3, 1, 1, 1], [1, 1, 1, 3, 0, 0, 3, 1, 1, 1], [1, 1, 3, 0, 0, 0, 0, 3, 1, 1], [1, 3, 0, 0, 2, 2, 0, 0, 3, 1], [3, 0, 0, 2, 2, 2, 2, 0, 0, 3]];
},{"./brick":30}],25:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _paddle = require("./paddle");

var _paddle2 = _interopRequireDefault(_paddle);

var _ball = require("./ball");

var _ball2 = _interopRequireDefault(_ball);

var _levels = require("./levels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  YOUWIN: 5
};

class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.paddle = new _paddle2.default(this);
    this.ball = new _ball2.default(this);
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 4;

    this.imglives = document.getElementById("img_lives");
    this.imgball = document.getElementById("img_ball");
    this.bg = document.getElementById("img_bg");
    this.bgMenu = document.getElementById("img_bgmenu");
    this.gameover = document.getElementById("img_gameover");
    this.youwin = document.getElementById("img_youwin");

    this.levels = [_levels.level1, _levels.level2];
    this.currentLevel = 0;

    document.addEventListener("keydown", ({ keyCode }) => {
      switch (keyCode) {
        case 37:
          this.paddle.moveLeft();
          break;

        case 39:
          this.paddle.moveRight();
          break;

        case 32:
          this.ball.go();
          break;

        case 13:
          this.togglePause();
          this.start();
          break;
        default:
      }
    });

    document.addEventListener("keyup", ({ keyCode }) => {
      switch (keyCode) {
        case 37:
          if (this.paddle.speed < 0) {
            this.paddle.stop();
          }
          break;

        case 39:
          if (this.paddle.speed > 0) {
            this.paddle.stop();
          }
          break;
        default:
      }
    });
  }

  start() {
    if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return;

    this.bricks = (0, _levels.buildLevel)(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.gameObjects = [this.ball, this.paddle];

    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

    if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER) return;

    if (this.bricks.length === 0) {
      this.currentLevel += 1;
      if (this.currentLevel > 1) {
        this.gamestate = GAMESTATE.YOUWIN;
      } else {
        this.gamestate = GAMESTATE.NEWLEVEL;
        this.start();
      }
    }

    [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));

    this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
  }

  draw(ctx) {
    ctx.drawImage(this.bg, 0, 0, this.gameWidth, this.gameHeight);
    ctx.drawImage(this.imglives, 0, 0, 100, 50);
    for (let i = 2; i <= this.lives; i += 1) {
      ctx.drawImage(this.imgball, i * 20 + 60, 17, 16, 16);
    }
    [...this.gameObjects, ...this.bricks].forEach(brick => brick.draw(ctx));

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.drawImage(this.bgMenu, 0, 0, this.gameWidth, this.gameHeight);
    }

    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.drawImage(this.gameover, 0, 0, this.gameWidth, this.gameHeight);
    }
    if (this.gamestate === GAMESTATE.YOUWIN) {
      ctx.drawImage(this.youwin, 0, 0, this.gameWidth, this.gameHeight);
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.MENU) return;
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}

exports.default = Game;
},{"./paddle":28,"./ball":27,"./levels":26}],14:[function(require,module,exports) {
"use strict";

var _game = require("./game");

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const game = new _game2.default(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
},{"./game":25}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var ws = new WebSocket('ws://localhost:49774/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
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
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,14])