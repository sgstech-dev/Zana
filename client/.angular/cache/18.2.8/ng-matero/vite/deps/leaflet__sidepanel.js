import {
  require_leaflet_src
} from "./chunk-2DQ5KALG.js";
import {
  __spreadValues,
  __toESM
} from "./chunk-PEHFQLBM.js";

// node_modules/leaflet.sidepanel/dist/leaflet-sidepanel.es.js
var t = __toESM(require_leaflet_src());
var d = class extends t.Control {
  // Optional 'cause it's initialized in `addTo`
  constructor(i, e) {
    if (e = e || {}, e.position) {
      const s = "Leaflet.SidePanel: You cannot set the `position` option. It is controlled by the `panelPosition` option.";
      e.panelPosition ? console.warn(s) : console.error(s);
    }
    e.panelPosition && !["left", "right"].includes(e.panelPosition) && (console.error('Leaflet.SidePanel: The `panelPosition` option must be either "left" or "right".'), e.panelPosition = "left"), e.tabsPosition && !["top", "bottom", "left", "right"].includes(e.tabsPosition) && (console.error('Leaflet.SidePanel: The `tabsPosition` option must be either "top", "bottom", "left", or "right".'), e.tabsPosition = "top"), super(e), this.options = __spreadValues({
      panelPosition: "left",
      hasTabs: true,
      tabsPosition: "top",
      darkMode: false,
      pushControls: false,
      defaultTab: 1,
      size: "400px",
      onTabClick: () => {
      },
      onToggle: () => {
      }
    }, e), this._panel = t.DomUtil.get(i), this._panel.style.setProperty("--panel-width", this.options.size), t.setOptions(this, e);
  }
  addTo(i) {
    if (this._map = i, t.DomUtil.addClass(this._panel, "sidepanel-" + this.options.panelPosition), this.options.darkMode && t.DomUtil.addClass(this._panel, "sidepanel-dark"), t.DomEvent.disableScrollPropagation(this._panel), t.DomEvent.disableClickPropagation(this._panel), this.options.pushControls) {
      const e = this._map, o = (e instanceof t.Map ? e.getContainer() : e).querySelector(".leaflet-control-container");
      t.DomUtil.addClass(o, "leaflet-animate-control-container"), o.style.setProperty(`--panel-width-${this.options.panelPosition}`, this.options.size);
    }
    return this.options.hasTabs ? this._initTabs(this.options.tabsPosition) : this._initContent(), this;
  }
  // Define the private methods as part of the class
  _initContent() {
    this._toggleButton();
  }
  _initTabs(i) {
    t.DomUtil.addClass(this._panel, "tabs-" + i);
    const e = this._panel.querySelectorAll("a.sidebar-tab-link"), s = this._panel.querySelectorAll(".sidepanel-tab-content");
    e.forEach((o, a) => {
      let r = false, n;
      typeof this.options.defaultTab == "number" && this.options.defaultTab - 1 === a && (r = true, n = s[a]), typeof this.options.defaultTab == "string" && this.options.defaultTab === o.dataset.tabLink && (r = true, n = this._panel.querySelector(`.sidepanel-tab-content[data-tab-content="${this.options.defaultTab}"]`)), r && (t.DomUtil.addClass(o, "active"), t.DomUtil.addClass(n, "active")), t.DomEvent.on(o, "click", (h) => {
        t.DomEvent.preventDefault(h), e.forEach((l) => t.DomUtil.removeClass(l, "active")), t.DomUtil.addClass(o, "active"), s.forEach((l) => {
          o.dataset.tabLink === l.dataset.tabContent ? t.DomUtil.addClass(l, "active") : t.DomUtil.removeClass(l, "active");
        }), this.options.onTabClick(o);
      }, o);
    }), this._toggleButton();
  }
  toggle(i) {
    let e = true;
    const s = t.DomUtil.hasClass(this._panel, "opened"), o = t.DomUtil.hasClass(this._panel, "closed");
    if (!s && !o ? t.DomUtil.addClass(this._panel, "opened") : !s && o ? (t.DomUtil.addClass(this._panel, "opened"), t.DomUtil.removeClass(this._panel, "closed")) : s && !o && (e = false, t.DomUtil.removeClass(this._panel, "opened"), t.DomUtil.addClass(this._panel, "closed")), this.options.pushControls) {
      const a = this._map;
      if (a) {
        const n = (a instanceof t.Map ? a.getContainer() : a).querySelector(".leaflet-control-container");
        e ? (t.DomUtil.removeClass(n, this.options.panelPosition + "-closed"), t.DomUtil.addClass(n, this.options.panelPosition + "-opened")) : (t.DomUtil.removeClass(n, this.options.panelPosition + "-opened"), t.DomUtil.addClass(n, this.options.panelPosition + "-closed"));
      } else console.error("Leaflet.SidePanel: You must add the SidePanel to the map before setting the `pushControls` option.");
    }
    this.options.onToggle(e);
  }
  isOpened() {
    return t.DomUtil.hasClass(this._panel, "opened");
  }
  open() {
    this.isOpened() || this.toggle();
  }
  close() {
    this.isOpened() && this.toggle();
  }
  _toggleButton() {
    const i = this._panel.querySelector(".sidepanel-toggle-container"), e = i.querySelector(".sidepanel-toggle-button");
    t.DomEvent.on(e, "click", (s) => {
      this.toggle(s);
    }, i);
  }
};
t.Control.SidePanel = d;
t.control.sidepanel = function(p, i) {
  return new d(p, i);
};
//# sourceMappingURL=leaflet__sidepanel.js.map
