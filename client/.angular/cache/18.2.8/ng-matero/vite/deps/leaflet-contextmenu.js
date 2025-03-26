import {
  require_leaflet_src
} from "./chunk-2DQ5KALG.js";
import {
  __commonJS
} from "./chunk-PEHFQLBM.js";

// node_modules/leaflet-contextmenu/dist/leaflet.contextmenu.js
var require_leaflet_contextmenu = __commonJS({
  "node_modules/leaflet-contextmenu/dist/leaflet.contextmenu.js"(exports, module) {
    (function(factory) {
      var L;
      if (typeof define === "function" && define.amd) {
        define(["leaflet"], factory);
      } else if (typeof module === "object" && typeof module.exports === "object") {
        L = require_leaflet_src();
        module.exports = factory(L);
      } else {
        if (typeof window.L === "undefined") {
          throw new Error("Leaflet must be loaded first");
        }
        factory(window.L);
      }
    })(function(L) {
      L.Map.mergeOptions({
        contextmenuItems: []
      });
      L.Map.ContextMenu = L.Handler.extend({
        _touchstart: L.Browser.msPointer ? "MSPointerDown" : L.Browser.pointer ? "pointerdown" : "touchstart",
        statics: {
          BASE_CLS: "leaflet-contextmenu"
        },
        initialize: function(map) {
          L.Handler.prototype.initialize.call(this, map);
          this._items = [];
          this._visible = false;
          var container = this._container = L.DomUtil.create("div", L.Map.ContextMenu.BASE_CLS, map._container);
          container.style.zIndex = 1e4;
          container.style.position = "absolute";
          if (map.options.contextmenuWidth) {
            container.style.width = map.options.contextmenuWidth + "px";
          }
          this._createItems();
          L.DomEvent.on(container, "click", L.DomEvent.stop).on(container, "mousedown", L.DomEvent.stop).on(container, "dblclick", L.DomEvent.stop).on(container, "contextmenu", L.DomEvent.stop);
        },
        addHooks: function() {
          var container = this._map.getContainer();
          L.DomEvent.on(container, "mouseleave", this._hide, this).on(document, "keydown", this._onKeyDown, this);
          if (L.Browser.touch) {
            L.DomEvent.on(document, this._touchstart, this._hide, this);
          }
          this._map.on({
            contextmenu: this._show,
            mousedown: this._hide,
            movestart: this._hide,
            zoomstart: this._hide
          }, this);
        },
        removeHooks: function() {
          var container = this._map.getContainer();
          L.DomEvent.off(container, "mouseleave", this._hide, this).off(document, "keydown", this._onKeyDown, this);
          if (L.Browser.touch) {
            L.DomEvent.off(document, this._touchstart, this._hide, this);
          }
          this._map.off({
            contextmenu: this._show,
            mousedown: this._hide,
            movestart: this._hide,
            zoomstart: this._hide
          }, this);
        },
        showAt: function(point, data) {
          if (point instanceof L.LatLng) {
            point = this._map.latLngToContainerPoint(point);
          }
          this._showAtPoint(point, data);
        },
        hide: function() {
          this._hide();
        },
        addItem: function(options) {
          return this.insertItem(options);
        },
        insertItem: function(options, index) {
          index = index !== void 0 ? index : this._items.length;
          var item = this._createItem(this._container, options, index);
          this._items.push(item);
          this._sizeChanged = true;
          this._map.fire("contextmenu.additem", {
            contextmenu: this,
            el: item.el,
            index
          });
          return item.el;
        },
        removeItem: function(item) {
          var container = this._container;
          if (!isNaN(item)) {
            item = container.children[item];
          }
          if (item) {
            this._removeItem(L.Util.stamp(item));
            this._sizeChanged = true;
            this._map.fire("contextmenu.removeitem", {
              contextmenu: this,
              el: item
            });
            return item;
          }
          return null;
        },
        removeAllItems: function() {
          var items = this._container.children, item;
          while (items.length) {
            item = items[0];
            this._removeItem(L.Util.stamp(item));
          }
          return items;
        },
        hideAllItems: function() {
          var item, i2, l2;
          for (i2 = 0, l2 = this._items.length; i2 < l2; i2++) {
            item = this._items[i2];
            item.el.style.display = "none";
          }
        },
        showAllItems: function() {
          var item, i2, l2;
          for (i2 = 0, l2 = this._items.length; i2 < l2; i2++) {
            item = this._items[i2];
            item.el.style.display = "";
          }
        },
        setDisabled: function(item, disabled) {
          var container = this._container, itemCls = L.Map.ContextMenu.BASE_CLS + "-item";
          if (!isNaN(item)) {
            item = container.children[item];
          }
          if (item && L.DomUtil.hasClass(item, itemCls)) {
            if (disabled) {
              L.DomUtil.addClass(item, itemCls + "-disabled");
              this._map.fire("contextmenu.disableitem", {
                contextmenu: this,
                el: item
              });
            } else {
              L.DomUtil.removeClass(item, itemCls + "-disabled");
              this._map.fire("contextmenu.enableitem", {
                contextmenu: this,
                el: item
              });
            }
          }
        },
        isVisible: function() {
          return this._visible;
        },
        _createItems: function() {
          var itemOptions = this._map.options.contextmenuItems, item, i2, l2;
          for (i2 = 0, l2 = itemOptions.length; i2 < l2; i2++) {
            this._items.push(this._createItem(this._container, itemOptions[i2]));
          }
        },
        _createItem: function(container, options, index) {
          if (options.separator || options === "-") {
            return this._createSeparator(container, index);
          }
          var itemCls = L.Map.ContextMenu.BASE_CLS + "-item", cls2 = options.disabled ? itemCls + " " + itemCls + "-disabled" : itemCls, el = this._insertElementAt("a", cls2, container, index), callback = this._createEventHandler(el, options.callback, options.context, options.hideOnSelect), icon = this._getIcon(options), iconCls = this._getIconCls(options), html = "";
          if (icon) {
            html = '<img class="' + L.Map.ContextMenu.BASE_CLS + '-icon" src="' + icon + '"/>';
          } else if (iconCls) {
            html = '<span class="' + L.Map.ContextMenu.BASE_CLS + "-icon " + iconCls + '"></span>';
          }
          el.innerHTML = html + options.text;
          el.href = "#";
          L.DomEvent.on(el, "mouseover", this._onItemMouseOver, this).on(el, "mouseout", this._onItemMouseOut, this).on(el, "mousedown", L.DomEvent.stopPropagation).on(el, "click", callback);
          if (L.Browser.touch) {
            L.DomEvent.on(el, this._touchstart, L.DomEvent.stopPropagation);
          }
          if (!L.Browser.pointer) {
            L.DomEvent.on(el, "click", this._onItemMouseOut, this);
          }
          return {
            id: L.Util.stamp(el),
            el,
            callback
          };
        },
        _removeItem: function(id) {
          var item, el, i2, l2, callback;
          for (i2 = 0, l2 = this._items.length; i2 < l2; i2++) {
            item = this._items[i2];
            if (item.id === id) {
              el = item.el;
              callback = item.callback;
              if (callback) {
                L.DomEvent.off(el, "mouseover", this._onItemMouseOver, this).off(el, "mouseover", this._onItemMouseOut, this).off(el, "mousedown", L.DomEvent.stopPropagation).off(el, "click", callback);
                if (L.Browser.touch) {
                  L.DomEvent.off(el, this._touchstart, L.DomEvent.stopPropagation);
                }
                if (!L.Browser.pointer) {
                  L.DomEvent.on(el, "click", this._onItemMouseOut, this);
                }
              }
              this._container.removeChild(el);
              this._items.splice(i2, 1);
              return item;
            }
          }
          return null;
        },
        _createSeparator: function(container, index) {
          var el = this._insertElementAt("div", L.Map.ContextMenu.BASE_CLS + "-separator", container, index);
          return {
            id: L.Util.stamp(el),
            el
          };
        },
        _createEventHandler: function(el, func, context, hideOnSelect) {
          var me = this, map = this._map, disabledCls = L.Map.ContextMenu.BASE_CLS + "-item-disabled", hideOnSelect = hideOnSelect !== void 0 ? hideOnSelect : true;
          return function(e) {
            if (L.DomUtil.hasClass(el, disabledCls)) {
              return;
            }
            if (hideOnSelect) {
              me._hide();
            }
            if (func) {
              func.call(context || map, me._showLocation);
            }
            me._map.fire("contextmenu.select", {
              contextmenu: me,
              el
            });
          };
        },
        _insertElementAt: function(tagName, className, container, index) {
          var refEl, el = document.createElement(tagName);
          el.className = className;
          if (index !== void 0) {
            refEl = container.children[index];
          }
          if (refEl) {
            container.insertBefore(el, refEl);
          } else {
            container.appendChild(el);
          }
          return el;
        },
        _show: function(e) {
          this._showAtPoint(e.containerPoint, e);
        },
        _showAtPoint: function(pt, data) {
          if (this._items.length) {
            var map = this._map, layerPoint = map.containerPointToLayerPoint(pt), latlng = map.layerPointToLatLng(layerPoint), event = L.extend(data || {}, {
              contextmenu: this
            });
            this._showLocation = {
              latlng,
              layerPoint,
              containerPoint: pt
            };
            if (data && data.relatedTarget) {
              this._showLocation.relatedTarget = data.relatedTarget;
            }
            this._setPosition(pt);
            if (!this._visible) {
              this._container.style.display = "block";
              this._visible = true;
            }
            this._map.fire("contextmenu.show", event);
          }
        },
        _hide: function() {
          if (this._visible) {
            this._visible = false;
            this._container.style.display = "none";
            this._map.fire("contextmenu.hide", {
              contextmenu: this
            });
          }
        },
        _getIcon: function(options) {
          return L.Browser.retina && options.retinaIcon || options.icon;
        },
        _getIconCls: function(options) {
          return L.Browser.retina && options.retinaIconCls || options.iconCls;
        },
        _setPosition: function(pt) {
          var mapSize = this._map.getSize(), container = this._container, containerSize = this._getElementSize(container), anchor;
          if (this._map.options.contextmenuAnchor) {
            anchor = L.point(this._map.options.contextmenuAnchor);
            pt = pt.add(anchor);
          }
          container._leaflet_pos = pt;
          if (pt.x + containerSize.x > mapSize.x) {
            container.style.left = "auto";
            container.style.right = Math.min(Math.max(mapSize.x - pt.x, 0), mapSize.x - containerSize.x - 1) + "px";
          } else {
            container.style.left = Math.max(pt.x, 0) + "px";
            container.style.right = "auto";
          }
          if (pt.y + containerSize.y > mapSize.y) {
            container.style.top = "auto";
            container.style.bottom = Math.min(Math.max(mapSize.y - pt.y, 0), mapSize.y - containerSize.y - 1) + "px";
          } else {
            container.style.top = Math.max(pt.y, 0) + "px";
            container.style.bottom = "auto";
          }
        },
        _getElementSize: function(el) {
          var size = this._size, initialDisplay = el.style.display;
          if (!size || this._sizeChanged) {
            size = {};
            el.style.left = "-999999px";
            el.style.right = "auto";
            el.style.display = "block";
            size.x = el.offsetWidth;
            size.y = el.offsetHeight;
            el.style.left = "auto";
            el.style.display = initialDisplay;
            this._sizeChanged = false;
          }
          return size;
        },
        _onKeyDown: function(e) {
          var key = e.keyCode;
          if (key === 27) {
            this._hide();
          }
        },
        _onItemMouseOver: function(e) {
          L.DomUtil.addClass(e.target || e.srcElement, "over");
        },
        _onItemMouseOut: function(e) {
          L.DomUtil.removeClass(e.target || e.srcElement, "over");
        }
      });
      L.Map.addInitHook("addHandler", "contextmenu", L.Map.ContextMenu);
      L.Mixin.ContextMenu = {
        bindContextMenu: function(options) {
          L.setOptions(this, options);
          this._initContextMenu();
          return this;
        },
        unbindContextMenu: function() {
          this.off("contextmenu", this._showContextMenu, this);
          return this;
        },
        addContextMenuItem: function(item) {
          this.options.contextmenuItems.push(item);
        },
        removeContextMenuItemWithIndex: function(index) {
          var items = [];
          for (var i2 = 0; i2 < this.options.contextmenuItems.length; i2++) {
            if (this.options.contextmenuItems[i2].index == index) {
              items.push(i2);
            }
          }
          var elem = items.pop();
          while (elem !== void 0) {
            this.options.contextmenuItems.splice(elem, 1);
            elem = items.pop();
          }
        },
        replaceContextMenuItem: function(item) {
          this.removeContextMenuItemWithIndex(item.index);
          this.addContextMenuItem(item);
        },
        _initContextMenu: function() {
          this._items = [];
          this.on("contextmenu", this._showContextMenu, this);
        },
        _showContextMenu: function(e) {
          var itemOptions, data, pt, i2, l2;
          if (this._map.contextmenu) {
            data = L.extend({
              relatedTarget: this
            }, e);
            pt = this._map.mouseEventToContainerPoint(e.originalEvent);
            if (!this.options.contextmenuInheritItems) {
              this._map.contextmenu.hideAllItems();
            }
            for (i2 = 0, l2 = this.options.contextmenuItems.length; i2 < l2; i2++) {
              itemOptions = this.options.contextmenuItems[i2];
              this._items.push(this._map.contextmenu.insertItem(itemOptions, itemOptions.index));
            }
            this._map.once("contextmenu.hide", this._hideContextMenu, this);
            this._map.contextmenu.showAt(pt, data);
          }
        },
        _hideContextMenu: function() {
          var i2, l2;
          for (i2 = 0, l2 = this._items.length; i2 < l2; i2++) {
            this._map.contextmenu.removeItem(this._items[i2]);
          }
          this._items.length = 0;
          if (!this.options.contextmenuInheritItems) {
            this._map.contextmenu.showAllItems();
          }
        }
      };
      var classes = [L.Marker, L.Path], defaultOptions = {
        contextmenu: false,
        contextmenuItems: [],
        contextmenuInheritItems: true
      }, cls, i, l;
      for (i = 0, l = classes.length; i < l; i++) {
        cls = classes[i];
        if (!cls.prototype.options) {
          cls.prototype.options = defaultOptions;
        } else {
          cls.mergeOptions(defaultOptions);
        }
        cls.addInitHook(function() {
          if (this.options.contextmenu) {
            this._initContextMenu();
          }
        });
        cls.include(L.Mixin.ContextMenu);
      }
      return L.Map.ContextMenu;
    });
  }
});
export default require_leaflet_contextmenu();
/*! Bundled license information:

leaflet-contextmenu/dist/leaflet.contextmenu.js:
  (*
  	Leaflet.contextmenu, a context menu for Leaflet.
  	(c) 2015, Adam Ratcliffe, GeoSmart Maps Limited
  
  	@preserve
  *)
*/
//# sourceMappingURL=leaflet-contextmenu.js.map
