// node_modules/leaflet-toolbar/dist/leaflet.toolbar.js
!function(t, o, i) {
  "use strict";
  t.L.Toolbar2 = (L.Layer || L.Class).extend({
    statics: {
      baseClass: "leaflet-toolbar"
    },
    options: {
      className: "",
      filter: function() {
        return true;
      },
      actions: []
    },
    initialize: function(t2) {
      L.setOptions(this, t2), this._toolbar_type = this.constructor._toolbar_class_id;
    },
    addTo: function(t2) {
      return this._arguments = [].slice.call(arguments), t2.addLayer(this), this;
    },
    onAdd: function(t2) {
      var o2 = t2._toolbars[this._toolbar_type];
      0 === this._calculateDepth() && (o2 && t2.removeLayer(o2), t2._toolbars[this._toolbar_type] = this);
    },
    onRemove: function(t2) {
      0 === this._calculateDepth() && delete t2._toolbars[this._toolbar_type];
    },
    appendToContainer: function(t2) {
      var o2, i2, e2, n, s = this.constructor.baseClass + "-" + this._calculateDepth() + " " + this.options.className;
      for (this._container = t2, this._ul = L.DomUtil.create("ul", s, t2), this._disabledEvents = ["click", "mousemove", "dblclick", "mousedown", "mouseup", "touchstart"], i2 = 0, n = this._disabledEvents.length; i2 < n; i2++) L.DomEvent.on(this._ul, this._disabledEvents[i2], L.DomEvent.stopPropagation);
      for (o2 = 0, e2 = this.options.actions.length; o2 < e2; o2++) new (this._getActionConstructor(this.options.actions[o2]))()._createIcon(this, this._ul, this._arguments);
    },
    _getActionConstructor: function(t2) {
      var o2 = this._arguments, i2 = this;
      return t2.extend({
        initialize: function() {
          t2.prototype.initialize.apply(this, o2);
        },
        enable: function(o3) {
          i2._active && i2._active.disable(), i2._active = this, t2.prototype.enable.call(this, o3);
        }
      });
    },
    _hide: function() {
      this._ul.style.display = "none";
    },
    _show: function() {
      this._ul.style.display = "block";
    },
    _calculateDepth: function() {
      for (var t2 = 0, o2 = this.parentToolbar; o2; ) t2 += 1, o2 = o2.parentToolbar;
      return t2;
    }
  }), L.Evented || L.Toolbar2.include(L.Mixin.Events), L.toolbar = {};
  var e = 0;
  L.Toolbar2.extend = function(t2) {
    var o2 = L.extend({}, t2.statics, {
      _toolbar_class_id: e
    });
    return e += 1, L.extend(t2, {
      statics: o2
    }), L.Class.extend.call(this, t2);
  }, L.Map.addInitHook(function() {
    this._toolbars = {};
  }), L.Toolbar2.Action = L.Handler.extend({
    statics: {
      baseClass: "leaflet-toolbar-icon"
    },
    options: {
      toolbarIcon: {
        html: "",
        className: "",
        tooltip: ""
      },
      subToolbar: new L.Toolbar2()
    },
    initialize: function(t2) {
      var o2 = L.Toolbar2.Action.prototype.options.toolbarIcon;
      L.setOptions(this, t2), this.options.toolbarIcon = L.extend({}, o2, this.options.toolbarIcon);
    },
    enable: function(t2) {
      t2 && L.DomEvent.preventDefault(t2), this._enabled || (this._enabled = true, this.addHooks && this.addHooks());
    },
    disable: function() {
      this._enabled && (this._enabled = false, this.removeHooks && this.removeHooks());
    },
    _createIcon: function(t2, o2, i2) {
      var e2 = this.options.toolbarIcon;
      this.toolbar = t2, this._icon = L.DomUtil.create("li", "", o2), this._link = L.DomUtil.create("a", "", this._icon), this._link.innerHTML = e2.html, this._link.setAttribute("href", "#"), this._link.setAttribute("title", e2.tooltip), L.DomUtil.addClass(this._link, this.constructor.baseClass), e2.className && L.DomUtil.addClass(this._link, e2.className), L.DomEvent.on(this._link, "click", this.enable, this), this._addSubToolbar(t2, this._icon, i2);
    },
    _addSubToolbar: function(t2, o2, i2) {
      var e2 = this.options.subToolbar, n = this.addHooks, s = this.removeHooks;
      e2.parentToolbar = t2, e2.options.actions.length > 0 && ((i2 = [].slice.call(i2)).push(this), e2.addTo.apply(e2, i2), e2.appendToContainer(o2), this.addHooks = function(t3) {
        "function" == typeof n && n.call(this, t3), e2._show();
      }, this.removeHooks = function(t3) {
        "function" == typeof s && s.call(this, t3), e2._hide();
      });
    }
  }), L.toolbarAction = function(t2) {
    return new L.Toolbar2.Action(t2);
  }, L.Toolbar2.Action.extendOptions = function(t2) {
    return this.extend({
      options: t2
    });
  }, L.Toolbar2.Control = L.Toolbar2.extend({
    statics: {
      baseClass: "leaflet-control-toolbar " + L.Toolbar2.baseClass
    },
    initialize: function(t2) {
      L.Toolbar2.prototype.initialize.call(this, t2), this._control = new L.Control.Toolbar(this.options);
    },
    onAdd: function(t2) {
      this._control.addTo(t2), L.Toolbar2.prototype.onAdd.call(this, t2), this.appendToContainer(this._control.getContainer());
    },
    onRemove: function(t2) {
      L.Toolbar2.prototype.onRemove.call(this, t2), this._control.remove ? this._control.remove() : this._control.removeFrom(t2);
    }
  }), L.Control.Toolbar = L.Control.extend({
    onAdd: function() {
      return L.DomUtil.create("div", "");
    }
  }), L.toolbar.control = function(t2) {
    return new L.Toolbar2.Control(t2);
  }, L.Toolbar2.Popup = L.Toolbar2.extend({
    statics: {
      baseClass: "leaflet-popup-toolbar " + L.Toolbar2.baseClass
    },
    options: {
      anchor: [0, 0]
    },
    initialize: function(t2, o2) {
      L.Toolbar2.prototype.initialize.call(this, o2), this._marker = new L.Marker(t2, {
        icon: new L.DivIcon({
          className: this.options.className,
          iconAnchor: [0, 0]
        })
      });
    },
    onAdd: function(t2) {
      this._map = t2, this._marker.addTo(t2), L.Toolbar2.prototype.onAdd.call(this, t2), this.appendToContainer(this._marker._icon), this._setStyles();
    },
    onRemove: function(t2) {
      t2.removeLayer(this._marker), L.Toolbar2.prototype.onRemove.call(this, t2), delete this._map;
    },
    setLatLng: function(t2) {
      return this._marker.setLatLng(t2), this;
    },
    _setStyles: function() {
      for (var t2, o2, i2, e2 = this._container, n = this._ul, s = L.point(this.options.anchor), a = n.querySelectorAll(".leaflet-toolbar-icon"), l = [], r = 0, c = 0, h = a.length; c < h; c++) a[c].parentNode.parentNode === n && (l.push(parseInt(L.DomUtil.getStyle(a[c], "height"), 10)), r += Math.ceil(parseFloat(L.DomUtil.getStyle(a[c], "width"))), r += Math.ceil(parseFloat(L.DomUtil.getStyle(a[c], "border-right-width"))));
      n.style.width = r + "px", this._tipContainer = L.DomUtil.create("div", "leaflet-toolbar-tip-container", e2), this._tipContainer.style.width = r + Math.ceil(parseFloat(L.DomUtil.getStyle(n, "border-left-width"))) + "px", this._tip = L.DomUtil.create("div", "leaflet-toolbar-tip", this._tipContainer), t2 = Math.max.apply(void 0, l), n.style.height = t2 + "px", o2 = parseInt(L.DomUtil.getStyle(this._tip, "width"), 10), i2 = new L.Point(r / 2, t2 + 1.414 * o2), e2.style.marginLeft = s.x - i2.x + "px", e2.style.marginTop = s.y - i2.y + "px";
    }
  }), L.toolbar.popup = function(t2) {
    return new L.Toolbar2.Popup(t2);
  };
}(window, document);
//# sourceMappingURL=leaflet-toolbar.js.map
