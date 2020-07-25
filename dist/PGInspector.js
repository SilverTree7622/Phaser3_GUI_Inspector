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
})({"lib/DatGUI/DatGUILib.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(e.dat = {});
}(this, function (e) {
  "use strict";

  function t(e, t) {
    var n = e.__state.conversionName.toString(),
        o = Math.round(e.r),
        i = Math.round(e.g),
        r = Math.round(e.b),
        s = e.a,
        a = Math.round(e.h),
        l = e.s.toFixed(1),
        d = e.v.toFixed(1);

    if (t || "THREE_CHAR_HEX" === n || "SIX_CHAR_HEX" === n) {
      for (var c = e.hex.toString(16); c.length < 6;) {
        c = "0" + c;
      }

      return "#" + c;
    }

    return "CSS_RGB" === n ? "rgb(" + o + "," + i + "," + r + ")" : "CSS_RGBA" === n ? "rgba(" + o + "," + i + "," + r + "," + s + ")" : "HEX" === n ? "0x" + e.hex.toString(16) : "RGB_ARRAY" === n ? "[" + o + "," + i + "," + r + "]" : "RGBA_ARRAY" === n ? "[" + o + "," + i + "," + r + "," + s + "]" : "RGB_OBJ" === n ? "{r:" + o + ",g:" + i + ",b:" + r + "}" : "RGBA_OBJ" === n ? "{r:" + o + ",g:" + i + ",b:" + r + ",a:" + s + "}" : "HSV_OBJ" === n ? "{h:" + a + ",s:" + l + ",v:" + d + "}" : "HSVA_OBJ" === n ? "{h:" + a + ",s:" + l + ",v:" + d + ",a:" + s + "}" : "unknown format";
  }

  function n(e, t, n) {
    Object.defineProperty(e, t, {
      get: function get() {
        return "RGB" === this.__state.space ? this.__state[t] : (I.recalculateRGB(this, t, n), this.__state[t]);
      },
      set: function set(e) {
        "RGB" !== this.__state.space && (I.recalculateRGB(this, t, n), this.__state.space = "RGB"), this.__state[t] = e;
      }
    });
  }

  function o(e, t) {
    Object.defineProperty(e, t, {
      get: function get() {
        return "HSV" === this.__state.space ? this.__state[t] : (I.recalculateHSV(this), this.__state[t]);
      },
      set: function set(e) {
        "HSV" !== this.__state.space && (I.recalculateHSV(this), this.__state.space = "HSV"), this.__state[t] = e;
      }
    });
  }

  function i(e) {
    if ("0" === e || S.isUndefined(e)) return 0;
    var t = e.match(U);
    return S.isNull(t) ? 0 : parseFloat(t[1]);
  }

  function r(e) {
    var t = e.toString();
    return t.indexOf(".") > -1 ? t.length - t.indexOf(".") - 1 : 0;
  }

  function s(e, t) {
    var n = Math.pow(10, t);
    return Math.round(e * n) / n;
  }

  function a(e, t, n, o, i) {
    return o + (e - t) / (n - t) * (i - o);
  }

  function l(e, t, n, o) {
    e.style.background = "", S.each(ee, function (i) {
      e.style.cssText += "background: " + i + "linear-gradient(" + t + ", " + n + " 0%, " + o + " 100%); ";
    });
  }

  function d(e) {
    e.style.background = "", e.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);", e.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
  }

  function c(e, t, n) {
    var o = document.createElement("li");
    return t && o.appendChild(t), n ? e.__ul.insertBefore(o, n) : e.__ul.appendChild(o), e.onResize(), o;
  }

  function u(e) {
    X.unbind(window, "resize", e.__resizeHandler), e.saveToLocalStorageIfPossible && X.unbind(window, "unload", e.saveToLocalStorageIfPossible);
  }

  function _(e, t) {
    var n = e.__preset_select[e.__preset_select.selectedIndex];
    n.innerHTML = t ? n.value + "*" : n.value;
  }

  function h(e, t, n) {
    if (n.__li = t, n.__gui = e, S.extend(n, {
      options: function options(t) {
        if (arguments.length > 1) {
          var o = n.__li.nextElementSibling;
          return n.remove(), f(e, n.object, n.property, {
            before: o,
            factoryArgs: [S.toArray(arguments)]
          });
        }

        if (S.isArray(t) || S.isObject(t)) {
          var i = n.__li.nextElementSibling;
          return n.remove(), f(e, n.object, n.property, {
            before: i,
            factoryArgs: [t]
          });
        }
      },
      name: function name(e) {
        return n.__li.firstElementChild.firstElementChild.innerHTML = e, n;
      },
      listen: function listen() {
        return n.__gui.listen(n), n;
      },
      remove: function remove() {
        return n.__gui.remove(n), n;
      }
    }), n instanceof q) {
      var o = new Q(n.object, n.property, {
        min: n.__min,
        max: n.__max,
        step: n.__step
      });
      S.each(["updateDisplay", "onChange", "onFinishChange", "step"], function (e) {
        var t = n[e],
            i = o[e];

        n[e] = o[e] = function () {
          var e = Array.prototype.slice.call(arguments);
          return i.apply(o, e), t.apply(n, e);
        };
      }), X.addClass(t, "has-slider"), n.domElement.insertBefore(o.domElement, n.domElement.firstElementChild);
    } else if (n instanceof Q) {
      var i = function i(t) {
        if (S.isNumber(n.__min) && S.isNumber(n.__max)) {
          var o = n.__li.firstElementChild.firstElementChild.innerHTML,
              i = n.__gui.__listening.indexOf(n) > -1;
          n.remove();
          var r = f(e, n.object, n.property, {
            before: n.__li.nextElementSibling,
            factoryArgs: [n.__min, n.__max, n.__step]
          });
          return r.name(o), i && r.listen(), r;
        }

        return t;
      };

      n.min = S.compose(i, n.min), n.max = S.compose(i, n.max);
    } else n instanceof K ? (X.bind(t, "click", function () {
      X.fakeEvent(n.__checkbox, "click");
    }), X.bind(n.__checkbox, "click", function (e) {
      e.stopPropagation();
    })) : n instanceof Z ? (X.bind(t, "click", function () {
      X.fakeEvent(n.__button, "click");
    }), X.bind(t, "mouseover", function () {
      X.addClass(n.__button, "hover");
    }), X.bind(t, "mouseout", function () {
      X.removeClass(n.__button, "hover");
    })) : n instanceof $ && (X.addClass(t, "color"), n.updateDisplay = S.compose(function (e) {
      return t.style.borderLeftColor = n.__color.toString(), e;
    }, n.updateDisplay), n.updateDisplay());

    n.setValue = S.compose(function (t) {
      return e.getRoot().__preset_select && n.isModified() && _(e.getRoot(), !0), t;
    }, n.setValue);
  }

  function p(e, t) {
    var n = e.getRoot(),
        o = n.__rememberedObjects.indexOf(t.object);

    if (-1 !== o) {
      var i = n.__rememberedObjectIndecesToControllers[o];

      if (void 0 === i && (i = {}, n.__rememberedObjectIndecesToControllers[o] = i), i[t.property] = t, n.load && n.load.remembered) {
        var r = n.load.remembered,
            s = void 0;
        if (r[e.preset]) s = r[e.preset];else {
          if (!r[se]) return;
          s = r[se];
        }

        if (s[o] && void 0 !== s[o][t.property]) {
          var a = s[o][t.property];
          t.initialValue = a, t.setValue(a);
        }
      }
    }
  }

  function f(e, t, n, o) {
    if (void 0 === t[n]) throw new Error('Object "' + t + '" has no property "' + n + '"');
    var i = void 0;
    if (o.color) i = new $(t, n);else {
      var r = [t, n].concat(o.factoryArgs);
      i = ne.apply(e, r);
    }
    o.before instanceof z && (o.before = o.before.__li), p(e, i), X.addClass(i.domElement, "c");
    var s = document.createElement("span");
    X.addClass(s, "property-name"), s.innerHTML = i.property;
    var a = document.createElement("div");
    a.appendChild(s), a.appendChild(i.domElement);
    var l = c(e, a, o.before);
    return X.addClass(l, he.CLASS_CONTROLLER_ROW), i instanceof $ ? X.addClass(l, "color") : X.addClass(l, H(i.getValue())), h(e, l, i), e.__controllers.push(i), i;
  }

  function m(e, t) {
    return document.location.href + "." + t;
  }

  function g(e, t, n) {
    var o = document.createElement("option");
    o.innerHTML = t, o.value = t, e.__preset_select.appendChild(o), n && (e.__preset_select.selectedIndex = e.__preset_select.length - 1);
  }

  function b(e, t) {
    t.style.display = e.useLocalStorage ? "block" : "none";
  }

  function v(e) {
    var t = e.__save_row = document.createElement("li");
    X.addClass(e.domElement, "has-save"), e.__ul.insertBefore(t, e.__ul.firstChild), X.addClass(t, "save-row");
    var n = document.createElement("span");
    n.innerHTML = "&nbsp;", X.addClass(n, "button gears");
    var o = document.createElement("span");
    o.innerHTML = "Save", X.addClass(o, "button"), X.addClass(o, "save");
    var i = document.createElement("span");
    i.innerHTML = "New", X.addClass(i, "button"), X.addClass(i, "save-as");
    var r = document.createElement("span");
    r.innerHTML = "Revert", X.addClass(r, "button"), X.addClass(r, "revert");
    var s = e.__preset_select = document.createElement("select");

    if (e.load && e.load.remembered ? S.each(e.load.remembered, function (t, n) {
      g(e, n, n === e.preset);
    }) : g(e, se, !1), X.bind(s, "change", function () {
      for (var t = 0; t < e.__preset_select.length; t++) {
        e.__preset_select[t].innerHTML = e.__preset_select[t].value;
      }

      e.preset = this.value;
    }), t.appendChild(s), t.appendChild(n), t.appendChild(o), t.appendChild(i), t.appendChild(r), ae) {
      var a = document.getElementById("dg-local-explain"),
          l = document.getElementById("dg-local-storage");
      document.getElementById("dg-save-locally").style.display = "block", "true" === localStorage.getItem(m(e, "isLocal")) && l.setAttribute("checked", "checked"), b(e, a), X.bind(l, "change", function () {
        e.useLocalStorage = !e.useLocalStorage, b(e, a);
      });
    }

    var d = document.getElementById("dg-new-constructor");
    X.bind(d, "keydown", function (e) {
      !e.metaKey || 67 !== e.which && 67 !== e.keyCode || le.hide();
    }), X.bind(n, "click", function () {
      d.innerHTML = JSON.stringify(e.getSaveObject(), void 0, 2), le.show(), d.focus(), d.select();
    }), X.bind(o, "click", function () {
      e.save();
    }), X.bind(i, "click", function () {
      var t = prompt("Enter a new preset name.");
      t && e.saveAs(t);
    }), X.bind(r, "click", function () {
      e.revert();
    });
  }

  function y(e) {
    function t(t) {
      return t.preventDefault(), e.width += i - t.clientX, e.onResize(), i = t.clientX, !1;
    }

    function n() {
      X.removeClass(e.__closeButton, he.CLASS_DRAG), X.unbind(window, "mousemove", t), X.unbind(window, "mouseup", n);
    }

    function o(o) {
      return o.preventDefault(), i = o.clientX, X.addClass(e.__closeButton, he.CLASS_DRAG), X.bind(window, "mousemove", t), X.bind(window, "mouseup", n), !1;
    }

    var i = void 0;
    e.__resize_handle = document.createElement("div"), S.extend(e.__resize_handle.style, {
      width: "6px",
      marginLeft: "-3px",
      height: "200px",
      cursor: "ew-resize",
      position: "absolute"
    }), X.bind(e.__resize_handle, "mousedown", o), X.bind(e.__closeButton, "mousedown", o), e.domElement.insertBefore(e.__resize_handle, e.domElement.firstElementChild);
  }

  function w(e, t) {
    e.domElement.style.width = t + "px", e.__save_row && e.autoPlace && (e.__save_row.style.width = t + "px"), e.__closeButton && (e.__closeButton.style.width = t + "px");
  }

  function x(e, t) {
    var n = {};
    return S.each(e.__rememberedObjects, function (o, i) {
      var r = {},
          s = e.__rememberedObjectIndecesToControllers[i];
      S.each(s, function (e, n) {
        r[n] = t ? e.initialValue : e.getValue();
      }), n[i] = r;
    }), n;
  }

  function E(e) {
    for (var t = 0; t < e.__preset_select.length; t++) {
      e.__preset_select[t].value === e.preset && (e.__preset_select.selectedIndex = t);
    }
  }

  function C(e) {
    0 !== e.length && oe.call(window, function () {
      C(e);
    }), S.each(e, function (e) {
      e.updateDisplay();
    });
  }

  var A = Array.prototype.forEach,
      k = Array.prototype.slice,
      S = {
    BREAK: {},
    extend: function extend(e) {
      return this.each(k.call(arguments, 1), function (t) {
        (this.isObject(t) ? Object.keys(t) : []).forEach(function (n) {
          this.isUndefined(t[n]) || (e[n] = t[n]);
        }.bind(this));
      }, this), e;
    },
    defaults: function defaults(e) {
      return this.each(k.call(arguments, 1), function (t) {
        (this.isObject(t) ? Object.keys(t) : []).forEach(function (n) {
          this.isUndefined(e[n]) && (e[n] = t[n]);
        }.bind(this));
      }, this), e;
    },
    compose: function compose() {
      var e = k.call(arguments);
      return function () {
        for (var t = k.call(arguments), n = e.length - 1; n >= 0; n--) {
          t = [e[n].apply(this, t)];
        }

        return t[0];
      };
    },
    each: function each(e, t, n) {
      if (e) if (A && e.forEach && e.forEach === A) e.forEach(t, n);else if (e.length === e.length + 0) {
        var o = void 0,
            i = void 0;

        for (o = 0, i = e.length; o < i; o++) {
          if (o in e && t.call(n, e[o], o) === this.BREAK) return;
        }
      } else for (var r in e) {
        if (t.call(n, e[r], r) === this.BREAK) return;
      }
    },
    defer: function defer(e) {
      setTimeout(e, 0);
    },
    debounce: function debounce(e, t, n) {
      var o = void 0;
      return function () {
        var i = this,
            r = arguments,
            s = n || !o;
        clearTimeout(o), o = setTimeout(function () {
          o = null, n || e.apply(i, r);
        }, t), s && e.apply(i, r);
      };
    },
    toArray: function toArray(e) {
      return e.toArray ? e.toArray() : k.call(e);
    },
    isUndefined: function isUndefined(e) {
      return void 0 === e;
    },
    isNull: function isNull(e) {
      return null === e;
    },
    isNaN: function (e) {
      function t(t) {
        return e.apply(this, arguments);
      }

      return t.toString = function () {
        return e.toString();
      }, t;
    }(function (e) {
      return isNaN(e);
    }),
    isArray: Array.isArray || function (e) {
      return e.constructor === Array;
    },
    isObject: function isObject(e) {
      return e === Object(e);
    },
    isNumber: function isNumber(e) {
      return e === e + 0;
    },
    isString: function isString(e) {
      return e === e + "";
    },
    isBoolean: function isBoolean(e) {
      return !1 === e || !0 === e;
    },
    isFunction: function isFunction(e) {
      return "[object Function]" === Object.prototype.toString.call(e);
    }
  },
      O = [{
    litmus: S.isString,
    conversions: {
      THREE_CHAR_HEX: {
        read: function read(e) {
          var t = e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
          return null !== t && {
            space: "HEX",
            hex: parseInt("0x" + t[1].toString() + t[1].toString() + t[2].toString() + t[2].toString() + t[3].toString() + t[3].toString(), 0)
          };
        },
        write: t
      },
      SIX_CHAR_HEX: {
        read: function read(e) {
          var t = e.match(/^#([A-F0-9]{6})$/i);
          return null !== t && {
            space: "HEX",
            hex: parseInt("0x" + t[1].toString(), 0)
          };
        },
        write: t
      },
      CSS_RGB: {
        read: function read(e) {
          var t = e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
          return null !== t && {
            space: "RGB",
            r: parseFloat(t[1]),
            g: parseFloat(t[2]),
            b: parseFloat(t[3])
          };
        },
        write: t
      },
      CSS_RGBA: {
        read: function read(e) {
          var t = e.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
          return null !== t && {
            space: "RGB",
            r: parseFloat(t[1]),
            g: parseFloat(t[2]),
            b: parseFloat(t[3]),
            a: parseFloat(t[4])
          };
        },
        write: t
      }
    }
  }, {
    litmus: S.isNumber,
    conversions: {
      HEX: {
        read: function read(e) {
          return {
            space: "HEX",
            hex: e,
            conversionName: "HEX"
          };
        },
        write: function write(e) {
          return e.hex;
        }
      }
    }
  }, {
    litmus: S.isArray,
    conversions: {
      RGB_ARRAY: {
        read: function read(e) {
          return 3 === e.length && {
            space: "RGB",
            r: e[0],
            g: e[1],
            b: e[2]
          };
        },
        write: function write(e) {
          return [e.r, e.g, e.b];
        }
      },
      RGBA_ARRAY: {
        read: function read(e) {
          return 4 === e.length && {
            space: "RGB",
            r: e[0],
            g: e[1],
            b: e[2],
            a: e[3]
          };
        },
        write: function write(e) {
          return [e.r, e.g, e.b, e.a];
        }
      }
    }
  }, {
    litmus: S.isObject,
    conversions: {
      RGBA_OBJ: {
        read: function read(e) {
          return !!(S.isNumber(e.r) && S.isNumber(e.g) && S.isNumber(e.b) && S.isNumber(e.a)) && {
            space: "RGB",
            r: e.r,
            g: e.g,
            b: e.b,
            a: e.a
          };
        },
        write: function write(e) {
          return {
            r: e.r,
            g: e.g,
            b: e.b,
            a: e.a
          };
        }
      },
      RGB_OBJ: {
        read: function read(e) {
          return !!(S.isNumber(e.r) && S.isNumber(e.g) && S.isNumber(e.b)) && {
            space: "RGB",
            r: e.r,
            g: e.g,
            b: e.b
          };
        },
        write: function write(e) {
          return {
            r: e.r,
            g: e.g,
            b: e.b
          };
        }
      },
      HSVA_OBJ: {
        read: function read(e) {
          return !!(S.isNumber(e.h) && S.isNumber(e.s) && S.isNumber(e.v) && S.isNumber(e.a)) && {
            space: "HSV",
            h: e.h,
            s: e.s,
            v: e.v,
            a: e.a
          };
        },
        write: function write(e) {
          return {
            h: e.h,
            s: e.s,
            v: e.v,
            a: e.a
          };
        }
      },
      HSV_OBJ: {
        read: function read(e) {
          return !!(S.isNumber(e.h) && S.isNumber(e.s) && S.isNumber(e.v)) && {
            space: "HSV",
            h: e.h,
            s: e.s,
            v: e.v
          };
        },
        write: function write(e) {
          return {
            h: e.h,
            s: e.s,
            v: e.v
          };
        }
      }
    }
  }],
      T = void 0,
      L = void 0,
      R = function R() {
    L = !1;
    var e = arguments.length > 1 ? S.toArray(arguments) : arguments[0];
    return S.each(O, function (t) {
      if (t.litmus(e)) return S.each(t.conversions, function (t, n) {
        if (T = t.read(e), !1 === L && !1 !== T) return L = T, T.conversionName = n, T.conversion = t, S.BREAK;
      }), S.BREAK;
    }), L;
  },
      B = void 0,
      N = {
    hsv_to_rgb: function hsv_to_rgb(e, t, n) {
      var o = Math.floor(e / 60) % 6,
          i = e / 60 - Math.floor(e / 60),
          r = n * (1 - t),
          s = n * (1 - i * t),
          a = n * (1 - (1 - i) * t),
          l = [[n, a, r], [s, n, r], [r, n, a], [r, s, n], [a, r, n], [n, r, s]][o];
      return {
        r: 255 * l[0],
        g: 255 * l[1],
        b: 255 * l[2]
      };
    },
    rgb_to_hsv: function rgb_to_hsv(e, t, n) {
      var o = Math.min(e, t, n),
          i = Math.max(e, t, n),
          r = i - o,
          s = void 0,
          a = void 0;
      return 0 === i ? {
        h: NaN,
        s: 0,
        v: 0
      } : (a = r / i, s = e === i ? (t - n) / r : t === i ? 2 + (n - e) / r : 4 + (e - t) / r, (s /= 6) < 0 && (s += 1), {
        h: 360 * s,
        s: a,
        v: i / 255
      });
    },
    rgb_to_hex: function rgb_to_hex(e, t, n) {
      var o = this.hex_with_component(0, 2, e);
      return o = this.hex_with_component(o, 1, t), o = this.hex_with_component(o, 0, n);
    },
    component_from_hex: function component_from_hex(e, t) {
      return e >> 8 * t & 255;
    },
    hex_with_component: function hex_with_component(e, t, n) {
      return n << (B = 8 * t) | e & ~(255 << B);
    }
  },
      H = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
    return _typeof(e);
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
  },
      F = function F(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  },
      P = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
      }
    }

    return function (t, n, o) {
      return n && e(t.prototype, n), o && e(t, o), t;
    };
  }(),
      j = function e(t, n, o) {
    null === t && (t = Function.prototype);
    var i = Object.getOwnPropertyDescriptor(t, n);

    if (void 0 === i) {
      var r = Object.getPrototypeOf(t);
      return null === r ? void 0 : e(r, n, o);
    }

    if ("value" in i) return i.value;
    var s = i.get;
    if (void 0 !== s) return s.call(o);
  },
      D = function D(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + _typeof(t));
    e.prototype = Object.create(t && t.prototype, {
      constructor: {
        value: e,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
  },
      V = function V(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != _typeof(t) && "function" != typeof t ? e : t;
  },
      I = function () {
    function e() {
      if (F(this, e), this.__state = R.apply(this, arguments), !1 === this.__state) throw new Error("Failed to interpret color arguments");
      this.__state.a = this.__state.a || 1;
    }

    return P(e, [{
      key: "toString",
      value: function value() {
        return t(this);
      }
    }, {
      key: "toHexString",
      value: function value() {
        return t(this, !0);
      }
    }, {
      key: "toOriginal",
      value: function value() {
        return this.__state.conversion.write(this);
      }
    }]), e;
  }();

  I.recalculateRGB = function (e, t, n) {
    if ("HEX" === e.__state.space) e.__state[t] = N.component_from_hex(e.__state.hex, n);else {
      if ("HSV" !== e.__state.space) throw new Error("Corrupted color state");
      S.extend(e.__state, N.hsv_to_rgb(e.__state.h, e.__state.s, e.__state.v));
    }
  }, I.recalculateHSV = function (e) {
    var t = N.rgb_to_hsv(e.r, e.g, e.b);
    S.extend(e.__state, {
      s: t.s,
      v: t.v
    }), S.isNaN(t.h) ? S.isUndefined(e.__state.h) && (e.__state.h = 0) : e.__state.h = t.h;
  }, I.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"], n(I.prototype, "r", 2), n(I.prototype, "g", 1), n(I.prototype, "b", 0), o(I.prototype, "h"), o(I.prototype, "s"), o(I.prototype, "v"), Object.defineProperty(I.prototype, "a", {
    get: function get() {
      return this.__state.a;
    },
    set: function set(e) {
      this.__state.a = e;
    }
  }), Object.defineProperty(I.prototype, "hex", {
    get: function get() {
      return "HEX" !== !this.__state.space && (this.__state.hex = N.rgb_to_hex(this.r, this.g, this.b)), this.__state.hex;
    },
    set: function set(e) {
      this.__state.space = "HEX", this.__state.hex = e;
    }
  });

  var z = function () {
    function e(t, n) {
      F(this, e), this.initialValue = t[n], this.domElement = document.createElement("div"), this.object = t, this.property = n, this.__onChange = void 0, this.__onFinishChange = void 0;
    }

    return P(e, [{
      key: "onChange",
      value: function value(e) {
        return this.__onChange = e, this;
      }
    }, {
      key: "onFinishChange",
      value: function value(e) {
        return this.__onFinishChange = e, this;
      }
    }, {
      key: "setValue",
      value: function value(e) {
        return this.object[this.property] = e, this.__onChange && this.__onChange.call(this, e), this.updateDisplay(), this;
      }
    }, {
      key: "getValue",
      value: function value() {
        return this.object[this.property];
      }
    }, {
      key: "updateDisplay",
      value: function value() {
        return this;
      }
    }, {
      key: "isModified",
      value: function value() {
        return this.initialValue !== this.getValue();
      }
    }]), e;
  }(),
      M = {
    HTMLEvents: ["change"],
    MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
    KeyboardEvents: ["keydown"]
  },
      G = {};

  S.each(M, function (e, t) {
    S.each(e, function (e) {
      G[e] = t;
    });
  });

  var U = /(\d+(\.\d+)?)px/,
      X = {
    makeSelectable: function makeSelectable(e, t) {
      void 0 !== e && void 0 !== e.style && (e.onselectstart = t ? function () {
        return !1;
      } : function () {}, e.style.MozUserSelect = t ? "auto" : "none", e.style.KhtmlUserSelect = t ? "auto" : "none", e.unselectable = t ? "on" : "off");
    },
    makeFullscreen: function makeFullscreen(e, t, n) {
      var o = n,
          i = t;
      S.isUndefined(i) && (i = !0), S.isUndefined(o) && (o = !0), e.style.position = "absolute", i && (e.style.left = 0, e.style.right = 0), o && (e.style.top = 0, e.style.bottom = 0);
    },
    fakeEvent: function fakeEvent(e, t, n, o) {
      var i = n || {},
          r = G[t];
      if (!r) throw new Error("Event type " + t + " not supported.");
      var s = document.createEvent(r);

      switch (r) {
        case "MouseEvents":
          var a = i.x || i.clientX || 0,
              l = i.y || i.clientY || 0;
          s.initMouseEvent(t, i.bubbles || !1, i.cancelable || !0, window, i.clickCount || 1, 0, 0, a, l, !1, !1, !1, !1, 0, null);
          break;

        case "KeyboardEvents":
          var d = s.initKeyboardEvent || s.initKeyEvent;
          S.defaults(i, {
            cancelable: !0,
            ctrlKey: !1,
            altKey: !1,
            shiftKey: !1,
            metaKey: !1,
            keyCode: void 0,
            charCode: void 0
          }), d(t, i.bubbles || !1, i.cancelable, window, i.ctrlKey, i.altKey, i.shiftKey, i.metaKey, i.keyCode, i.charCode);
          break;

        default:
          s.initEvent(t, i.bubbles || !1, i.cancelable || !0);
      }

      S.defaults(s, o), e.dispatchEvent(s);
    },
    bind: function bind(e, t, n, o) {
      var i = o || !1;
      return e.addEventListener ? e.addEventListener(t, n, i) : e.attachEvent && e.attachEvent("on" + t, n), X;
    },
    unbind: function unbind(e, t, n, o) {
      var i = o || !1;
      return e.removeEventListener ? e.removeEventListener(t, n, i) : e.detachEvent && e.detachEvent("on" + t, n), X;
    },
    addClass: function addClass(e, t) {
      if (void 0 === e.className) e.className = t;else if (e.className !== t) {
        var n = e.className.split(/ +/);
        -1 === n.indexOf(t) && (n.push(t), e.className = n.join(" ").replace(/^\s+/, "").replace(/\s+$/, ""));
      }
      return X;
    },
    removeClass: function removeClass(e, t) {
      if (t) {
        if (e.className === t) e.removeAttribute("class");else {
          var n = e.className.split(/ +/),
              o = n.indexOf(t);
          -1 !== o && (n.splice(o, 1), e.className = n.join(" "));
        }
      } else e.className = void 0;
      return X;
    },
    hasClass: function hasClass(e, t) {
      return new RegExp("(?:^|\\s+)" + t + "(?:\\s+|$)").test(e.className) || !1;
    },
    getWidth: function getWidth(e) {
      var t = getComputedStyle(e);
      return i(t["border-left-width"]) + i(t["border-right-width"]) + i(t["padding-left"]) + i(t["padding-right"]) + i(t.width);
    },
    getHeight: function getHeight(e) {
      var t = getComputedStyle(e);
      return i(t["border-top-width"]) + i(t["border-bottom-width"]) + i(t["padding-top"]) + i(t["padding-bottom"]) + i(t.height);
    },
    getOffset: function getOffset(e) {
      var t = e,
          n = {
        left: 0,
        top: 0
      };
      if (t.offsetParent) do {
        n.left += t.offsetLeft, n.top += t.offsetTop, t = t.offsetParent;
      } while (t);
      return n;
    },
    isActive: function isActive(e) {
      return e === document.activeElement && (e.type || e.href);
    }
  },
      K = function (e) {
    function t(e, n) {
      F(this, t);
      var o = V(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)),
          i = o;
      return o.__prev = o.getValue(), o.__checkbox = document.createElement("input"), o.__checkbox.setAttribute("type", "checkbox"), X.bind(o.__checkbox, "change", function () {
        i.setValue(!i.__prev);
      }, !1), o.domElement.appendChild(o.__checkbox), o.updateDisplay(), o;
    }

    return D(t, z), P(t, [{
      key: "setValue",
      value: function value(e) {
        var n = j(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "setValue", this).call(this, e);
        return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), this.__prev = this.getValue(), n;
      }
    }, {
      key: "updateDisplay",
      value: function value() {
        return !0 === this.getValue() ? (this.__checkbox.setAttribute("checked", "checked"), this.__checkbox.checked = !0, this.__prev = !0) : (this.__checkbox.checked = !1, this.__prev = !1), j(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "updateDisplay", this).call(this);
      }
    }]), t;
  }(),
      Y = function (e) {
    function t(e, n, o) {
      F(this, t);
      var i = V(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)),
          r = o,
          s = i;

      if (i.__select = document.createElement("select"), S.isArray(r)) {
        var a = {};
        S.each(r, function (e) {
          a[e] = e;
        }), r = a;
      }

      return S.each(r, function (e, t) {
        var n = document.createElement("option");
        n.innerHTML = t, n.setAttribute("value", e), s.__select.appendChild(n);
      }), i.updateDisplay(), X.bind(i.__select, "change", function () {
        var e = this.options[this.selectedIndex].value;
        s.setValue(e);
      }), i.domElement.appendChild(i.__select), i;
    }

    return D(t, z), P(t, [{
      key: "setValue",
      value: function value(e) {
        var n = j(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "setValue", this).call(this, e);
        return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), n;
      }
    }, {
      key: "updateDisplay",
      value: function value() {
        return X.isActive(this.__select) ? this : (this.__select.value = this.getValue(), j(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "updateDisplay", this).call(this));
      }
    }]), t;
  }(),
      J = function (e) {
    function t(e, n) {
      function o() {
        r.setValue(r.__input.value);
      }

      F(this, t);
      var i = V(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)),
          r = i;
      return i.__input = document.createElement("input"), i.__input.setAttribute("type", "text"), X.bind(i.__input, "keyup", o), X.bind(i.__input, "change", o), X.bind(i.__input, "blur", function () {
        r.__onFinishChange && r.__onFinishChange.call(r, r.getValue());
      }), X.bind(i.__input, "keydown", function (e) {
        13 === e.keyCode && this.blur();
      }), i.updateDisplay(), i.domElement.appendChild(i.__input), i;
    }

    return D(t, z), P(t, [{
      key: "updateDisplay",
      value: function value() {
        return X.isActive(this.__input) || (this.__input.value = this.getValue()), j(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "updateDisplay", this).call(this);
      }
    }]), t;
  }(),
      W = function (e) {
    function t(e, n, o) {
      F(this, t);
      var i = V(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)),
          s = o || {};
      return i.__min = s.min, i.__max = s.max, i.__step = s.step, S.isUndefined(i.__step) ? 0 === i.initialValue ? i.__impliedStep = 1 : i.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(i.initialValue)) / Math.LN10)) / 10 : i.__impliedStep = i.__step, i.__precision = r(i.__impliedStep), i;
    }

    return D(t, z), P(t, [{
      key: "setValue",
      value: function value(e) {
        var n = e;
        return void 0 !== this.__min && n < this.__min ? n = this.__min : void 0 !== this.__max && n > this.__max && (n = this.__max), void 0 !== this.__step && n % this.__step != 0 && (n = Math.round(n / this.__step) * this.__step), j(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "setValue", this).call(this, n);
      }
    }, {
      key: "min",
      value: function value(e) {
        return this.__min = e, this;
      }
    }, {
      key: "max",
      value: function value(e) {
        return this.__max = e, this;
      }
    }, {
      key: "step",
      value: function value(e) {
        return this.__step = e, this.__impliedStep = e, this.__precision = r(e), this;
      }
    }]), t;
  }(),
      Q = function (e) {
    function t(e, n, o) {
      function i() {
        l.__onFinishChange && l.__onFinishChange.call(l, l.getValue());
      }

      function r(e) {
        var t = d - e.clientY;
        l.setValue(l.getValue() + t * l.__impliedStep), d = e.clientY;
      }

      function s() {
        X.unbind(window, "mousemove", r), X.unbind(window, "mouseup", s), i();
      }

      F(this, t);
      var a = V(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, o));
      a.__truncationSuspended = !1;
      var l = a,
          d = void 0;
      return a.__input = document.createElement("input"), a.__input.setAttribute("type", "text"), X.bind(a.__input, "change", function () {
        var e = parseFloat(l.__input.value);
        S.isNaN(e) || l.setValue(e);
      }), X.bind(a.__input, "blur", function () {
        i();
      }), X.bind(a.__input, "mousedown", function (e) {
        X.bind(window, "mousemove", r), X.bind(window, "mouseup", s), d = e.clientY;
      }), X.bind(a.__input, "keydown", function (e) {
        13 === e.keyCode && (l.__truncationSuspended = !0, this.blur(), l.__truncationSuspended = !1, i());
      }), a.updateDisplay(), a.domElement.appendChild(a.__input), a;
    }

    return D(t, W), P(t, [{
      key: "updateDisplay",
      value: function value() {
        return this.__input.value = this.__truncationSuspended ? this.getValue() : s(this.getValue(), this.__precision), j(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "updateDisplay", this).call(this);
      }
    }]), t;
  }(),
      q = function (e) {
    function t(e, n, o, i, r) {
      function s(e) {
        e.preventDefault();

        var t = _.__background.getBoundingClientRect();

        return _.setValue(a(e.clientX, t.left, t.right, _.__min, _.__max)), !1;
      }

      function l() {
        X.unbind(window, "mousemove", s), X.unbind(window, "mouseup", l), _.__onFinishChange && _.__onFinishChange.call(_, _.getValue());
      }

      function d(e) {
        var t = e.touches[0].clientX,
            n = _.__background.getBoundingClientRect();

        _.setValue(a(t, n.left, n.right, _.__min, _.__max));
      }

      function c() {
        X.unbind(window, "touchmove", d), X.unbind(window, "touchend", c), _.__onFinishChange && _.__onFinishChange.call(_, _.getValue());
      }

      F(this, t);
      var u = V(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, {
        min: o,
        max: i,
        step: r
      })),
          _ = u;
      return u.__background = document.createElement("div"), u.__foreground = document.createElement("div"), X.bind(u.__background, "mousedown", function (e) {
        document.activeElement.blur(), X.bind(window, "mousemove", s), X.bind(window, "mouseup", l), s(e);
      }), X.bind(u.__background, "touchstart", function (e) {
        1 === e.touches.length && (X.bind(window, "touchmove", d), X.bind(window, "touchend", c), d(e));
      }), X.addClass(u.__background, "slider"), X.addClass(u.__foreground, "slider-fg"), u.updateDisplay(), u.__background.appendChild(u.__foreground), u.domElement.appendChild(u.__background), u;
    }

    return D(t, W), P(t, [{
      key: "updateDisplay",
      value: function value() {
        var e = (this.getValue() - this.__min) / (this.__max - this.__min);

        return this.__foreground.style.width = 100 * e + "%", j(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "updateDisplay", this).call(this);
      }
    }]), t;
  }(),
      Z = function (e) {
    function t(e, n, o) {
      F(this, t);
      var i = V(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)),
          r = i;
      return i.__button = document.createElement("div"), i.__button.innerHTML = void 0 === o ? "Fire" : o, X.bind(i.__button, "click", function (e) {
        return e.preventDefault(), r.fire(), !1;
      }), X.addClass(i.__button, "button"), i.domElement.appendChild(i.__button), i;
    }

    return D(t, z), P(t, [{
      key: "fire",
      value: function value() {
        this.__onChange && this.__onChange.call(this), this.getValue().call(this.object), this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
      }
    }]), t;
  }(),
      $ = function (e) {
    function t(e, n) {
      function o(e) {
        u(e), X.bind(window, "mousemove", u), X.bind(window, "touchmove", u), X.bind(window, "mouseup", r), X.bind(window, "touchend", r);
      }

      function i(e) {
        _(e), X.bind(window, "mousemove", _), X.bind(window, "touchmove", _), X.bind(window, "mouseup", s), X.bind(window, "touchend", s);
      }

      function r() {
        X.unbind(window, "mousemove", u), X.unbind(window, "touchmove", u), X.unbind(window, "mouseup", r), X.unbind(window, "touchend", r), c();
      }

      function s() {
        X.unbind(window, "mousemove", _), X.unbind(window, "touchmove", _), X.unbind(window, "mouseup", s), X.unbind(window, "touchend", s), c();
      }

      function a() {
        var e = R(this.value);
        !1 !== e ? (p.__color.__state = e, p.setValue(p.__color.toOriginal())) : this.value = p.__color.toString();
      }

      function c() {
        p.__onFinishChange && p.__onFinishChange.call(p, p.__color.toOriginal());
      }

      function u(e) {
        -1 === e.type.indexOf("touch") && e.preventDefault();

        var t = p.__saturation_field.getBoundingClientRect(),
            n = e.touches && e.touches[0] || e,
            o = n.clientX,
            i = n.clientY,
            r = (o - t.left) / (t.right - t.left),
            s = 1 - (i - t.top) / (t.bottom - t.top);

        return s > 1 ? s = 1 : s < 0 && (s = 0), r > 1 ? r = 1 : r < 0 && (r = 0), p.__color.v = s, p.__color.s = r, p.setValue(p.__color.toOriginal()), !1;
      }

      function _(e) {
        -1 === e.type.indexOf("touch") && e.preventDefault();

        var t = p.__hue_field.getBoundingClientRect(),
            n = 1 - ((e.touches && e.touches[0] || e).clientY - t.top) / (t.bottom - t.top);

        return n > 1 ? n = 1 : n < 0 && (n = 0), p.__color.h = 360 * n, p.setValue(p.__color.toOriginal()), !1;
      }

      F(this, t);
      var h = V(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
      h.__color = new I(h.getValue()), h.__temp = new I(0);
      var p = h;
      h.domElement = document.createElement("div"), X.makeSelectable(h.domElement, !1), h.__selector = document.createElement("div"), h.__selector.className = "selector", h.__saturation_field = document.createElement("div"), h.__saturation_field.className = "saturation-field", h.__field_knob = document.createElement("div"), h.__field_knob.className = "field-knob", h.__field_knob_border = "2px solid ", h.__hue_knob = document.createElement("div"), h.__hue_knob.className = "hue-knob", h.__hue_field = document.createElement("div"), h.__hue_field.className = "hue-field", h.__input = document.createElement("input"), h.__input.type = "text", h.__input_textShadow = "0 1px 1px ", X.bind(h.__input, "keydown", function (e) {
        13 === e.keyCode && a.call(this);
      }), X.bind(h.__input, "blur", a), X.bind(h.__selector, "mousedown", function () {
        X.addClass(this, "drag").bind(window, "mouseup", function () {
          X.removeClass(p.__selector, "drag");
        });
      }), X.bind(h.__selector, "touchstart", function () {
        X.addClass(this, "drag").bind(window, "touchend", function () {
          X.removeClass(p.__selector, "drag");
        });
      });
      var f = document.createElement("div");
      return S.extend(h.__selector.style, {
        width: "122px",
        height: "102px",
        padding: "3px",
        backgroundColor: "#222",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.3)"
      }), S.extend(h.__field_knob.style, {
        position: "absolute",
        width: "12px",
        height: "12px",
        border: h.__field_knob_border + (h.__color.v < .5 ? "#fff" : "#000"),
        boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
        borderRadius: "12px",
        zIndex: 1
      }), S.extend(h.__hue_knob.style, {
        position: "absolute",
        width: "15px",
        height: "2px",
        borderRight: "4px solid #fff",
        zIndex: 1
      }), S.extend(h.__saturation_field.style, {
        width: "100px",
        height: "100px",
        border: "1px solid #555",
        marginRight: "3px",
        display: "inline-block",
        cursor: "pointer"
      }), S.extend(f.style, {
        width: "100%",
        height: "100%",
        background: "none"
      }), l(f, "top", "rgba(0,0,0,0)", "#000"), S.extend(h.__hue_field.style, {
        width: "15px",
        height: "100px",
        border: "1px solid #555",
        cursor: "ns-resize",
        position: "absolute",
        top: "3px",
        right: "3px"
      }), d(h.__hue_field), S.extend(h.__input.style, {
        outline: "none",
        textAlign: "center",
        color: "#fff",
        border: 0,
        fontWeight: "bold",
        textShadow: h.__input_textShadow + "rgba(0,0,0,0.7)"
      }), X.bind(h.__saturation_field, "mousedown", o), X.bind(h.__saturation_field, "touchstart", o), X.bind(h.__field_knob, "mousedown", o), X.bind(h.__field_knob, "touchstart", o), X.bind(h.__hue_field, "mousedown", i), X.bind(h.__hue_field, "touchstart", i), h.__saturation_field.appendChild(f), h.__selector.appendChild(h.__field_knob), h.__selector.appendChild(h.__saturation_field), h.__selector.appendChild(h.__hue_field), h.__hue_field.appendChild(h.__hue_knob), h.domElement.appendChild(h.__input), h.domElement.appendChild(h.__selector), h.updateDisplay(), h;
    }

    return D(t, z), P(t, [{
      key: "updateDisplay",
      value: function value() {
        var e = R(this.getValue());

        if (!1 !== e) {
          var t = !1;
          S.each(I.COMPONENTS, function (n) {
            if (!S.isUndefined(e[n]) && !S.isUndefined(this.__color.__state[n]) && e[n] !== this.__color.__state[n]) return t = !0, {};
          }, this), t && S.extend(this.__color.__state, e);
        }

        S.extend(this.__temp.__state, this.__color.__state), this.__temp.a = 1;
        var n = this.__color.v < .5 || this.__color.s > .5 ? 255 : 0,
            o = 255 - n;
        S.extend(this.__field_knob.style, {
          marginLeft: 100 * this.__color.s - 7 + "px",
          marginTop: 100 * (1 - this.__color.v) - 7 + "px",
          backgroundColor: this.__temp.toHexString(),
          border: this.__field_knob_border + "rgb(" + n + "," + n + "," + n + ")"
        }), this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px", this.__temp.s = 1, this.__temp.v = 1, l(this.__saturation_field, "left", "#fff", this.__temp.toHexString()), this.__input.value = this.__color.toString(), S.extend(this.__input.style, {
          backgroundColor: this.__color.toHexString(),
          color: "rgb(" + n + "," + n + "," + n + ")",
          textShadow: this.__input_textShadow + "rgba(" + o + "," + o + "," + o + ",.7)"
        });
      }
    }]), t;
  }(),
      ee = ["-moz-", "-o-", "-webkit-", "-ms-", ""],
      te = {
    load: function load(e, t) {
      var n = t || document,
          o = n.createElement("link");
      o.type = "text/css", o.rel = "stylesheet", o.href = e, n.getElementsByTagName("head")[0].appendChild(o);
    },
    inject: function inject(e, t) {
      var n = t || document,
          o = document.createElement("style");
      o.type = "text/css", o.innerHTML = e;
      var i = n.getElementsByTagName("head")[0];

      try {
        i.appendChild(o);
      } catch (e) {}
    }
  },
      ne = function ne(e, t) {
    var n = e[t];
    return S.isArray(arguments[2]) || S.isObject(arguments[2]) ? new Y(e, t, arguments[2]) : S.isNumber(n) ? S.isNumber(arguments[2]) && S.isNumber(arguments[3]) ? S.isNumber(arguments[4]) ? new q(e, t, arguments[2], arguments[3], arguments[4]) : new q(e, t, arguments[2], arguments[3]) : S.isNumber(arguments[4]) ? new Q(e, t, {
      min: arguments[2],
      max: arguments[3],
      step: arguments[4]
    }) : new Q(e, t, {
      min: arguments[2],
      max: arguments[3]
    }) : S.isString(n) ? new J(e, t) : S.isFunction(n) ? new Z(e, t, "") : S.isBoolean(n) ? new K(e, t) : null;
  },
      oe = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
    setTimeout(e, 1e3 / 60);
  },
      ie = function () {
    function e() {
      F(this, e), this.backgroundElement = document.createElement("div"), S.extend(this.backgroundElement.style, {
        backgroundColor: "rgba(0,0,0,0.8)",
        top: 0,
        left: 0,
        display: "none",
        zIndex: "1000",
        opacity: 0,
        WebkitTransition: "opacity 0.2s linear",
        transition: "opacity 0.2s linear"
      }), X.makeFullscreen(this.backgroundElement), this.backgroundElement.style.position = "fixed", this.domElement = document.createElement("div"), S.extend(this.domElement.style, {
        position: "fixed",
        display: "none",
        zIndex: "1001",
        opacity: 0,
        WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear",
        transition: "transform 0.2s ease-out, opacity 0.2s linear"
      }), document.body.appendChild(this.backgroundElement), document.body.appendChild(this.domElement);
      var t = this;
      X.bind(this.backgroundElement, "click", function () {
        t.hide();
      });
    }

    return P(e, [{
      key: "show",
      value: function value() {
        var e = this;
        this.backgroundElement.style.display = "block", this.domElement.style.display = "block", this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)", this.layout(), S.defer(function () {
          e.backgroundElement.style.opacity = 1, e.domElement.style.opacity = 1, e.domElement.style.webkitTransform = "scale(1)";
        });
      }
    }, {
      key: "hide",
      value: function value() {
        var e = this,
            t = function t() {
          e.domElement.style.display = "none", e.backgroundElement.style.display = "none", X.unbind(e.domElement, "webkitTransitionEnd", t), X.unbind(e.domElement, "transitionend", t), X.unbind(e.domElement, "oTransitionEnd", t);
        };

        X.bind(this.domElement, "webkitTransitionEnd", t), X.bind(this.domElement, "transitionend", t), X.bind(this.domElement, "oTransitionEnd", t), this.backgroundElement.style.opacity = 0, this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)";
      }
    }, {
      key: "layout",
      value: function value() {
        this.domElement.style.left = window.innerWidth / 2 - X.getWidth(this.domElement) / 2 + "px", this.domElement.style.top = window.innerHeight / 2 - X.getHeight(this.domElement) / 2 + "px";
      }
    }]), e;
  }(),
      re = function (e) {
    if (e && "undefined" != typeof window) {
      var t = document.createElement("style");
      return t.setAttribute("type", "text/css"), t.innerHTML = e, document.head.appendChild(t), e;
    }
  }(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n");

  te.inject(re);

  var se = "Default",
      ae = function () {
    try {
      return !!window.localStorage;
    } catch (e) {
      return !1;
    }
  }(),
      le = void 0,
      de = !0,
      ce = void 0,
      ue = !1,
      _e = [],
      he = function e(t) {
    var n = this,
        o = t || {};
    this.domElement = document.createElement("div"), this.__ul = document.createElement("ul"), this.domElement.appendChild(this.__ul), X.addClass(this.domElement, "dg"), this.__folders = {}, this.__controllers = [], this.__rememberedObjects = [], this.__rememberedObjectIndecesToControllers = [], this.__listening = [], o = S.defaults(o, {
      closeOnTop: !1,
      autoPlace: !0,
      width: e.DEFAULT_WIDTH
    }), o = S.defaults(o, {
      resizable: o.autoPlace,
      hideable: o.autoPlace
    }), S.isUndefined(o.load) ? o.load = {
      preset: se
    } : o.preset && (o.load.preset = o.preset), S.isUndefined(o.parent) && o.hideable && _e.push(this), o.resizable = S.isUndefined(o.parent) && o.resizable, o.autoPlace && S.isUndefined(o.scrollable) && (o.scrollable = !0);
    var i = ae && "true" === localStorage.getItem(m(this, "isLocal")),
        r = void 0,
        s = void 0;

    if (Object.defineProperties(this, {
      parent: {
        get: function get() {
          return o.parent;
        }
      },
      scrollable: {
        get: function get() {
          return o.scrollable;
        }
      },
      autoPlace: {
        get: function get() {
          return o.autoPlace;
        }
      },
      closeOnTop: {
        get: function get() {
          return o.closeOnTop;
        }
      },
      preset: {
        get: function get() {
          return n.parent ? n.getRoot().preset : o.load.preset;
        },
        set: function set(e) {
          n.parent ? n.getRoot().preset = e : o.load.preset = e, E(this), n.revert();
        }
      },
      width: {
        get: function get() {
          return o.width;
        },
        set: function set(e) {
          o.width = e, w(n, e);
        }
      },
      name: {
        get: function get() {
          return o.name;
        },
        set: function set(e) {
          o.name = e, s && (s.innerHTML = o.name);
        }
      },
      closed: {
        get: function get() {
          return o.closed;
        },
        set: function set(t) {
          o.closed = t, o.closed ? X.addClass(n.__ul, e.CLASS_CLOSED) : X.removeClass(n.__ul, e.CLASS_CLOSED), this.onResize(), n.__closeButton && (n.__closeButton.innerHTML = t ? e.TEXT_OPEN : e.TEXT_CLOSED);
        }
      },
      load: {
        get: function get() {
          return o.load;
        }
      },
      useLocalStorage: {
        get: function get() {
          return i;
        },
        set: function set(e) {
          ae && (i = e, e ? X.bind(window, "unload", r) : X.unbind(window, "unload", r), localStorage.setItem(m(n, "isLocal"), e));
        }
      }
    }), S.isUndefined(o.parent)) {
      if (o.closed = !1, X.addClass(this.domElement, e.CLASS_MAIN), X.makeSelectable(this.domElement, !1), ae && i) {
        n.useLocalStorage = !0;
        var a = localStorage.getItem(m(this, "gui"));
        a && (o.load = JSON.parse(a));
      }

      this.__closeButton = document.createElement("div"), this.__closeButton.innerHTML = e.TEXT_CLOSED, X.addClass(this.__closeButton, e.CLASS_CLOSE_BUTTON), o.closeOnTop ? (X.addClass(this.__closeButton, e.CLASS_CLOSE_TOP), this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0])) : (X.addClass(this.__closeButton, e.CLASS_CLOSE_BOTTOM), this.domElement.appendChild(this.__closeButton)), X.bind(this.__closeButton, "click", function () {
        n.closed = !n.closed;
      });
    } else {
      void 0 === o.closed && (o.closed = !0);
      var l = document.createTextNode(o.name);
      X.addClass(l, "controller-name"), s = c(n, l);
      X.addClass(this.__ul, e.CLASS_CLOSED), X.addClass(s, "title"), X.bind(s, "click", function (e) {
        return e.preventDefault(), n.closed = !n.closed, !1;
      }), o.closed || (this.closed = !1);
    }

    o.autoPlace && (S.isUndefined(o.parent) && (de && (ce = document.createElement("div"), X.addClass(ce, "dg"), X.addClass(ce, e.CLASS_AUTO_PLACE_CONTAINER), document.body.appendChild(ce), de = !1), ce.appendChild(this.domElement), X.addClass(this.domElement, e.CLASS_AUTO_PLACE)), this.parent || w(n, o.width)), this.__resizeHandler = function () {
      n.onResizeDebounced();
    }, X.bind(window, "resize", this.__resizeHandler), X.bind(this.__ul, "webkitTransitionEnd", this.__resizeHandler), X.bind(this.__ul, "transitionend", this.__resizeHandler), X.bind(this.__ul, "oTransitionEnd", this.__resizeHandler), this.onResize(), o.resizable && y(this), r = function r() {
      ae && "true" === localStorage.getItem(m(n, "isLocal")) && localStorage.setItem(m(n, "gui"), JSON.stringify(n.getSaveObject()));
    }, this.saveToLocalStorageIfPossible = r, o.parent || function () {
      var e = n.getRoot();
      e.width += 1, S.defer(function () {
        e.width -= 1;
      });
    }();
  };

  he.toggleHide = function () {
    ue = !ue, S.each(_e, function (e) {
      e.domElement.style.display = ue ? "none" : "";
    });
  }, he.CLASS_AUTO_PLACE = "a", he.CLASS_AUTO_PLACE_CONTAINER = "ac", he.CLASS_MAIN = "main", he.CLASS_CONTROLLER_ROW = "cr", he.CLASS_TOO_TALL = "taller-than-window", he.CLASS_CLOSED = "closed", he.CLASS_CLOSE_BUTTON = "close-button", he.CLASS_CLOSE_TOP = "close-top", he.CLASS_CLOSE_BOTTOM = "close-bottom", he.CLASS_DRAG = "drag", he.DEFAULT_WIDTH = 245, he.TEXT_CLOSED = "Close Controls", he.TEXT_OPEN = "Open Controls", he._keydownHandler = function (e) {
    "text" === document.activeElement.type || 72 !== e.which && 72 !== e.keyCode || he.toggleHide();
  }, X.bind(window, "keydown", he._keydownHandler, !1), S.extend(he.prototype, {
    add: function add(e, t) {
      return f(this, e, t, {
        factoryArgs: Array.prototype.slice.call(arguments, 2)
      });
    },
    addColor: function addColor(e, t) {
      return f(this, e, t, {
        color: !0
      });
    },
    remove: function remove(e) {
      this.__ul.removeChild(e.__li), this.__controllers.splice(this.__controllers.indexOf(e), 1);
      var t = this;
      S.defer(function () {
        t.onResize();
      });
    },
    destroy: function destroy() {
      if (this.parent) throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");
      this.autoPlace && ce.removeChild(this.domElement);
      var e = this;
      S.each(this.__folders, function (t) {
        e.removeFolder(t);
      }), X.unbind(window, "keydown", he._keydownHandler, !1), u(this);
    },
    addFolder: function addFolder(e) {
      if (void 0 !== this.__folders[e]) throw new Error('You already have a folder in this GUI by the name "' + e + '"');
      var t = {
        name: e,
        parent: this
      };
      t.autoPlace = this.autoPlace, this.load && this.load.folders && this.load.folders[e] && (t.closed = this.load.folders[e].closed, t.load = this.load.folders[e]);
      var n = new he(t);
      this.__folders[e] = n;
      var o = c(this, n.domElement);
      return X.addClass(o, "folder"), n;
    },
    removeFolder: function removeFolder(e) {
      this.__ul.removeChild(e.domElement.parentElement), delete this.__folders[e.name], this.load && this.load.folders && this.load.folders[e.name] && delete this.load.folders[e.name], u(e);
      var t = this;
      S.each(e.__folders, function (t) {
        e.removeFolder(t);
      }), S.defer(function () {
        t.onResize();
      });
    },
    open: function open() {
      this.closed = !1;
    },
    close: function close() {
      this.closed = !0;
    },
    onResize: function onResize() {
      var e = this.getRoot();

      if (e.scrollable) {
        var t = X.getOffset(e.__ul).top,
            n = 0;
        S.each(e.__ul.childNodes, function (t) {
          e.autoPlace && t === e.__save_row || (n += X.getHeight(t));
        }), window.innerHeight - t - 20 < n ? (X.addClass(e.domElement, he.CLASS_TOO_TALL), e.__ul.style.height = window.innerHeight - t - 20 + "px") : (X.removeClass(e.domElement, he.CLASS_TOO_TALL), e.__ul.style.height = "auto");
      }

      e.__resize_handle && S.defer(function () {
        e.__resize_handle.style.height = e.__ul.offsetHeight + "px";
      }), e.__closeButton && (e.__closeButton.style.width = e.width + "px");
    },
    onResizeDebounced: S.debounce(function () {
      this.onResize();
    }, 50),
    remember: function remember() {
      if (S.isUndefined(le) && ((le = new ie()).domElement.innerHTML = '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>'), this.parent) throw new Error("You can only call remember on a top level GUI.");
      var e = this;
      S.each(Array.prototype.slice.call(arguments), function (t) {
        0 === e.__rememberedObjects.length && v(e), -1 === e.__rememberedObjects.indexOf(t) && e.__rememberedObjects.push(t);
      }), this.autoPlace && w(this, this.width);
    },
    getRoot: function getRoot() {
      for (var e = this; e.parent;) {
        e = e.parent;
      }

      return e;
    },
    getSaveObject: function getSaveObject() {
      var e = this.load;
      return e.closed = this.closed, this.__rememberedObjects.length > 0 && (e.preset = this.preset, e.remembered || (e.remembered = {}), e.remembered[this.preset] = x(this)), e.folders = {}, S.each(this.__folders, function (t, n) {
        e.folders[n] = t.getSaveObject();
      }), e;
    },
    save: function save() {
      this.load.remembered || (this.load.remembered = {}), this.load.remembered[this.preset] = x(this), _(this, !1), this.saveToLocalStorageIfPossible();
    },
    saveAs: function saveAs(e) {
      this.load.remembered || (this.load.remembered = {}, this.load.remembered[se] = x(this, !0)), this.load.remembered[e] = x(this), this.preset = e, g(this, e, !0), this.saveToLocalStorageIfPossible();
    },
    revert: function revert(e) {
      S.each(this.__controllers, function (t) {
        this.getRoot().load.remembered ? p(e || this.getRoot(), t) : t.setValue(t.initialValue), t.__onFinishChange && t.__onFinishChange.call(t, t.getValue());
      }, this), S.each(this.__folders, function (e) {
        e.revert(e);
      }), e || _(this.getRoot(), !1);
    },
    listen: function listen(e) {
      var t = 0 === this.__listening.length;
      this.__listening.push(e), t && C(this.__listening);
    },
    updateDisplay: function updateDisplay() {
      S.each(this.__controllers, function (e) {
        e.updateDisplay();
      }), S.each(this.__folders, function (e) {
        e.updateDisplay();
      });
    }
  });
  var pe = {
    Color: I,
    math: N,
    interpret: R
  },
      fe = {
    Controller: z,
    BooleanController: K,
    OptionController: Y,
    StringController: J,
    NumberController: W,
    NumberControllerBox: Q,
    NumberControllerSlider: q,
    FunctionController: Z,
    ColorController: $
  },
      me = {
    dom: X
  },
      ge = {
    GUI: he
  },
      be = he,
      ve = {
    color: pe,
    controllers: fe,
    dom: me,
    gui: ge,
    GUI: be
  };
  e.color = pe, e.controllers = fe, e.dom = me, e.gui = ge, e.GUI = be, e.default = ve, Object.defineProperty(e, "__esModule", {
    value: !0
  });
});
},{}],"lib/DatGUI/DatGUIcss.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GUIcss =
/*#__PURE__*/
function () {
  function GUIcss(_cssObj) {
    _classCallCheck(this, GUIcss);

    this.name = 'dg ac'; // dat gui class name

    this.class = this.initClass();
    this.gui = this.initGui();
    this.alpha = this.initSetAlpha(_cssObj);
    this.posXY = this.initSetPosXY(_cssObj); // delay GUI color all structure
    // this.color = this.initSetColor(_cssObj);

    this.initAlpha();
    this.initPosXY(); // this.initColor();
  }

  _createClass(GUIcss, [{
    key: "initClass",
    value: function initClass() {
      return document.getElementsByClassName(this.name);
    }
  }, {
    key: "initGui",
    value: function initGui() {
      return this.class[0];
    }
  }, {
    key: "initSetAlpha",
    value: function initSetAlpha(_cssObj) {
      var tmpDefaultValue = 0.8;
      var tmpValue = _cssObj.alpha ? _cssObj.alpha : tmpDefaultValue;
      return tmpValue;
    } // initSetColor(_cssObj) {
    //     let tmpDefaultValue = [255, 255, 255];
    //     let tmpValue = (_cssObj.color) ? _cssObj.color : tmpDefaultValue;
    //     return tmpValue;
    // }

  }, {
    key: "initSetPosXY",
    value: function initSetPosXY(_cssObj) {
      var tmpDefaultRight = 0;
      var tmpDefaultTop = 0;
      var tmpRight = _cssObj.right ? _cssObj.right : tmpDefaultRight;
      var tmpTop = _cssObj.top ? _cssObj.top : tmpDefaultTop;
      var tmpReturnObj = {
        right: tmpRight,
        top: tmpTop
      };
      return tmpReturnObj;
    }
  }, {
    key: "initAlpha",
    value: function initAlpha() {
      return this.gui.style.opacity = this.alpha;
    } // initColor() {
    //     return this.gui.style.backgroundColor = this.color;
    // }

  }, {
    key: "initPosXY",
    value: function initPosXY() {
      this.gui.style.right = this.posXY.right + "px";
      this.gui.style.top = this.posXY.top + "px";
    }
  }, {
    key: "callbackCSSstringSkipped",
    value: function callbackCSSstringSkipped() {
      var tmpList = document.getElementsByClassName('property-name');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = tmpList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tmpCompo = _step.value;
          tmpCompo.style.overflow = 'inherit';
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } // EXTERNAL

  }, {
    key: "getAlpha",
    value: function getAlpha() {
      return this.alpha;
    }
  }, {
    key: "getcssObj",
    value: function getcssObj() {
      return {
        alpha: this.alpha,
        right: this.posXY.right,
        top: this.posXY.top
      };
    }
  }, {
    key: "setAlphaInGUI",
    value: function setAlphaInGUI() {
      this.gui.style.opacity = this.alpha;
    } // setColorInGUI() {
    //     this.gui.style.backgroundColor = this.color;
    // }

  }, {
    key: "setPosXYInGUI",
    value: function setPosXYInGUI() {
      this.gui.style.right = this.posXY.right + "px";
      this.gui.style.top = this.posXY.top + "px";
    }
  }, {
    key: "setFolderNameCenter",
    value: function setFolderNameCenter() {
      var tmpFolderList = document.getElementsByClassName('title');

      for (var i = 0; i < tmpFolderList.length; i++) {
        // console.log(i, ':', tmpFolderList[i]);
        tmpFolderList[i].style.textAlign = 'center';
      }
    }
  }]);

  return GUIcss;
}();

exports.default = GUIcss;
},{}],"lib/DatGUI/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var dat = _interopRequireWildcard(require("./DatGUILib.js"));

var _DatGUIcss = _interopRequireDefault(require("./DatGUIcss.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import GUI CSS
var GUIMain =
/*#__PURE__*/
function () {
  // GUI property main class
  function GUIMain(_tmpHandOverObj) {
    _classCallCheck(this, GUIMain);

    this.lib = new dat.GUI();
    this.side = this.chckSideOption(_tmpHandOverObj);
    this.css = new _DatGUIcss.default(_tmpHandOverObj.css);
  }

  _createClass(GUIMain, [{
    key: "chckSideOption",
    value: function chckSideOption(_tmpHandOverObj) {
      return _tmpHandOverObj.init.isSideExist ? undefined : new dat.GUI();
    }
  }, {
    key: "getLib",
    value: function getLib() {
      return this.lib;
    }
  }, {
    key: "getSide",
    value: function getSide() {
      return this.side;
    }
  }, {
    key: "getcss",
    value: function getcss() {
      return this.css;
    }
  }, {
    key: "getcssObj",
    value: function getcssObj() {
      return this.css.getcssObj();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.lib.destroy();
    }
  }, {
    key: "callbackCSSstringSkipped",
    value: function callbackCSSstringSkipped() {
      this.css.callbackCSSstringSkipped();
    }
  }]);

  return GUIMain;
}();

exports.default = GUIMain;
},{"./DatGUILib.js":"lib/DatGUI/DatGUILib.js","./DatGUIcss.js":"lib/DatGUI/DatGUIcss.js"}],"lib/Stats/StatsLib.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// stats.js - http://github.com/mrdoob/stats.js
(function (f, e) {
  "object" === (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" !== typeof module ? module.exports = e() : "function" === typeof define && define.amd ? define(e) : f.Stats = e();
})(this, function () {
  var f = function f() {
    function e(a) {
      c.appendChild(a.dom);
      return a;
    }

    function u(a) {
      for (var d = 0; d < c.children.length; d++) {
        c.children[d].style.display = d === a ? "block" : "none";
      }

      l = a;
    }

    var l = 0,
        c = document.createElement("div");
    c.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";
    c.addEventListener("click", function (a) {
      a.preventDefault();
      u(++l % c.children.length);
    }, !1);
    var k = (performance || Date).now(),
        g = k,
        a = 0,
        r = e(new f.Panel("FPS", "#0ff", "#002")),
        h = e(new f.Panel("MS", "#0f0", "#020"));
    if (self.performance && self.performance.memory) var t = e(new f.Panel("MB", "#f08", "#201"));
    u(0);
    return {
      REVISION: 16,
      dom: c,
      addPanel: e,
      showPanel: u,
      begin: function begin() {
        k = (performance || Date).now();
      },
      end: function end() {
        a++;
        var c = (performance || Date).now();
        h.update(c - k, 200);

        if (c >= g + 1E3 && (r.update(1E3 * a / (c - g), 100), g = c, a = 0, t)) {
          var d = performance.memory;
          t.update(d.usedJSHeapSize / 1048576, d.jsHeapSizeLimit / 1048576);
        }

        return c;
      },
      update: function update() {
        k = this.end();
      },
      domElement: c,
      setMode: u
    };
  };

  f.Panel = function (e, f, l) {
    var c = Infinity,
        k = 0,
        g = Math.round,
        a = g(window.devicePixelRatio || 1),
        r = 80 * a,
        h = 48 * a,
        t = 3 * a,
        v = 2 * a,
        d = 3 * a,
        m = 15 * a,
        n = 74 * a,
        p = 30 * a,
        q = document.createElement("canvas");
    q.width = r;
    q.height = h;
    q.style.cssText = "width:80px;height:48px";
    var b = q.getContext("2d");
    b.font = "bold " + 9 * a + "px Helvetica,Arial,sans-serif";
    b.textBaseline = "top";
    b.fillStyle = l;
    b.fillRect(0, 0, r, h);
    b.fillStyle = f;
    b.fillText(e, t, v);
    b.fillRect(d, m, n, p);
    b.fillStyle = l;
    b.globalAlpha = .9;
    b.fillRect(d, m, n, p);
    return {
      dom: q,
      update: function update(h, w) {
        c = Math.min(c, h);
        k = Math.max(k, h);
        b.fillStyle = l;
        b.globalAlpha = 1;
        b.fillRect(0, 0, r, m);
        b.fillStyle = f;
        b.fillText(g(h) + " " + e + " (" + g(c) + "-" + g(k) + ")", t, v);
        b.drawImage(q, d + a, m, n - a, p, d, m, n - a, p);
        b.fillRect(d + n - a, m, a, p);
        b.fillStyle = l;
        b.globalAlpha = .9;
        b.fillRect(d + n - a, m, a, g((1 - h / w) * p));
      }
    };
  };

  return f;
});
},{}],"lib/Stats/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _StatsLib = _interopRequireDefault(require("./StatsLib.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import GUI CSS
var StatsMain =
/*#__PURE__*/
function () {
  function StatsMain(_cssObj) {
    _classCallCheck(this, StatsMain);

    this.self = new _StatsLib.default();
    this.body = undefined;
    this.alpha = this.initAlpha(_cssObj);
    this.initShowStats();
  }

  _createClass(StatsMain, [{
    key: "initAlpha",
    value: function initAlpha(_cssObj) {
      var tmpDefaultValue = 0.8;
      var tmpValue = _cssObj.alpha ? _cssObj.alpha : tmpDefaultValue;
      return tmpValue;
    }
  }, {
    key: "initShowStats",
    value: function initShowStats() {
      this.self.showPanel(0);
      this.self.dom.style.opacity = this.alpha;
      this.body = document.body.appendChild(this.self.dom);
      requestAnimationFrame(this.statsAnimate.bind(this));
    }
  }, {
    key: "statsAnimate",
    value: function statsAnimate() {
      this.self.begin();
      this.self.end();
      requestAnimationFrame(this.statsAnimate.bind(this));
    }
  }, {
    key: "getStats",
    value: function getStats() {
      return this.self;
    }
  }, {
    key: "setAlphaInStats",
    value: function setAlphaInStats(_alpha) {
      this.body.style.opacity = _alpha;
    }
  }]);

  return StatsMain;
}();

exports.default = StatsMain;
},{"./StatsLib.js":"lib/Stats/StatsLib.js"}],"lib/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./DatGUI/index.js"));

var _index2 = _interopRequireDefault(require("./Stats/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LibClass =
/*#__PURE__*/
function () {
  function LibClass(_tmpHandOverObj) {
    _classCallCheck(this, LibClass);

    this.stats = new _index2.default(_tmpHandOverObj.css);
    this.GUI = new _index.default(_tmpHandOverObj);
  } // stats


  _createClass(LibClass, [{
    key: "getStats",
    value: function getStats() {
      return this.stats;
    }
  }, {
    key: "getStatsSelf",
    value: function getStatsSelf() {
      return this.stats.getStats();
    } // EXTERNAL GUI

  }, {
    key: "getGUI",
    value: function getGUI() {
      return this.GUI;
    }
  }, {
    key: "getGUILib",
    value: function getGUILib() {
      return this.getGUI().getLib();
    }
  }, {
    key: "getGUISide",
    value: function getGUISide() {
      return this.getGUI().getSide();
    }
  }, {
    key: "getGUIcss",
    value: function getGUIcss() {
      return this.getGUI().getcss();
    }
  }, {
    key: "getGUIcssObj",
    value: function getGUIcssObj() {
      return this.getGUI().getcssObj();
    } // destroy GUI

  }, {
    key: "destroyGUI",
    value: function destroyGUI() {
      this.getGUI().destroy();
    } // EXTERNAL : GUI

  }, {
    key: "addFolderInBasic",
    value: function addFolderInBasic(_basic) {
      // add in basic folder with events
      var tmpcss = this.getGUIcss(); // gui & stats alpha

      _basic.add(tmpcss, 'alpha').min(0.1).max(1.0).step(0.02).onChange(this.setAlphaInGUINStats.bind(this)); // // DEFERRED
      // // gui color
      // _basic.addColor(this, 'color')
      // .onChange( this.setColorInGUI.bind(this) );
      // gui posXY (right, top)


      _basic.add(tmpcss.posXY, 'right').step(1).onChange(tmpcss.setPosXYInGUI.bind(tmpcss));

      _basic.add(tmpcss.posXY, 'top').step(1).onChange(tmpcss.setPosXYInGUI.bind(tmpcss));
    }
  }, {
    key: "setAlphaInGUINStats",
    value: function setAlphaInGUINStats() {
      var tmpcss = this.getGUIcss();
      var tmpAlpha = tmpcss.getAlpha();
      var tmpStats = this.getStats();
      tmpcss.setAlphaInGUI.apply(tmpcss);
      tmpStats.setAlphaInStats.apply(tmpStats, [tmpAlpha]);
    } // EXTERNAL : Side
    // EXTERNAL : Main

  }, {
    key: "callbackCSSstringSkipped",
    value: function callbackCSSstringSkipped() {
      this.GUI.callbackCSSstringSkipped();
    }
  }]);

  return LibClass;
}();

exports.default = LibClass;
},{"./DatGUI/index.js":"lib/DatGUI/index.js","./Stats/index.js":"lib/Stats/index.js"}],"utils/DebugConsoleFunc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DebugConsole = DebugConsole;
exports.DebugGetThisConsole = DebugGetThisConsole;
exports.DebugSceneNAllDisplayList = DebugSceneNAllDisplayList;

function DebugConsole(_obj) {
  var tmpName = _obj.name;
  var tmpVersion = _obj.version;
  var tmpInitConfig = _obj.initConfig;
  var tmpA = 'ALPHA:' + tmpInitConfig.alpha;
  var tmpR = 'RIGHT:' + tmpInitConfig.right;
  var tmpT = 'TOP:' + tmpInitConfig.top;
  var tmpURL = _obj.url;
  var tmp_nameNversion = '%c' + tmpName + ' v' + tmpVersion + ' \n';
  var tmp_config = '%c INIT_CONFIG( ' + tmpA + ' | ' + tmpR + ' | ' + tmpT + ' ) \n';
  var tmp_url = '%c' + tmpURL;
  var tmpShadowGap = 1;
  var tmpShadowList = [tmpShadowGap + 'px ' + -tmpShadowGap + 'px 0 rgb(217,31,38)', tmpShadowGap * 2 + 'px ' + -tmpShadowGap * 2 + 'px 0 rgb(226,91,14)', tmpShadowGap * 3 + 'px ' + -tmpShadowGap * 3 + 'px 0 rgb(245,221,8)', tmpShadowGap * 4 + 'px ' + -tmpShadowGap * 4 + 'px 0 rgb(5,148,68)', tmpShadowGap * 5 + 'px ' + -tmpShadowGap * 5 + 'px 0 rgb(2,135,206)', tmpShadowGap * 6 + 'px ' + -tmpShadowGap * 6 + 'px 0 rgb(4,77,145)', tmpShadowGap * 7 + 'px ' + -tmpShadowGap * 7 + 'px 0 rgb(42,21,113)'];
  var tmpShadow = 'text-shadow:';

  for (var i = 0; i < tmpShadowList.length; i++) {
    var tmpMiddle = ',';

    if (i === tmpShadowList.length - 1) {
      tmpMiddle = ';';
    }

    tmpShadow += tmpShadowList[i] + tmpMiddle;
  }

  var tmpStyle1 = 'font-weight:bold; font-size:25px; color: rgb(255, 111, 0);' + tmpShadow;
  var tmpStyle2 = 'color: white; background: rgb(181, 0, 0); font-size: 12px;';
  var tmpStyle3 = 'font-size: 12px;'; // final console log with vars

  return console.log(tmp_nameNversion + tmp_config + tmp_url, tmpStyle1, tmpStyle2, tmpStyle3);
} // debug console log out the specific game object


function DebugGetThisConsole() {
  var tmpInit = '%c_PGI LogOut_';
  var tmpInfo = ': GUIIdx[' + this.guiIdx + ']';
  var tmpStyle = 'color: white; background: rgb(255, 111, 0);';
  return console.log(tmpInit, tmpStyle, tmpInfo, this);
} // show Phaser.Scene & Phaser's all the displayList


function DebugSceneNAllDisplayList() {
  // scope: Phaser.Scene
  var tmpDisplayList = this.children.list;
  var tmpInit = '%c_PGI Expose_';
  var tmpInfo = ': |Scene| & |DisplayList|\n';
  var tmpStyle = 'color: white; background: rgb(250, 0, 0);';
  return console.log(tmpInit, tmpStyle, tmpInfo, this, '\n', tmpDisplayList);
} // export function DebugPointerPosition(_mainCamera, _pointer) {
//     let tmpInit = '%c_PGI Pointer Info_';
//     let tmpStyle = 'color: white; background: rgb(125, 0, 125);';
//     let tmpGap = ':';
//     let tmpXStr = 'X:';
//     let tmpX = _pointer.x;
//     let tmpYStr = 'Y:';
//     let tmpY = _pointer.y;
//     let tmpZoomStr = 'ZoomRate:';
//     let tmpZoom = _mainCamera.zoom;
//     return console.log(
//         tmpInit, tmpStyle, tmpGap, '\n',
//         tmpXStr, tmpX, tmpYStr, tmpY, '\n',
//         tmpZoomStr, tmpZoom
//     );
// }
},{}],"manager/SrcManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// get and set Phaser.Scene.Anims list
var SrcManager =
/*#__PURE__*/
function () {
  function SrcManager(_scene) {
    _classCallCheck(this, SrcManager);

    this.textureList = this.initTextureList(_scene);
    this.textureKeyList = this.initTextureKeyList(this.textureList);
    this.animList = this.initAnimList(_scene);
    this.animKeyList = this.initAnimKeyList(this.animList);
  }

  _createClass(SrcManager, [{
    key: "initTextureList",
    value: function initTextureList(_scene) {
      var tmpTL = _scene.textures.list;
      return tmpTL;
    }
  }, {
    key: "initTextureKeyList",
    value: function initTextureKeyList(_textureList) {
      if (_textureList) {
        var tmpTKL = [];
        var tmpPropertyList = [];

        for (var tmpProperty in _textureList) {
          var tmpTextureFrames = _textureList[tmpProperty].frames;
          var tmpFramesList = [];

          for (var tmpProperty2 in tmpTextureFrames) {
            tmpFramesList.push(tmpProperty2);
          }

          tmpTKL.push({
            tKey: tmpProperty,
            fKeyList: tmpFramesList
          });
          tmpPropertyList.push(tmpProperty);
        }

        tmpTKL.unshift({
          tKey: tmpPropertyList,
          fKeyList: undefined
        });
        return tmpTKL;
      }
    }
  }, {
    key: "initAnimList",
    value: function initAnimList(_scene) {
      var tmpAL = _scene.anims.anims;
      return tmpAL;
    }
  }, {
    key: "initAnimKeyList",
    value: function initAnimKeyList(_animList) {
      if (_animList) {
        var tmpAKL = [];

        for (var tmpProperty in _animList.entries) {
          tmpAKL.push(tmpProperty);
        }

        return tmpAKL;
      }
    } // EXTERNAL: give key list object

  }, {
    key: "getTextureKeyList",
    value: function getTextureKeyList() {
      return this.textureKeyList[0].tKey;
    }
  }, {
    key: "getAnimKeyList",
    value: function getAnimKeyList() {
      return this.animKeyList;
    }
  }, {
    key: "getGameObjTextureKey",
    value: function getGameObjTextureKey(_gameObj) {
      return _gameObj.texture.key;
    }
  }, {
    key: "getGameObjFrameName",
    value: function getGameObjFrameName(_gameObj) {
      return _gameObj.texture.frames;
    }
  }, {
    key: "getGameObjTextureFrames",
    value: function getGameObjTextureFrames(_gameObj) {
      var tmpFrames = undefined;

      try {
        tmpFrames = _gameObj.texture.frames;
      } catch (e) {}

      if (tmpFrames) {
        var tmpList = [];

        for (var tmpProperty in tmpFrames) {
          tmpList.push(tmpProperty);
        }

        return tmpList;
      }
    }
  }, {
    key: "updateDropdown",
    value: function updateDropdown(_target, _list) {
      var innerHTMLStr = "";

      for (var i = 0; i < _list.length; i++) {
        var str = "<option value='" + _list[i] + "'>" + _list[i] + "</option>";
        innerHTMLStr += str;
      }

      if (innerHTMLStr != "") _target.domElement.children[0].innerHTML = innerHTMLStr;
    }
  }]);

  return SrcManager;
}();

exports.default = SrcManager;
},{}],"manager/TypeSortManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DebugConsoleFunc = require("../utils/DebugConsoleFunc.js");

var _SrcManager = _interopRequireDefault(require("./SrcManager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// sort obj type, pointer over properties
var TypeSortManager =
/*#__PURE__*/
function () {
  function TypeSortManager(_scene) {
    _classCallCheck(this, TypeSortManager);

    this.conAlert = '_PGI System_ :';
    this.timeKey = '_PGI CntEnd_ ';
    this.objLength = 0;
    this.srcObj = new _SrcManager.default(_scene); // class objs

    this.scene = _scene;
    this.folder;
    this.debugBox;
    this.input;
    this.camera;
  }

  _createClass(TypeSortManager, [{
    key: "create",
    value: function create(_guiClass) {
      this.createInitClassObjs(_guiClass);
    } // EXTERNAL
    // get scene then set list to form gui set up

  }, {
    key: "createInitClassObjs",
    value: function createInitClassObjs(_guiClass) {
      this.folder = _guiClass.folder;
      this.debugBox = _guiClass.debugBox;
      this.input = _guiClass.input;
      this.camera = _guiClass.camera;
    }
  }, {
    key: "createFocusFolder",
    value: function createFocusFolder(_objList) {
      var tmpLength = _objList.length;

      for (var i = 0; i < tmpLength; i++) {
        this.createFocusFolderTryException(_objList, _objList[i]);
        this.createFocusFolderSetObj(_objList, _objList[i]);
      }
    }
  }, {
    key: "createFocusFolderTryException",
    value: function createFocusFolderTryException(_objList, _obj) {
      if (_obj.type !== 'Graphics' && _obj.type !== 'Container') {
        this.createFocusFolderTryExceptionNotContainer(_obj); // set interactive function
      } else if (_obj.type === 'Container') {
        // container
        this.createFocusFolderTryExceptionContainer(_objList, _obj);
      } else {// console.log('graphics confirm!');
      }
    } // if the gameobj is container obj

  }, {
    key: "createFocusFolderTryExceptionContainer",
    value: function createFocusFolderTryExceptionContainer(_objList, _obj) {
      var tmpList = _obj.list;
      var tmpLength = tmpList.length;

      for (var i = 0; i < tmpLength; i++) {
        this.createFocusFolderTryException(tmpList, tmpList[i]);
        this.createFocusFolderSetObj(_objList, tmpList[i]);
      }
    } // if the gameobj is NOT container obj

  }, {
    key: "createFocusFolderTryExceptionNotContainer",
    value: function createFocusFolderTryExceptionNotContainer(_obj) {
      try {
        _obj.setInteractive();
      } catch (e) {}
    }
  }, {
    key: "createFocusFolderSetObj",
    value: function createFocusFolderSetObj(_objList, _obj) {
      var tmpGUIIdx = this.folder.getGUIIdx();
      var tmpObjs = {};
      tmpObjs.input = this.input;
      tmpObjs.scene = this.scene;
      tmpObjs.debugBox = this.debugBox;
      tmpObjs.folder = this.folder;
      tmpObjs.camera = this.camera;
      _obj.guiIdx = tmpGUIIdx;
      _obj.isFocusOnGUI = false; // focus check boolean

      _obj.focusTw = undefined; // save focus performance tween in this property

      _obj.GUI_BACK = this.folder.back2Basic.bind(this.folder, tmpGUIIdx);

      _obj.GUI_FOCUS_ONOFF = function () {
        // focus off => on logic so activate function like focused
        if (!this.isFocusOnGUI) {
          tmpObjs.folder.cross2FocusObj(this);
        }

        tmpObjs.input.runFocusLogic.call(tmpObjs.input, tmpObjs.scene, this, tmpObjs.debugBox, tmpObjs.folder, tmpObjs.camera);
      };

      _obj.GUI_CONSOLE = _DebugConsoleFunc.DebugGetThisConsole;
      this.chckParentContainer(_obj, _objList, tmpGUIIdx);
      this.createCustomInDetail(_obj, _objList, tmpGUIIdx);
    }
  }, {
    key: "chckParentContainer",
    value: function chckParentContainer(_obj, _objList, _tmpGUIIdx) {
      // if Parent Container exist, then insert the function
      var tmpPC = _obj.parentContainer;

      if (tmpPC) {
        // if this object parentContainer is exist
        _obj.GUI_CONTAINER = this.folder.closeThisNopenParentContainer.bind(_obj, [_tmpGUIIdx, tmpPC, this.folder, this.debugBox]);
      }
    }
  }, {
    key: "createCustomInDetail",
    value: function createCustomInDetail(_obj, _objList, _tmpGUIIdx) {
      var tmpFolderInCustom = this.folder.add2CustomFolder();
      this.chckObjType(this.folder.getCustomFolder(), _tmpGUIIdx, tmpFolderInCustom, _obj);
    }
  }, {
    key: "chckObjType",
    value: function chckObjType(_custom, _idx, _folderInCustom, _obj) {
      // check each of objs type
      var tmpGameObj = _obj;
      var tmpType = tmpGameObj.type;
      this.chckStartSorting(_idx); // BACK, FOCUS TOGGLE, CONSOLE

      this.createBackFunc(_idx, _folderInCustom, tmpGameObj);
      this.createFocusToggle(_folderInCustom, tmpGameObj);
      this.createConsoleFunc(_idx, _folderInCustom, tmpGameObj); // chck container exist & other stuffs

      this.createContainerFunc(_idx, _folderInCustom, tmpGameObj);
      this.createCommonFront(_folderInCustom, tmpGameObj);
      this.chckNCreatePhysicsType(_folderInCustom, tmpGameObj); // set each specific type properties

      switch (tmpType) {
        case 'Container':
          this.createContainer(_idx, _folderInCustom, tmpGameObj);
          break;

        case 'Image':
          this.createListImage(_idx, _folderInCustom, tmpGameObj, this.srcObj);
          break;

        case 'Sprite':
          this.createListSprite(_idx, _folderInCustom, tmpGameObj, this.srcObj);
          break;

        case 'Text':
          this.createListText(_idx, _folderInCustom, tmpGameObj);
          break;

        case 'TileSprite':
          this.createTileSprite(_idx, _folderInCustom, tmpGameObj);
          break;

        case 'ParticleEmitterManager':
          this.createParticleEmitterManager(_idx, _folderInCustom, tmpGameObj);
          break;
        // ++ TileMap Stuff

        case 'StaticTilemapLayer':
          this.createTilemapLayer(_idx, _folderInCustom, tmpGameObj);
          break;
        // ++ Done

        case 'Spine':
          this.createSpine(_idx, _folderInCustom, tmpGameObj);
          break;

        case 'Graphics':
          this.createGraphics(_idx, _folderInCustom, tmpGameObj);
          break;

        case 'Arc':
          // WTF is Arc????
          this.chckEndSorting(_idx);
          console.log('Arc:', tmpGameObj); // this.createAracdeBodySprite(_idx, _folderInCustom, tmpGameObj);

          break;
        // + ETC

        default:
          this.chckEndSorting(_idx);
          console.warn(tmpType, '<= this is not on the type or not yet updated type options');
          break;
      }
    }
  }, {
    key: "chckStartSorting",
    value: function chckStartSorting(_idx) {// if (_idx === 0) {
      //     console.log(this.conAlert, 'START CUSTOM SORTING');
      //     console.time(this.timeKey);
      //     this.objLength = _length - 1;
      // }
    }
  }, {
    key: "chckEndSorting",
    value: function chckEndSorting(_idx) {// if (_idx === this.objLength) {
      //     console.log(this.conAlert, 'END CUSTOM SORTING');
      //     console.timeEnd(this.timeKey)
      //     console.log(this.conAlert, 'DISPLAY LENGTH IS', this.objLength + 1);
      // }
    }
  }, {
    key: "createBackFunc",
    value: function createBackFunc(_idx, _folderInCustom, _gameObj) {
      // create back 2 basic function
      _folderInCustom.add(_gameObj, 'GUI_BACK');
    }
  }, {
    key: "createFocusToggle",
    value: function createFocusToggle(_folderInCustom, _gameObj) {
      if (_gameObj.type !== 'Graphics') {
        _folderInCustom.add(_gameObj, 'GUI_FOCUS_ONOFF');
      }
    }
  }, {
    key: "createConsoleFunc",
    value: function createConsoleFunc(_idx, _folderInCustom, _gameObj) {
      try {
        _folderInCustom.add(_gameObj, 'GUI_CONSOLE');
      } catch (e) {}
    }
  }, {
    key: "createContainerFunc",
    value: function createContainerFunc(_idx, _folderInCustom, _gameObj) {
      if (_gameObj.GUI_CONTAINER) {
        _folderInCustom.add(_gameObj, 'GUI_CONTAINER');
      }
    }
  }, {
    key: "createCommonFront",
    value: function createCommonFront(_folderInCustom, _gameObj) {
      // set properties (GUIIdx, name, type)
      this.tryCatch(_folderInCustom, _gameObj, 'GUIIdx');
      this.tryCatch(_folderInCustom, _gameObj, 'name');
    } // check body is arcade or matter

  }, {
    key: "chckNCreatePhysicsType",
    value: function chckNCreatePhysicsType(_folderInCustom, _gameObj) {
      var tmpType = _gameObj.body ? true : false;

      if (tmpType === true) {
        // chck if body exist
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

            this.createCommonBack(_folderInCustom, _gameObj);
            this.createMatterBody(_folderInCustom, _gameObj);
            break;

          case 'number':
            // impact
            tmpObj = {
              type: 'Impact ' + tmpStr
            };

            _folderInCustom.add(tmpObj, 'type');

            this.createCommonBack(_folderInCustom, _gameObj);
            break;

          default:
            // arcade
            tmpObj = {
              type: 'Arcade ' + tmpStr
            };

            _folderInCustom.add(tmpObj, 'type');

            this.createCommonBack(_folderInCustom, _gameObj);
            this.createArcadeBody(_folderInCustom, _gameObj);
            break;
        }
      } // chck if body is not exist, just set normal type
      else {
          this.tryCatch(_folderInCustom, _gameObj, 'type');
          this.createCommonBack(_folderInCustom, _gameObj);
        }
    }
  }, {
    key: "createCommonBack",
    value: function createCommonBack(_folderInCustom, _gameObj) {
      this.tryCatch(_folderInCustom, _gameObj, 'x', 'listen');
      this.tryCatch(_folderInCustom, _gameObj, 'y', 'listen');
      this.tryCatch(_folderInCustom, _gameObj, 'width', 'listen');
      this.tryCatch(_folderInCustom, _gameObj, 'height', 'listen');
      this.tryCatch(_folderInCustom, _gameObj, 'alpha', 'listen');
      this.tryCatch(_folderInCustom, _gameObj, 'depth');
      this.tryCatch(_folderInCustom, _gameObj, 'angle', 'listen');
      this.tryCatch(_folderInCustom, _gameObj, 'rotation', 'listen');
      this.tryCatch(_folderInCustom, _gameObj, 'visible');
      this.tryCatch(_folderInCustom, _gameObj, 'originX', 'listen');
      this.tryCatch(_folderInCustom, _gameObj, 'originY', 'listen');
      this.tryCatch(_folderInCustom, _gameObj, 'active');
    }
  }, {
    key: "createContainer",
    value: function createContainer(_idx, _folderInCustom, _gameObj) {
      this.tryCatch(_folderInCustom, _gameObj, 'exclusive');
      this.tryCatch(_folderInCustom, _gameObj, 'position', 'listen');
      this.tryCatch(_folderInCustom, _gameObj, 'scrollFactorX', 'listen');
      this.tryCatch(_folderInCustom, _gameObj, 'scrollFactorY', 'listen');
      this.tryCatch(_folderInCustom, _gameObj, 'z');
      this.tryCatch(_folderInCustom, _gameObj, 'w');

      var tmpList = _folderInCustom.addFolder('list');

      tmpList.open();
      tmpList.add(_gameObj.list, 'length');

      for (var i = 0; i < _gameObj.list.length; i++) {
        this.tryCatch(tmpList, _gameObj.list, i);
      }

      this.chckEndSorting(_idx);
    }
  }, {
    key: "createListImage",
    value: function createListImage(_idx, _folderInCustom, _gameObj, _srcObj) {
      // also check what type of Physics
      this.createTextureNFrame(_idx, _folderInCustom, _gameObj, _srcObj);
      this.chckEndSorting(_idx);
    }
  }, {
    key: "createListSprite",
    value: function createListSprite(_idx, _folderInCustom, _gameObj, _srcObj) {
      this.tryCatch(_folderInCustom, _gameObj.texture, 'originX');
      this.tryCatch(_folderInCustom, _gameObj.texture, 'originY');
      this.createTextureNFrame(_idx, _folderInCustom, _gameObj, _srcObj);
      this.createAnims(_idx, _folderInCustom, _gameObj);
      this.chckEndSorting(_idx);
    }
  }, {
    key: "createListText",
    value: function createListText(_idx, _folderInCustom, _gameObj) {
      _folderInCustom.add(_gameObj, 'text').listen();

      this.chckEndSorting(_idx);
    }
  }, {
    key: "createGraphics",
    value: function createGraphics(_idx, _folderInCustom, _gameObj) {
      this.tryCatch(_folderInCustom, _gameObj, 'alpha');
      this.tryCatch(_folderInCustom, _gameObj, 'scale');
      this.tryCatch(_folderInCustom, _gameObj, 'angle');
      this.tryCatch(_folderInCustom, _gameObj, 'rotation');
      this.tryCatch(_folderInCustom, _gameObj, 'visible');
      this.tryCatch(_folderInCustom, _gameObj, 'defaultFillColor');
      this.tryCatch(_folderInCustom, _gameObj, 'defaultFillAlpha');
      this.tryCatch(_folderInCustom, _gameObj, 'defaultStrokeWidth');
      this.tryCatch(_folderInCustom, _gameObj, 'defaultStrokeColor');
      this.tryCatch(_folderInCustom, _gameObj, 'defaultStrokeAlpha');
      this.tryCatch(_folderInCustom, _gameObj, '_lineWidth');
      this.tryCatch(_folderInCustom, _gameObj, 'active');
      this.chckEndSorting(_idx);
    }
  }, {
    key: "createTileSprite",
    value: function createTileSprite(_idx, _folderInCustom, _gameObj) {
      this.tryCatch(_folderInCustom, _gameObj, 'tilePositionX', 'listen');
      this.tryCatch(_folderInCustom, _gameObj, 'tilePositionY', 'listen');
      this.tryCatch(_folderInCustom, _gameObj, 'tileScaleX', 'listen');
      this.tryCatch(_folderInCustom, _gameObj, 'tileScaleY', 'listen');
      this.tryCatch(_folderInCustom, _gameObj, 'tabIndex');
      this.tryCatch(_folderInCustom, _gameObj, 'ignoreDestroy');
      this.tryCatch(_folderInCustom, _gameObj, 'potWidth');
      this.tryCatch(_folderInCustom, _gameObj, 'potHeight');
      this.tryCatch(_folderInCustom, _gameObj, 'scrollFactorX');
      this.tryCatch(_folderInCustom, _gameObj, 'scrollFactorY');
      this.tryCatch(_folderInCustom, _gameObj, 'potHeight'); // // tile crop
      // let tmpCrop = _folderInCustom.addFolder('_crop');
      // tmpCrop.open();
      // for (var tmpProperty in _gameObj._crop) {
      //     this.tryCatch(tmpCrop, _gameObj._crop, tmpProperty);
      // }

      this.chckEndSorting(_idx);
    }
  }, {
    key: "createParticleEmitterManager",
    value: function createParticleEmitterManager(_idx, _folderInCustom, _gameObj) {
      this.chckEndSorting(_idx);
    }
  }, {
    key: "createTilemapLayer",
    value: function createTilemapLayer(_idx, _folderInCustom, _gameObj) {
      this.chckEndSorting(_idx);
    }
  }, {
    key: "createSpine",
    value: function createSpine(_idx, _folderInCustom, _gameObj) {
      this.chckEndSorting(_idx);
    }
  }, {
    key: "createMatterBody",
    value: function createMatterBody(_folderInCustom, _gameObj) {
      var tmpBody = _folderInCustom.addFolder('body');

      tmpBody.open();
      this.tryCatch(tmpBody, _gameObj.body, 'id');
      this.tryCatch(tmpBody, _gameObj.body, 'type');
      this.tryCatch(tmpBody, _gameObj.body, 'label');
      this.createAllThePropertyOfObj(tmpBody, 'position', _gameObj.body);
      this.createAllThePropertyOfObj(tmpBody, 'force', _gameObj.body);
      this.tryCatch(tmpBody, _gameObj.body, 'speed', 'listen');
      this.tryCatch(tmpBody, _gameObj.body, 'angularSpeed', 'listen');
      this.tryCatch(tmpBody, _gameObj.body, 'angularVelocity', 'listen');
      this.tryCatch(tmpBody, _gameObj.body, 'isSensor');
      this.tryCatch(tmpBody, _gameObj.body, 'isStatic');
      this.tryCatch(tmpBody, _gameObj.body, 'isSleeping');
      this.tryCatch(tmpBody, _gameObj.body, 'sleepThreshold');
      this.tryCatch(tmpBody, _gameObj.body, 'density');
      this.tryCatch(tmpBody, _gameObj.body, 'restitution');
      this.tryCatch(tmpBody, _gameObj.body, 'frictionStatic');
      this.tryCatch(tmpBody, _gameObj.body, 'frictionAir');
      this.tryCatch(tmpBody, _gameObj.body, 'slop');
      this.tryCatch(tmpBody, _gameObj.body, 'mass');
      this.tryCatch(tmpBody, _gameObj.body, 'area');
      this.tryCatch(tmpBody, _gameObj.body, 'inertia');
      this.tryCatch(tmpBody, _gameObj.body, 'inverseInertia');
      this.tryCatch(tmpBody, _gameObj.body, 'chamfer');
      this.tryCatch(tmpBody, _gameObj.body, 'ignoreGravity');
      this.tryCatch(tmpBody, _gameObj.body, 'ignorePointer');
      this.tryCatch(tmpBody, _gameObj.body, 'ignoreDestroy');
    }
  }, {
    key: "createArcadeBody",
    value: function createArcadeBody(_folderInCustom, _gameObj) {
      var tmpBody = _folderInCustom.addFolder('body');

      tmpBody.open();
      this.tryCatch(tmpBody, _gameObj.body, 'debugShowBody');
      this.tryCatch(tmpBody, _gameObj.body, 'debugShowVelocity');
      this.tryCatch(tmpBody, _gameObj.body, 'debugBodyColor');
      this.tryCatch(tmpBody, _gameObj.body, 'onWorldBounds');
      this.tryCatch(tmpBody, _gameObj.body, 'allowDrag');
      this.tryCatch(tmpBody, _gameObj.body, 'allowGravity');
      this.tryCatch(tmpBody, _gameObj.body, 'allowRotation');
      this.tryCatch(tmpBody, _gameObj.body, 'onCollide');
      this.tryCatch(tmpBody, _gameObj.body, 'onOverlap');
      this.tryCatch(tmpBody, _gameObj.body, 'enable');
      this.tryCatch(tmpBody, _gameObj.body, 'isCircle');
      this.createAllThePropertyOfObj(tmpBody, 'offset', _gameObj.body);
      this.createAllThePropertyOfObj(tmpBody, 'position', _gameObj.body);
      this.tryCatch(tmpBody, _gameObj.body, 'sourceWidth', 'listen');
      this.tryCatch(tmpBody, _gameObj.body, 'sourceHeight', 'listen');
      this.tryCatch(tmpBody, _gameObj.body, 'halfWidth', 'listen');
      this.tryCatch(tmpBody, _gameObj.body, 'halfHeight', 'listen');
      this.tryCatch(tmpBody, _gameObj.body, 'angularVelocity', 'listen');
      this.tryCatch(tmpBody, _gameObj.body, 'angularAcceleration', 'listen');
      this.tryCatch(tmpBody, _gameObj.body, 'angularDrag');
      this.tryCatch(tmpBody, _gameObj.body, 'maxAngular');
      this.tryCatch(tmpBody, _gameObj.body, 'mass');
      this.tryCatch(tmpBody, _gameObj.body, 'angle');
      this.tryCatch(tmpBody, _gameObj.body, 'speed');
      this.tryCatch(tmpBody, _gameObj.body, 'facing');
      this.tryCatch(tmpBody, _gameObj.body, 'immovable');
      this.tryCatch(tmpBody, _gameObj.body, 'moves');
      this.tryCatch(tmpBody, _gameObj.body, 'collideWorldBounds');
      this.tryCatch(tmpBody, _gameObj.body, 'syncBounds');
    }
  }, {
    key: "createTextureNFrame",
    value: function createTextureNFrame(_idx, _folderInCustom, _gameObj, _srcObj) {
      var tmpGameObjTexture = _srcObj.getGameObjTextureKey(_gameObj);

      var tmpTexture = {};
      var tmpFrame = {};
      var tmpT = undefined;
      var tmpF = undefined;
      tmpTexture.textureList = _srcObj.getTextureKeyList();

      tmpTexture.setTexture = function () {
        var tmpKey = tmpT.getValue();
        var tmpW = _gameObj.width;
        var tmpH = _gameObj.height;
        var tmpSX = _gameObj.scaleX;
        var tmpSY = _gameObj.scaleY;

        _gameObj.setTexture(tmpKey);

        _gameObj.setDisplaySize(tmpW * tmpSX, tmpH * tmpSY); // change frame list


        var tmpList = _srcObj.getGameObjTextureFrames(_gameObj);

        _srcObj.updateDropdown(tmpF, tmpList);
      };

      tmpFrame.frameList = _srcObj.getGameObjTextureFrames(_gameObj);

      tmpFrame.setFrame = function () {
        var tmpName = tmpF.getValue();

        _gameObj.setFrame(tmpName);
      };

      tmpT = _folderInCustom.add(tmpTexture, 'textureList', tmpTexture.textureList).setValue(tmpGameObjTexture);

      _folderInCustom.add(tmpTexture, 'setTexture');

      tmpF = _folderInCustom.add(tmpFrame, 'frameList', tmpFrame.frameList);

      _folderInCustom.add(tmpFrame, 'setFrame');
    }
  }, {
    key: "createAnims",
    value: function createAnims(_idx, _folderInCustom, _gameObj) {
      // create anims property folder
      var tmpAnimList = undefined;
      var tmpAnimPlay = {};
      tmpAnimPlay.playList = this.srcObj.getAnimKeyList();

      tmpAnimPlay.play = function () {
        var tmpKey = tmpAnimList.getValue();
        var tmpW = _gameObj.width;
        var tmpH = _gameObj.height;
        var tmpSX = _gameObj.scaleX;
        var tmpSY = _gameObj.scaleY;

        _gameObj.anims.play(tmpKey);

        _gameObj.setDisplaySize(tmpW * tmpSX, tmpH * tmpSY);
      };

      var tmpAnims = _folderInCustom.addFolder('anims');

      tmpAnims.open(); // play animation

      tmpAnimList = tmpAnims.add(tmpAnimPlay, 'playList', tmpAnimPlay.playList).setValue(tmpAnimPlay.playList[0]);
      tmpAnims.add(tmpAnimPlay, 'play');
      this.tryCatch(tmpAnims, _gameObj.anims, 'stop');
      this.tryCatch(tmpAnims, _gameObj.anims, 'pause');
      this.tryCatch(tmpAnims, _gameObj.anims, 'resume'); // etc properties

      this.tryCatch(tmpAnims, _gameObj.anims, 'isPlaying');
      this.tryCatch(tmpAnims, _gameObj.anims, 'currentAnim');
      this.tryCatch(tmpAnims, _gameObj.anims, 'currentFrame');
      this.tryCatch(tmpAnims, _gameObj.anims, 'nextAnim');
      this.tryCatch(tmpAnims, _gameObj.anims, 'duration');
      this.tryCatch(tmpAnims, _gameObj.anims, 'msPerFrame');
      this.tryCatch(tmpAnims, _gameObj.anims, 'skipMissedFrames');
      this.tryCatch(tmpAnims, _gameObj.anims, '_delay');
      this.tryCatch(tmpAnims, _gameObj.anims, '_repeat');
      this.tryCatch(tmpAnims, _gameObj.anims, '_repeatDelay');
      this.tryCatch(tmpAnims, _gameObj.anims, '_yoyo');
      this.tryCatch(tmpAnims, _gameObj.anims, 'forward');
      this.tryCatch(tmpAnims, _gameObj.anims, '_reverse');
      this.tryCatch(tmpAnims, _gameObj.anims, 'accumulator');
      this.tryCatch(tmpAnims, _gameObj.anims, 'nextTick');
      this.tryCatch(tmpAnims, _gameObj.anims, 'repeatCounter');
      this.tryCatch(tmpAnims, _gameObj.anims, 'pendingRepeat');
      this.tryCatch(tmpAnims, _gameObj.anims, '_paused');
      this.tryCatch(tmpAnims, _gameObj.anims, '_wasPlaying');
      this.tryCatch(tmpAnims, _gameObj.anims, '_pendingStop');
    }
  }, {
    key: "createAllThePropertyOfObj",
    value: function createAllThePropertyOfObj(_folderInCustom, _nameStr, _listenObj) {
      var tmpFolder = _folderInCustom.addFolder(_nameStr);

      var tmpObj = _listenObj[_nameStr];
      tmpFolder.open();

      for (var tmpProperty in tmpObj) {
        this.tryCatch(tmpFolder, _listenObj, tmpProperty);
      }

      return tmpFolder;
    }
  }, {
    key: "tryCatch",
    value: function tryCatch(_guiObj, _obj, _property, _cmd, _customFunction) {
      var tmpAddFunc = undefined;

      try {
        tmpAddFunc = _guiObj.add(_obj, _property);
      } catch (e) {}

      ;

      if (tmpAddFunc) {
        switch (_cmd) {
          case null:
          case undefined:
            break;

          case 'listen':
            tmpAddFunc.listen();
            break;
          // onChange

          case 'onChange':
            if (_customFunction) {
              tmpAddFunc.onChange(_customFunction);
            }

            break;

          default:
            console.log(_cmd, '<= this is not on the options');
            break;
        }
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

        case 'TileSprite':
          tmpReturn = _gameObj.displayTexture.key;
          break;

        case 'Container':
          break;

        case 'Emitter':
        case 'Arc':
          console.log('Arc:', _gameObj);
          break;

        case 'Graphics':
          break;

        default:
          console.log(tmpType, 'this is not on the type or not yet updated type options');
          break;
      }

      return tmpReturn;
    }
  }]);

  return TypeSortManager;
}();

exports.default = TypeSortManager;
},{"../utils/DebugConsoleFunc.js":"utils/DebugConsoleFunc.js","./SrcManager.js":"manager/SrcManager.js"}],"manager/FolderManager.js":[function(require,module,exports) {
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
  function FolderManager(_typeSort) {
    _classCallCheck(this, FolderManager);

    this.GUI;
    this.typeSort = _typeSort;
    this.config = this.initConfig();
    this.basic = this.initBasic();
    this.custom = this.initCustom();
  }

  _createClass(FolderManager, [{
    key: "create",
    value: function create(_scene, _GUI) {
      this.GUI = _GUI;
      this.createBasic();
      this.createCustom();
      this.createFolderBtnClickEvent();
    }
  }, {
    key: "initConfig",
    value: function initConfig() {
      // config
      var tmpC = {};
      tmpC.initFolderCnt = 0;
      tmpC.openBasicDefault = true;
      tmpC.openCustomDefault = false;
      tmpC.tmpStorage = {
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
      return tmpC;
    }
  }, {
    key: "initBasic",
    value: function initBasic() {
      // basic folder
      var tmpB = {};
      tmpB.folder = undefined;
      tmpB.list = [];
      return tmpB;
    }
  }, {
    key: "initCustom",
    value: function initCustom() {
      // custom folder
      var tmpC = {};
      tmpC.folder = undefined;
      tmpC.list = [];
      tmpC.isDetailedOpen = false;
      return tmpC;
    }
  }, {
    key: "setDetailedStatus",
    value: function setDetailedStatus(_bool) {
      this.custom.folder.isDetailedOpen = _bool;
    }
  }, {
    key: "getDetailedStatus",
    value: function getDetailedStatus() {
      return this.custom.folder.isDetailedOpen;
    }
  }, {
    key: "createBasic",
    value: function createBasic() {
      this.basic.folder = this.GUI.addFolder('BASIC');
    }
  }, {
    key: "createCustom",
    value: function createCustom() {
      this.custom.folder = this.GUI.addFolder('DISPLAY_LIST');
    }
  }, {
    key: "createFolderBtnClickEvent",
    value: function createFolderBtnClickEvent() {
      var _this = this;

      var tmpBasic = this.basic.folder;
      var tmpCustom = this.custom.folder; // BASIC & CUSTOM folder div placement

      var tmpBasicTitle = tmpBasic.domElement.getElementsByClassName('title')[0];
      var tmpCustomTitle = tmpCustom.domElement.getElementsByClassName('title')[0]; // dat.GUI folder pointer interactive event handling

      tmpBasicTitle.addEventListener('pointerup', function (_event) {
        if (tmpBasic.closed) {
          // result is open
          _this.openBigFolder(tmpBasic);
        } else {
          // result is close
          _this.closeBigFolder(tmpBasic);
        }
      });
      tmpCustomTitle.addEventListener('pointerup', function (_event) {
        if (tmpCustom.closed) {
          // result is open
          _this.closeChildrenFolder(tmpCustom);
        } else {
          // result is close
          _this.openChildrenFolder(tmpCustom);
        }
      });
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
    key: "getGUIIdx",
    value: function getGUIIdx() {
      return this.config.initFolderCnt;
    }
  }, {
    key: "add2CustomFolder",
    value: function add2CustomFolder() {
      var tmpFolder = this.custom.folder.addFolder(this.config.initFolderCnt);
      this.push2FolderList(tmpFolder, 'custom');
      this.config.initFolderCnt++;
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
        this.openFolder(this.custom.folder);
      } else {
        for (var i = 0; i < this.config.initFolderCnt; i++) {
          this.closeFolder(this.custom.list[i]);
        }
      }
    } // open folder

  }, {
    key: "openBigFolder",
    value: function openBigFolder(_folder) {
      _folder.open();
    }
  }, {
    key: "closeBigFolder",
    value: function closeBigFolder(_folder) {
      _folder.close();
    }
  }, {
    key: "openFolder",
    value: function openFolder(_folder) {
      this.setFolderDisplay(_folder, 'default');

      _folder.open();
    }
  }, {
    key: "closeFolder",
    value: function closeFolder(_folder) {
      _folder.close();

      this.setFolderDisplay(_folder, 'none');
    }
  }, {
    key: "openChildrenFolder",
    value: function openChildrenFolder(_folder) {
      this.setFolderChildrenDisplay(_folder, 'default');

      _folder.open();
    }
  }, {
    key: "closeChildrenFolder",
    value: function closeChildrenFolder(_folder) {
      _folder.close();

      this.setFolderChildrenDisplay(_folder, 'none');
    }
  }, {
    key: "setFolderDisplay",
    value: function setFolderDisplay(_folder, _cmd) {
      var tmpCmds = {
        none: 'none',
        default: ''
      };
      _folder.domElement.style.display = tmpCmds[_cmd];
    }
  }, {
    key: "setFolderChildrenDisplay",
    value: function setFolderChildrenDisplay(_folder, _cmd) {
      var tmpCmds = {
        none: 'none',
        default: ''
      }; // control individual property dom display

      var tmpLength = Object.keys(_folder.__folders).length;

      for (var i = 0; i < tmpLength; i++) {
        _folder.__folders[String(i)].domElement.style = tmpCmds[_cmd];
      }
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
        this.openBigFolder(this.basic.folder);
        this.closeFolder(tmpFocus);
        this.closeBigFolder(this.custom.folder);
        var tmpFuncLength = 2;
        var tmpLength = tmpFocus.__controllers.length - tmpFuncLength;

        for (var i = 0; i < tmpLength; i++) {
          tmpFocus.__controllers[i].setValue('NONE');
        }
      }
    }
  }, {
    key: "cross2FocusObj",
    value: function cross2FocusObj(_gameObj) {
      // actually cross 2 custom_folder/focus_folder(config)
      if (_gameObj) {
        var tmpObjFolder = this.getCustomFoldersInFolder(); // chck is any displayed folder exist

        for (var tmpObj in tmpObjFolder) {
          this.closeFolder(tmpObjFolder[tmpObj]);
        }

        this.closeBigFolder(this.basic.folder);
        this.openBigFolder(this.custom.folder);
        this.openFolder(tmpObjFolder[_gameObj.guiIdx]);
        this.setDetailedStatus(true);
      }
    }
  }, {
    key: "back2Basic",
    value: function back2Basic(_idx) {
      var tmpObjFolder = this.getCustomFoldersInFolder();
      this.closeFolder(tmpObjFolder[_idx]);
      this.setDetailedStatus(false);
      this.closeBigFolder(this.custom.folder);
      this.openBigFolder(this.basic.folder);
    }
  }, {
    key: "closeThisNopenParentContainer",
    value: function closeThisNopenParentContainer(_arr) {
      // scope: gameObj
      var tmpLength = _arr[0];
      var tmpParentContainer = _arr[1];
      var tmpFolder = _arr[2];
      var tmpDebugBox = _arr[3];
      var tmpPCIdx = tmpParentContainer.guiIdx;
      var tmpObjFolder = tmpFolder.getCustomFoldersInFolder();
      tmpFolder.closeFolder(tmpObjFolder[tmpLength]);
      tmpFolder.setBasicFocusFolder(tmpParentContainer);
      tmpFolder.openFolder(tmpObjFolder[tmpPCIdx]);
      tmpDebugBox.clearFocus(this);
      tmpDebugBox.setClearNFocus(tmpParentContainer);
      tmpDebugBox.setFocusPerformance(tmpParentContainer, tmpFolder);
    } // EXTERNAL: get function

  }, {
    key: "getBasic",
    value: function getBasic() {
      return this.basic;
    }
  }, {
    key: "getCustom",
    value: function getCustom() {
      return this.custom;
    }
  }, {
    key: "getBasicFolder",
    value: function getBasicFolder() {
      return this.basic.folder;
    }
  }, {
    key: "getCustomFolder",
    value: function getCustomFolder() {
      return this.custom.folder;
    }
  }, {
    key: "getBasicList",
    value: function getBasicList() {
      return this.basic.list;
    }
  }, {
    key: "getCustomList",
    value: function getCustomList() {
      return this.custom.list;
    }
  }, {
    key: "getCustomFoldersInFolder",
    value: function getCustomFoldersInFolder() {
      return this.custom.folder.__folders;
    }
  }, {
    key: "getTmpStorageOver",
    value: function getTmpStorageOver() {
      return this.config.tmpStorage.Obj.over;
    }
  }, {
    key: "getTmpStorageFocus",
    value: function getTmpStorageFocus() {
      return this.config.tmpStorage.Obj.focus;
    }
  }]);

  return FolderManager;
}();

exports.default = FolderManager;
},{}],"manager/DebugBoxManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// make debug box with phaser graphics
var DebugBoxManager =
/*#__PURE__*/
function () {
  function DebugBoxManager() {
    _classCallCheck(this, DebugBoxManager);

    this.scene;
    this.camera;
    this.graphics;
    this.list;
    this.gameBound = this.initGameBound();
    this.over = this.initOver();
    this.focus = this.initFocus();
  }

  _createClass(DebugBoxManager, [{
    key: "create",
    value: function create(_scene, _camera) {
      this.scene = _scene;
      this.camera = _camera;
      this.createSetting(_scene);
      this.createOver(Phaser.Geom.Rectangle);
      this.createFocus(Phaser.Geom.Rectangle);
    }
  }, {
    key: "update",
    value: function update(_time, _delta) {
      this.clearDebugBox();
      this.updateSizeBound();
      this.updateChaseOver();
      this.updateChaseFocus();
    }
  }, {
    key: "initGameBound",
    value: function initGameBound() {
      var tmpS = {};
      tmpS.self;
      tmpS.style = {
        stroke: 3,
        color: 0x7fa5e3
      };
      return tmpS;
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
    key: "updateSizeBound",
    value: function updateSizeBound() {
      if (this.camera.getIsDebugCamBound() || this.camera.getIsDraggable()) {
        this.graphics.lineStyle(this.gameBound.style.stroke, this.gameBound.style.color);
        this.graphics.strokeRectShape({
          x: 0,
          y: 0,
          width: this.camera.getSize().w,
          height: this.camera.getSize().h
        });
      }
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
    value: function updateChaseFocus() {
      if (this.focus.self && this.focus.gameObj) {
        this.setFocus(this.focus.gameObj);
      }
    } // EXTERNAL: get logic

  }, {
    key: "getOverGameObj",
    value: function getOverGameObj() {
      return this.over.gameObj;
    }
  }, {
    key: "getFocusGameObj",
    value: function getFocusGameObj() {
      return this.focus.gameObj;
    } // EXTERNAL: set logic

  }, {
    key: "setOverGameObj",
    value: function setOverGameObj(_gameObj) {
      this.over.gameObj = _gameObj;
    }
  }, {
    key: "setFocusGameObj",
    value: function setFocusGameObj(_gameObj) {
      this.focus.gameObj = _gameObj;
    }
  }, {
    key: "setOver",
    value: function setOver(_gameObj) {
      this.over.gameObj = _gameObj;
      this.setDebugBox(this.over, _gameObj);
    }
  }, {
    key: "setClearNFocus",
    value: function setClearNFocus(_gameObj) {
      this.clearDebugBox();
      this.setFocus(_gameObj);
    } // config should contain pos, scale(width, height)

  }, {
    key: "setDebugBox",
    value: function setDebugBox(_target, _gameObj) {
      // let tmpPC = this.chckParentContainer(_gameObj);
      // let tmpTarget = _target;
      // let tmpConfig = {};
      // tmpTarget.gameObj = _gameObj;
      // if (tmpPC) {
      //     tmpConfig.originX = _gameObj.originX * tmpPC.originX;
      //     tmpConfig.originY = _gameObj.originY * tmpPC.originY;
      //     tmpConfig.width = _gameObj.width * _gameObj.scaleX;
      //     tmpConfig.height = _gameObj.height * _gameObj.scaleY;
      //     tmpConfig.x = _gameObj.x - tmpConfig.width * tmpConfig.originX;
      //     tmpConfig.y = _gameObj.y - tmpConfig.height * tmpConfig.originY;
      // }
      // else {
      //     tmpConfig.originX = _gameObj.originX;
      //     tmpConfig.originY = _gameObj.originY;
      //     tmpConfig.width = _gameObj.width * _gameObj.scaleX;
      //     tmpConfig.height = _gameObj.height * _gameObj.scaleY;
      //     tmpConfig.x = _gameObj.x - tmpConfig.width * _gameObj.originX;
      //     tmpConfig.y = _gameObj.y - tmpConfig.height * _gameObj.originY;
      // }
      this.graphics.lineStyle(_target.style.stroke, _target.style.color); // tmpTarget.self.setPosition(tmpConfig.x, tmpConfig.y);
      // tmpTarget.self.setSize(tmpConfig.width, tmpConfig.height);

      this.graphics.strokeRectShape(_gameObj.getBounds());
    }
  }, {
    key: "setFocus",
    value: function setFocus(_gameObj) {
      if (_gameObj) {
        // check is gameObj
        _gameObj.isFocusOnGUI = true;
        this.focus.gameObj = _gameObj;
        this.setDebugBox(this.focus, _gameObj);
      }
    }
  }, {
    key: "setFocusPerformance",
    value: function setFocusPerformance(_gameObj, _folder) {
      var _this = this;

      // flickering tween performance
      var tmpTwConfig = {
        // basically, this is for container tween setting ALPHA
        from: 1,
        to: 0.5,
        isTint: false
      };

      if (_gameObj.setTint) {
        // this is just mono gameObj tween setting TINT
        tmpTwConfig.from = 255;
        tmpTwConfig.to = 120;
        tmpTwConfig.isTint = true;
      }

      _gameObj.focusTw = this.scene.tweens.addCounter({
        from: tmpTwConfig.from,
        to: tmpTwConfig.to,
        duration: 500,
        ease: 'Sine.easeIn',
        repeat: -1,
        yoyo: true,
        onStart: function onStart() {
          _this.setStoreConfig('BASIC', _gameObj, _folder);
        },
        onUpdate: function onUpdate() {
          if (_gameObj.isFocusOnGUI) {
            if (tmpTwConfig.isTint) {
              var tmpValue = ~~_gameObj.focusTw.getValue();

              _gameObj.setTint(Phaser.Display.Color.GetColor(tmpValue, tmpValue, tmpValue));
            } else {
              var _tmpValue = _gameObj.focusTw.getValue();

              _gameObj.setAlpha(_tmpValue);
            }
          } else {
            if (tmpTwConfig.isTint) {
              _gameObj.clearTint();
            } else {
              _gameObj.setAlpha(1);
            }

            _gameObj.focusTw.remove();
          }
        }
      });
    }
  }, {
    key: "clearFocus",
    value: function clearFocus(_gameObj) {
      var tmpObj = undefined;
      _gameObj ? tmpObj = _gameObj : tmpObj = this.getFocusGameObj();

      if (tmpObj) {
        tmpObj.setAlpha(1); // temp (should be set alpha to saved alpha value)

        tmpObj.isFocusOnGUI = false;
      }
    }
  }, {
    key: "setPointerOver",
    value: function setPointerOver(_gameObj) {
      _gameObj.setAlpha(0.7);
    }
  }, {
    key: "clearPointerOver",
    value: function clearPointerOver(_gameObj) {
      _gameObj.isTinted ? _gameObj.clearTint() : null;

      _gameObj.setAlpha(1); // temp (should be set alpha to saved alpha value)

    }
  }, {
    key: "setStoreConfig",
    value: function setStoreConfig(_folderType, _gameObj, _folder) {
      var tmpFocus = undefined;

      if (_folderType === 'BASIC') {
        tmpFocus = _folder.getTmpStorageOver();
      } else if (_folderType === 'CUSTOM') {
        tmpFocus = _folder.getTmpStorageFocus();
      }

      tmpFocus.guiIdx = _gameObj.guiIdx;

      try {
        tmpFocus.guiAlpha = _gameObj.alpha;
      } catch (e) {}

      try {
        tmpFocus.guiTint = _gameObj.tint;
      } catch (e) {}
    }
  }, {
    key: "clearStoreConfig",
    value: function clearStoreConfig(_folderType) {
      if (_folderType === 'BASIC') {} else if (_folderType === 'CUSTOM') {} else {}
    } // ___________________________________________

  }, {
    key: "chckParentContainer",
    value: function chckParentContainer(_gameObj) {
      return _gameObj.parentContainer;
    } // clear logics

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

      if (this.focus.gameObj) {
        this.setDebugBox(this.focus, this.focus.gameObj);
      }
    }
  }, {
    key: "clearFocusGameObj",
    value: function clearFocusGameObj() {
      this.focus.gameObj = undefined;
      this.clearDebugBox();
    }
  }]);

  return DebugBoxManager;
}();

exports.default = DebugBoxManager;
},{}],"manager/CameraManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CameraManager =
/*#__PURE__*/
function () {
  function CameraManager() {
    _classCallCheck(this, CameraManager);

    this.scene;
    this.size = {
      w: 0,
      h: 0
    };
    this.cursorKey;
    this.mainCamera; // wheel one const tick gap value

    this.wheelValue = 150; // previous follow config

    this.followConfig = {
      x: 0,
      y: 0,
      zoom: 1
    };
    this.isFollowing = false; // drag values

    this.dragConfig = {
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0
    };
    this.isDraggable = false;
    this.isDebugCamBound = false;
  }

  _createClass(CameraManager, [{
    key: "create",
    value: function create(_scene, _debugBox) {
      this.scene = _scene;
      this.createSize(_scene);
      this.createCursorKey(_scene);
      this.createMainCamera(_scene);
      this.createCameraEvent(_scene);
      this.createFollowEvent(_scene, _debugBox);
    }
  }, {
    key: "update",
    value: function update() {
      this.updateDrag();
    }
  }, {
    key: "getSize",
    value: function getSize() {
      return this.size;
    }
  }, {
    key: "getCursorKey",
    value: function getCursorKey() {
      return this.cursorKey;
    }
  }, {
    key: "setFollowConfig",
    value: function setFollowConfig() {
      this.followConfig.x = this.mainCamera.midPoint.x;
      this.followConfig.y = this.mainCamera.midPoint.y;
      this.followConfig.zoom = this.mainCamera.zoom;
    }
  }, {
    key: "getPrevFollowConfig",
    value: function getPrevFollowConfig() {
      return this.followConfig;
    }
  }, {
    key: "setIsFollowing",
    value: function setIsFollowing(_bool) {
      this.isFollowing = _bool;
    }
  }, {
    key: "getIsFollowing",
    value: function getIsFollowing() {
      return this.isFollowing;
    }
  }, {
    key: "setDragStartConfig",
    value: function setDragStartConfig() {
      this.mainCamera.scrollX = this.dragConfig.scrollX;
      this.mainCamera.scrollY = this.dragConfig.scrollY;
      this.dragConfig.x = this.scene.input.x;
      this.dragConfig.y = this.scene.input.y;
    }
  }, {
    key: "setDragEndConfig",
    value: function setDragEndConfig() {
      this.dragConfig.scrollX = this.mainCamera.scrollX;
      this.dragConfig.scrollY = this.mainCamera.scrollY;
    }
  }, {
    key: "getIsDraggable",
    value: function getIsDraggable() {
      return this.isDraggable;
    }
  }, {
    key: "setIsDraggable",
    value: function setIsDraggable(_bool) {
      this.isDraggable = _bool;
    }
  }, {
    key: "getIsDebugCamBound",
    value: function getIsDebugCamBound() {
      return this.isDebugCamBound;
    }
  }, {
    key: "setIsDebugCamBound",
    value: function setIsDebugCamBound(_bool) {
      this.isDebugCamBound = _bool;
    }
  }, {
    key: "createSize",
    value: function createSize(_scene) {
      this.size.w = _scene.game.config.width;
      this.size.h = _scene.game.config.height;
    }
  }, {
    key: "createCursorKey",
    value: function createCursorKey(_scene) {
      this.cursorKey = _scene.input.keyboard.createCursorKeys(); // cursor key
    }
  }, {
    key: "createMainCamera",
    value: function createMainCamera(_scene) {
      this.mainCamera = _scene.cameras.main;
    }
  }, {
    key: "createCameraEvent",
    value: function createCameraEvent(_scene) {
      var _this = this;

      // when press command SHIFT + SCROLL UP&DOWN, Main Camera zoom changes
      _scene.input.on('wheel', function (_pointer, _gameObj, _deltaX, _deltaY, _deltaZ) {
        if (_this.chckCmdShiftKeyDown()) {
          var tmpZoom = _this.mainCamera.zoom;
          var tmpGap = -1 * (_deltaY / (_this.wheelValue * 10));
          var tmpCal = tmpZoom + tmpGap; // if zoom size under 0.1 & Gap value is minus, no reason to smaller i think

          if (tmpCal <= 0.1 && tmpGap < 0) {} else {
            _this.mainCamera.zoomTo(tmpCal, 100);
          } // set wheel debug cam bound


          _this.setIsDebugCamBound(true); // wheel end


          setTimeout(function () {
            if (tmpCal == _this.mainCamera.zoom) {
              _this.setIsDebugCamBound(false);
            }
          }, 300);
        }
      }); // SHIFT + RIGTH CLICK to dragging camera scroll position


      _scene.input.on('pointerdown', function (_pointer, _gameObj, _dragX, _dragY) {
        if (_this.chckCmdShiftKeyDown() && _pointer.rightButtonDown()) {
          _this.setDragStartConfig();

          _this.setIsDraggable(true);
        }
      });

      _scene.input.on('pointerup', function (_pointer, _gameObj, _dragX, _dragY) {
        _this.setIsDraggable(false);

        if (_this.chckCmdShiftKeyDown() && _pointer.rightButtonReleased()) {
          _this.setDragEndConfig();
        }
      }); // SHIFT + S get back to default zoom value


      _scene.input.keyboard.on('keyup-S', function (_pointer, _gameObj) {
        if (_this.chckCmdShiftKeyDown()) {
          _this.set2defaultZoom();
        }
      });
    }
  }, {
    key: "set2defaultZoom",
    value: function set2defaultZoom() {
      this.mainCamera.pan(this.size.w / 2, this.size.h / 2, 250, 'Elastic');
      this.mainCamera.zoomTo(1, 0);
      this.mainCamera.scrollX = 0;
      this.mainCamera.scrollY = 0;
      this.dragConfig.scrollX = 0;
      this.dragConfig.scrollY = 0;
    }
  }, {
    key: "createFollowEvent",
    value: function createFollowEvent(_scene, _debugBox) {
      var _this2 = this;

      // main camera just follows focus game obj
      _scene.input.keyboard.on('keyup-A', function (_pointer, _gameObj) {
        var tmpFocusGameObj = _debugBox.getFocusGameObj();

        if (_this2.chckCmdShiftKeyDown() && tmpFocusGameObj) {
          if (!_this2.mainCamera._follow) {
            _this2.setIsFollowing(true);

            _this2.setFollowConfig();

            _this2.mainCamera.startFollow(tmpFocusGameObj, true, 0.3, 0.3, 0.5, 0.5);
          } else {
            _this2.setFollowStop();
          }

          _this2.setIsDebugCamBound(_this2.getIsFollowing());
        }
      });
    }
  }, {
    key: "setFollowStop",
    value: function setFollowStop() {
      if (this.mainCamera._follow) {
        this.setIsFollowing(false);
        var tmpP = this.getPrevFollowConfig();
        this.mainCamera.stopFollow();
        this.mainCamera.pan(tmpP.x, tmpP.y, 250, 'Power2');
        this.mainCamera.zoomTo(tmpP.zoom, 0);
        this.setIsDebugCamBound(this.getIsFollowing());
      }
    }
  }, {
    key: "updateDrag",
    value: function updateDrag() {
      if (this.getIsDraggable()) {
        var tmpX = this.dragConfig.scrollX + this.dragConfig.x - this.scene.input.x;
        var tmpY = this.dragConfig.scrollY + this.dragConfig.y - this.scene.input.y;
        this.mainCamera.scrollX = tmpX;
        this.mainCamera.scrollY = tmpY;
      }
    }
  }, {
    key: "chckCmdShiftKeyDown",
    value: function chckCmdShiftKeyDown() {
      var tmpBool = this.getCursorKey().shift.isDown ? true : false; // is shift down?

      return tmpBool;
    }
  }]);

  return CameraManager;
}();

exports.default = CameraManager;
},{}],"utils/GlobalJoint.js":[function(require,module,exports) {
/*
    this script is only for complicated relations
    like SideGUI and Input manager
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JOINT_SI = void 0;
var JOINT_SI = {
  side: undefined,
  input: undefined,
  // method
  setSide: function setSide(_side) {
    this.side = _side;
  },
  setInput: function setInput(_input) {
    this.input = _input;
  },
  signalInput2Side: function signalInput2Side(_idx) {
    this.side.signalFromInput(_idx);
  }
};
exports.JOINT_SI = JOINT_SI;
},{}],"manager/InputManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GlobalJoint = require("../utils/GlobalJoint.js");

var _DebugConsoleFunc = require("../utils/DebugConsoleFunc.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InputManager =
/*#__PURE__*/
function () {
  function InputManager() {
    _classCallCheck(this, InputManager);

    _GlobalJoint.JOINT_SI.setInput(this);

    this.scene; // game size width, height

    this.size = {
      w: 0,
      h: 0
    };
    this.cursorKey; // pointer mode for MOVE, SCALE, ROTATE

    this.isPointerMode = false;
    this.pointerModeList = ['NONE', 'MOVE', 'SCALE', 'ANGLE'];
    this.pointerMode = 'NONE';
    this.pointerModeObjs = {
      // pointer info
      pointer: {
        x: 0,
        y: 0
      },
      isDown: false,
      // chck pointer is down?
      // target info
      target: undefined,
      // targeted focus GameObj
      move: {
        x: 0,
        y: 0
      },
      // rate 1:1
      scale: {
        x: 0,
        y: 0
      },
      // rate 5px:0.1
      angle: 0 // x coordinate rate 1:1

    };
  }

  _createClass(InputManager, [{
    key: "create",
    value: function create(_scene, _debugBox, _folder, _camera) {
      this.scene = _scene;
      this.createDisableRightClick();
      this.createSize(_scene);
      this.createCursorKey(_scene);
      this.createConsoleCmd(_scene, _debugBox);
      this.createOverEvent(_scene, _debugBox, _folder);
      this.createFocusEvent(_scene, _debugBox, _folder, _camera);
      this.createDetailEvent(_scene, _debugBox, _folder);
      this.createVisibleEvent(_scene, _debugBox); // MOVE, SCALE, ROTATE MODE input

      this.createModeCmdEvent(_scene);
      this.createModeEvent(_scene, _debugBox, _folder, _camera);
    }
  }, {
    key: "update",
    value: function update() {
      this.updatePointerMode();
    }
  }, {
    key: "createDisableRightClick",
    value: function createDisableRightClick() {
      // disable right click pop up
      window.addEventListener('contextmenu', function (e) {
        e.preventDefault();
      });
    }
  }, {
    key: "createSize",
    value: function createSize(_scene) {
      this.size.w = _scene.game.config.width;
      this.size.h = _scene.game.config.height;
    }
  }, {
    key: "getSize",
    value: function getSize() {
      return this.size;
    }
  }, {
    key: "createMainCamera",
    value: function createMainCamera(_scene) {
      this.mainCamera = _scene.cameras.main;
    }
  }, {
    key: "createCursorKey",
    value: function createCursorKey(_scene) {
      this.cursorKey = _scene.input.keyboard.createCursorKeys(); // cursor key
    }
  }, {
    key: "getCursorKey",
    value: function getCursorKey() {
      return this.cursorKey;
    }
  }, {
    key: "createConsoleCmd",
    value: function createConsoleCmd(_scene, _debugBox) {
      var _this = this;

      // when press command SHIFT + C
      _scene.input.keyboard.on('keyup-C', function () {
        if (_this.chckCmdShiftKeyDown()) {
          // if focus
          var tmpFocusGameObj = _debugBox.getFocusGameObj();

          if (tmpFocusGameObj) {
            _DebugConsoleFunc.DebugGetThisConsole.call(tmpFocusGameObj);
          }
        }
      });
    }
  }, {
    key: "createOverEvent",
    value: function createOverEvent(_scene, _debugBox, _folder) {
      var _this2 = this;

      // just pointer over obj
      _scene.input.on('gameobjectover', function (_pointer, _gameObj) {
        if (!_this2.chckGameObjIsFocusOnGUI(_gameObj)) {
          // not focus
          _debugBox.setPointerOver(_gameObj);

          _debugBox.setOver(_gameObj);

          _debugBox.setOverGameObj(_gameObj);

          _folder.setBasicOverFolder(_gameObj);
        }
      }); // when out from pointer over obj


      _scene.input.on('gameobjectout', function (_pointer, _gameObj) {
        if (!_this2.chckGameObjIsFocusOnGUI(_gameObj)) {
          // not focus
          _debugBox.clearPointerOver(_gameObj);

          _debugBox.clearOverGameObj();

          _debugBox.setOverGameObj(undefined);

          _folder.setBasicOverFolder();
        }
      });
    }
  }, {
    key: "createFocusEvent",
    value: function createFocusEvent(_scene, _debugBox, _folder, _camera) {
      var _this3 = this;

      // when want to focus logic
      _scene.input.on('gameobjectup', function (_pointer, _gameObj) {
        // if middle button pressed
        if (_this3.chckCommandKeyReleased(_pointer)) {
          if (!_this3.isPointerMode) {
            _this3.runFocusLogic(_scene, _gameObj, _debugBox, _folder, _camera);
          }
        }
      }); // when press command SHIFT + F


      _scene.input.keyboard.on('keyup-F', function () {
        if (_this3.chckCmdShiftKeyDown()) {
          // set gameObj via which pointer over on
          var tmpGameObj = _debugBox.getOverGameObj();

          _this3.runFocusLogic(_scene, tmpGameObj, _debugBox, _folder, _camera);
        }
      });
    } // when focused, SHIFT + D deep into the focused obj in detailed property

  }, {
    key: "createDetailEvent",
    value: function createDetailEvent(_scene, _debugBox, _folder) {
      var _this4 = this;

      _scene.input.keyboard.on('keyup-D', function () {
        var tmpFocusGameObj = _debugBox.getFocusGameObj();

        if ( // chck if focus valid & shift key down
        tmpFocusGameObj && _this4.chckCmdShiftKeyDown()) {
          // chck isDetailedOpen boolean then go 2 detailed or basic
          if (_folder.getDetailedStatus()) {
            _folder.back2Basic(tmpFocusGameObj.guiIdx);
          } else {
            _folder.cross2FocusObj(_debugBox.getFocusGameObj());
          }
        }
      });
    }
  }, {
    key: "createVisibleEvent",
    value: function createVisibleEvent(_scene, _debugBox) {
      var _this5 = this;

      // when press command SHIFT + V, visible on/off logic
      _scene.input.keyboard.on('keyup-V', function (_pointer, _gameObj) {
        var tmpFocusGameObj = _debugBox.getFocusGameObj();

        if ( // chck if focus valid & shift key down
        tmpFocusGameObj && _this5.chckCmdShiftKeyDown()) {
          tmpFocusGameObj.visible = !tmpFocusGameObj.visible;
        }
      });
    }
  }, {
    key: "createModeCmdEvent",
    value: function createModeCmdEvent(_scene) {
      // when press command SHIFT + Q, W, E for mode & modeObjs boolean control
      _scene.input.keyboard.on('keyup-Q', this.setModeCmdFunc.bind(this, 1));

      _scene.input.keyboard.on('keyup-W', this.setModeCmdFunc.bind(this, 2));

      _scene.input.keyboard.on('keyup-E', this.setModeCmdFunc.bind(this, 3));

      _scene.input.keyboard.on('keyup-R', this.setModeCmdFunc.bind(this, 0));
    }
  }, {
    key: "setModeCmdFunc",
    value: function setModeCmdFunc(_idx, _keyboardEvt) {
      if (this.chckCmdShiftKeyDown() && !this.pointerModeObjs.isDown) {
        _GlobalJoint.JOINT_SI.signalInput2Side(_idx);

        if (_idx === 0) {
          this.isPointerMode = false;
        } else {
          this.isPointerMode = true;

          if (this.pointerMode !== this.pointerModeList[_idx]) {
            this.pointerMode = this.pointerModeList[_idx];
          }
        }
      }
    }
  }, {
    key: "createModeEvent",
    value: function createModeEvent(_scene, _debugBox, _folder, _camera) {
      var _this6 = this;

      // just pointer over obj
      _scene.input.on('pointerdown', function (_pointer) {
        if (_this6.chckCommandKeyDown(_pointer) && _this6.isPointerMode) {
          _this6.pointerModeObjs.target = _debugBox.getFocusGameObj();

          if (_this6.pointerModeObjs.target) {
            _this6.pointerModeObjs.isDown = true;

            _this6.sortPointerModeObjs({
              move: _this6.setDragStartMoveMode.bind(_this6, _pointer),
              scale: _this6.setDragStartScaleMode.bind(_this6, _pointer),
              angle: _this6.setDragStartAngleMode.bind(_this6, _pointer)
            });
          }
        }
      });

      _scene.input.on('pointerup', function (_pointer) {
        if (_this6.isPointerMode) {
          _this6.pointerModeObjs.target = undefined;
          _this6.pointerModeObjs.isDown = false;

          _this6.sortPointerModeObjs({
            move: _this6.setDragEndMoveMode.bind(_this6),
            scale: _this6.setDragEndScaleMode.bind(_this6),
            angle: _this6.setDragEndAngleMode.bind(_this6)
          });
        }
      });
    }
  }, {
    key: "updatePointerMode",
    value: function updatePointerMode() {
      if (this.isPointerMode && this.pointerModeObjs.isDown) {
        this.sortPointerModeObjs({
          move: this.setDraggingMoveMode.bind(this),
          scale: this.setDraggingScaleMode.bind(this),
          angle: this.setDraggingAngleMode.bind(this)
        });
      }
    }
  }, {
    key: "sortPointerModeObjs",
    value: function sortPointerModeObjs(_obj) {
      switch (this.pointerMode) {
        case this.pointerModeList[0]:
          break;

        case this.pointerModeList[1]:
          _obj.move();

          break;

        case this.pointerModeList[2]:
          _obj.scale();

          break;

        case this.pointerModeList[3]:
          _obj.angle();

          break;

        default:
          console.warn(this.pointerMode, '<= this is not on the options');
          break;
      }
    } // MOVE MODE

  }, {
    key: "setDragStartMoveMode",
    value: function setDragStartMoveMode(_pointer) {
      this.setDragStart(_pointer);
    }
  }, {
    key: "setDraggingMoveMode",
    value: function setDraggingMoveMode() {
      var tmpMO = this.pointerModeObjs;
      var tmpGap = this.setDragging();
      tmpMO.target.x = tmpMO.move.x + tmpGap.x;
      tmpMO.target.y = tmpMO.move.y + tmpGap.y;
    }
  }, {
    key: "setDragEndMoveMode",
    value: function setDragEndMoveMode() {
      this.setDragEnd();
    } // SCALE MODE

  }, {
    key: "setDragStartScaleMode",
    value: function setDragStartScaleMode(_pointer) {
      this.setDragStart(_pointer);
      this.pointerModeObjs.scale.x = this.pointerModeObjs.target.scaleX;
      this.pointerModeObjs.scale.y = this.pointerModeObjs.target.scaleY;
    }
  }, {
    key: "setDraggingScaleMode",
    value: function setDraggingScaleMode() {
      var tmpMO = this.pointerModeObjs;
      var tmpGap = this.setDragging();
      var tmpX = tmpMO.scale.x + tmpGap.x / 15;
      var tmpY = tmpMO.scale.y - tmpGap.y / 15;
      tmpMO.target.scaleX = tmpX;
      tmpMO.target.scaleY = tmpY;
    }
  }, {
    key: "setDragEndScaleMode",
    value: function setDragEndScaleMode() {
      this.setDragEnd();
      this.pointerModeObjs.scale.x = 0;
      this.pointerModeObjs.scale.y = 0;
    } // ANGLE MODE

  }, {
    key: "setDragStartAngleMode",
    value: function setDragStartAngleMode(_pointer) {
      this.setDragStart(_pointer);
      this.pointerModeObjs.angle = this.pointerModeObjs.target.angle;
    }
  }, {
    key: "setDraggingAngleMode",
    value: function setDraggingAngleMode() {
      var tmpMO = this.pointerModeObjs;
      var tmpGap = this.setDragging();
      var tmpAngle = tmpMO.angle + tmpGap.y / 5;
      tmpMO.target.angle = tmpAngle.toFixed(0);
    }
  }, {
    key: "setDragEndAngleMode",
    value: function setDragEndAngleMode() {
      this.setDragEnd();
      this.pointerModeObjs.angle = 0;
    } // GAP logic

  }, {
    key: "setDragStart",
    value: function setDragStart(_pointer) {
      var tmpMO = this.pointerModeObjs;
      tmpMO.pointer.x = _pointer.x;
      tmpMO.pointer.y = _pointer.y;
      tmpMO.move.x = tmpMO.target.x;
      tmpMO.move.y = tmpMO.target.y;
    }
  }, {
    key: "setDragging",
    value: function setDragging() {
      var tmpMO = this.pointerModeObjs;
      var tmpGapX = this.scene.input.x - tmpMO.pointer.x;
      var tmpGapY = this.scene.input.y - tmpMO.pointer.y;
      return {
        x: tmpGapX,
        y: tmpGapY
      };
    }
  }, {
    key: "setDragEnd",
    value: function setDragEnd() {
      var tmpMO = this.pointerModeObjs;
      tmpMO.pointer.x = 0;
      tmpMO.pointer.y = 0;
      tmpMO.move.x = 0;
      tmpMO.move.y = 0;
    } // chck focus then, focus ON game object or OFF

  }, {
    key: "runFocusLogic",
    value: function runFocusLogic(_scene, _gameObj, _debugBox, _folder, _camera) {
      // isFocusOnGUI boolean is true
      // (if u run focusCommand on the focus game object)
      if (this.chckGameObjIsFocusOnGUI(_gameObj)) {
        // clear the focus object
        this.runFocusLogic_focus_clear(_gameObj, _debugBox, _folder, _camera);
      } // isFocusOnGUI boolean is false
      // (if u run focusCommand on the not focus game object)
      else {
          var tmpFocusGameObj = _debugBox.getFocusGameObj();

          if (tmpFocusGameObj) {
            // clear the focus during object focusing
            // init focus check
            this.runFocusLogic_focus_clear(tmpFocusGameObj, _debugBox, _folder, _camera);
          } else {
            // pure game object focus
            // set to this game object
            this.runFocusLogic_focus_pure(_scene, _gameObj, _debugBox, _folder);
          }
        }
    }
  }, {
    key: "runFocusLogic_focus_clear",
    value: function runFocusLogic_focus_clear(_gameObj, _debugBox, _folder, _camera) {
      _camera.setFollowStop();

      _debugBox.clearFocus(_gameObj);

      _debugBox.setFocusGameObj(undefined);

      _debugBox.clearFocusGameObj();

      _folder.setBasicFocusFolder();

      _folder.back2Basic(_gameObj.guiIdx);
    }
  }, {
    key: "runFocusLogic_focus_pure",
    value: function runFocusLogic_focus_pure(_scene, _gameObj, _debugBox, _folder) {
      if (_gameObj) {
        _debugBox.setFocusGameObj(_gameObj);

        _debugBox.setFocus(_gameObj);

        _debugBox.setFocusPerformance(_gameObj, _folder);

        _folder.setBasicFocusFolder(_gameObj);
      }
    }
  }, {
    key: "chckCommandKeyReleased",
    value: function chckCommandKeyReleased(_pointer) {
      var tmpBool;

      if (this.getCursorKey().shift.isDown && _pointer.leftButtonReleased() || // shift + mouse left click or
      !_pointer.rightButtonReleased() && !_pointer.leftButtonReleased()) {
        // mouse middle button
        tmpBool = true;
      } else {
        tmpBool = false;
      }

      return tmpBool;
    }
  }, {
    key: "chckCommandKeyDown",
    value: function chckCommandKeyDown(_pointer) {
      var tmpBool;

      if (this.getCursorKey().shift.isDown && _pointer.leftButtonDown() || // shift + mouse left click or
      !_pointer.rightButtonDown() && !_pointer.leftButtonDown()) {
        // mouse middle button
        tmpBool = true;
      } else {
        tmpBool = false;
      }

      return tmpBool;
    }
  }, {
    key: "chckCmdShiftKeyDown",
    value: function chckCmdShiftKeyDown() {
      var tmpBool = this.getCursorKey().shift.isDown ? true : false; // is shift down?

      return tmpBool;
    }
  }, {
    key: "chckGameObjIsFocusOnGUI",
    value: function chckGameObjIsFocusOnGUI(_gameObj) {
      var tmpGameObjBoolean = _gameObj ? _gameObj.isFocusOnGUI : null;
      return tmpGameObjBoolean;
    }
  }, {
    key: "getPointerListNmode",
    value: function getPointerListNmode() {
      var tmpReturn = {};
      tmpReturn.list = this.pointerModeList;
      tmpReturn.now = this.pointerMode;
      return tmpReturn;
    }
  }]);

  return InputManager;
}();

exports.default = InputManager;
},{"../utils/GlobalJoint.js":"utils/GlobalJoint.js","../utils/DebugConsoleFunc.js":"utils/DebugConsoleFunc.js"}],"gui/GUIClass.js":[function(require,module,exports) {
"use strict"; // debug console utils

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DebugConsoleFunc = require("../utils/DebugConsoleFunc.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GUIClass =
/*#__PURE__*/
function () {
  function GUIClass(_main) {
    _classCallCheck(this, GUIClass);

    this.main = _main;
    this.lib = this.main.libs;
    this.manager = this.main.manager;
    this.objList = undefined; // all game object list
  }

  _createClass(GUIClass, [{
    key: "create",
    value: function create(_scene) {
      this.createBasicFolder(_scene, this.manager.folder.getBasicFolder());
      this.createFocusFolder(_scene);
    }
  }, {
    key: "createBasicFolder",
    value: function createBasicFolder(_scene, _basic) {
      var _this = this;

      // create basic pointer
      var tmpAllConsole = {};

      tmpAllConsole.CONSOLE_CLEAR = function () {
        console.clear();

        _this.main.initConsole(_this.lib.getGUIcssObj());
      };

      tmpAllConsole.SCENE_LIST = _DebugConsoleFunc.DebugSceneNAllDisplayList.bind(_scene), tmpAllConsole.DEFAULT_CAM = this.manager.camera.set2defaultZoom.bind(this.manager.camera);
      var tmpPointer = undefined;
      var tmpXY = {};
      tmpXY.x = _scene.game.config.width;
      tmpXY.y = _scene.game.config.height;
      var tmpObj = undefined;
      var tmpFocus = undefined;
      var tmpObjProperties = {
        GUIIdx: 'NONE',
        name: 'NONE',
        type: 'NONE',
        texture: 'NONE'
      }; // focus off function

      var tmpFocusFunc = function tmpFocusFunc() {
        _this.manager.debugBox.clearFocus();

        _this.manager.folder.setBasicFocusFolder();

        _this.manager.debugBox.clearFocusGameObj();
      }; // cross2FocusObj


      var tmpGo2ThisFunc = function tmpGo2ThisFunc() {
        _this.manager.folder.cross2FocusObj(_this.manager.debugBox.getFocusGameObj(), _this.objList);
      };

      var tmpFocusProperties = {
        GUIIdx: 'NONE',
        name: 'NONE',
        type: 'NONE',
        texture: 'NONE',
        GUI_FOCUS_OFF: tmpFocusFunc,
        GUI_GO_2_DETAIL: tmpGo2ThisFunc
      }; // setting folder hierarchy list

      _basic.add(tmpAllConsole, 'CONSOLE_CLEAR');

      _basic.add(tmpAllConsole, 'SCENE_LIST');

      _basic.add(tmpAllConsole, 'DEFAULT_CAM');

      this.lib.addFolderInBasic(_basic);
      tmpPointer = _basic.addFolder('Pointer');
      tmpPointer.add(_scene.input, 'x').min(0).max(tmpXY.x).listen();
      tmpPointer.add(_scene.input, 'y').min(0).max(tmpXY.y).listen();
      tmpPointer.add(_scene.cameras.main, 'zoom').min(0.1).listen();
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
      tmpFocus.add(tmpFocusProperties, 'GUI_FOCUS_OFF'); // function

      tmpFocus.add(tmpFocusProperties, 'GUI_GO_2_DETAIL'); // function

      this.manager.folder.push2FolderList(tmpPointer, 'basic');
      this.manager.folder.push2FolderList(tmpObj, 'basic');
    }
  }, {
    key: "createFocusFolder",
    value: function createFocusFolder(_scene) {
      var tmpDisplayList = _scene.children;
      this.objList = tmpDisplayList.list;
      this.manager.typeSort.createFocusFolder(this.objList);
    } // destroy GUI when restart Phaser.Scene

  }, {
    key: "destroyGUI",
    value: function destroyGUI() {
      this.lib.destroyGUI();
    }
  }, {
    key: "tryCatchFlow",
    value: function tryCatchFlow(_function) {
      try {
        _function();
      } catch (e) {}
    }
  }]);

  return GUIClass;
}();

exports.default = GUIClass;
},{"../utils/DebugConsoleFunc.js":"utils/DebugConsoleFunc.js"}],"gui/SideGUIClass.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GlobalJoint = require("../utils/GlobalJoint.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SideGUIClass =
/*#__PURE__*/
function () {
  function SideGUIClass(_main) {
    _classCallCheck(this, SideGUIClass);

    _GlobalJoint.JOINT_SI.setSide(this);

    this.main = _main;
    this.lib = this.main.sideGUI; // if init config isSideExist = false, then return

    if (!this.main.sideGUI) return;
    this.manager = this.main.manager;
    this.modeFolder;
    this.textList = ['M____ / S____ / A____ / None ', 'Moves / S____ / A____ / N___ ', 'M____ / Scale / A____ / N___ ', 'M____ / S____ / Angle / N___ '];
    this.modeFolderDesc;
    this.modeFolderChild;
    this.cmdListFolder;
    this.cmdFolder = [];
    this.cmdList = this.initCmdList();
  }

  _createClass(SideGUIClass, [{
    key: "create",
    value: function create(_scene) {
      if (!this.main.sideGUI) return;
      this.createSetConfig();
      this.createModeList(_scene);
      this.createCmdFolder();
    }
  }, {
    key: "initCmdList",
    value: function initCmdList() {
      var tmpCL = [];
      tmpCL.push({
        name: 'SHIFT + F',
        description: 'focus on/off GameObj'
      });
      tmpCL.push({
        name: 'SHIFT + LEFT_CLICK',
        description: 'focus on/off GameObj'
      });
      tmpCL.push({
        name: 'MOUSE_MIDDLE_BTN',
        description: 'focus on/off GameObj'
      });
      tmpCL.push({
        name: 'SHIFT + V',
        description: 'on/off Focused GameObj visible'
      });
      tmpCL.push({
        name: 'SHIFT + A',
        description: 'aim the Focused GameObj for toggling follow'
      });
      tmpCL.push({
        name: 'SHIFT + D',
        description: 'on/off go 2 the Focused GameObj detail folder'
      });
      tmpCL.push({
        name: 'SHIFT + C',
        description: 'console log out the Focused GameObj'
      });
      tmpCL.push({
        name: 'SHIFT + RIGHT_CLCIK',
        description: 'moving main camera via scroll'
      });
      tmpCL.push({
        name: 'SHIFT + WHEEL',
        description: 'zoom in/out the main camera'
      });
      tmpCL.push({
        name: 'SHIFT + S',
        description: 'set main camera zoom & scroll values to the default'
      });
      tmpCL.push({
        name: 'SHIFT + Q, W, E, R',
        description: 'set Pointer Mode(Q, W, E), set to normal(R)'
      });
      return tmpCL;
    }
  }, {
    key: "createSetConfig",
    value: function createSetConfig() {
      // set width & margin px from main GUI
      this.setSideWidthInit();
      this.lib.domElement.style.marginRight = '2px';
    }
  }, {
    key: "createModeList",
    value: function createModeList(_scene) {
      this.modeFolder = this.lib.addFolder('POINTER_MODE');
      this.modeFolder.open();
      this.modeFolderDesc = this.modeFolder.addFolder(this.textList[0]);
      this.modeFolderChild = this.modeFolderDesc.domElement.lastChild.lastChild;
      this.modeFolderChild.style.backgroundColor = 'grey';
      this.modeFolderChild.style.color = 'black';
      this.modeFolderChild.style.webkitTextStrokeWidth = '1px'; // this.modeFolderChild.style.fontFamily = 'fantasy';
    } // Command List Info

  }, {
    key: "createCmdFolder",
    value: function createCmdFolder() {
      var _this = this;

      this.cmdListFolder = this.lib.addFolder('COMMAND_LIST'); // add pointer over and out for description (open or close folder)

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var i = _step.value;
          var tmpIdx = _this.cmdFolder.push(_this.cmdListFolder.addFolder(i.name)) - 1;

          var tmpDesc = _this.cmdFolder[tmpIdx].addFolder(i.description);

          var tmpChild = tmpDesc.domElement.lastChild.lastChild; // set description folder title background color grey

          tmpChild.style.backgroundColor = 'grey';
          tmpChild.style.color = 'black';
          tmpChild.style.webkitTextStrokeWidth = '1px';

          _this.cmdFolder[tmpIdx].domElement.addEventListener('pointerover', function (_event) {
            _this.setSideWidthExpand();

            _this.cmdFolder[tmpIdx].open();
          });

          _this.cmdFolder[tmpIdx].domElement.addEventListener('pointerout', function (_event) {
            _this.setSideWidthInit();

            _this.cmdFolder[tmpIdx].close();
          });
        };

        for (var _iterator = this.cmdList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "setSideWidthInit",
    value: function setSideWidthInit() {
      this.lib.width = 176;
    }
  }, {
    key: "setSideWidthExpand",
    value: function setSideWidthExpand() {
      this.lib.width = 400;
    }
  }, {
    key: "signalFromInput",
    value: function signalFromInput(_idx) {
      this.setPointerModeText(_idx);
    }
  }, {
    key: "setPointerModeText",
    value: function setPointerModeText(_idx) {
      this.modeFolderChild.innerText = this.textList[_idx];
    }
  }]);

  return SideGUIClass;
}();

exports.default = SideGUIClass;
},{"../utils/GlobalJoint.js":"utils/GlobalJoint.js"}],"main.js":[function(require,module,exports) {
/*
    * Libs

    * Origin ref from under URL
    https://github.com/dataarts/dat.gui/blob/master/API.md

    * DAT.GUI
    - particle
    https://labs.phaser.io/edit.html?src=src/game%20objects\particle%20emitter\particle%20editor.js
    - physics sprite
    https://labs.phaser.io/edit.html?src=src/physics\arcade\body%20controls.js
    - matter
    - audio
    https://labs.phaser.io/edit.html?src=src/audio\HTML5%20Audio\Loop%20Delay.js
    https://labs.phaser.io/view.html?src=src/audio\Web%20Audio\Seek.js
    - world view
    https://labs.phaser.io/edit.html?src=src/camera\move%20camera%20with%20keys.js

    * DAT.GUI Control
    press 'H' to toggle the GUI visibility

    * Another Planning Ref
    https://github.com/koreezgames/phaser3-particle-editor
*/

/*
    END GOAL:
        you can get name when you over the objects,
        and if you click it, you can get its properties in custom GUI list.
        (my wish is load, save json from phaser scene, then flexible implement
        for each gameobjects, but this is gonna be hard so i just drawback to next version)
*/
"use strict"; // Lib

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Main = void 0;

var _index = _interopRequireDefault(require("./lib/index.js"));

var _DebugConsoleFunc = require("./utils/DebugConsoleFunc.js");

var _TypeSortManager = _interopRequireDefault(require("./manager/TypeSortManager.js"));

var _FolderManager = _interopRequireDefault(require("./manager/FolderManager.js"));

var _DebugBoxManager = _interopRequireDefault(require("./manager/DebugBoxManager.js"));

var _CameraManager = _interopRequireDefault(require("./manager/CameraManager.js"));

var _InputManager = _interopRequireDefault(require("./manager/InputManager.js"));

var _GUIClass = _interopRequireDefault(require("./gui/GUIClass.js"));

var _SideGUIClass = _interopRequireDefault(require("./gui/SideGUIClass.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Main =
/*#__PURE__*/
function () {
  function Main(_tmpHandOverObj) {
    _classCallCheck(this, Main);

    this.scene = _tmpHandOverObj.scene;
    this.libs = new _index.default(_tmpHandOverObj); // Console

    this.initConsole(this.libs.getGUIcssObj()); // Manager Class

    this.manager = {};
    this.manager.typeSort = new _TypeSortManager.default(_tmpHandOverObj.scene);
    this.manager.folder = new _FolderManager.default(this.manager.typeSort);
    this.manager.debugBox = new _DebugBoxManager.default();
    this.manager.camera = new _CameraManager.default();
    this.manager.input = new _InputManager.default(); // GUIs

    this.mainGUI = this.libs.getGUILib();
    this.sideGUI = this.libs.getGUISide();
    this.GUI = new _GUIClass.default(this);
    this.Side = new _SideGUIClass.default(this);
  }

  _createClass(Main, [{
    key: "create",
    value: function create(_scene) {
      // Manager
      this.manager.typeSort.create(this.manager);
      this.manager.folder.create(_scene, this.mainGUI);
      this.manager.debugBox.create(_scene, this.manager.camera);
      this.manager.camera.create(_scene, this.manager.debugBox);
      this.manager.input.create(_scene, this.manager.debugBox, this.manager.folder, this.manager.camera); // GUIs

      this.GUI.create(_scene);
      this.Side.create(_scene); // Last other stuffs

      this.libs.callbackCSSstringSkipped();
      this.manager.folder.chckOpenAllList();
    }
  }, {
    key: "update",
    value: function update(_time, _delta) {
      this.manager.debugBox.update(_time, _delta);
      this.manager.camera.update();
      this.manager.input.update();
    }
  }, {
    key: "initConsole",
    value: function initConsole(_cssObj) {
      var tmpName = ' PGInspector.js';
      var tmpVersion = '1.2.0';
      var tmpURL = 'https://github.com/SilverTree7622/Phaser3_GUI_Inspector';
      (0, _DebugConsoleFunc.DebugConsole)({
        name: tmpName,
        version: tmpVersion,
        initConfig: _cssObj,
        url: tmpURL
      });
    }
  }]);

  return Main;
}();

exports.Main = Main;
},{"./lib/index.js":"lib/index.js","./utils/DebugConsoleFunc.js":"utils/DebugConsoleFunc.js","./manager/TypeSortManager.js":"manager/TypeSortManager.js","./manager/FolderManager.js":"manager/FolderManager.js","./manager/DebugBoxManager.js":"manager/DebugBoxManager.js","./manager/CameraManager.js":"manager/CameraManager.js","./manager/InputManager.js":"manager/InputManager.js","./gui/GUIClass.js":"gui/GUIClass.js","./gui/SideGUIClass.js":"gui/SideGUIClass.js"}],"PGInspector.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// FINFAL WORK: ADD TO WINDOW OBJECT
window.PhaserGUIAction = PhaserGUIAction; // lib act function

window.PhaserGUI = undefined; // GUI self class
// Main Phaser3 GUI function **

function PhaserGUIAction(_scene, _userConfigObj) {
  var tmpMainInstance; // main(GUI & SideGUI) instance
  // check GUI object is already exist

  ChckGUIObj(); // chck (scene, css Opacity object / phaser scenes)

  var tmpConfigObj = ChckConfigObj(_scene, _userConfigObj); // pure declare for callback or plan

  var tmpMainClass; // setting value

  tmpMainClass = InitMainClass();
  tmpMainInstance = SetCreateUpdateInstance(tmpConfigObj, tmpMainClass);
  StoreGUI(tmpMainInstance); // return just phaser scene

  return tmpMainInstance;
} // detailed functions


function ChckGUIObj() {
  // if exist, destory GUI
  if (window.PhaserGUI) {
    window.PhaserGUI.destroyGUI();
    window.PhaserGUI = undefined;
  }
}

function ChckConfigObj(_scene, _userConfigObj) {
  // init config structure
  var tmpReturn = {
    scene: undefined,
    // Phaser.Scene
    css: {
      alpha: undefined,
      // float 0 ~ 1
      right: undefined,
      // int
      top: undefined // int

    },
    init: {
      focus: undefined,
      // GameObj
      ignore: undefined,
      // GameObj, array, container
      isSideExist: true // boolean

    }
  }; // check is init config

  TryCatchObj(tmpReturn, 'scene', _scene);

  if (_typeof(_userConfigObj) === 'object') {
    TryCatchObj(tmpReturn.css, 'alpha', _userConfigObj.alpha);
    TryCatchObj(tmpReturn.css, 'right', _userConfigObj.right);
    TryCatchObj(tmpReturn.css, 'top', _userConfigObj.top);
    TryCatchObj(tmpReturn.init, 'focus', _userConfigObj.focus);
    TryCatchObj(tmpReturn.init, 'ignore', _userConfigObj.ignore);
    TryCatchObj(tmpReturn.init, 'isSideExist', _userConfigObj.isSideExist);
  }

  return tmpReturn;
}

function TryCatchObj(_obj, _objPropertyName, _obj2) {
  try {
    _obj[_objPropertyName] = _obj2;
  } catch (e) {
    console.log('_PGI System_ : INIT CONFIG PROPERTY', _obj2, 'NOT FOUND');
  }
}

function InitMainClass() {
  var tmpMain;

  try {
    // parcel way
    tmpMain = require('./main.js').Main;
  } catch (e) {
    console.warn('failed to load PGInspector.js error message:', e);
  }

  return tmpMain;
}

function SetCreateUpdateInstance(_tmpConfigObj, _tmpMainClass) {
  var MainClass = new _tmpMainClass(_tmpConfigObj);
  MainClass.create(_tmpConfigObj.scene);
  SetRenewalUpdate(_tmpConfigObj, MainClass);
  return MainClass;
} // setting custom update


function SetRenewalUpdate(_tmpConfigObj, MainClass) {
  var tmpUpdate = undefined;

  var tmpSceneUpdate = _tmpConfigObj.scene.update.bind(_tmpConfigObj.scene);

  tmpUpdate = function tmpUpdate(_time, _delta) {
    tmpSceneUpdate(_time, _delta);
    MainClass.update(_time, _delta);
  };

  return _tmpConfigObj.scene.update = tmpUpdate;
}

function StoreGUI(_GUI) {
  window.PhaserGUI = _GUI;
} // trying for npm exports


module.exports = PhaserGUIAction;
},{"./main.js":"main.js"}],"../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64890" + '/');

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
},{}]},{},["../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","PGInspector.js"], null)
//# sourceMappingURL=/PGInspector.js.map