import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-AA5G2VN5.js";
import {
  MatButtonModule
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
  Directive,
  ElementRef,
  Input,
  NgModule,
  Renderer2,
  ViewContainerRef,
  booleanAttribute,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject
} from "./chunk-57TCTXNO.js";
import "./chunk-O6VDDHVS.js";
import "./chunk-IXUSS67I.js";
import "./chunk-BONRK7YY.js";
import "./chunk-PEHFQLBM.js";

// node_modules/@ng-matero/extensions/fesm2022/mtxButton.mjs
var MatButtonLoading = class _MatButtonLoading {
  constructor(_elementRef, _viewContainerRef, _renderer) {
    this._elementRef = _elementRef;
    this._viewContainerRef = _viewContainerRef;
    this._renderer = _renderer;
    this.loading = false;
    this.disabled = false;
  }
  ngOnChanges(changes) {
    if (!changes.loading) {
      return;
    }
    if (changes.loading.currentValue) {
      this._elementRef.nativeElement.classList.add("mat-button-loading");
      setTimeout(() => this._elementRef.nativeElement.setAttribute("disabled", ""));
      this.createSpinner();
    } else if (!changes.loading.firstChange) {
      this._elementRef.nativeElement.classList.remove("mat-button-loading");
      setTimeout(() => this._elementRef.nativeElement.removeAttribute("disabled"));
      this.destroySpinner();
    }
  }
  createSpinner() {
    if (!this.spinner) {
      this.spinner = this._viewContainerRef.createComponent(MatProgressSpinner);
      this.spinner.instance.color = this.color;
      this.spinner.instance.diameter = 24;
      this.spinner.instance.mode = "indeterminate";
      this._renderer.appendChild(this._elementRef.nativeElement, this.spinner.instance._elementRef.nativeElement);
    }
  }
  destroySpinner() {
    if (this.spinner) {
      this.spinner.destroy();
      this.spinner = null;
    }
  }
  static {
    this.ɵfac = function MatButtonLoading_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatButtonLoading)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Renderer2));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _MatButtonLoading,
      selectors: [["", "mat-button", "", "loading", ""], ["", "mat-raised-button", "", "loading", ""], ["", "mat-stroked-button", "", "loading", ""], ["", "mat-flat-button", "", "loading", ""], ["", "mat-icon-button", "", "loading", ""], ["", "mat-fab", "", "loading", ""], ["", "mat-mini-fab", "", "loading", ""]],
      inputs: {
        loading: [2, "loading", "loading", booleanAttribute],
        disabled: [2, "disabled", "disabled", booleanAttribute],
        color: "color"
      },
      standalone: true,
      features: [ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButtonLoading, [{
    type: Directive,
    args: [{
      selector: `[mat-button][loading],
             [mat-raised-button][loading],
             [mat-stroked-button][loading],
             [mat-flat-button][loading],
             [mat-icon-button][loading],
             [mat-fab][loading],
             [mat-mini-fab][loading]`,
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: ViewContainerRef
  }, {
    type: Renderer2
  }], {
    loading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    color: [{
      type: Input
    }]
  });
})();
var MtxButtonModule = class _MtxButtonModule {
  static {
    this.ɵfac = function MtxButtonModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxButtonModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _MtxButtonModule,
      imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule, MatButtonLoading],
      exports: [MatButtonLoading]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxButtonModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule, MatButtonLoading],
      exports: [MatButtonLoading]
    }]
  }], null, null);
})();
export {
  MatButtonLoading,
  MtxButtonModule
};
//# sourceMappingURL=@ng-matero_extensions_button.js.map
