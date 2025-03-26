// node_modules/leaflet-rotatedmarker/leaflet.rotatedMarker.js
(function() {
  var proto_initIcon = L.Marker.prototype._initIcon;
  var proto_setPos = L.Marker.prototype._setPos;
  var oldIE = L.DomUtil.TRANSFORM === "msTransform";
  L.Marker.addInitHook(function() {
    var iconOptions = this.options.icon && this.options.icon.options;
    var iconAnchor = iconOptions && this.options.icon.options.iconAnchor;
    if (iconAnchor) {
      iconAnchor = iconAnchor[0] + "px " + iconAnchor[1] + "px";
    }
    this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || "center bottom";
    this.options.rotationAngle = this.options.rotationAngle || 0;
    this.on("drag", function(e) {
      e.target._applyRotation();
    });
  });
  L.Marker.include({
    _initIcon: function() {
      proto_initIcon.call(this);
    },
    _setPos: function(pos) {
      proto_setPos.call(this, pos);
      this._applyRotation();
    },
    _applyRotation: function() {
      if (this.options.rotationAngle) {
        this._icon.style[L.DomUtil.TRANSFORM + "Origin"] = this.options.rotationOrigin;
        if (oldIE) {
          this._icon.style[L.DomUtil.TRANSFORM] = "rotate(" + this.options.rotationAngle + "deg)";
        } else {
          this._icon.style[L.DomUtil.TRANSFORM] += " rotateZ(" + this.options.rotationAngle + "deg)";
        }
      }
    },
    setRotationAngle: function(angle) {
      this.options.rotationAngle = angle;
      this.update();
      return this;
    },
    setRotationOrigin: function(origin) {
      this.options.rotationOrigin = origin;
      this.update();
      return this;
    }
  });
})();
//# sourceMappingURL=leaflet-rotatedmarker.js.map
