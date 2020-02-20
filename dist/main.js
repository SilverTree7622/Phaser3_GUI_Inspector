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
})({"gui/lib/DatGUILib.js":[function(require,module,exports) {
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
},{}],"gui/TypeSortManager.js":[function(require,module,exports) {
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
},{}],"gui/FolderManager.js":[function(require,module,exports) {
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
},{}],"gui/SaveManager.js":[function(require,module,exports) {
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
},{}],"gui/DebugBoxClass.js":[function(require,module,exports) {
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
},{}],"gui/GUIClass.js":[function(require,module,exports) {
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
},{"./TypeSortManager.js":"gui/TypeSortManager.js","./FolderManager.js":"gui/FolderManager.js","./SaveManager.js":"gui/SaveManager.js","./DebugBoxClass.js":"gui/DebugBoxClass.js"}],"main.js":[function(require,module,exports) {
require('./gui/lib/DatGUILib.js'); // import * from require('./gui/lib/DatGUILib.js');


require('./gui/GUIClass.js'); // import GUIClass from './gui/GUIClass.js';
},{"./gui/lib/DatGUILib.js":"gui/lib/DatGUILib.js","./gui/GUIClass.js":"gui/GUIClass.js"}]},{},["main.js"], null)
//# sourceMappingURL=/main.js.map