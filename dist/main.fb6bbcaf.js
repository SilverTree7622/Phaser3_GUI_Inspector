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
})({"js/gui/TypeSortManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// sort obj type, pointer over properties
var TypeSortManager =
/*#__PURE__*/
function () {
  function TypeSortManager() {
    _classCallCheck(this, TypeSortManager);
  } // _EXTERNAL_


  _createClass(TypeSortManager, [{
    key: "chckObjType",
    value: function chckObjType(_custom, _idx, _folderInCustom, _gameObj) {
      // check each of objs type
      var tmpType = _gameObj.type;
      this.createBack2BasicFunc(_idx, _folderInCustom, _gameObj);

      switch (tmpType) {
        case 'Image':
          this.createListImage(_idx, _folderInCustom, _gameObj);
          break;

        case 'Sprite':
          this.createListSprite(_idx, _folderInCustom, _gameObj);
          break;

        case 'Text':
          this.createListText(_idx, _folderInCustom, _gameObj);
          break;

        case 'Graphics':
          this.createGraphics(_idx, _folderInCustom, _gameObj);
          break;

        case 'Container':
          this.createContainer(_idx, _folderInCustom, _gameObj);
          break;

        case 'Arc':
          console.log('Arc:', _gameObj); // this.createAracdeBodySprite(_idx, _folderInCustom, _gameObj);

          break;
        // + etc

        default:
          console.warn(tmpType, '<= this is not on the type options');
          break;
      }
    } // pointer over texture sorting

  }, {
    key: "setTextureProperty",
    value: function setTextureProperty(_gameObj) {
      var tmpType = _gameObj.type;
      var tmpReturn = undefined;

      switch (tmpType) {
        case 'Image':
        case 'Sprite':
          tmpReturn = _gameObj.texture.key;
          break;

        case 'Text':
          tmpReturn = _gameObj.text;
          break;

        case 'Graphics':
        case 'Arc':
          console.log('object:', _gameObj);
          break;

        default:
          console.log(tmpType, '<= this is not on the options');
          break;
      }

      return tmpReturn;
    }
  }, {
    key: "createBack2BasicFunc",
    value: function createBack2BasicFunc(_idx, _folderInCustom, _gameObj) {
      // create back 2 basic function
      _folderInCustom.add(_gameObj, 'GUI_BACK_2_BASIC');
    }
  }, {
    key: "createListImage",
    value: function createListImage(_idx, _folderInCustom, _gameObj) {
      // also check what type of Physics
      console.log('IMAGE type:', _gameObj);
      var tmpType = _gameObj.body ? true : false;

      _folderInCustom.add(_gameObj, 'name');

      this.chckPhysicsType(tmpType, _folderInCustom, _gameObj);

      _folderInCustom.add(_gameObj.texture, 'key').listen();

      this.createCommon(_idx, _folderInCustom, _gameObj);
      this.chckPhysicsBody(tmpType, _folderInCustom, _gameObj);
    }
  }, {
    key: "createListSprite",
    value: function createListSprite(_idx, _folderInCustom, _gameObj) {
      console.log('SPRITE type:', _gameObj);

      _folderInCustom.add(_gameObj, 'name');

      _folderInCustom.add(_gameObj, 'type');

      _folderInCustom.add(_gameObj.texture, 'key').listen();

      _folderInCustom.add(_gameObj, '_displayOriginX').listen();

      _folderInCustom.add(_gameObj, '_displayOriginY').listen();

      _folderInCustom.add(_gameObj, 'originX').listen();

      _folderInCustom.add(_gameObj, 'originY').listen();

      _folderInCustom.add(_gameObj, 'z').listen();

      _folderInCustom.add(_gameObj, 'w').listen();

      this.createCommon(_idx, _folderInCustom, _gameObj);
      this.createAnims(_idx, _folderInCustom, _gameObj);
    }
  }, {
    key: "createListText",
    value: function createListText(_idx, _folderInCustom, _gameObj) {
      console.log('TEXT type:', _gameObj);
      var tmpType = _gameObj.body ? true : false;

      _folderInCustom.add(_gameObj, 'name');

      this.chckPhysicsType(tmpType, _folderInCustom, _gameObj);

      _folderInCustom.add(_gameObj, 'text').listen();

      this.createCommon(_idx, _folderInCustom, _gameObj);
      this.chckPhysicsBody(tmpType, _folderInCustom, _gameObj);
    }
  }, {
    key: "createGraphics",
    value: function createGraphics(_idx, _folderInCustom, _gameObj) {
      console.log('GRAPHICS type:', _gameObj);

      _folderInCustom.add(_gameObj, 'name');

      _folderInCustom.add(_gameObj, 'type');

      _folderInCustom.add(_gameObj, 'alpha').listen();

      _folderInCustom.add(_gameObj, 'scale').listen();

      _folderInCustom.add(_gameObj, 'angle').listen();

      _folderInCustom.add(_gameObj, 'rotation').listen();

      _folderInCustom.add(_gameObj, 'visible').listen();

      _folderInCustom.add(_gameObj, 'defaultFillColor').listen();

      _folderInCustom.add(_gameObj, 'defaultFillAlpha').listen();

      _folderInCustom.add(_gameObj, 'defaultStrokeWidth').listen();

      _folderInCustom.add(_gameObj, 'defaultStrokeColor').listen();

      _folderInCustom.add(_gameObj, 'defaultStrokeAlpha').listen();

      _folderInCustom.add(_gameObj, '_lineWidth').listen();

      _folderInCustom.add(_gameObj, 'active').listen(); // this.createCommon(_idx, _folderInCustom, _gameObj);

    }
  }, {
    key: "createContainer",
    value: function createContainer(_idx, _folderInCustom, _gameObj) {
      console.log('CONTAINER type:', _gameObj);

      _folderInCustom.add(_gameObj, 'name').listen();

      _folderInCustom.add(_gameObj, 'type').listen();

      _folderInCustom.add(_gameObj, 'alpha').listen();

      _folderInCustom.add(_gameObj, 'depth').listen();

      _folderInCustom.add(_gameObj, 'scale').listen();

      _folderInCustom.add(_gameObj, 'angle').listen();

      _folderInCustom.add(_gameObj, 'rotation').listen();

      _folderInCustom.add(_gameObj, 'visible').listen();

      _folderInCustom.add(_gameObj, 'originX').listen();

      _folderInCustom.add(_gameObj, 'originY').listen();

      _folderInCustom.add(_gameObj, 'length').listen();

      _folderInCustom.add(_gameObj, 'active').listen();

      _folderInCustom.add(_gameObj, 'exclusive').listen();

      _folderInCustom.add(_gameObj, 'position').listen();

      _folderInCustom.add(_gameObj, 'scrollFactorX').listen();

      _folderInCustom.add(_gameObj, 'scrollFactorY').listen();

      _folderInCustom.add(_gameObj, 'x').listen();

      _folderInCustom.add(_gameObj, 'y').listen();

      _folderInCustom.add(_gameObj, 'z').listen();

      _folderInCustom.add(_gameObj, 'w').listen();

      var tmpList = _folderInCustom.addFolder('list');

      tmpList.add(_gameObj.list, 'length');

      for (var i = 0; i < _gameObj.list.length; i++) {
        tmpList.add(_gameObj.list, i);
      }

      tmpList.open();
    }
  }, {
    key: "createEmitter",
    value: function createEmitter(_idx, _folderInCustom, _gameObj) {
      console.log('EMITTER type:', _gameObj);
    } // check body is arcade or matter

  }, {
    key: "chckPhysicsType",
    value: function chckPhysicsType(_tmpType, _folderInCustom, _gameObj) {
      if (_tmpType === true) {
        // if body exist
        var tmpStr = _gameObj.type; // check type

        var tmpBodyType = _typeof(_gameObj.body.type); // check body type


        var tmpObj = undefined;

        switch (tmpBodyType) {
          case 'string':
            // matter
            tmpObj = {
              type: 'Matter ' + tmpStr
            };

            _folderInCustom.add(tmpObj, 'type');

            break;

          case 'number':
            // impact
            tmpObj = {
              type: 'Impact ' + tmpStr
            };

            _folderInCustom.add(tmpObj, 'type');

            break;

          default:
            // arcade
            tmpObj = {
              type: 'Arcade ' + tmpStr
            };

            _folderInCustom.add(tmpObj, 'type');

            break;
        }
      }
    }
  }, {
    key: "chckPhysicsBody",
    value: function chckPhysicsBody(_tmpType, _folderInCustom, _gameObj) {
      if (_tmpType) {
        // arcade image
        var tmpBody = _folderInCustom.addFolder('body');

        var tmpOffset = undefined;
        tmpBody.add(_gameObj.body, 'x').listen();
        tmpBody.add(_gameObj.body, 'y').listen();
        tmpBody.add(_gameObj.body, 'width').listen();
        tmpBody.add(_gameObj.body, 'height').listen();
        tmpBody.add(_gameObj.body, 'angle').listen();
        tmpBody.add(_gameObj.body, 'allowRotation').listen();
        tmpBody.add(_gameObj.body, 'rotation').listen();
        tmpBody.add(_gameObj.body, 'debugShowBody').listen();
        tmpBody.add(_gameObj.body, 'debugShowVelocity').listen();
        tmpBody.add(_gameObj.body, 'debugBodyColor').listen();
        tmpBody.add(_gameObj.body, 'onWorldBounds').listen();
        tmpBody.add(_gameObj.body, 'allowDrag').listen();
        tmpBody.add(_gameObj.body, 'allowGravity').listen();
        tmpBody.add(_gameObj.body, 'onCollide').listen();
        tmpBody.add(_gameObj.body, 'onOverlap').listen();
        tmpOffset = tmpBody.addFolder('offset');
        tmpOffset.add(_gameObj.body.offset, 'x').listen();
        tmpOffset.add(_gameObj.body.offset, 'y').listen();
        tmpOffset.open();
        tmpBody.add(_gameObj.body, 'enable').listen();
        tmpBody.add(_gameObj.body, 'isCircle').listen(); // tmpBody.add(_gameObj.body, 'radius').listen(); // why is this not working?

        tmpBody.open();
      }
    }
  }, {
    key: "createCommon",
    value: function createCommon(_idx, _folderInCustom, _gameObj) {
      _folderInCustom.add(_gameObj, 'x').listen();

      _folderInCustom.add(_gameObj, 'y').listen();

      _folderInCustom.add(_gameObj, 'width').listen();

      _folderInCustom.add(_gameObj, 'height').listen();

      _folderInCustom.add(_gameObj, 'alpha').listen();

      _folderInCustom.add(_gameObj, 'depth').listen();

      _folderInCustom.add(_gameObj, 'scale').listen();

      _folderInCustom.add(_gameObj, 'angle').listen();

      _folderInCustom.add(_gameObj, 'rotation').listen();

      _folderInCustom.add(_gameObj, 'visible').listen();

      _folderInCustom.add(_gameObj, 'originX').listen();

      _folderInCustom.add(_gameObj, 'originY').listen();

      _folderInCustom.add(_gameObj, 'active').listen();
    }
  }, {
    key: "createAnims",
    value: function createAnims(_idx, _folderInCustom, _gameObj) {
      // create anims property folder
      var tmpAnims = _folderInCustom.addFolder('anims');

      tmpAnims.add(_gameObj.anims, 'isPlaying').listen();
      tmpAnims.add(_gameObj.anims, 'currentAnim').listen();
      tmpAnims.add(_gameObj.anims, 'currentFrame').listen();
      tmpAnims.add(_gameObj.anims, 'nextAnim').listen();
      tmpAnims.add(_gameObj.anims, 'duration').listen();
      tmpAnims.add(_gameObj.anims, 'msPerFrame').listen();
      tmpAnims.add(_gameObj.anims, 'skipMissedFrames').listen();
      tmpAnims.add(_gameObj.anims, '_delay').listen();
      tmpAnims.add(_gameObj.anims, '_repeat').listen();
      tmpAnims.add(_gameObj.anims, '_repeatDelay').listen();
      tmpAnims.add(_gameObj.anims, '_yoyo').listen();
      tmpAnims.add(_gameObj.anims, 'forward').listen();
      tmpAnims.add(_gameObj.anims, '_reverse').listen();
      tmpAnims.add(_gameObj.anims, 'accumulator').listen();
      tmpAnims.add(_gameObj.anims, 'nextTick').listen();
      tmpAnims.add(_gameObj.anims, 'repeatCounter').listen();
      tmpAnims.add(_gameObj.anims, 'pendingRepeat').listen();
      tmpAnims.add(_gameObj.anims, '_paused').listen();
      tmpAnims.add(_gameObj.anims, '_wasPlaying').listen();
      tmpAnims.add(_gameObj.anims, '_pendingStop').listen();
      tmpAnims.open();
    }
  }]);

  return TypeSortManager;
}();

exports.default = TypeSortManager;
},{}],"js/gui/FolderManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Folder manager
var FolderManager =
/*#__PURE__*/
function () {
  function FolderManager(_GUI, _typeSort) {
    _classCallCheck(this, FolderManager);

    this.GUI = _GUI;
    this.typeSort = _typeSort;
    this.config = this.initConfig();
    this.property = this.initProperty();
    this.basic = this.initBasic();
    this.custom = this.initCustom();
  }

  _createClass(FolderManager, [{
    key: "create",
    value: function create(_scene) {
      this.createProperty(_scene);
      this.createBasic();
      this.createCustom();
    }
  }, {
    key: "update",
    value: function update(_time, _delta) {
      this.updateFPS(_delta);
    }
  }, {
    key: "initConfig",
    value: function initConfig() {
      // config
      var tmpC = {};
      tmpC.openBasicDefault = true;
      tmpC.openCustomDefault = false;
      return tmpC;
    }
  }, {
    key: "initProperty",
    value: function initProperty() {
      // always check Phaser FPS
      var tmpP = {};
      tmpP.self = [];
      tmpP.FPS = 0;
      return tmpP;
    }
  }, {
    key: "initBasic",
    value: function initBasic() {
      // basic folder
      var tmpB = {};
      tmpB.folder = undefined;
      tmpB.list = [];
      tmpB.tmpStorage = {
        Obj: {
          over: {
            guiIdx: 0,
            guiAlpha: 0,
            guiTint: undefined
          },
          focus: {
            guiIdx: 0,
            guiAlpha: 0,
            guiTint: undefined
          }
        }
      };
      return tmpB;
    }
  }, {
    key: "initCustom",
    value: function initCustom() {
      // custom folder
      var tmpC = {};
      tmpC.folder = undefined;
      tmpC.list = [];
      return tmpC;
    }
  }, {
    key: "createProperty",
    value: function createProperty(_scene) {
      this.property.self.push(this.GUI.add(this.property, 'FPS').listen());
    }
  }, {
    key: "createBasic",
    value: function createBasic() {
      this.basic.folder = this.GUI.addFolder('BASIC');
    }
  }, {
    key: "createCustom",
    value: function createCustom() {
      this.custom.folder = this.GUI.addFolder('CUSTOM');
    }
  }, {
    key: "updateFPS",
    value: function updateFPS(_delta) {
      // update temp FPS
      this.property.FPS = (1000 / _delta).toFixed(3);
    }
  }, {
    key: "push2FolderList",
    value: function push2FolderList(_folder, _isBasic) {
      if (_isBasic === 'basic') {
        this.basic.list.push(_folder);
      } else if (_isBasic === 'custom') {
        this.custom.list.push(_folder);
      } else if (!_isBasic) {
        this.custom.list.push(_folder);
        console.warn('this is not proper way of adding folder, change to string');
      } else {
        this.basic.list.push(_folder);
        console.warn('this is not proper way of adding folder, change to string');
      }
    }
  }, {
    key: "add2CustomFolder",
    value: function add2CustomFolder(_idx) {
      var tmpFolder = this.custom.folder.addFolder(_idx);
      return tmpFolder;
    } // check init open or close

  }, {
    key: "chckOpenAllList",
    value: function chckOpenAllList() {
      this.chckOpenBasicList();
      this.chckOpenCustomList();
    }
  }, {
    key: "chckOpenBasicList",
    value: function chckOpenBasicList() {
      if (this.config.openBasicDefault) {
        var tmpLength = this.basic.list.length;
        this.openFolder(this.basic.folder);

        for (var i = 0; i < tmpLength; i++) {
          this.openFolder(this.basic.list[i]);
        }
      }
    }
  }, {
    key: "chckOpenCustomList",
    value: function chckOpenCustomList() {
      if (this.config.openCustomDefault) {
        var tmpLength = this.custom.list.length;
        this.openFolder(this.custom.folder);

        for (var i = 0; i < tmpLength; i++) {
          this.openFolder(this.custom.list[i]);
        }
      }
    } // open folder

  }, {
    key: "openFolder",
    value: function openFolder(_folder) {
      _folder.open();
    }
  }, {
    key: "closeFolder",
    value: function closeFolder(_folder) {
      _folder.close();
    } // EXTERNAL

  }, {
    key: "setBasicOverFolder",
    value: function setBasicOverFolder(_gameObj) {
      if (_gameObj) {
        var tmpTexture = this.typeSort.setTextureProperty(_gameObj);

        this.basic.list[1].__controllers[0].setValue(_gameObj.guiIdx);

        this.basic.list[1].__controllers[1].setValue(_gameObj.name);

        this.basic.list[1].__controllers[2].setValue(_gameObj.type);

        this.basic.list[1].__controllers[3].setValue(tmpTexture);
      } else {
        // change to all 'NONE'
        var tmpLength = this.basic.list[1].__controllers.length;

        for (var i = 0; i < tmpLength; i++) {
          this.basic.list[1].__controllers[i].setValue('NONE');
        }
      }
    }
  }, {
    key: "setBasicFocusFolder",
    value: function setBasicFocusFolder(_gameObj) {
      var tmpFocus = this.basic.list[1].__folders.Focus;

      if (_gameObj) {
        var tmpTexture = this.typeSort.setTextureProperty(_gameObj);
        this.openFolder(tmpFocus);

        tmpFocus.__controllers[0].setValue(_gameObj.guiIdx);

        tmpFocus.__controllers[1].setValue(_gameObj.name);

        tmpFocus.__controllers[2].setValue(_gameObj.type);

        tmpFocus.__controllers[3].setValue(tmpTexture);
      } else {
        // change to all 'NONE'
        this.openFolder(this.basic.folder);
        this.closeFolder(tmpFocus);
        this.closeFolder(this.custom.folder);
        var tmpLength = 3;

        for (var i = 0; i < tmpLength; i++) {
          tmpFocus.__controllers[i].setValue('NONE');
        }
      }
    }
  }, {
    key: "cross2FocusObj",
    value: function cross2FocusObj(_gameObj, _objList) {
      // actually cross 2 custom_folder/focus_folder(config)
      if (_gameObj) {
        var tmpObjFolder = this.custom.folder.__folders;
        this.closeFolder(this.basic.folder);
        this.openFolder(this.custom.folder);
        this.openFolder(tmpObjFolder[_gameObj.guiIdx]);
      } else {
        console.warn('_inspector SYSTEM_: NONE Focus');
      }
    }
  }, {
    key: "back2Basic",
    value: function back2Basic(_idx) {
      var tmpObjFolder = this.custom.folder.__folders;
      this.closeFolder(tmpObjFolder[_idx]);
      this.closeFolder(this.custom.folder);
      this.openFolder(this.basic.folder);
    } // get func

  }, {
    key: "getFolder",
    value: function getFolder() {
      var tmpFolder = {};
      tmpFolder.basic = this.basic.folder;
      tmpFolder.custom = this.custom.folder;
      return tmpFolder;
    }
  }, {
    key: "getList",
    value: function getList() {
      var tmpList = {};
      tmpList.basic = this.basic.list;
      tmpList.custom = this.custom.list;
      return tmpList;
    }
  }]);

  return FolderManager;
}();

exports.default = FolderManager;
},{}],"js/gui/SaveManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
    this should work with (Ctrl + S) command
    included for saving changed GUI touched stuffs
*/
var SaveManager =
/*#__PURE__*/
function () {
  function SaveManager(_save) {
    _classCallCheck(this, SaveManager);

    this.saveFunc = _save;
    this.saveQ = [];
    this.date = this.initDate();
  }

  _createClass(SaveManager, [{
    key: "create",
    value: function create(_scene) {
      this.createCommand(_scene);
    }
  }, {
    key: "initDate",
    value: function initDate() {
      var tmpD = {};
      tmpD.self = new Date(); // web window API

      tmpD.year = 0;
      tmpD.month = 0;
      tmpD.day = 0;
      tmpD.time = 0;
      tmpD.tot = undefined;
      return tmpD;
    }
  }, {
    key: "createCommand",
    value: function createCommand(_scene) {
      var _this = this;

      _scene.input.keyboard.on('keydown_S', function (_event) {
        console.log('_event:', _event);

        if (_event.ctrlKey || _event.shiftKey) {
          _this.useSaveFunc();
        }
      });
    }
  }, {
    key: "useSaveFunc",
    value: function useSaveFunc() {
      console.log('use save method function');
      this.saveFunc();
    }
  }, {
    key: "saveConfig",
    value: function saveConfig(_config) {
      var tmpObj = {};
      tmpObj.name = _config.name;
      tmpObj.type = _config.type;
      tmpObj.texture = _config.texture;
      tmpObj.date = this.getDate();
      this.push2saveQ();
    }
  }, {
    key: "getDate",
    value: function getDate() {
      var tD = this.date;
      tD.year = tD.self.getFullYear();
      tD.month = tD.self.getMonth();
      tD.day = tD.self.getDay();
      tD.time = tD.self.now();
      tD.tot = tD.year + '/' + tD.month + '/' + tD.day + '/' + tD.time;
      console.log('tD.tot:', tD.tot);
    }
  }, {
    key: "push2saveQ",
    value: function push2saveQ(_obj) {
      this.saveQ.push(_obj);
    }
  }]);

  return SaveManager;
}();

exports.default = SaveManager;
},{}],"js/gui/DebugBoxClass.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// make debug box with phaser graphics
var DebugBoxClass =
/*#__PURE__*/
function () {
  function DebugBoxClass() {
    _classCallCheck(this, DebugBoxClass);

    this.graphics = undefined;
    this.list = undefined;
    this.over = this.initOver();
    this.focus = this.initFocus();
  }

  _createClass(DebugBoxClass, [{
    key: "create",
    value: function create(_scene, _list) {
      this.createSetting(_scene);
      this.createOver(Phaser.Geom.Rectangle);
      this.createFocus(Phaser.Geom.Rectangle);
    }
  }, {
    key: "update",
    value: function update(_time, _delta, _list) {
      this.clearDebugBox();
      this.updateChaseOver();
      this.updateChaseFocus();
    }
  }, {
    key: "initOver",
    value: function initOver() {
      var tmpO = {};
      tmpO.gameObj = undefined; // over game object

      tmpO.self = undefined; // over self graphics

      tmpO.style = {
        stroke: 3,
        color: 0x00ff00 // green

      };
      return tmpO;
    }
  }, {
    key: "initFocus",
    value: function initFocus() {
      var tmpF = {};
      tmpF.gameObj = undefined; // focus game object

      tmpF.self = undefined; // focus self graphics

      tmpF.style = {
        stroke: 4,
        color: 0xff0000 // red

      };
      return tmpF;
    }
  }, {
    key: "createSetting",
    value: function createSetting(_scene) {
      this.graphics = _scene.add.graphics();

      _scene.add.existing(this.graphics); // do this just for sure

    }
  }, {
    key: "createOver",
    value: function createOver(_geomRectangle) {
      this.over.self = new _geomRectangle(0, 0, 1, 1);
    }
  }, {
    key: "createFocus",
    value: function createFocus(_geomRectangle) {
      this.focus.self = new _geomRectangle(0, 0, 1, 1);
    }
  }, {
    key: "updateChaseOver",
    value: function updateChaseOver() {
      if (this.over.self && this.over.gameObj) {
        this.setOver(this.over.gameObj);
      }
    }
  }, {
    key: "updateChaseFocus",
    value: function updateChaseFocus(_gameObj) {
      if (this.focus.self && this.focus.gameObj) {
        this.setFocus(this.focus.gameObj);
      } else {// console.log('this.focus.self:', this.focus.self);
        // console.log('this.focus.gameObj:', this.focus.gameObj);
      }
    } // set logic

  }, {
    key: "setOver",
    value: function setOver(_gameObj) {
      this.over.gameObj = _gameObj;
      this.setDebugBox(this.over, _gameObj);
    }
  }, {
    key: "setFocus",
    value: function setFocus(_gameObj) {
      this.focus.gameObj = _gameObj;
      this.setDebugBox(this.focus, _gameObj);
    } // config should contain pos, scale(width, height)

  }, {
    key: "setDebugBox",
    value: function setDebugBox(_target, _gameObj) {
      var tmpTarget = _target;
      var tmpConfig = {};
      tmpTarget.gameObj = _gameObj;
      tmpConfig.originX = _gameObj.originX;
      tmpConfig.originY = _gameObj.originY;
      tmpConfig.w = _gameObj.width * _gameObj.scaleX;
      tmpConfig.h = _gameObj.height * _gameObj.scaleY;
      tmpConfig.x = _gameObj.x - tmpConfig.w * _gameObj.originX;
      tmpConfig.y = _gameObj.y - tmpConfig.h * _gameObj.originY;
      this.graphics.lineStyle(tmpTarget.style.stroke, tmpTarget.style.color);
      tmpTarget.self.setPosition(tmpConfig.x, tmpConfig.y);
      tmpTarget.self.setSize(tmpConfig.w, tmpConfig.h);
      this.graphics.strokeRectShape(tmpTarget.self);
    } // clear logic

  }, {
    key: "clearDebugBox",
    value: function clearDebugBox() {
      this.graphics.clear();
    }
  }, {
    key: "clearOverGameObj",
    value: function clearOverGameObj() {
      this.over.gameObj = undefined;
      this.clearDebugBox();
    }
  }, {
    key: "clearFocusGameObj",
    value: function clearFocusGameObj() {
      this.focus.gameObj = undefined;
      this.clearDebugBox();
    }
  }]);

  return DebugBoxClass;
}();

exports.default = DebugBoxClass;
},{}],"js/gui/GUIClass.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TypeSortManager = _interopRequireDefault(require("./TypeSortManager.js"));

var _FolderManager = _interopRequireDefault(require("./FolderManager.js"));

var _SaveManager = _interopRequireDefault(require("./SaveManager.js"));

var _DebugBoxClass = _interopRequireDefault(require("./DebugBoxClass.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// GUI class (dat.GUI)
var GUIClass =
/*#__PURE__*/
function () {
  function GUIClass(_statusManager) {
    _classCallCheck(this, GUIClass);

    this.self = new dat.GUI();
    this.statusManager = this.initChckStatusManager(_statusManager);
    this.overConfig = this.initOverConfig();
    this.focusConfig = this.initFocusConfig();
    this.scene = undefined;
    this.objList = undefined; // all game object list

    this.typeSort = new _TypeSortManager.default();
    this.folder = new _FolderManager.default(this.self, this.typeSort);
    this.save = new _SaveManager.default();
    this.debugBox = new _DebugBoxClass.default();
    this._basic = undefined;
    this._custom = undefined;
  }

  _createClass(GUIClass, [{
    key: "create",
    value: function create(_scene) {
      var tmpCon = _scene.add.container();

      this.createETCClass(_scene);
      this.createList(_scene, this.debugBox, this.folder);
      this.createBasic(_scene, this.folder, this._basic);
      this.createCustom(_scene, this._custom, this.typeSort);
      this.folder.chckOpenAllList();
    }
  }, {
    key: "createETCClass",
    value: function createETCClass(_scene) {
      this.folder.create(_scene);
      this._basic = this.folder.getFolder().basic;
      this._custom = this.folder.getFolder().custom;
      this.save.create(_scene);
      this.debugBox.create(_scene);
    }
  }, {
    key: "update",
    value: function update(_time, _delta) {
      this.folder.update(_time, _delta);
      this.debugBox.update(_time, _delta, this.objList);
    }
  }, {
    key: "initChckStatusManager",
    value: function initChckStatusManager(_statusManager) {
      var tmpSM;

      if (_statusManager) {
        tmpSM = _statusManager;
        console.log('_inspector SYSTEM_: USING STATUS MANAGER');
      } else {
        tmpSM = undefined;
        console.log('_inspector SYSTEM_: NOT USING STATUS MANAGER');
      }

      return tmpSM;
    }
  }, {
    key: "initOverConfig",
    value: function initOverConfig() {
      var tmpOC = {};
      tmpOC.status = false;
      tmpOC.gameObj = undefined;
      return tmpOC;
    }
  }, {
    key: "initFocusConfig",
    value: function initFocusConfig() {
      var tmpFC = {};
      tmpFC.status = false;
      tmpFC.gameObj = undefined;
      return tmpFC;
    }
  }, {
    key: "createList",
    value: function createList(_scene, _debugBox, _folder) {
      var tmpDisplayList = undefined;
      tmpDisplayList = _scene.children;
      this.objList = tmpDisplayList.list;
      this.createListInteractive(_scene, _debugBox, _folder);
    } // get scene then set list to form gui set up

  }, {
    key: "createListInteractive",
    value: function createListInteractive(_scene, _debugBox, _folder) {
      var tmpLength = this.objList.length;

      for (var i = 0; i < tmpLength; i++) {
        if (this.objList[i].type !== 'Container') {
          this.objList[i].setInteractive();
        }

        this.objList[i].guiIdx = i;
        this.objList[i].isFocusOnGUI = false;
        this.objList[i].focusTw = undefined;
        this.objList[i].GUI_BACK_2_BASIC = _folder.back2Basic.bind(_folder, i);
      }

      this.createListInteractiveOverEvent(_scene, _debugBox);
      this.createListInteractiveFocusEvent(_scene, _debugBox, _folder);
    }
  }, {
    key: "createListInteractiveOverEvent",
    value: function createListInteractiveOverEvent(_scene, _debugBox) {
      var _this = this;

      // just pointer over obj
      _scene.input.on('gameobjectover', function (_pointer, _gameObj) {
        _this.setPointerOver(_gameObj);

        _debugBox.setOver(_gameObj);
      }); // when out from pointer over obj


      _scene.input.on('gameobjectout', function (_pointer, _gameObj) {
        if (!_gameObj.isFocusOnGUI) {
          _this.clearPointerOver(_gameObj);

          _debugBox.clearOverGameObj();
        }
      });
    }
  }, {
    key: "createListInteractiveFocusEvent",
    value: function createListInteractiveFocusEvent(_scene, _debugBox, _folder) {
      var _this2 = this;

      // when want to focus logic
      _scene.input.on('gameobjectdown', function (_pointer, _gameObj) {
        // if middle button pressed
        if (!_pointer.rightButtonDown() && !_pointer.leftButtonDown()) {
          if (_gameObj.isFocusOnGUI) {
            // clear the focus object
            _this2.setFocusConfig(true, _gameObj);

            _this2.clearFocus(_gameObj);

            _debugBox.clearFocusGameObj();

            _folder.setBasicFocusFolder();

            console.log('0');
          } else {
            // set the focus object
            if (_this2.focusConfig.gameObj) {
              // init focus check
              console.log('1');

              _this2.clearFocus(_this2.focusConfig.gameObj);

              _this2.setFocusConfig(false, undefined);

              _debugBox.clearFocusGameObj();
            }

            console.log('2'); // set to this game object

            _this2.setFocusConfig(true, _gameObj);

            _this2.setFocus(_scene, _gameObj);

            _debugBox.setFocus(_gameObj);

            _folder.setBasicFocusFolder(_gameObj);
          }
        }
      });
    }
  }, {
    key: "setOverConfig",
    value: function setOverConfig(_status, _gameObj) {
      this.overConfig.status = _status;
      this.overConfig.gameObj = _gameObj;
    }
  }, {
    key: "setFocusConfig",
    value: function setFocusConfig(_status, _gameObj) {
      this.focusConfig.status = _status;
      this.focusConfig.gameObj = _gameObj;
    }
  }, {
    key: "createBasic",
    value: function createBasic(_scene, _folder, _basic) {
      var _this3 = this;

      // create basic pointer
      var tmpPointer = undefined;
      var tmpObj = undefined;
      var tmpFocus = undefined;
      var tmpObjProperties = {
        GUIIdx: 'NONE',
        name: 'NONE',
        type: 'NONE',
        texture: 'NONE'
      }; // focus off function

      var tmpFocusFunc = function tmpFocusFunc() {
        _this3.clearFocus();

        _folder.setBasicFocusFolder();

        _this3.debugBox.clearFocusGameObj();
      }; // cross2FocusObj


      var tmpGo2ThisFunc = function tmpGo2ThisFunc() {
        _folder.cross2FocusObj(_this3.focusConfig.gameObj, _this3.objList);
      };

      var tmpFocusProperties = {
        GUIIdx: 'NONE',
        name: 'NONE',
        type: 'NONE',
        texture: 'NONE',
        FOCUS_OFF: tmpFocusFunc,
        GO_2_THIS_OBJ: tmpGo2ThisFunc
      }; // setting folder hierarchy list

      tmpPointer = _basic.addFolder('Pointer');
      tmpPointer.add(_scene.input, 'x').listen();
      tmpPointer.add(_scene.input, 'y').listen();
      tmpObj = _basic.addFolder('Obj');
      tmpObj.add(tmpObjProperties, 'GUIIdx').listen();
      tmpObj.add(tmpObjProperties, 'name').listen();
      tmpObj.add(tmpObjProperties, 'type').listen();
      tmpObj.add(tmpObjProperties, 'texture').listen();
      tmpFocus = tmpObj.addFolder('Focus'); // add to Parent Obj folder

      tmpFocus.add(tmpFocusProperties, 'GUIIdx').listen();
      tmpFocus.add(tmpFocusProperties, 'name');
      tmpFocus.add(tmpFocusProperties, 'type');
      tmpFocus.add(tmpFocusProperties, 'texture');
      tmpFocus.add(tmpFocusProperties, 'FOCUS_OFF'); // function

      tmpFocus.add(tmpFocusProperties, 'GO_2_THIS_OBJ'); // function

      _folder.push2FolderList(tmpPointer, 'basic');

      _folder.push2FolderList(tmpObj, 'basic');
    } // create each custom folder from Phaser.scene.displayList

  }, {
    key: "createCustom",
    value: function createCustom(_scene, _custom, _typeSort) {
      var tmpLength = this.objList.length;

      for (var i = 0; i < tmpLength; i++) {
        var tmpFolderInCustom = this.folder.add2CustomFolder(i);

        _typeSort.chckObjType(_custom, i, tmpFolderInCustom, this.objList[i]);
      }
    }
  }, {
    key: "setFocus",
    value: function setFocus(_scene, _gameObj) {
      _gameObj.isFocusOnGUI = true;
      this.setFocusPerformance(_scene, _gameObj);
    }
  }, {
    key: "setFocusPerformance",
    value: function setFocusPerformance(_scene, _gameObj) {
      var _this4 = this;

      // flickering tween performance
      _gameObj.focusTw = _scene.tweens.addCounter({
        from: 255,
        to: 120,
        duration: 350,
        ease: 'Linear',
        repeat: -1,
        yoyo: true,
        onStart: function onStart() {
          _this4.setStoreConfig('BASIC', _gameObj);
        },
        onUpdate: function onUpdate() {
          var tmpValue = ~~_gameObj.focusTw.getValue();

          _gameObj.setTint(Phaser.Display.Color.GetColor(tmpValue, tmpValue, tmpValue));
        }
      });
    }
  }, {
    key: "clearFocus",
    value: function clearFocus(_gameObj) {
      var tmpObj = undefined;
      _gameObj ? tmpObj = _gameObj : tmpObj = this.focusConfig.gameObj;
      tmpObj.focusTw ? tmpObj.focusTw.remove() : null;
      tmpObj.setAlpha(1); // temp (should be set alpha to saved alpha value)

      tmpObj.clearTint();
      tmpObj.isFocusOnGUI = false;
    }
  }, {
    key: "setPointerOver",
    value: function setPointerOver(_gameObj) {
      _gameObj.setAlpha(0.7);

      this.folder.setBasicOverFolder(_gameObj);
    }
  }, {
    key: "clearPointerOver",
    value: function clearPointerOver(_gameObj) {
      _gameObj.isTinted ? _gameObj.clearTint() : null;

      _gameObj.setAlpha(1); // temp (should be set alpha to saved alpha value)


      this.folder.setBasicOverFolder();
    }
  }, {
    key: "setStoreConfig",
    value: function setStoreConfig(_folderType, _gameObj) {
      var tmpFolder = undefined;
      var tmpFocus = undefined;

      if (_folderType === 'BASIC') {
        tmpFolder = this.folder.basic;
        tmpFocus = tmpFolder.tmpStorage.Obj.over;
      } else if (_folderType === 'CUSTOM') {
        tmpFolder = this.folder.custom;
        tmpFocus = tmpFolder.tmpStorage.Obj.focus;
      } else {}

      tmpFocus.guiIdx = _gameObj.guiIdx;
      tmpFocus.guiAlpha = _gameObj.alpha;
      tmpFocus.guiTint = _gameObj.tint;
    }
  }, {
    key: "clearStoreConfig",
    value: function clearStoreConfig(_folderType) {
      if (_folderType === 'BASIC') {} else if (_folderType === 'CUSTOM') {} else {}
    } // WARNING THIS IS TRIAL: config

  }, {
    key: "saveConfig",
    value: function saveConfig() {}
  }, {
    key: "loadConfig",
    value: function loadConfig() {}
  }]);

  return GUIClass;
}();

exports.default = GUIClass;
},{"./TypeSortManager.js":"js/gui/TypeSortManager.js","./FolderManager.js":"js/gui/FolderManager.js","./SaveManager.js":"js/gui/SaveManager.js","./DebugBoxClass.js":"js/gui/DebugBoxClass.js"}],"js/main.js":[function(require,module,exports) {
"use strict";

var _GUIClass = _interopRequireDefault(require("./gui/GUIClass.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./gui/GUIClass.js":"js/gui/GUIClass.js"}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60396" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map