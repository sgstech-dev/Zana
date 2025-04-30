import {
  MatIconButton
} from "./chunk-O3D5ZRSY.js";
import "./chunk-HBP6OA6Q.js";
import "./chunk-U7VVEHQ6.js";
import "./chunk-5SQMXRTA.js";
import "./chunk-SWKTGBAV.js";
import "./chunk-5DDL3Q73.js";
import {
  CommonModule
} from "./chunk-R3EXXSPB.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  NgModule,
  Output,
  ViewEncapsulation$1,
  booleanAttribute,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate
} from "./chunk-57TCTXNO.js";
import "./chunk-O6VDDHVS.js";
import "./chunk-IXUSS67I.js";
import "./chunk-BONRK7YY.js";
import "./chunk-PEHFQLBM.js";

// node_modules/@ng-matero/extensions/fesm2022/mtxAlert.mjs
var _c0 = ["*"];
function MtxAlert_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 0)(1, "button", 1);
    ɵɵlistener("click", function MtxAlert_Conditional_1_Template_button_click_1_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._onClosed());
    });
    ɵɵnamespaceSVG();
    ɵɵelementStart(2, "svg", 2);
    ɵɵelement(3, "path", 3);
    ɵɵelementEnd()()();
  }
}
var MtxAlert = class _MtxAlert {
  get _hostClassList() {
    return `mtx-alert-${this.type} mat-elevation-z${this.elevation}`;
  }
  constructor(_changeDetectorRef) {
    this._changeDetectorRef = _changeDetectorRef;
    this.type = "default";
    this.dismissible = false;
    this.elevation = 0;
    this.closed = new EventEmitter();
  }
  _onClosed() {
    this._changeDetectorRef.markForCheck();
    this.closed.emit(this);
  }
  static {
    this.ɵfac = function MtxAlert_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxAlert)(ɵɵdirectiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MtxAlert,
      selectors: [["mtx-alert"]],
      hostAttrs: ["role", "alert", 1, "mtx-alert"],
      hostVars: 4,
      hostBindings: function MtxAlert_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx._hostClassList);
          ɵɵclassProp("mtx-alert-dismissible", ctx.dismissible);
        }
      },
      inputs: {
        type: "type",
        dismissible: [2, "dismissible", "dismissible", booleanAttribute],
        elevation: "elevation"
      },
      outputs: {
        closed: "closed"
      },
      exportAs: ["mtxAlert"],
      standalone: true,
      features: [ɵɵInputTransformsFeature, ɵɵStandaloneFeature],
      ngContentSelectors: _c0,
      decls: 2,
      vars: 1,
      consts: [[1, "mtx-alert-close"], ["mat-icon-button", "", "type", "button", "aria-label", "Close", 3, "click"], ["viewBox", "0 0 24 24", "width", "24px", "height", "24px", "fill", "currentColor", "focusable", "false"], ["d", "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"]],
      template: function MtxAlert_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
          ɵɵtemplate(1, MtxAlert_Conditional_1_Template, 4, 0, "div", 0);
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵconditional(ctx.dismissible ? 1 : -1);
        }
      },
      dependencies: [MatIconButton],
      styles: [".mtx-alert{position:relative;display:block;padding:.75rem 1rem;margin-bottom:1rem;line-height:1.5;border:1px solid var(--mtx-alert-outline-color, var(--mat-app-outline-variant));border-radius:var(--mtx-alert-container-shape, var(--mat-app-corner-small));background-color:var(--mtx-alert-background-color, var(--mat-app-surface-container));color:var(--mtx-alert-text-color, var(--mat-app-on-surface))}.mtx-alert.mtx-alert-info{border-color:var(--mtx-alert-info-outline-color);background-color:var(--mtx-alert-info-background-color);color:var(--mtx-alert-info-text-color)}.mtx-alert.mtx-alert-success{border-color:var(--mtx-alert-success-outline-color);background-color:var(--mtx-alert-success-background-color);color:var(--mtx-alert-success-text-color)}.mtx-alert.mtx-alert-warning{border-color:var(--mtx-alert-warning-outline-color);background-color:var(--mtx-alert-warning-background-color);color:var(--mtx-alert-warning-text-color)}.mtx-alert.mtx-alert-danger{border-color:var(--mtx-alert-danger-outline-color);background-color:var(--mtx-alert-danger-background-color);color:var(--mtx-alert-danger-text-color)}.mtx-alert-close{position:absolute;top:0;right:0;display:flex;align-items:center;justify-content:center;width:3rem;height:3rem}[dir=rtl] .mtx-alert-close{right:auto;left:0}.mtx-alert-dismissible{padding-right:3rem}\n"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxAlert, [{
    type: Component,
    args: [{
      selector: "mtx-alert",
      exportAs: "mtxAlert",
      host: {
        "class": "mtx-alert",
        "[class.mtx-alert-dismissible]": "dismissible",
        "role": "alert"
      },
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [MatIconButton],
      template: '<ng-content></ng-content>\n@if (dismissible) {\n  <div class="mtx-alert-close">\n    <button mat-icon-button type="button" aria-label="Close" (click)="_onClosed()">\n      <svg viewBox="0 0 24 24" width="24px" height="24px" fill="currentColor" focusable="false">\n        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />\n      </svg>\n    </button>\n  </div>\n}\n',
      styles: [".mtx-alert{position:relative;display:block;padding:.75rem 1rem;margin-bottom:1rem;line-height:1.5;border:1px solid var(--mtx-alert-outline-color, var(--mat-app-outline-variant));border-radius:var(--mtx-alert-container-shape, var(--mat-app-corner-small));background-color:var(--mtx-alert-background-color, var(--mat-app-surface-container));color:var(--mtx-alert-text-color, var(--mat-app-on-surface))}.mtx-alert.mtx-alert-info{border-color:var(--mtx-alert-info-outline-color);background-color:var(--mtx-alert-info-background-color);color:var(--mtx-alert-info-text-color)}.mtx-alert.mtx-alert-success{border-color:var(--mtx-alert-success-outline-color);background-color:var(--mtx-alert-success-background-color);color:var(--mtx-alert-success-text-color)}.mtx-alert.mtx-alert-warning{border-color:var(--mtx-alert-warning-outline-color);background-color:var(--mtx-alert-warning-background-color);color:var(--mtx-alert-warning-text-color)}.mtx-alert.mtx-alert-danger{border-color:var(--mtx-alert-danger-outline-color);background-color:var(--mtx-alert-danger-background-color);color:var(--mtx-alert-danger-text-color)}.mtx-alert-close{position:absolute;top:0;right:0;display:flex;align-items:center;justify-content:center;width:3rem;height:3rem}[dir=rtl] .mtx-alert-close{right:auto;left:0}.mtx-alert-dismissible{padding-right:3rem}\n"]
    }]
  }], () => [{
    type: ChangeDetectorRef
  }], {
    _hostClassList: [{
      type: HostBinding,
      args: ["class"]
    }],
    type: [{
      type: Input
    }],
    dismissible: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    elevation: [{
      type: Input
    }],
    closed: [{
      type: Output
    }]
  });
})();
var MtxAlertModule = class _MtxAlertModule {
  static {
    this.ɵfac = function MtxAlertModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxAlertModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _MtxAlertModule,
      imports: [CommonModule, MtxAlert],
      exports: [MtxAlert]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [CommonModule, MtxAlert]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxAlertModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, MtxAlert],
      exports: [MtxAlert]
    }]
  }], null, null);
})();
export {
  MtxAlert,
  MtxAlertModule
};
//# sourceMappingURL=@ng-matero_extensions_alert.js.map
