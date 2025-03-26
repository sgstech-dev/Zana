import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  NgModule,
  booleanAttribute,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵlistener
} from "./chunk-57TCTXNO.js";
import "./chunk-O6VDDHVS.js";
import "./chunk-IXUSS67I.js";
import "./chunk-BONRK7YY.js";
import {
  __spreadValues
} from "./chunk-PEHFQLBM.js";

// node_modules/domq.js/src/d-class.js
var D = function(selector, context) {
  return new D.fn.init(selector, context);
};
var d_class_default = D;

// node_modules/domq.js/src/vars.js
var document = window.document;
var emptyArray = [];
var concat = emptyArray.concat;
var filter = emptyArray.filter;
var slice = emptyArray.slice;
var elementDisplay = {};
var classCache = {};
var cssNumber = {
  "column-count": 1,
  "columns": 1,
  "font-weight": 1,
  "line-height": 1,
  "opacity": 1,
  "z-index": 1,
  "zoom": 1
};
var fragmentRE = /^\s*<(\w+|!)[^>]*>/;
var singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
var tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig;
var rootNodeRE = /^(?:body|html)$/i;
var methodAttributes = ["val", "css", "html", "text", "data", "width", "height", "offset"];
var table = document.createElement("table");
var tableRow = document.createElement("tr");
var containers = {
  "tr": document.createElement("tbody"),
  "tbody": table,
  "thead": table,
  "tfoot": table,
  "td": tableRow,
  "th": tableRow,
  "*": document.createElement("div")
};
var simpleSelectorRE = /^[\w-]*$/;
var class2type = {};
var toString = class2type.toString;
var tempParent = document.createElement("div");
var isArray = Array.isArray || function(arg) {
  return Object.prototype.toString.call(arg) === "[object Array]";
};
var contains = document.documentElement.contains ? function(parent, node) {
  return parent !== node && parent.contains(node);
} : function(parent, node) {
  while (node && (node = node.parentNode)) if (node === parent) return true;
  return false;
};

// node_modules/domq.js/src/utils.js
function type(obj) {
  return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
}
function isString(obj) {
  return typeof obj == "string";
}
function isFunction(value) {
  return type(value) == "function";
}
function isWindow(obj) {
  return obj != null && obj == obj.window;
}
function isDocument(obj) {
  return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
}
function isObject(obj) {
  return type(obj) == "object";
}
function isPlainObject(obj) {
  return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}
function likeArray(obj) {
  var length = !!obj && "length" in obj && obj.length, typeRes = type(obj);
  return "function" != typeRes && !isWindow(obj) && ("array" == typeRes || length === 0 || typeof length == "number" && length > 0 && length - 1 in obj);
}
function compact(array) {
  return filter.call(array, function(item) {
    return item != null;
  });
}
function dasherize(str) {
  return str.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
}
function maybeAddPx(name, value) {
  return typeof value == "number" && !cssNumber[dasherize(name)] ? value + "px" : value;
}
function camelize(str) {
  return str.replace(/-+(.)?/g, function(match, chr) {
    return chr ? chr.toUpperCase() : "";
  });
}
function classRE(name) {
  return name in classCache ? classCache[name] : classCache[name] = new RegExp("(^|\\s)" + name + "(\\s|$)");
}
function defaultDisplay(nodeName2) {
  var element, display;
  if (!elementDisplay[nodeName2]) {
    element = document.createElement(nodeName2);
    document.body.appendChild(element);
    display = getComputedStyle(element, "").getPropertyValue("display");
    element.parentNode.removeChild(element);
    display == "none" && (display = "block");
    elementDisplay[nodeName2] = display;
  }
  return elementDisplay[nodeName2];
}
function flatten(array) {
  return array.length > 0 ? d_class_default.fn.concat.apply([], array) : array;
}
function isD(object) {
  return object instanceof d_class_default;
}
function funcArg(context, arg, idx, payload) {
  return isFunction(arg) ? arg.call(context, idx, payload) : arg;
}
function setAttribute(node, name, value) {
  value == null ? node.removeAttribute(name) : node.setAttribute(name, value);
}
function className(node, value) {
  var klass = node.className || "", svg = klass && klass.baseVal !== void 0;
  if (value === void 0) return svg ? klass.baseVal : klass;
  svg ? klass.baseVal = value : node.className = value;
}
function nodeName(elem, name) {
  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
}

// node_modules/domq.js/src/core.js
d_class_default.fn = d_class_default.prototype = {
  constuctor: d_class_default,
  length: 0,
  // Because a collection acts like an array
  // copy over these useful array functions.
  forEach: emptyArray.forEach,
  reduce: emptyArray.reduce,
  push: emptyArray.push,
  sort: emptyArray.sort,
  splice: emptyArray.splice,
  indexOf: emptyArray.indexOf,
  // D's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  init: function(selector, context) {
    var dom;
    if (!selector) {
      return this;
    } else if (typeof selector == "string") {
      selector = selector.trim();
      if (selector[0] == "<" && fragmentRE.test(selector)) {
        dom = d_class_default.fragment(selector, RegExp.$1, context);
        selector = null;
      } else if (context !== void 0) {
        return d_class_default(context).find(selector);
      } else {
        dom = d_class_default.qsa(document, selector);
      }
    } else if (isFunction(selector)) {
      return d_class_default(document).ready(selector);
    } else if (isD(selector)) {
      return selector;
    } else if (isArray(selector)) {
      dom = compact(selector);
    } else if (isObject(selector)) {
      dom = [selector], selector = null;
    } else if (context !== void 0) {
      return d_class_default(context).find(selector);
    } else {
      dom = d_class_default.qsa(document, selector);
    }
    return d_class_default.makeArray(dom, selector, this);
  },
  // Modify the collection by adding elements to it
  concat: function() {
    var i, value, args = [];
    for (i = 0; i < arguments.length; i++) {
      value = arguments[i];
      args[i] = isD(value) ? value.toArray() : value;
    }
    return concat.apply(isD(this) ? this.toArray() : this, args);
  },
  // `pluck` is borrowed from Prototype.js
  pluck: function(property) {
    return d_class_default.map(this, function(el) {
      return el[property];
    });
  },
  toArray: function() {
    return this.get();
  },
  get: function(idx) {
    return idx === void 0 ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length];
  },
  size: function() {
    return this.length;
  },
  each: function(callback) {
    emptyArray.every.call(this, function(el, idx) {
      return callback.call(el, idx, el) !== false;
    });
    return this;
  },
  map: function(fn) {
    return d_class_default(d_class_default.map(this, function(el, i) {
      return fn.call(el, i, el);
    }));
  },
  slice: function() {
    return d_class_default(slice.apply(this, arguments));
  },
  first: function() {
    var el = this[0];
    return el && !isObject(el) ? el : d_class_default(el);
  },
  last: function() {
    var el = this[this.length - 1];
    return el && !isObject(el) ? el : d_class_default(el);
  },
  eq: function(idx) {
    return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1);
  }
};
d_class_default.extend = d_class_default.fn.extend = function() {
  var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
  if (typeof target === "boolean") {
    deep = target;
    target = arguments[i] || {};
    i++;
  }
  if (typeof target !== "object" && !isFunction(target)) {
    target = {};
  }
  if (i === length) {
    target = this;
    i--;
  }
  for (; i < length; i++) {
    if ((options = arguments[i]) != null) {
      for (name in options) {
        src = target[name];
        copy = options[name];
        if (target === copy) {
          continue;
        }
        if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && isArray(src) ? src : [];
          } else {
            clone = src && isPlainObject(src) ? src : {};
          }
          target[name] = d_class_default.extend(deep, clone, copy);
        } else if (copy !== void 0) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
};
d_class_default.extend({
  // Make DOM Array
  makeArray: function(dom, selector, me) {
    var i, len = dom ? dom.length : 0;
    for (i = 0; i < len; i++) me[i] = dom[i];
    me.length = len;
    me.selector = selector || "";
    return me;
  },
  merge: function(first, second) {
    var len = +second.length, j = 0, i = first.length;
    for (; j < len; j++) first[i++] = second[j];
    first.length = i;
    return first;
  },
  // D's CSS selector
  qsa: function(element, selector) {
    var found, maybeID = selector[0] == "#", maybeClass = !maybeID && selector[0] == ".", nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, isSimple = simpleSelectorRE.test(nameOnly);
    return (
      // Safari DocumentFragment doesn't have getElementById
      element.getElementById && isSimple && maybeID ? (found = element.getElementById(nameOnly)) ? [found] : [] : element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11 ? [] : slice.call(
        // DocumentFragment doesn't have getElementsByClassName/TagName
        isSimple && !maybeID && element.getElementsByClassName ? maybeClass ? element.getElementsByClassName(nameOnly) : element.getElementsByTagName(selector) : element.querySelectorAll(selector)
      )
    );
  },
  // Html -> Node
  fragment: function(html2, name, properties) {
    var dom, nodes, container;
    if (singleTagRE.test(html2)) dom = d_class_default(document.createElement(RegExp.$1));
    if (!dom) {
      if (html2.replace) html2 = html2.replace(tagExpanderRE, "<$1></$2>");
      if (name === void 0) name = fragmentRE.test(html2) && RegExp.$1;
      if (!(name in containers)) name = "*";
      container = containers[name];
      container.innerHTML = "" + html2;
      dom = d_class_default.each(slice.call(container.childNodes), function() {
        container.removeChild(this);
      });
    }
    if (isPlainObject(properties)) {
      nodes = d_class_default(dom);
      d_class_default.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value);
        else nodes.attr(key, value);
      });
    }
    return dom;
  },
  matches: function(element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false;
    var matchesSelector = element.matches || element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
    if (matchesSelector) return matchesSelector.call(element, selector);
    var match, parent = element.parentNode, temp = !parent;
    if (temp) (parent = tempParent).appendChild(element);
    match = ~d_class_default.qsa(parent, selector).indexOf(element);
    temp && tempParent.removeChild(element);
    return match;
  },
  each: function(elements, callback) {
    var i, key;
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++) if (callback.call(elements[i], i, elements[i]) === false) return elements;
    } else {
      for (key in elements) if (callback.call(elements[key], key, elements[key]) === false) return elements;
    }
    return elements;
  },
  map: function(elements, callback) {
    var value, values = [], i, key;
    if (likeArray(elements)) for (i = 0; i < elements.length; i++) {
      value = callback(elements[i], i);
      if (value != null) values.push(value);
    }
    else for (key in elements) {
      value = callback(elements[key], key);
      if (value != null) values.push(value);
    }
    return flatten(values);
  }
});
d_class_default.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
  class2type["[object " + name + "]"] = name.toLowerCase();
});
d_class_default.fn.init.prototype = d_class_default.fn;
function noop() {
}

// node_modules/domq.js/src/css.js
function css(property, value) {
  if (arguments.length < 2) {
    var element = this[0];
    if (typeof property == "string") {
      if (!element) return;
      return element.style[camelize(property)] || getComputedStyle(element, "").getPropertyValue(property);
    } else if (isArray(property)) {
      if (!element) return;
      var props = {};
      var computedStyle = getComputedStyle(element, "");
      d_class_default.each(property, function(_, prop) {
        props[prop] = element.style[camelize(prop)] || computedStyle.getPropertyValue(prop);
      });
      return props;
    }
  }
  var css2 = "";
  if (type(property) == "string") {
    if (!value && value !== 0) {
      this.each(function() {
        this.style.removeProperty(dasherize(property));
      });
    } else {
      css2 = dasherize(property) + ":" + maybeAddPx(property, value);
    }
  } else {
    for (var key in property) {
      if (!property[key] && property[key] !== 0) {
        this.each(function() {
          this.style.removeProperty(dasherize(key));
        });
      } else {
        css2 += dasherize(key) + ":" + maybeAddPx(key, property[key]) + ";";
      }
    }
  }
  return this.each(function() {
    this.style.cssText += ";" + css2;
  });
}

// node_modules/domq.js/src/classes.js
function hasClass(name) {
  if (!name) return false;
  return emptyArray.some.call(this, function(el) {
    return this.test(className(el));
  }, classRE(name));
}
function addClass(name) {
  var classList = [];
  if (!name) return this;
  return this.each(function(idx) {
    if (!("className" in this)) return;
    classList = [];
    var cls = className(this), newName = funcArg(this, name, idx, cls);
    newName.split(/\s+/g).forEach(function(klass) {
      if (!d_class_default(this).hasClass(klass)) classList.push(klass);
    }, this);
    classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "));
  });
}
function removeClass(name) {
  var classList = [];
  return this.each(function(idx) {
    if (!("className" in this)) return;
    if (name === void 0) return className(this, "");
    classList = className(this);
    funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass) {
      classList = classList.replace(classRE(klass), " ");
    });
    className(this, classList.trim());
  });
}

// node_modules/domq.js/src/offset.js
function offset(coordinates) {
  if (coordinates) return this.each(function(index) {
    var $this = d_class_default(this), coords = funcArg(this, coordinates, index, $this.offset()), parentOffset = $this.offsetParent().offset(), props = {
      top: coords.top - parentOffset.top,
      left: coords.left - parentOffset.left
    };
    if ($this.css("position") == "static") props["position"] = "relative";
    $this.css(props);
  });
  if (!this.length) return null;
  if (document.documentElement !== this[0] && !contains(document.documentElement, this[0])) return {
    top: 0,
    left: 0
  };
  var obj = this[0].getBoundingClientRect();
  return {
    left: obj.left + window.pageXOffset,
    top: obj.top + window.pageYOffset,
    width: Math.round(obj.width),
    height: Math.round(obj.height)
  };
}
function position() {
  if (!this.length) return;
  var elem = this[0], offset2, offsetParent2 = this.offsetParent(), parentOffset = rootNodeRE.test(offsetParent2[0].nodeName) ? {
    top: 0,
    left: 0
  } : offsetParent2.offset();
  if (d_class_default(elem).css("position") === "fixed") {
    offset2 = elem.getBoundingClientRect();
  } else {
    offset2 = this.offset();
    parentOffset.top += parseFloat(d_class_default(offsetParent2[0]).css("border-top-width")) || 0;
    parentOffset.left += parseFloat(d_class_default(offsetParent2[0]).css("border-left-width")) || 0;
  }
  return {
    top: offset2.top - parentOffset.top - parseFloat(d_class_default(elem).css("margin-top")) || 0,
    left: offset2.left - parentOffset.left - parseFloat(d_class_default(elem).css("margin-left")) || 0
  };
}
function scrollTop(value) {
  if (!this.length) return;
  var hasScrollTop = "scrollTop" in this[0];
  if (value === void 0) return hasScrollTop ? this[0].scrollTop : isWindow(this[0]) ? this[0].pageYOffset : this[0].defaultView.pageYOffset;
  return this.each(hasScrollTop ? function() {
    this.scrollTop = value;
  } : function() {
    this.scrollTo(this.scrollX, value);
  });
}
function scrollLeft(value) {
  if (!this.length) return;
  var hasScrollLeft = "scrollLeft" in this[0];
  if (value === void 0) return hasScrollLeft ? this[0].scrollLeft : isWindow(this[0]) ? this[0].pageXOffset : this[0].defaultView.pageXOffset;
  return this.each(hasScrollLeft ? function() {
    this.scrollLeft = value;
  } : function() {
    this.scrollTo(value, this.scrollY);
  });
}
function offsetParent() {
  return this.map(function() {
    var parent = this.offsetParent || document.body;
    while (parent && !rootNodeRE.test(parent.nodeName) && d_class_default(parent).css("position") == "static") parent = parent.offsetParent;
    return parent;
  });
}

// node_modules/domq.js/src/attr.js
function attr(name, value) {
  var result;
  return typeof name == "string" && !(1 in arguments) ? 0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : void 0 : this.each(function(idx) {
    if (this.nodeType !== 1) return;
    if (isObject(name)) for (var key in name) setAttribute(this, key, name[key]);
    else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)));
  });
}
function removeAttr(name) {
  return this.each(function() {
    this.nodeType === 1 && name.split(" ").forEach(function(attribute) {
      setAttribute(this, attribute);
    }, this);
  });
}

// node_modules/domq.js/src/traversing.js
function find(selector) {
  var result, $this = this;
  if (!selector) result = d_class_default();
  else if (typeof selector == "object") result = d_class_default(selector).filter(function() {
    var node = this;
    return emptyArray.some.call($this, function(parent) {
      return contains(parent, node);
    });
  });
  else if (this.length == 1) result = d_class_default(d_class_default.qsa(this[0], selector));
  else result = this.map(function() {
    return d_class_default.qsa(this, selector);
  });
  return result;
}
function closest(selector, context) {
  var nodes = [], collection = typeof selector == "object" && d_class_default(selector);
  this.each(function(_, node) {
    while (node && !(collection ? collection.indexOf(node) >= 0 : d_class_default.matches(node, selector))) node = node !== context && !isDocument(node) && node.parentNode;
    if (node && nodes.indexOf(node) < 0) nodes.push(node);
  });
  return d_class_default(nodes);
}

// node_modules/domq.js/src/dimensions.js
function isIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  return msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./);
}
function subtract(el, dimen) {
  var offsetMap = {
    width: ["padding-left", "padding-right", "border-left-width", "border-right-width"],
    height: ["padding-top", "padding-bottom", "border-top-width", "border-bottom-width"]
  };
  return el.css("box-sizing") === "border-box" && !isIE() ? parseFloat(el.css(dimen)) - parseFloat(el.css(offsetMap[dimen][0])) - parseFloat(el.css(offsetMap[dimen][1])) - parseFloat(el.css(offsetMap[dimen][2])) - parseFloat(el.css(offsetMap[dimen][3])) : parseFloat(el.css(dimen));
}
function calc(dimension, value) {
  var dimensionProperty = dimension.replace(/./, function(m) {
    return m[0].toUpperCase();
  });
  var el = this[0];
  if (value === void 0) return isWindow(el) ? el.document.documentElement["client" + dimensionProperty] : isDocument(el) ? el.documentElement["scroll" + dimensionProperty] : subtract(this, dimension);
  else return this.each(function(idx) {
    el = d_class_default(this);
    el.css(dimension, funcArg(this, value, idx, el[dimension]()));
  });
}
function width(value) {
  return calc.call(this, "width", value);
}
function height(value) {
  return calc.call(this, "height", value);
}

// node_modules/domq.js/src/event-utils.js
var _zid = 1;
var handlers = {};
var focusinSupported = "onfocusin" in window;
var focus2 = {
  focus: "focusin",
  blur: "focusout"
};
var hover = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
};
var ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/;
var returnTrue = function() {
  return true;
};
var returnFalse = function() {
  return false;
};
var eventMethods = {
  preventDefault: "isDefaultPrevented",
  stopImmediatePropagation: "isImmediatePropagationStopped",
  stopPropagation: "isPropagationStopped"
};
function zid(element) {
  return element._zid || (element._zid = _zid++);
}
function compatible(event, source) {
  if (source || !event.isDefaultPrevented) {
    source || (source = event);
    d_class_default.each(eventMethods, function(name, predicate) {
      var sourceMethod = source[name];
      event[name] = function() {
        this[predicate] = returnTrue;
        return sourceMethod && sourceMethod.apply(source, arguments);
      };
      event[predicate] = returnFalse;
    });
    try {
      event.timeStamp || (event.timeStamp = Date.now());
    } catch (ignored) {
      console.warn(ignored);
    }
    if (source.defaultPrevented !== void 0 ? source.defaultPrevented : "returnValue" in source ? source.returnValue === false : source.getPreventDefault && source.getPreventDefault()) event.isDefaultPrevented = returnTrue;
  }
  return event;
}
function parse(event) {
  var parts = ("" + event).split(".");
  return {
    e: parts[0],
    ns: parts.slice(1).sort().join(" ")
  };
}
function matcherFor(ns) {
  return new RegExp("(?:^| )" + ns.replace(" ", " .* ?") + "(?: |$)");
}
function findHandlers(element, event, fn, selector) {
  event = parse(event);
  if (event.ns) var matcher = matcherFor(event.ns);
  return (handlers[zid(element)] || []).filter(function(handler) {
    return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector);
  });
}
function eventCapture(handler, captureSetting) {
  return handler.del && !focusinSupported && handler.e in focus2 || !!captureSetting;
}
function realEvent(type2) {
  return hover[type2] || focusinSupported && focus2[type2] || type2;
}
function addEvent(element, events, fn, data, selector, delegator, capture) {
  var id = zid(element), set = handlers[id] || (handlers[id] = []);
  events.split(/\s/).forEach(function(event) {
    if (event == "ready") return d_class_default(document).ready(fn);
    var handler = parse(event);
    handler.fn = fn;
    handler.sel = selector;
    if (handler.e in hover) fn = function(e) {
      var related = e.relatedTarget;
      if (!related || related !== this && !contains(this, related)) return handler.fn.apply(this, arguments);
    };
    handler.del = delegator;
    var callback = delegator || fn;
    handler.proxy = function(e) {
      e = compatible(e);
      if (e.isImmediatePropagationStopped()) return;
      e.data = data;
      var result = callback.apply(element, e._args == void 0 ? [e] : [e].concat(e._args));
      if (result === false) e.preventDefault(), e.stopPropagation();
      return result;
    };
    handler.i = set.length;
    set.push(handler);
    if ("addEventListener" in element) element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
  });
}
function removeEvent(element, events, fn, selector, capture) {
  var id = zid(element);
  (events || "").split(/\s/).forEach(function(event) {
    findHandlers(element, event, fn, selector).forEach(function(handler) {
      delete handlers[id][handler.i];
      if ("removeEventListener" in element) element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
    });
  });
}
function createProxy(event) {
  var key, proxy = {
    originalEvent: event
  };
  for (key in event) if (!ignoreProperties.test(key) && event[key] !== void 0) proxy[key] = event[key];
  return compatible(proxy, event);
}

// node_modules/domq.js/src/manipulation.js
function traverseNode(node, fn) {
  fn(node);
  for (var i = 0, len = node.childNodes.length; i < len; i++) traverseNode(node.childNodes[i], fn);
}
function domMani(elem, args, fn, inside) {
  var argType, nodes = d_class_default.map(args, function(arg) {
    var arr = [];
    argType = type(arg);
    if (argType == "array") {
      arg.forEach(function(el) {
        if (el.nodeType !== void 0) return arr.push(el);
        else if (isD(el)) return arr = arr.concat(el.get());
        arr = arr.concat(d_class_default.fragment(el));
      });
      return arr;
    }
    return argType == "object" || arg == null ? arg : d_class_default.fragment(arg);
  }), parent, copyByClone = elem.length > 1;
  if (nodes.length < 1) return elem;
  return elem.each(function(_, target) {
    parent = inside ? target : target.parentNode;
    var parentInDocument = contains(document.documentElement, parent);
    nodes.forEach(function(node) {
      if (copyByClone) node = node.cloneNode(true);
      else if (!parent) return d_class_default(node).remove();
      fn.call(target, node);
      if (parentInDocument) {
        traverseNode(node, function(el) {
          if (el.nodeName != null && el.nodeName.toUpperCase() === "SCRIPT" && (!el.type || el.type === "text/javascript") && !el.src) {
            var target2 = el.ownerDocument ? el.ownerDocument.defaultView : window;
            target2["eval"].call(target2, el.innerHTML);
          }
        });
      }
    });
  });
}
function getAll(context, tag) {
  var ret;
  if (typeof context.getElementsByTagName !== "undefined") {
    ret = context.getElementsByTagName(tag || "*");
  } else if (typeof context.querySelectorAll !== "undefined") {
    ret = context.querySelectorAll(tag || "*");
  } else {
    ret = [];
  }
  if (tag === void 0 || tag && nodeName(context, tag)) {
    return d_class_default.merge([context], ret);
  }
  return ret;
}
function cleanData(elems) {
  var events, elem, i = 0;
  for (; (elem = elems[i]) !== void 0; i++) {
    if (elem._zid && (events = handlers[elem._zid])) {
      events.forEach((evt) => {
        const type2 = evt.e + "." + evt.ns.split(" ").join(".");
        removeEvent(elem, type2, evt.fn, evt.sel);
      });
    }
  }
}
function remove() {
  return this.each(function() {
    if (this.nodeType === 1) {
      cleanData(getAll(this));
    }
    if (this.parentNode != null) this.parentNode.removeChild(this);
  });
}
function empty() {
  return this.each(function() {
    this.innerHTML = "";
  });
}
function html(html2) {
  return 0 in arguments ? this.each(function(idx) {
    var originHtml = this.innerHTML;
    d_class_default(this).empty().append(funcArg(this, html2, idx, originHtml));
  }) : 0 in this ? this[0].innerHTML : null;
}
function append() {
  return domMani(this, arguments, function(elem) {
    this.insertBefore(elem, null);
  }, true);
}

// node_modules/domq.js/src/event.js
function on(event, selector, data, callback, one) {
  var autoRemove, delegator, $this = this;
  if (event && !isString(event)) {
    d_class_default.each(event, function(type2, fn) {
      $this.on(type2, selector, data, fn, one);
    });
    return $this;
  }
  if (!isString(selector) && !isFunction(callback) && callback !== false) callback = data, data = selector, selector = void 0;
  if (callback === void 0 || data === false) callback = data, data = void 0;
  if (callback === false) callback = returnFalse;
  return $this.each(function(_, element) {
    if (one) autoRemove = function(e) {
      removeEvent(element, e.type, callback);
      return callback.apply(this, arguments);
    };
    if (selector) delegator = function(e) {
      var evt, match = d_class_default(e.target).closest(selector, element).get(0);
      if (match && match !== element) {
        evt = d_class_default.extend(createProxy(e), {
          currentTarget: match,
          liveFired: element
        });
        return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)));
      }
    };
    addEvent(element, event, callback, data, selector, delegator || autoRemove);
  });
}
function off(event, selector, callback) {
  var $this = this;
  if (event && !isString(event)) {
    d_class_default.each(event, function(type2, fn) {
      $this.off(type2, selector, fn);
    });
    return $this;
  }
  if (!isString(selector) && !isFunction(callback) && callback !== false) callback = selector, selector = void 0;
  if (callback === false) callback = returnFalse;
  return $this.each(function() {
    removeEvent(this, event, callback, selector);
  });
}

// node_modules/domq.js/src/animate-utils.js
var prefix = "";
var eventPrefix;
var vendors = {
  Webkit: "webkit",
  Moz: "",
  O: "o"
};
var testEl = document.createElement("div");
var testTransitionProperty = testEl.style.transitionProperty;
if (testEl.style.transform === void 0) d_class_default.each(vendors, function(vendor, event) {
  if (testEl.style[vendor + "TransitionProperty"] !== void 0) {
    prefix = "-" + vendor.toLowerCase() + "-";
    eventPrefix = event;
    return false;
  }
});
testEl = null;

// node_modules/domq.js/src/animate.js
function normalizeEvent(name) {
  return eventPrefix ? eventPrefix + name : name.toLowerCase();
}
d_class_default.fx = {
  off: eventPrefix === void 0 && testTransitionProperty === void 0,
  speeds: {
    _default: 400,
    fast: 200,
    slow: 600
  },
  cssPrefix: prefix,
  transitionEnd: normalizeEvent("TransitionEnd"),
  animationEnd: normalizeEvent("AnimationEnd")
};
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
var transform;
var transitionProperty;
var transitionDuration;
var transitionTiming;
var transitionDelay;
var animationName;
var animationDuration;
var animationTiming;
var animationDelay;
var cssReset = {};
function dasherize2(str) {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}
transform = prefix + "transform";
cssReset[transitionProperty = prefix + "transition-property"] = cssReset[transitionDuration = prefix + "transition-duration"] = cssReset[transitionDelay = prefix + "transition-delay"] = cssReset[transitionTiming = prefix + "transition-timing-function"] = cssReset[animationName = prefix + "animation-name"] = cssReset[animationDuration = prefix + "animation-duration"] = cssReset[animationDelay = prefix + "animation-delay"] = cssReset[animationTiming = prefix + "animation-timing-function"] = "";
function anim(properties, duration, ease, callback, delay) {
  var key, cssValues = {}, cssProperties, transforms = "", that = this, wrappedCallback, endEvent = d_class_default.fx.transitionEnd, fired = false;
  if (duration === void 0) duration = d_class_default.fx.speeds._default / 1e3;
  if (delay === void 0) delay = 0;
  if (d_class_default.fx.off) duration = 0;
  if (typeof properties == "string") {
    cssValues[animationName] = properties;
    cssValues[animationDuration] = duration + "s";
    cssValues[animationDelay] = delay + "s";
    cssValues[animationTiming] = ease || "linear";
    endEvent = d_class_default.fx.animationEnd;
  } else {
    cssProperties = [];
    for (key in properties) if (supportedTransforms.test(key)) transforms += key + "(" + properties[key] + ") ";
    else cssValues[key] = properties[key], cssProperties.push(dasherize2(key));
    if (transforms) cssValues[transform] = transforms, cssProperties.push(transform);
    if (duration > 0 && typeof properties === "object") {
      cssValues[transitionProperty] = cssProperties.join(", ");
      cssValues[transitionDuration] = duration + "s";
      cssValues[transitionDelay] = delay + "s";
      cssValues[transitionTiming] = ease || "linear";
    }
  }
  wrappedCallback = function(event) {
    if (typeof event !== "undefined") {
      if (event.target !== event.currentTarget) return;
      d_class_default(event.target).off(endEvent, wrappedCallback);
    } else d_class_default(this).off(endEvent, wrappedCallback);
    fired = true;
    d_class_default(this).css(cssReset);
    callback && callback.call(this);
  };
  if (duration > 0) {
    this.on(endEvent, wrappedCallback);
    setTimeout(function() {
      if (fired) return;
      wrappedCallback.call(that);
    }, (duration + delay) * 1e3 + 25);
  }
  this.size() && this.get(0).clientLeft;
  this.css(cssValues);
  if (duration <= 0) setTimeout(function() {
    that.each(function() {
      wrappedCallback.call(this);
    });
  }, 0);
  return this;
}
function animate(properties, duration, ease, callback, delay) {
  if (isFunction(duration)) callback = duration, ease = void 0, duration = void 0;
  if (isFunction(ease)) callback = ease, ease = void 0;
  if (isPlainObject(duration)) ease = duration.easing, callback = duration.complete, delay = duration.delay, duration = duration.duration;
  if (duration) duration = (typeof duration == "number" ? duration : d_class_default.fx.speeds[duration] || d_class_default.fx.speeds._default) / 1e3;
  if (delay) delay = parseFloat(delay) / 1e3;
  return this.anim(properties, duration, ease, callback, delay);
}

// node_modules/domq.js/src/effects.js
function origShow() {
  return this.each(function() {
    this.style.display == "none" && (this.style.display = "");
    if (getComputedStyle(this, "").getPropertyValue("display") == "none") this.style.display = defaultDisplay(this.nodeName);
  });
}
function origHide() {
  return this.css("display", "none");
}
function anim2(el, speed, opacity, scale, callback) {
  if (typeof speed == "function" && !callback) callback = speed, speed = void 0;
  var props = {
    opacity
  };
  if (scale) {
    props.scale = scale;
    el.css(d_class_default.fx.cssPrefix + "transform-origin", "0 0");
  }
  return el.animate(props, speed, null, callback);
}
function hideHelper(el, speed, scale, callback) {
  return anim2(el, speed, 0, scale, function() {
    origHide.call(d_class_default(this));
    callback && callback.call(this);
  });
}
function show(speed, callback) {
  origShow.call(this);
  if (speed === void 0) speed = 0;
  else this.css("opacity", 0);
  return anim2(this, speed, 1, "1,1", callback);
}
function hide(speed, callback) {
  if (speed === void 0) return origHide.call(this);
  else return hideHelper(this, speed, "0,0", callback);
}
function fadeTo(speed, opacity, callback) {
  return anim2(this, speed, opacity, null, callback);
}
function fadeIn(speed, callback) {
  var target = this.css("opacity");
  if (target > 0) this.css("opacity", 0);
  else target = 1;
  return origShow.call(this).fadeTo(speed, target, callback);
}

// node_modules/photoviewer/src/js/domq.js
var methods = {
  isPlainObject,
  isArray,
  isFunction,
  noop
};
var fnMethods = {
  find,
  closest,
  css,
  addClass,
  hasClass,
  removeClass,
  attr,
  removeAttr,
  append,
  remove,
  empty,
  html,
  width,
  height,
  scrollTop,
  scrollLeft,
  offset,
  offsetParent,
  position,
  on,
  off,
  show,
  hide,
  anim,
  animate,
  fadeTo,
  fadeIn
};
d_class_default.extend(methods);
d_class_default.fn.extend(fnMethods);
var domq_default = d_class_default;

// node_modules/photoviewer/src/js/defaults.js
var defaults_default = {
  // Whether to enable modal dragging
  draggable: true,
  // Whether to enable modal resizing
  resizable: true,
  // Whether to enable image moving
  movable: true,
  // Whether to enable keyboard navigation
  keyboard: true,
  // Whether to show the title
  title: true,
  // Min width of modal
  modalWidth: 320,
  // Min height of modal
  modalHeight: 320,
  // Whether to change the modal size after image loaded
  fixedModalSize: false,
  // Whether to set maximized on init
  initMaximized: false,
  // Threshold of modal relative to browser window
  gapThreshold: 0.02,
  // Threshold of image ratio
  ratioThreshold: 0.1,
  // Min ratio of image when zoom out
  minRatio: 0.05,
  // Max ratio of image when zoom in
  maxRatio: 16,
  // Toolbar options in header
  headerToolbar: ["maximize", "close"],
  // Toolbar options in footer
  footerToolbar: ["zoomIn", "zoomOut", "prev", "fullscreen", "next", "actualSize", "rotateRight"],
  // Custom icon for button
  icons: {
    minimize: `<svg viewBox="0 0 24 24" class="svg-inline-icon">
        <path fill="currentColor" d="M20,14H4V10H20"></path>
      </svg>`,
    maximize: `<svg viewBox="0 0 24 24" class="svg-inline-icon">
        <path fill="currentColor" d="M4,4H20V20H4V4M6,8V18H18V8H6Z"></path>
      </svg>`,
    close: `<svg viewBox="0 0 24 24" class="svg-inline-icon">
        <path fill="currentColor" d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12
        L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z"></path>
      </svg>`,
    zoomIn: `<svg viewBox="0 0 24 24" class="svg-inline-icon">
        <path fill="currentColor" d="M15.5,14L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43
        C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3A6.5,6.5 0 0,1 16,9.5
        C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5M9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5
        C7,5 5,7 5,9.5C5,12 7,14 9.5,14M12,10H10V12H9V10H7V9H9V7H10V9H12V10Z"></path>
      </svg>`,
    zoomOut: `<svg viewBox="0 0 24 24" class="svg-inline-icon">
        <path fill="currentColor" d="M15.5,14H14.71L14.43,13.73C15.41,12.59 16,11.11 16,9.5
        A6.5,6.5 0 0,0 9.5,3A6.5,6.5 0 0,0 3,9.5A6.5,6.5 0 0,0 9.5,16
        C11.11,16 12.59,15.41 13.73,14.43L14,14.71V15.5L19,20.5L20.5,19L15.5,14M9.5,14
        C7,14 5,12 5,9.5C5,7 7,5 9.5,5C12,5 14,7 14,9.5C14,12 12,14 9.5,14M7,9H12V10H7V9Z"></path>
      </svg>`,
    prev: `<svg viewBox="0 0 24 24" class="svg-inline-icon">
        <path fill="currentColor" d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z"></path>
      </svg>`,
    next: `<svg viewBox="0 0 24 24" class="svg-inline-icon">
        <path fill="currentColor" d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z"></path>
      </svg>`,
    fullscreen: `<svg viewBox="0 0 24 24" class="svg-inline-icon">
        <path fill="currentColor" d="M8.5,12.5L11,15.5L14.5,11L19,17H5M23,18V6A2,2 0 0,0 21,4H3
        A2,2 0 0,0 1,6V18A2,2 0 0,0 3,20H21A2,2 0 0,0 23,18Z"></path>
      </svg>`,
    actualSize: `<svg viewBox="0 0 24 24" class="svg-inline-icon">
        <path fill="currentColor" d="M9.5,13.09L10.91,14.5L6.41,19H10V21H3V14H5V17.59L9.5,13.09
        M10.91,9.5L9.5,10.91L5,6.41V10H3V3H10V5H6.41L10.91,9.5M14.5,13.09L19,17.59V14H21V21H14V19
        H17.59L13.09,14.5L14.5,13.09M13.09,9.5L17.59,5H14V3H21V10H19V6.41L14.5,10.91
        L13.09,9.5Z"></path>
      </svg>`,
    rotateLeft: `<svg viewBox="0 0 24 24" class="svg-inline-icon">
        <path fill="currentColor" d="M13,4.07V1L8.45,5.55L13,10V6.09C15.84,6.57 18,9.03 18,12
        C18,14.97 15.84,17.43 13,17.91V19.93C16.95,19.44 20,16.08 20,12C20,7.92 16.95,4.56 13,4.07
        M7.1,18.32C8.26,19.22 9.61,19.76 11,19.93V17.9C10.13,17.75 9.29,17.41 8.54,16.87L7.1,18.32
        M6.09,13H4.07C4.24,14.39 4.79,15.73 5.69,16.89L7.1,15.47C6.58,14.72 6.23,13.88 6.09,13
        M7.11,8.53L5.7,7.11C4.8,8.27 4.24,9.61 4.07,11H6.09C6.23,10.13 6.58,9.28 7.11,8.53Z"></path>
      </svg>`,
    rotateRight: `<svg viewBox="0 0 24 24" class="svg-inline-icon">
        <path fill="currentColor" d="M16.89,15.5L18.31,16.89C19.21,15.73 19.76,14.39 19.93,13H17.91
        C17.77,13.87 17.43,14.72 16.89,15.5M13,17.9V19.92C14.39,19.75 15.74,19.21 16.9,18.31
        L15.46,16.87C14.71,17.41 13.87,17.76 13,17.9M19.93,11C19.76,9.61 19.21,8.27 18.31,7.11
        L16.89,8.53C17.43,9.28 17.77,10.13 17.91,11M15.55,5.55L11,1V4.07C7.06,4.56 4,7.92 4,12
        C4,16.08 7.05,19.44 11,19.93V17.91C8.16,17.43 6,14.97 6,12C6,9.03 8.16,6.57 11,6.09V10
        L15.55,5.55Z"></path>
      </svg>`
  },
  // Custom title for button
  i18n: {
    minimize: "Minimize",
    maximize: "Maximize (Alt+X)",
    close: "Close (Q)",
    zoomIn: "Zoom-in (+)",
    zoomOut: "Zoom-out (-)",
    prev: "Prev (←)",
    next: "Next (→)",
    fullscreen: "Fullscreen (F)",
    actualSize: "Actual-size (Ctrl+Alt+0)",
    rotateLeft: "Rotate-left (Ctrl+,)",
    rotateRight: "Rotate-right (Ctrl+.)"
  },
  // Whether to enable multiple instances
  multiInstances: true,
  // Whether to enable modal transform animation
  initAnimation: true,
  // Modal transform animation duration
  animationDuration: 400,
  // Modal transform animation easing function
  animationEasing: "ease-in-out",
  // Whether to disable modal translate to center after image changed
  fixedModalPos: false,
  // Modal css `z-index`
  zIndex: 1090,
  // Selector of drag handler
  dragHandle: null,
  // Callback events
  callbacks: {
    beforeOpen: domq_default.noop,
    opened: domq_default.noop,
    beforeClose: domq_default.noop,
    closed: domq_default.noop,
    beforeChange: domq_default.noop,
    changed: domq_default.noop
  },
  // Start index of images
  index: 0,
  // Whether to load the image progressively
  progressiveLoading: true,
  // The DOM element which photoviewer will be attached to
  appendTo: "body",
  // Custom Buttons
  customButtons: {},
  // Whether to set modal css `position: fixed`
  positionFixed: true,
  // Init modal position `{top: 0, right: 0, bottom: 0, left: 0}`
  initModalPos: null,
  // Error message when image could not be loaded
  errorMsg: ""
};

// node_modules/photoviewer/src/js/utilities.js
var document2 = window.document;
function debounce(fn, delay) {
  let timer = null;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}
function preloadImage(src, success, error) {
  const img = new Image();
  img.onload = function() {
    success(img);
  };
  img.onerror = function() {
    error(img);
  };
  img.src = src;
}
function requestFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}
function getImageNameFromUrl(url) {
  const reg = /^.*?\/*([^/?]*)\.[a-z]+(\?.+|$)/gi;
  const txt = url.replace(reg, "$1");
  return txt;
}
function setGrabCursor(imageData, stageData, $stage, isRotated) {
  const imageWidth = !isRotated ? imageData.w : imageData.h;
  const imageHeight = !isRotated ? imageData.h : imageData.w;
  if (imageHeight > stageData.h || imageWidth > stageData.w) {
    $stage.addClass("is-grab");
  }
  if (imageHeight <= stageData.h && imageWidth <= stageData.w) {
    $stage.removeClass("is-grab");
  }
}
function supportTouch() {
  return !!("ontouchstart" in window || window.DocumentTouch && document2 instanceof window.DocumentTouch);
}
function isRootNode(elem) {
  return /^(?:body|html)$/i.test(elem.nodeName);
}
function getCSSValueSum($elem, props) {
  return props.reduce((acc, cur) => acc + parseFloat($elem.css(cur)), 0);
}
function isBorderBox($elem) {
  return $elem.css("box-sizing") === "border-box";
}
function getImageScale(imageWidth, imageHeight, stageWidth, stageHeight, isRotated) {
  let scale = 1;
  if (!isRotated) {
    scale = Math.min(stageWidth / imageWidth, stageHeight / imageHeight, 1);
  } else {
    scale = Math.min(stageWidth / imageHeight, stageHeight / imageWidth, 1);
  }
  return scale;
}

// node_modules/photoviewer/src/js/constants.js
var $W = domq_default(window);
var $D = domq_default(document2);
var CLICK_EVENT = "click";
var RESIZE_EVENT = "resize";
var KEYDOWN_EVENT = "keydown";
var WHEEL_EVENT = "wheel mousewheel DOMMouseScroll";
var TOUCH_START_EVENT = supportTouch() ? "touchstart" : "mousedown";
var TOUCH_MOVE_EVENT = supportTouch() ? "touchmove" : "mousemove";
var TOUCH_END_EVENT = supportTouch() ? "touchend" : "mouseup";
var NS = "photoviewer";
var CLASS_NS = "." + NS;
var EVENT_NS = "." + NS;
var PUBLIC_VARS = {
  // Whether image is moving
  isMoving: false,
  // Whether modal is resizing
  isResizing: false,
  // Modal's `z-index`
  zIndex: 0
};

// node_modules/photoviewer/src/js/draggable.js
function draggable($modal, dragHandle, dragCancel) {
  let startX = 0;
  let startY = 0;
  let left = 0;
  let top = 0;
  const dragStart = (e) => {
    e = e || window.event;
    $modal[0].focus();
    const elemCancel = domq_default(e.target).closest(dragCancel);
    if (elemCancel.length) {
      return true;
    }
    if (this.options.multiInstances) {
      $modal.css("z-index", ++PUBLIC_VARS["zIndex"]);
    }
    startX = e.type === "touchstart" ? e.targetTouches[0].pageX : e.clientX;
    startY = e.type === "touchstart" ? e.targetTouches[0].pageY : e.clientY;
    left = parseFloat($modal.css("left"));
    top = parseFloat($modal.css("top"));
    $modal.css({
      left,
      top,
      right: "",
      bottom: ""
    });
    $D.on(TOUCH_MOVE_EVENT + EVENT_NS, dragMove).on(TOUCH_END_EVENT + EVENT_NS, dragEnd);
  };
  const dragMove = (e) => {
    e = e || window.event;
    e.preventDefault();
    if (!PUBLIC_VARS["isMoving"] && !PUBLIC_VARS["isResizing"] && !this.isMaximized) {
      const endX = e.type === "touchmove" ? e.targetTouches[0].pageX : e.clientX;
      const endY = e.type === "touchmove" ? e.targetTouches[0].pageY : e.clientY;
      const relativeX = endX - startX;
      const relativeY = endY - startY;
      $modal.css({
        left: relativeX + left,
        top: relativeY + top
      });
    }
  };
  const dragEnd = () => {
    $D.off(TOUCH_MOVE_EVENT + EVENT_NS, dragMove).off(TOUCH_END_EVENT + EVENT_NS, dragEnd);
  };
  domq_default(dragHandle).on(TOUCH_START_EVENT + EVENT_NS, dragStart);
}

// node_modules/photoviewer/src/js/movable.js
var ELEMS_WITH_GRABBING_CURSOR = `html, body, .${NS}-modal, .${NS}-stage, .${NS}-button, .${NS}-resizable-handle`;
function movable($stage, $image) {
  let startX = 0;
  let startY = 0;
  let left = 0;
  let top = 0;
  let widthDiff = 0;
  let heightDiff = 0;
  let δ = 0;
  const dragStart = (e) => {
    e = e || window.event;
    e.preventDefault();
    const imageWidth = $image.width();
    const imageHeight = $image.height();
    const stageWidth = $stage.width();
    const stageHeight = $stage.height();
    startX = e.type === "touchstart" ? e.targetTouches[0].pageX : e.clientX;
    startY = e.type === "touchstart" ? e.targetTouches[0].pageY : e.clientY;
    δ = !this.isRotated ? 0 : (imageWidth - imageHeight) / 2;
    widthDiff = !this.isRotated ? imageWidth - stageWidth : imageHeight - stageWidth;
    heightDiff = !this.isRotated ? imageHeight - stageHeight : imageWidth - stageHeight;
    PUBLIC_VARS["isMoving"] = widthDiff > 0 || heightDiff > 0 ? true : false;
    left = $image.position().left - δ;
    top = $image.position().top + δ;
    if ($stage.hasClass("is-grab")) {
      domq_default(ELEMS_WITH_GRABBING_CURSOR).addClass("is-grabbing");
    }
    $D.on(TOUCH_MOVE_EVENT + EVENT_NS, dragMove).on(TOUCH_END_EVENT + EVENT_NS, dragEnd);
  };
  const dragMove = (e) => {
    e = e || window.event;
    e.preventDefault();
    const endX = e.type === "touchmove" ? e.targetTouches[0].pageX : e.clientX;
    const endY = e.type === "touchmove" ? e.targetTouches[0].pageY : e.clientY;
    const relativeX = endX - startX;
    const relativeY = endY - startY;
    let newLeft = relativeX + left;
    let newTop = relativeY + top;
    if (heightDiff > 0) {
      if (relativeY + top > δ) {
        newTop = δ;
      } else if (relativeY + top < -heightDiff + δ) {
        newTop = -heightDiff + δ;
      }
    } else {
      newTop = top;
    }
    if (widthDiff > 0) {
      if (relativeX + left > -δ) {
        newLeft = -δ;
      } else if (relativeX + left < -widthDiff - δ) {
        newLeft = -widthDiff - δ;
      }
    } else {
      newLeft = left;
    }
    $image.css({
      left: newLeft,
      top: newTop
    });
    domq_default.extend(this.imageData, {
      left: newLeft,
      top: newTop
    });
  };
  const dragEnd = () => {
    $D.off(TOUCH_MOVE_EVENT + EVENT_NS, dragMove).off(TOUCH_END_EVENT + EVENT_NS, dragEnd);
    PUBLIC_VARS["isMoving"] = false;
    domq_default(ELEMS_WITH_GRABBING_CURSOR).removeClass("is-grabbing");
  };
  $stage.on(TOUCH_START_EVENT + EVENT_NS, dragStart);
}

// node_modules/photoviewer/src/js/resizable.js
var ELEMS_WITH_RESIZE_CURSOR = `html, body, .${NS}-modal, .${NS}-stage, .${NS}-button`;
function resizable($modal, $stage, $image, options) {
  const resizableHandleE = domq_default(`<div class="${NS}-resizable-handle ${NS}-resizable-handle-e"></div>`);
  const resizableHandleW = domq_default(`<div class="${NS}-resizable-handle ${NS}-resizable-handle-w"></div>`);
  const resizableHandleS = domq_default(`<div class="${NS}-resizable-handle ${NS}-resizable-handle-s"></div>`);
  const resizableHandleN = domq_default(`<div class="${NS}-resizable-handle ${NS}-resizable-handle-n"></div>`);
  const resizableHandleSE = domq_default(`<div class="${NS}-resizable-handle ${NS}-resizable-handle-se"></div>`);
  const resizableHandleSW = domq_default(`<div class="${NS}-resizable-handle ${NS}-resizable-handle-sw"></div>`);
  const resizableHandleNE = domq_default(`<div class="${NS}-resizable-handle ${NS}-resizable-handle-ne"></div>`);
  const resizableHandleNW = domq_default(`<div class="${NS}-resizable-handle ${NS}-resizable-handle-nw"></div>`);
  const resizableHandles = {
    e: resizableHandleE,
    s: resizableHandleS,
    se: resizableHandleSE,
    n: resizableHandleN,
    w: resizableHandleW,
    nw: resizableHandleNW,
    ne: resizableHandleNE,
    sw: resizableHandleSW
  };
  $modal.append(resizableHandleE, resizableHandleW, resizableHandleS, resizableHandleN, resizableHandleSE, resizableHandleSW, resizableHandleNE, resizableHandleNW);
  let startX = 0;
  let startY = 0;
  let modalData = {
    w: 0,
    h: 0,
    x: 0,
    y: 0
  };
  let stageData = {
    w: 0,
    h: 0,
    x: 0,
    y: 0
  };
  let imageData = {
    w: 0,
    h: 0,
    x: 0,
    y: 0
  };
  let δ = 0;
  let imgFrameWidth = 0;
  let imgFrameHeight = 0;
  let direction = "";
  const {
    modalWidth: minModalWidth,
    modalHeight: minModalHeight
  } = options;
  const getModalCSS = (dir, offsetX, offsetY) => {
    const modalLeft = -offsetX + modalData.w > minModalWidth ? offsetX + modalData.x : modalData.x + modalData.w - minModalWidth;
    const modalTop = -offsetY + modalData.h > minModalHeight ? offsetY + modalData.y : modalData.y + modalData.h - minModalHeight;
    const dirsCSS = {
      e: {
        width: Math.max(offsetX + modalData.w, minModalWidth)
      },
      s: {
        height: Math.max(offsetY + modalData.h, minModalHeight)
      },
      se: {
        width: Math.max(offsetX + modalData.w, minModalWidth),
        height: Math.max(offsetY + modalData.h, minModalHeight)
      },
      w: {
        width: Math.max(-offsetX + modalData.w, minModalWidth),
        left: modalLeft
      },
      n: {
        height: Math.max(-offsetY + modalData.h, minModalHeight),
        top: modalTop
      },
      nw: {
        width: Math.max(-offsetX + modalData.w, minModalWidth),
        height: Math.max(-offsetY + modalData.h, minModalHeight),
        top: modalTop,
        left: modalLeft
      },
      ne: {
        width: Math.max(offsetX + modalData.w, minModalWidth),
        height: Math.max(-offsetY + modalData.h, minModalHeight),
        top: modalTop
      },
      sw: {
        width: Math.max(-offsetX + modalData.w, minModalWidth),
        height: Math.max(offsetY + modalData.h, minModalHeight),
        left: modalLeft
      }
    };
    return dirsCSS[dir];
  };
  const getImageCSS = (dir, offsetX, offsetY) => {
    const widthDiff = offsetX + modalData.w > minModalWidth ? stageData.w - imgFrameWidth + offsetX - δ : minModalWidth - (modalData.w - stageData.w) - imgFrameWidth - δ;
    const heightDiff = offsetY + modalData.h > minModalHeight ? stageData.h - imgFrameHeight + offsetY + δ : minModalHeight - (modalData.h - stageData.h) - imgFrameHeight + δ;
    const widthDiff2 = -offsetX + modalData.w > minModalWidth ? stageData.w - imgFrameWidth - offsetX - δ : minModalWidth - (modalData.w - stageData.w) - imgFrameWidth - δ;
    const heightDiff2 = -offsetY + modalData.h > minModalHeight ? stageData.h - imgFrameHeight - offsetY + δ : minModalHeight - (modalData.h - stageData.h) - imgFrameHeight + δ;
    const $imageLeft = $image.position().left;
    const $imageTop = $image.position().top;
    const imgLeft = (widthDiff > 0 ? $imageLeft : Math.min($imageLeft, 0)) - δ;
    const imgTop = (heightDiff > 0 ? $imageTop : Math.min($imageTop, 0)) + δ;
    const imgLeft2 = (widthDiff2 > 0 ? $imageLeft : Math.min($imageLeft, 0)) - δ;
    const imgTop2 = (heightDiff2 > 0 ? $imageTop : Math.min($imageTop, 0)) + δ;
    const dirsCSS = {
      e: {
        left: widthDiff >= -δ ? (widthDiff - δ) / 2 : Math.max(imgLeft, widthDiff)
      },
      s: {
        top: heightDiff >= δ ? (heightDiff + δ) / 2 : Math.max(imgTop, heightDiff)
      },
      se: {
        top: heightDiff >= δ ? (heightDiff + δ) / 2 : Math.max(imgTop, heightDiff),
        left: widthDiff >= -δ ? (widthDiff - δ) / 2 : Math.max(imgLeft, widthDiff)
      },
      w: {
        left: widthDiff2 >= -δ ? (widthDiff2 - δ) / 2 : Math.max(imgLeft2, widthDiff2)
      },
      n: {
        top: heightDiff2 >= δ ? (heightDiff2 + δ) / 2 : Math.max(imgTop2, heightDiff2)
      },
      nw: {
        top: heightDiff2 >= δ ? (heightDiff2 + δ) / 2 : Math.max(imgTop2, heightDiff2),
        left: widthDiff2 >= -δ ? (widthDiff2 - δ) / 2 : Math.max(imgLeft2, widthDiff2)
      },
      ne: {
        top: heightDiff2 >= δ ? (heightDiff2 + δ) / 2 : Math.max(imgTop2, heightDiff2),
        left: widthDiff >= -δ ? (widthDiff - δ) / 2 : Math.max(imgLeft, widthDiff)
      },
      sw: {
        top: heightDiff >= δ ? (heightDiff + δ) / 2 : Math.max(imgTop, heightDiff),
        left: widthDiff2 >= -δ ? (widthDiff2 - δ) / 2 : Math.max(imgLeft2, widthDiff2)
      }
    };
    return dirsCSS[dir];
  };
  const dragStart = (dir, e) => {
    e = e || window.event;
    e.preventDefault();
    PUBLIC_VARS["isResizing"] = true;
    startX = e.type === "touchstart" ? e.targetTouches[0].pageX : e.clientX;
    startY = e.type === "touchstart" ? e.targetTouches[0].pageY : e.clientY;
    modalData = {
      w: $modal.width() + (isBorderBox($modal) ? this._modalEdgeValue.horizontal : 0),
      h: $modal.height() + (isBorderBox($modal) ? this._modalEdgeValue.vertical : 0),
      x: $modal.position().left,
      y: $modal.position().top
    };
    stageData = {
      w: $stage.width(),
      h: $stage.height(),
      x: $stage.position().left,
      y: $stage.position().top
    };
    imageData = {
      w: $image.width(),
      h: $image.height(),
      x: $image.position().left,
      y: $image.position().top
    };
    δ = !this.isRotated ? 0 : (imageData.w - imageData.h) / 2;
    imgFrameWidth = !this.isRotated ? imageData.w : imageData.h;
    imgFrameHeight = !this.isRotated ? imageData.h : imageData.w;
    direction = dir;
    domq_default(ELEMS_WITH_RESIZE_CURSOR).css("cursor", dir + "-resize");
    $D.on(TOUCH_MOVE_EVENT + EVENT_NS, dragMove).on(TOUCH_END_EVENT + EVENT_NS, dragEnd);
  };
  const dragMove = (e) => {
    e = e || window.event;
    e.preventDefault();
    if (!this.isMaximized) {
      const endX = e.type === "touchmove" ? e.targetTouches[0].pageX : e.clientX;
      const endY = e.type === "touchmove" ? e.targetTouches[0].pageY : e.clientY;
      const relativeX = endX - startX;
      const relativeY = endY - startY;
      const modalCSS = getModalCSS(direction, relativeX, relativeY);
      $modal.css(modalCSS);
      const imageCSS = getImageCSS(direction, relativeX, relativeY);
      $image.css(imageCSS);
    }
  };
  const dragEnd = () => {
    $D.off(TOUCH_MOVE_EVENT + EVENT_NS, dragMove).off(TOUCH_END_EVENT + EVENT_NS, dragEnd);
    const stageWidth = $stage.width();
    const stageHeight = $stage.height();
    if (PUBLIC_VARS["isResizing"]) {
      setGrabCursor({
        w: imgFrameWidth,
        h: imgFrameHeight
      }, {
        w: stageWidth,
        h: stageHeight
      }, $stage);
    }
    PUBLIC_VARS["isResizing"] = false;
    domq_default(ELEMS_WITH_RESIZE_CURSOR).css("cursor", "");
    const {
      originalWidth: imgOriginalWidth,
      originalHeight: imgOriginalHeight
    } = this.imageData;
    const scale = getImageScale(imgOriginalWidth, imgOriginalHeight, stageWidth, stageHeight, this.isRotated);
    const imgInitWidth = imgOriginalWidth * scale;
    const imgInitHeight = imgOriginalHeight * scale;
    domq_default.extend(this.imageData, {
      initWidth: imgInitWidth,
      initHeight: imgInitHeight,
      initLeft: (stageWidth - imgInitWidth) / 2,
      initTop: (stageHeight - imgInitHeight) / 2
    });
  };
  domq_default.each(resizableHandles, function(dir, handle) {
    handle.on(TOUCH_START_EVENT + EVENT_NS, function(e) {
      dragStart(dir, e);
    });
  });
}

// node_modules/photoviewer/src/js/core.js
var PhotoViewer = class _PhotoViewer {
  // Store modal instances
  static instances = [];
  // Whether modal opened
  isOpened = false;
  // Whether modal maximized
  isMaximized = false;
  // Whether image rotated (`90*(2n+1)`)
  isRotated = false;
  // Image rotation degree
  rotationDegree = 0;
  // Store image data in every instance
  imageData = {};
  // Store modal data in every instance
  modalData = {
    width: null,
    height: null,
    left: null,
    top: null
  };
  // Store previous index
  prevIndex = null;
  // Used for time comparison
  _lastTimestamp = 0;
  constructor(items, options) {
    this.init(items, options);
  }
  init(items, options) {
    this.options = domq_default.extend(true, {}, defaults_default, options);
    if (options && domq_default.isArray(options.footerToolbar)) {
      this.options.footerToolbar = options.footerToolbar;
    }
    if (options && domq_default.isArray(options.headerToolbar)) {
      this.options.headerToolbar = options.headerToolbar;
    }
    PUBLIC_VARS["zIndex"] = PUBLIC_VARS["zIndex"] === 0 ? this.options["zIndex"] : PUBLIC_VARS["zIndex"];
    this.open();
    this.images = items;
    this.index = this.options["index"];
    this._loadImage(this.index);
    if (this.options.draggable) {
      this.draggable(this.$photoviewer, this.dragHandle, CLASS_NS + "-button");
    }
    if (this.options.movable) {
      this.movable(this.$stage, this.$image);
    }
    if (this.options.resizable) {
      this.resizable(this.$photoviewer, this.$stage, this.$image, this.options);
    }
  }
  _createBtns(toolbar) {
    const btns = ["minimize", "maximize", "close", "zoomIn", "zoomOut", "prev", "next", "fullscreen", "actualSize", "rotateLeft", "rotateRight"];
    let btnsHTML = "";
    domq_default.each(toolbar, (index, item) => {
      const btnClass = `${NS}-button ${NS}-button-${item}`;
      if (btns.indexOf(item) >= 0) {
        btnsHTML += `<button class="${btnClass}" title="${this.options.i18n[item]}">
          ${this.options.icons[item]}
          </button>`;
      } else if (this.options.customButtons[item]) {
        btnsHTML += `<button class="${btnClass}" title="${this.options.customButtons[item].title || ""}">
          ${this.options.customButtons[item].text}
          </button>`;
      }
    });
    return btnsHTML;
  }
  _createTitle() {
    return this.options.title ? `<div class="${NS}-title"></div>` : "";
  }
  _createTemplate() {
    const photoviewerHTML = `<div class="${NS}-modal" tabindex="0" role="dialog">
        <div class="${NS}-inner">
          <div class="${NS}-header">
            <div class="${NS}-toolbar ${NS}-toolbar-header">
            ${this._createBtns(this.options.headerToolbar)}
            </div>
            ${this._createTitle()}
          </div>
          <div class="${NS}-stage">
            <img class="${NS}-image" src="" alt="" />
          </div>
          <div class="${NS}-footer">
            <div class="${NS}-toolbar ${NS}-toolbar-footer">
            ${this._createBtns(this.options.footerToolbar)}
            </div>
          </div>
        </div>
      </div>`;
    return photoviewerHTML.replace(/>\s+</g, "><");
  }
  _build() {
    const photoviewerHTML = this._createTemplate();
    const $photoviewer = domq_default(photoviewerHTML);
    this.$photoviewer = $photoviewer;
    this.$stage = $photoviewer.find(CLASS_NS + "-stage");
    this.$title = $photoviewer.find(CLASS_NS + "-title");
    this.$image = $photoviewer.find(CLASS_NS + "-image");
    this.$close = $photoviewer.find(CLASS_NS + "-button-close");
    this.$maximize = $photoviewer.find(CLASS_NS + "-button-maximize");
    this.$minimize = $photoviewer.find(CLASS_NS + "-button-minimize");
    this.$zoomIn = $photoviewer.find(CLASS_NS + "-button-zoomIn");
    this.$zoomOut = $photoviewer.find(CLASS_NS + "-button-zoomOut");
    this.$actualSize = $photoviewer.find(CLASS_NS + "-button-actualSize");
    this.$fullscreen = $photoviewer.find(CLASS_NS + "-button-fullscreen");
    this.$rotateLeft = $photoviewer.find(CLASS_NS + "-button-rotateLeft");
    this.$rotateRight = $photoviewer.find(CLASS_NS + "-button-rotateRight");
    this.$prev = $photoviewer.find(CLASS_NS + "-button-prev");
    this.$next = $photoviewer.find(CLASS_NS + "-button-next");
    this.$photoviewer.css("z-index", PUBLIC_VARS["zIndex"]);
    if (this.options.positionFixed) {
      this.$photoviewer.css({
        position: "fixed"
      });
    }
    if (!this.options.dragHandle || this.options.dragHandle === CLASS_NS + "-modal") {
      this.dragHandle = this.$photoviewer;
    } else {
      this.dragHandle = this.$photoviewer.find(this.options.dragHandle);
    }
    domq_default(this.options.appendTo).eq(0).append(this.$photoviewer);
    this._stageEdgeValue = {
      horizontal: getCSSValueSum(this.$stage, ["left", "right", "border-left-width", "border-right-width"]),
      vertical: getCSSValueSum(this.$stage, ["top", "bottom", "border-top-width", "border-bottom-width"])
    };
    this._modalEdgeValue = {
      horizontal: getCSSValueSum(this.$photoviewer, ["padding-left", "padding-right", "border-left-width", "border-right-width"]),
      vertical: getCSSValueSum(this.$photoviewer, ["padding-top", "padding-bottom", "border-top-width", "border-bottom-width"])
    };
    this._addEvents();
    this._addCustomButtonEvents();
  }
  open() {
    this._triggerHook("beforeOpen", this);
    if (!this.options.multiInstances && _PhotoViewer.instances.length > 0) {
      _PhotoViewer.instances[0].close();
    }
    this._build();
    this._setInitModalPos();
    _PhotoViewer.instances.push(this);
    this._triggerHook("opened", this);
  }
  close() {
    this._triggerHook("beforeClose", this);
    this.$photoviewer.remove();
    _PhotoViewer.instances = _PhotoViewer.instances.filter((p) => p !== this);
    if (_PhotoViewer.instances.length === 0) {
      PUBLIC_VARS["zIndex"] = this.options.zIndex;
      $W.off(RESIZE_EVENT + EVENT_NS);
    }
    this._triggerHook("closed", this);
  }
  _getOffsetParentData() {
    const offsetParent2 = domq_default(this.options.appendTo)[0];
    return {
      width: this.options.positionFixed || isRootNode(offsetParent2) ? $W.width() : offsetParent2.clientWidth,
      height: this.options.positionFixed || isRootNode(offsetParent2) ? $W.height() : offsetParent2.clientHeight,
      scrollLeft: this.options.positionFixed ? 0 : isRootNode(offsetParent2) ? $D.scrollLeft() : offsetParent2.scrollLeft,
      scrollTop: this.options.positionFixed ? 0 : isRootNode(offsetParent2) ? $D.scrollTop() : offsetParent2.scrollTop
    };
  }
  _setModalToCenter() {
    let initLeft, initTop, initRight, initBottom;
    let extraWidth = 0, extraHeight = 0;
    if (!isBorderBox(this.$photoviewer)) {
      extraWidth += this._modalEdgeValue.horizontal;
      extraHeight += this._modalEdgeValue.vertical;
    }
    if (domq_default.isPlainObject(this.options.initModalPos)) {
      initLeft = this.options.initModalPos.left;
      initTop = this.options.initModalPos.top;
      initRight = this.options.initModalPos.right;
      initBottom = this.options.initModalPos.bottom;
    } else {
      const offsetParentData = this._getOffsetParentData();
      initLeft = (offsetParentData.width - this.options.modalWidth - extraWidth) / 2 + offsetParentData.scrollLeft;
      initTop = (offsetParentData.height - this.options.modalHeight - extraHeight) / 2 + offsetParentData.scrollTop;
    }
    const modalInitCSS = {
      width: this.modalData.width || this.options.modalWidth,
      height: this.modalData.height || this.options.modalHeight,
      left: this.modalData.left || initLeft,
      top: this.modalData.top || initTop,
      right: this.modalData.right || initRight,
      bottom: this.modalData.bottom || initBottom
    };
    this.$photoviewer.css(modalInitCSS);
  }
  _setInitModalPos() {
    if (this.options.initMaximized) {
      this.maximize();
      this.isOpened = true;
    } else {
      this._setModalToCenter();
    }
    this.$photoviewer[0].focus();
  }
  _setModalSize() {
    let modalWidth = this.imageData.originalWidth + this._stageEdgeValue.horizontal;
    let modalHeight = this.imageData.originalHeight + this._stageEdgeValue.vertical;
    let extraWidth = 0, extraHeight = 0;
    if (isBorderBox(this.$photoviewer)) {
      modalWidth += this._modalEdgeValue.horizontal;
      modalHeight += this._modalEdgeValue.vertical;
    } else {
      extraWidth += this._modalEdgeValue.horizontal;
      extraHeight += this._modalEdgeValue.vertical;
    }
    const offsetParentData = this._getOffsetParentData();
    const gapThreshold = Math.max(this.options.gapThreshold, 0) + 1;
    const scale = Math.min(offsetParentData.width / ((modalWidth + extraWidth) * gapThreshold), offsetParentData.height / ((modalHeight + extraHeight) * gapThreshold), 1);
    let minWidth = Math.max(modalWidth * scale, this.options.modalWidth);
    let minHeight = Math.max(modalHeight * scale, this.options.modalHeight);
    minWidth = this.options.fixedModalSize ? this.options.modalWidth : Math.round(minWidth);
    minHeight = this.options.fixedModalSize ? this.options.modalHeight : Math.round(minHeight);
    let transLeft, transTop, transRight, transBottom;
    if (domq_default.isPlainObject(this.options.initModalPos)) {
      transLeft = this.options.initModalPos.left;
      transTop = this.options.initModalPos.top;
      transRight = this.options.initModalPos.right;
      transBottom = this.options.initModalPos.bottom;
    } else {
      transLeft = (offsetParentData.width - minWidth - extraWidth) / 2 + offsetParentData.scrollLeft;
      transTop = (offsetParentData.height - minHeight - extraHeight) / 2 + offsetParentData.scrollTop;
    }
    const modalTransCSS = {
      width: minWidth,
      height: minHeight,
      left: transLeft,
      top: transTop,
      right: transRight,
      bottom: transBottom
    };
    if (this.options.initAnimation) {
      this.$photoviewer.animate(modalTransCSS, this.options.animationDuration, this.options.animationEasing, () => {
        this._setImageSize();
      });
    } else {
      this.$photoviewer.css(modalTransCSS);
      this._setImageSize();
    }
    this.isOpened = true;
  }
  _setImageSize() {
    const stageWidth = this.$stage.width();
    const stageHeight = this.$stage.height();
    const {
      originalWidth: imgOriginalWidth,
      originalHeight: imgOriginalHeight
    } = this.imageData;
    const scale = getImageScale(imgOriginalWidth, imgOriginalHeight, stageWidth, stageHeight, this.isRotated);
    const imgWidth = imgOriginalWidth * scale;
    const imgHeight = imgOriginalHeight * scale;
    this.$image.css({
      width: Math.round(imgWidth),
      height: Math.round(imgHeight),
      left: (stageWidth - Math.round(imgWidth)) / 2,
      top: (stageHeight - Math.round(imgHeight)) / 2
    });
    domq_default.extend(this.imageData, {
      initWidth: imgWidth,
      initHeight: imgHeight,
      initLeft: (stageWidth - imgWidth) / 2,
      initTop: (stageHeight - imgHeight) / 2,
      width: imgWidth,
      height: imgHeight,
      left: (stageWidth - imgWidth) / 2,
      top: (stageHeight - imgHeight) / 2
    });
    setGrabCursor({
      w: imgWidth,
      h: imgHeight
    }, {
      w: stageWidth,
      h: stageHeight
    }, this.$stage, this.isRotated);
    if (!this.imageLoaded) {
      this.$photoviewer.find(CLASS_NS + "-loader").remove();
      this.$stage.removeClass(NS + "-align-center");
      if (this.options.initAnimation && !this.options.progressiveLoading) {
        this.$image.fadeIn();
      }
      this.imageLoaded = true;
      this._triggerHook("changed", [this, this.index]);
    }
  }
  _loadImage(index) {
    this.imageLoaded = false;
    this._triggerHook("beforeChange", [this, this.prevIndex]);
    this._removeErrorMsg();
    this.$image.removeAttr("style").attr("src", "");
    this.isRotated = false;
    this.rotationDegree = 0;
    this.$photoviewer.append(`<div class="${NS}-loader"></div>`);
    this.$stage.addClass(NS + "-align-center");
    if (this.options.initAnimation && !this.options.progressiveLoading) {
      this.$image.hide();
    }
    const imgSrc = this.images[index]?.src == null ? "" : this.images[index].src.toString();
    this.$image.attr("src", imgSrc);
    const title = this.images[index]?.title || getImageNameFromUrl(imgSrc);
    if (this.options.title) {
      this.$title.html(title);
    }
    this.$image.attr("alt", title);
    preloadImage(imgSrc, (img) => {
      this.imageData = {
        originalWidth: img.width,
        originalHeight: img.height
      };
      if (this.isMaximized || this.isOpened && this.options.fixedModalPos) {
        this._setImageSize();
      } else {
        this._setModalSize();
      }
    }, () => {
      this.$photoviewer.find(CLASS_NS + "-loader").remove();
      this._triggerHook("changed", [this, index]);
      this._setErrorMsg();
    });
  }
  _setErrorMsg() {
    const errorMsg = domq_default.isFunction(this.options.errorMsg) ? this.options.errorMsg(this, this.index) : this.options.errorMsg;
    if (errorMsg) {
      this.$stage.append(`<span class="${NS}-error-msg">${errorMsg}</span>`);
      this.$image.addClass(NS + "-image-error");
    }
  }
  _removeErrorMsg() {
    this.$stage.find(CLASS_NS + "-error-msg").remove();
    this.$image.removeClass(NS + "-image-error");
  }
  jump(step) {
    const now = Date.now();
    if (now - this._lastTimestamp >= this.options.animationDuration) {
      const newIndex = this.index + step;
      this.jumpTo(newIndex);
      this._lastTimestamp = now;
    }
  }
  jumpTo(index) {
    this.prevIndex = this.index;
    let newIndex = index % this.images.length;
    if (newIndex <= 0) {
      newIndex = (newIndex + this.images.length) % this.images.length;
    }
    this.index = newIndex;
    this._loadImage(this.index);
  }
  _wheel(e) {
    e.preventDefault();
    let delta = 1;
    if (e.deltaY) {
      delta = e.deltaY > 0 ? 1 : -1;
    } else if (e.wheelDelta) {
      delta = -e.wheelDelta / 120;
    } else if (e.detail) {
      delta = e.detail > 0 ? 1 : -1;
    }
    const ratio = -delta * this.options.ratioThreshold;
    const pointer = {
      x: e.clientX - this.$stage.offset().left + $D.scrollLeft(),
      y: e.clientY - this.$stage.offset().top + $D.scrollTop()
    };
    this.zoom(ratio, pointer);
  }
  zoom(ratio, origin) {
    ratio = ratio < 0 ? 1 / (1 - ratio) : 1 + ratio;
    ratio = this.$image.width() / this.imageData.originalWidth * ratio;
    if (ratio > this.options.maxRatio || ratio < this.options.minRatio) {
      return;
    }
    this.zoomTo(ratio, origin);
  }
  zoomTo(ratio, origin) {
    const {
      originalWidth: imgOriginalWidth,
      originalHeight: imgOriginalHeight,
      width: imgWidth,
      height: imgHeight,
      left: imgLeft,
      top: imgTop,
      initWidth: imgInitWidth
    } = this.imageData;
    const stageWidth = this.$stage.width();
    const stageHeight = this.$stage.height();
    if (origin === void 0) {
      origin = {
        x: stageWidth / 2,
        y: stageHeight / 2
      };
    }
    const newWidth = imgOriginalWidth * ratio;
    const newHeight = imgOriginalHeight * ratio;
    let newLeft = origin.x - (origin.x - imgLeft) / imgWidth * newWidth;
    let newTop = origin.y - (origin.y - imgTop) / imgHeight * newHeight;
    const δ = !this.isRotated ? 0 : (newWidth - newHeight) / 2;
    const imgFrameWidth = !this.isRotated ? newWidth : newHeight;
    const imgFrameHeight = !this.isRotated ? newHeight : newWidth;
    const diffX = stageWidth - newWidth;
    const diffY = stageHeight - newHeight;
    if (imgFrameWidth <= stageWidth) {
      newLeft = diffX / 2;
    } else {
      newLeft = newLeft > -δ ? -δ : Math.max(newLeft, diffX + δ);
    }
    if (imgFrameHeight <= stageHeight) {
      newTop = diffY / 2;
    } else {
      newTop = newTop > δ ? δ : Math.max(newTop, diffY - δ);
    }
    if (Math.abs(imgInitWidth - newWidth) < imgInitWidth * 0.05) {
      this._setImageSize();
    } else {
      this.$image.css({
        width: Math.round(newWidth),
        height: Math.round(newHeight),
        left: Math.round(newLeft),
        top: Math.round(newTop)
      });
      setGrabCursor({
        w: Math.round(imgFrameWidth),
        h: Math.round(imgFrameHeight)
      }, {
        w: stageWidth,
        h: stageHeight
      }, this.$stage);
    }
    domq_default.extend(this.imageData, {
      width: newWidth,
      height: newHeight,
      left: newLeft,
      top: newTop
    });
  }
  rotate(degree) {
    this.rotationDegree = this.rotationDegree + degree;
    if (this.rotationDegree / 90 % 2 === 0) {
      this.isRotated = false;
    } else {
      this.isRotated = true;
    }
    this.rotateTo(this.rotationDegree);
  }
  rotateTo(degree) {
    this.$image.css({
      transform: "rotate(" + degree + "deg)"
    });
    this._setImageSize();
  }
  maximize() {
    this.$photoviewer.addClass(NS + "-maximized");
    this.$photoviewer.css({
      width: "auto",
      height: "auto",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    });
    this.isMaximized = true;
  }
  exitMaximize() {
    this.$photoviewer.removeClass(NS + "-maximized");
    this._setModalToCenter();
    this.isMaximized = false;
  }
  toggleMaximize() {
    if (!this.isMaximized) {
      let originalWidth = this.$photoviewer.width();
      let originalHeight = this.$photoviewer.height();
      if (isBorderBox(this.$photoviewer)) {
        originalWidth += this._modalEdgeValue.horizontal;
        originalHeight += this._modalEdgeValue.vertical;
      }
      this.modalData = {
        width: originalWidth,
        height: originalHeight,
        left: parseFloat(this.$photoviewer.css("left")),
        top: parseFloat(this.$photoviewer.css("top"))
      };
      this.maximize();
    } else {
      this.exitMaximize();
    }
    this._setImageSize();
    this.$photoviewer[0].focus();
  }
  fullscreen() {
    requestFullscreen(this.$photoviewer[0]);
    this.$photoviewer[0].focus();
  }
  resize() {
    if (this.isOpened) {
      if (this.isMaximized) {
        this._setImageSize();
      } else {
        this._setModalSize();
      }
    }
  }
  _keydown(e) {
    if (!this.options.keyboard) {
      return;
    }
    const keyCode = e.keyCode || e.which || e.charCode;
    const ctrlKey = e.ctrlKey || e.metaKey;
    const altKey = e.altKey;
    switch (keyCode) {
      case 37:
        this.jump(-1);
        break;
      case 39:
        this.jump(1);
        break;
      case 187:
        this.zoom(this.options.ratioThreshold * 3, {
          x: this.$stage.width() / 2,
          y: this.$stage.height() / 2
        }, e);
        break;
      case 189:
        this.zoom(-this.options.ratioThreshold * 3, {
          x: this.$stage.width() / 2,
          y: this.$stage.height() / 2
        }, e);
        break;
      case 61:
        this.zoom(this.options.ratioThreshold * 3, {
          x: this.$stage.width() / 2,
          y: this.$stage.height() / 2
        }, e);
        break;
      case 173:
        this.zoom(-this.options.ratioThreshold * 3, {
          x: this.$stage.width() / 2,
          y: this.$stage.height() / 2
        }, e);
        break;
      case 48:
        if (ctrlKey && altKey) {
          this.zoomTo(1, {
            x: this.$stage.width() / 2,
            y: this.$stage.height() / 2
          }, e);
        }
        break;
      case 188:
        if (ctrlKey) {
          e.preventDefault();
          this.rotate(-90);
        }
        break;
      case 190:
        if (ctrlKey) {
          this.rotate(90);
        }
        break;
      case 81:
        this.close();
        break;
      case 88:
        if (altKey) {
          this.toggleMaximize();
        }
        break;
      case 70:
        this.fullscreen();
        break;
      default:
    }
  }
  _addEvents() {
    this.$close.on(CLICK_EVENT + EVENT_NS, () => {
      this.close();
    });
    this.$stage.on(WHEEL_EVENT + EVENT_NS, (e) => {
      this._wheel(e);
    });
    this.$zoomIn.on(CLICK_EVENT + EVENT_NS, () => {
      this.zoom(this.options.ratioThreshold * 3);
    });
    this.$zoomOut.on(CLICK_EVENT + EVENT_NS, () => {
      this.zoom(-this.options.ratioThreshold * 3);
    });
    this.$actualSize.on(CLICK_EVENT + EVENT_NS, () => {
      this.zoomTo(1);
    });
    this.$prev.on(CLICK_EVENT + EVENT_NS, () => {
      this.jump(-1);
    });
    this.$next.on(CLICK_EVENT + EVENT_NS, () => {
      this.jump(1);
    });
    this.$rotateLeft.on(CLICK_EVENT + EVENT_NS, () => {
      this.rotate(-90);
    });
    this.$rotateRight.on(CLICK_EVENT + EVENT_NS, () => {
      this.rotate(90);
    });
    this.$maximize.on(CLICK_EVENT + EVENT_NS, () => {
      this.toggleMaximize();
    });
    this.$fullscreen.on(CLICK_EVENT + EVENT_NS, () => {
      this.fullscreen();
    });
    this.$photoviewer.on(KEYDOWN_EVENT + EVENT_NS, (e) => {
      this._keydown(e);
    });
    $W.on(RESIZE_EVENT + EVENT_NS, debounce(() => this.resize(), 500));
  }
  _addCustomButtonEvents() {
    for (const btnKey in this.options.customButtons) {
      this.$photoviewer.find(CLASS_NS + "-button-" + btnKey).on(CLICK_EVENT + EVENT_NS, (e) => {
        this.options.customButtons[btnKey].click.apply(this, [this, e]);
      });
    }
  }
  _triggerHook(e, data) {
    if (this.options.callbacks[e]) {
      this.options.callbacks[e].apply(this, domq_default.isArray(data) ? data : [data]);
    }
  }
};
domq_default.extend(PhotoViewer.prototype, {
  draggable
}, {
  movable
}, {
  resizable
});
var core_default = PhotoViewer;

// node_modules/photoviewer/src/js/photoviewer.js
var photoviewer_default = core_default;

// node_modules/@ng-matero/extensions/fesm2022/mtxPhotoviewer.mjs
var MtxPhotoviewer = class _MtxPhotoviewer {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
    this.images = [];
    this.embed = false;
  }
  ngOnInit() {
    const {
      nativeElement
    } = this._elementRef;
    if (this.embed) {
      this.options = __spreadValues({
        appendTo: nativeElement,
        positionFixed: false,
        modalWidth: nativeElement.clientWidth,
        modalHeight: nativeElement.clientHeight
      }, this.options);
      this.initPhotoViewer();
    } else {
      if (this.images.length === 0 && nativeElement.nodeName === "IMG") {
        const img = nativeElement;
        this.images = [{
          title: img.title || img.alt,
          src: img.src
        }];
      }
    }
  }
  ngOnDestroy() {
    this.photoviewerInstance?.close();
  }
  onClick(event) {
    event.preventDefault();
    if (!this.embed) {
      this.initPhotoViewer();
    }
  }
  initPhotoViewer() {
    this.photoviewerInstance = new photoviewer_default(this.images, this.options);
  }
  static {
    this.ɵfac = function MtxPhotoviewer_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxPhotoviewer)(ɵɵdirectiveInject(ElementRef));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MtxPhotoviewer,
      selectors: [["", "mtxPhotoviewer", ""]],
      hostBindings: function MtxPhotoviewer_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function MtxPhotoviewer_click_HostBindingHandler($event) {
            return ctx.onClick($event);
          });
        }
      },
      inputs: {
        images: [0, "mtxPhotoviewerItems", "images"],
        options: [0, "mtxPhotoviewerOptions", "options"],
        embed: [2, "mtxPhotoviewerEmbed", "embed", booleanAttribute]
      },
      exportAs: ["mtxPhotoviewer"],
      standalone: true,
      features: [ɵɵInputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxPhotoviewer, [{
    type: Directive,
    args: [{
      selector: "[mtxPhotoviewer]",
      exportAs: "mtxPhotoviewer",
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }], {
    images: [{
      type: Input,
      args: ["mtxPhotoviewerItems"]
    }],
    options: [{
      type: Input,
      args: ["mtxPhotoviewerOptions"]
    }],
    embed: [{
      type: Input,
      args: [{
        alias: "mtxPhotoviewerEmbed",
        transform: booleanAttribute
      }]
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var MtxPhotoviewerModule = class _MtxPhotoviewerModule {
  static {
    this.ɵfac = function MtxPhotoviewerModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxPhotoviewerModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _MtxPhotoviewerModule,
      imports: [MtxPhotoviewer],
      exports: [MtxPhotoviewer]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxPhotoviewerModule, [{
    type: NgModule,
    args: [{
      imports: [MtxPhotoviewer],
      exports: [MtxPhotoviewer]
    }]
  }], null, null);
})();
export {
  MtxPhotoviewer,
  MtxPhotoviewerModule
};
//# sourceMappingURL=@ng-matero_extensions_photoviewer.js.map
