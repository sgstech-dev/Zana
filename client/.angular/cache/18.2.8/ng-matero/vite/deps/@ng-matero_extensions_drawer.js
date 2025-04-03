import {
  CdkDialogContainer,
  Dialog,
  DialogConfig,
  DialogModule
} from "./chunk-2MP7MOE4.js";
import {
  Overlay,
  OverlayRef
} from "./chunk-W4QSE2MO.js";
import {
  CdkPortalOutlet,
  PortalModule
} from "./chunk-RRYMOHQ3.js";
import {
  MatCommonModule
} from "./chunk-HBP6OA6Q.js";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "./chunk-IPQJSEC4.js";
import {
  ESCAPE,
  FocusMonitor,
  FocusTrapFactory,
  InteractivityChecker,
  hasModifierKey
} from "./chunk-U7VVEHQ6.js";
import "./chunk-5SQMXRTA.js";
import "./chunk-2NPGNF2M.js";
import "./chunk-X7CATLYX.js";
import "./chunk-SWKTGBAV.js";
import {
  coerceCssPixelValue
} from "./chunk-5DDL3Q73.js";
import {
  DOCUMENT
} from "./chunk-R3EXXSPB.js";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  NgModule,
  NgZone,
  Optional,
  SkipSelf,
  ViewChild,
  ViewEncapsulation$1,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵStandaloneFeature,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵhostProperty,
  ɵɵinject,
  ɵɵloadQuery,
  ɵɵqueryRefresh,
  ɵɵsyntheticHostListener,
  ɵɵsyntheticHostProperty,
  ɵɵtemplate,
  ɵɵviewQuery
} from "./chunk-57TCTXNO.js";
import {
  defer,
  merge
} from "./chunk-O6VDDHVS.js";
import "./chunk-IXUSS67I.js";
import {
  Subject,
  filter,
  startWith,
  take
} from "./chunk-BONRK7YY.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-PEHFQLBM.js";

// node_modules/@ng-matero/extensions/fesm2022/mtxDrawer.mjs
function MtxDrawerContainer_ng_template_0_Template(rf, ctx) {
}
var MtxDrawerConfig = class {
  constructor() {
    this.data = null;
    this.hasBackdrop = true;
    this.disableClose = false;
    this.ariaLabel = null;
    this.closeOnNavigation = true;
    this.autoFocus = "first-tabbable";
    this.restoreFocus = true;
    this.position = "right";
  }
};
var mtxDrawerAnimations = {
  /** Animation that shows and hides a drawer. */
  drawerState: trigger("state", [state("void, hidden", style({
    "box-shadow": "none",
    "visibility": "hidden"
  })), state("visible", style({
    transform: "none",
    visibility: "visible"
  })), transition("visible => void, visible => hidden", animate("400ms cubic-bezier(0.25, 0.8, 0.25, 1)")), transition("void => visible", animate("150ms cubic-bezier(0, 0, 0.2, 1)"))])
};
var MtxDrawerContainer = class _MtxDrawerContainer extends CdkDialogContainer {
  get _drawerPosition() {
    return `mtx-drawer-${this._config.position}`;
  }
  constructor(elementRef, focusTrapFactory, document, config, checker, ngZone, overlayRef, focusMonitor) {
    super(elementRef, focusTrapFactory, document, config, checker, ngZone, overlayRef, focusMonitor);
    this._animationState = "void";
    this._animationStateChanged = new EventEmitter();
    this._destroyed = false;
  }
  _contentAttached() {
    super._contentAttached();
    this.enter();
  }
  /** Begin animation of bottom sheet entrance into view. */
  enter() {
    if (!this._destroyed) {
      this._animationState = "visible";
      this._changeDetectorRef.markForCheck();
      this._changeDetectorRef.detectChanges();
    }
  }
  /** Begin animation of the bottom sheet exiting from view. */
  exit() {
    if (!this._destroyed) {
      this._animationState = "hidden";
      this._changeDetectorRef.markForCheck();
    }
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._destroyed = true;
  }
  _onAnimationDone(event) {
    if (event.toState === "visible") {
      this._trapFocus();
    }
    this._animationStateChanged.emit(event);
  }
  _onAnimationStart(event) {
    this._animationStateChanged.emit(event);
  }
  _captureInitialFocus() {
  }
  static {
    this.ɵfac = function MtxDrawerContainer_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxDrawerContainer)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(FocusTrapFactory), ɵɵdirectiveInject(DOCUMENT, 8), ɵɵdirectiveInject(MtxDrawerConfig), ɵɵdirectiveInject(InteractivityChecker), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(OverlayRef), ɵɵdirectiveInject(FocusMonitor));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MtxDrawerContainer,
      selectors: [["mtx-drawer-container"]],
      viewQuery: function MtxDrawerContainer_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(CdkPortalOutlet, 7);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._portalOutlet = _t.first);
        }
      },
      hostAttrs: ["tabindex", "-1", 1, "mtx-drawer-container"],
      hostVars: 7,
      hostBindings: function MtxDrawerContainer_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵsyntheticHostListener("@state.start", function MtxDrawerContainer_animation_state_start_HostBindingHandler($event) {
            return ctx._onAnimationStart($event);
          })("@state.done", function MtxDrawerContainer_animation_state_done_HostBindingHandler($event) {
            return ctx._onAnimationDone($event);
          });
        }
        if (rf & 2) {
          ɵɵhostProperty("id", ctx._config.id);
          ɵɵsyntheticHostProperty("@state", ctx._animationState);
          ɵɵattribute("role", ctx._config.role)("aria-modal", ctx._config.isModal)("aria-label", ctx._config.ariaLabel);
          ɵɵclassMap(ctx._drawerPosition);
        }
      },
      standalone: true,
      features: [ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
      decls: 1,
      vars: 0,
      consts: [["cdkPortalOutlet", ""]],
      template: function MtxDrawerContainer_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, MtxDrawerContainer_ng_template_0_Template, 0, 0, "ng-template", 0);
        }
      },
      dependencies: [CdkPortalOutlet],
      styles: [".mtx-drawer-container{display:block;width:100%;padding:8px 16px;overflow:auto;outline:0;box-sizing:border-box;background-color:var(--mtx-drawer-container-background-color, var(--mat-app-surface));color:var(--mtx-drawer-container-text-color, var(--mat-app-on-surface-variant));box-shadow:var(--mtx-drawer-container-elevation-shadow)}.cdk-high-contrast-active .mtx-drawer-container{outline:1px solid}.mtx-drawer-right{transform:translate(100%);border-top-left-radius:var(--mtx-drawer-container-shape, var(--mat-app-corner-large));border-bottom-left-radius:var(--mtx-drawer-container-shape, var(--mat-app-corner-large))}.mtx-drawer-left{transform:translate(-100%);border-top-right-radius:var(--mtx-drawer-container-shape, var(--mat-app-corner-large));border-bottom-right-radius:var(--mtx-drawer-container-shape, var(--mat-app-corner-large))}.mtx-drawer-bottom{transform:translateY(100%);border-top-left-radius:var(--mtx-drawer-container-shape, var(--mat-app-corner-large));border-top-right-radius:var(--mtx-drawer-container-shape, var(--mat-app-corner-large))}.mtx-drawer-top{transform:translateY(-100%);border-bottom-left-radius:var(--mtx-drawer-container-shape, var(--mat-app-corner-large));border-bottom-right-radius:var(--mtx-drawer-container-shape, var(--mat-app-corner-large))}\n"],
      encapsulation: 2,
      data: {
        animation: [mtxDrawerAnimations.drawerState]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxDrawerContainer, [{
    type: Component,
    args: [{
      selector: "mtx-drawer-container",
      changeDetection: ChangeDetectionStrategy.Default,
      encapsulation: ViewEncapsulation$1.None,
      animations: [mtxDrawerAnimations.drawerState],
      host: {
        "class": "mtx-drawer-container",
        "[class]": "_drawerPosition",
        "tabindex": "-1",
        "[id]": "_config.id",
        "[attr.role]": "_config.role",
        "[attr.aria-modal]": "_config.isModal",
        "[attr.aria-label]": "_config.ariaLabel",
        "[@state]": "_animationState",
        "(@state.start)": "_onAnimationStart($event)",
        "(@state.done)": "_onAnimationDone($event)"
      },
      standalone: true,
      imports: [CdkPortalOutlet],
      template: "<ng-template cdkPortalOutlet></ng-template>\n",
      styles: [".mtx-drawer-container{display:block;width:100%;padding:8px 16px;overflow:auto;outline:0;box-sizing:border-box;background-color:var(--mtx-drawer-container-background-color, var(--mat-app-surface));color:var(--mtx-drawer-container-text-color, var(--mat-app-on-surface-variant));box-shadow:var(--mtx-drawer-container-elevation-shadow)}.cdk-high-contrast-active .mtx-drawer-container{outline:1px solid}.mtx-drawer-right{transform:translate(100%);border-top-left-radius:var(--mtx-drawer-container-shape, var(--mat-app-corner-large));border-bottom-left-radius:var(--mtx-drawer-container-shape, var(--mat-app-corner-large))}.mtx-drawer-left{transform:translate(-100%);border-top-right-radius:var(--mtx-drawer-container-shape, var(--mat-app-corner-large));border-bottom-right-radius:var(--mtx-drawer-container-shape, var(--mat-app-corner-large))}.mtx-drawer-bottom{transform:translateY(100%);border-top-left-radius:var(--mtx-drawer-container-shape, var(--mat-app-corner-large));border-top-right-radius:var(--mtx-drawer-container-shape, var(--mat-app-corner-large))}.mtx-drawer-top{transform:translateY(-100%);border-bottom-left-radius:var(--mtx-drawer-container-shape, var(--mat-app-corner-large));border-bottom-right-radius:var(--mtx-drawer-container-shape, var(--mat-app-corner-large))}\n"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: FocusTrapFactory
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: MtxDrawerConfig
  }, {
    type: InteractivityChecker
  }, {
    type: NgZone
  }, {
    type: OverlayRef
  }, {
    type: FocusMonitor
  }], {
    _portalOutlet: [{
      type: ViewChild,
      args: [CdkPortalOutlet, {
        static: true
      }]
    }]
  });
})();
var MtxDrawerRef = class {
  /** Instance of the component making up the content of the drawer. */
  get instance() {
    return this._ref.componentInstance;
  }
  /**
   * `ComponentRef` of the component opened into the drawer. Will be
   * null when the drawer is opened using a `TemplateRef`.
   */
  get componentRef() {
    return this._ref.componentRef;
  }
  constructor(_ref, config, containerInstance) {
    this._ref = _ref;
    this._afterDismissed = new Subject();
    this._afterOpened = new Subject();
    this.containerInstance = containerInstance;
    this.disableClose = config.disableClose;
    this.id = _ref.id;
    containerInstance._animationStateChanged.pipe(filter((event) => event.phaseName === "done" && event.toState === "visible"), take(1)).subscribe(() => {
      this._afterOpened.next();
      this._afterOpened.complete();
    });
    containerInstance._animationStateChanged.pipe(filter((event) => event.phaseName === "done" && event.toState === "hidden"), take(1)).subscribe(() => {
      clearTimeout(this._closeFallbackTimeout);
      this._ref.close(this._result);
    });
    _ref.overlayRef.detachments().subscribe(() => {
      this._ref.close(this._result);
    });
    merge(this.backdropClick(), this.keydownEvents().pipe(filter((event) => event.keyCode === ESCAPE))).subscribe((event) => {
      if (!this.disableClose && (event.type !== "keydown" || !hasModifierKey(event))) {
        event.preventDefault();
        this.dismiss();
      }
    });
  }
  /**
   * Dismisses the drawer.
   * @param result Data to be passed back to the drawer opener.
   */
  dismiss(result) {
    if (this.containerInstance && !this._afterDismissed.closed) {
      this.containerInstance._animationStateChanged.pipe(filter((event) => event.phaseName === "start"), take(1)).subscribe((event) => {
        this._closeFallbackTimeout = setTimeout(() => {
          this._ref.close(this._result);
        }, event.totalTime + 100);
        this._ref.overlayRef.detachBackdrop();
      });
      this._result = result;
      this.containerInstance.exit();
      this.containerInstance = null;
    }
  }
  /** Gets an observable that is notified when the drawer is finished closing. */
  afterDismissed() {
    return this._ref.closed;
  }
  /** Gets an observable that is notified when the drawer has opened and appeared. */
  afterOpened() {
    return this._afterOpened;
  }
  /**
   * Gets an observable that emits when the overlay's backdrop has been clicked.
   */
  backdropClick() {
    return this._ref.backdropClick;
  }
  /**
   * Gets an observable that emits when keydown events are targeted on the overlay.
   */
  keydownEvents() {
    return this._ref.keydownEvents;
  }
};
var MTX_DRAWER_DATA = new InjectionToken("MtxDrawerData");
var MTX_DRAWER_DEFAULT_OPTIONS = new InjectionToken("mtx-drawer-default-options");
var uniqueId = 0;
var MtxDrawer = class _MtxDrawer {
  /** Keeps track of the currently-open dialogs. */
  get openDrawers() {
    return this._parentDrawer ? this._parentDrawer.openDrawers : this._openDrawersAtThisLevel;
  }
  /** Stream that emits when a drawer has been opened. */
  get afterOpened() {
    return this._parentDrawer ? this._parentDrawer.afterOpened : this._afterOpenedAtThisLevel;
  }
  _getAfterAllDismissed() {
    const parent = this._parentDrawer;
    return parent ? parent._getAfterAllDismissed() : this._afterAllDismissedAtThisLevel;
  }
  constructor(_overlay, injector, _parentDrawer, _defaultOptions) {
    this._overlay = _overlay;
    this._parentDrawer = _parentDrawer;
    this._defaultOptions = _defaultOptions;
    this._openDrawersAtThisLevel = [];
    this._afterAllDismissedAtThisLevel = new Subject();
    this._afterOpenedAtThisLevel = new Subject();
    this.afterAllDismissed = defer(() => this.openDrawers.length ? this._getAfterAllDismissed() : this._getAfterAllDismissed().pipe(startWith(void 0)));
    this._dialog = injector.get(Dialog);
  }
  open(componentOrTemplateRef, config) {
    let drawerRef;
    const _config = __spreadValues(__spreadValues({}, this._defaultOptions || new MtxDrawerConfig()), config);
    _config.id = _config.id || `mtx-drawer-${uniqueId++}`;
    _config.width = _config.position === "left" || _config.position === "right" ? coerceCssPixelValue(_config.width) : "100vw";
    _config.height = _config.position === "top" || _config.position === "bottom" ? coerceCssPixelValue(_config.height) : "100vh";
    this._dialog.open(componentOrTemplateRef, __spreadProps(__spreadValues({}, _config), {
      // Disable closing since we need to sync it up to the animation ourselves.
      disableClose: true,
      // Disable closing on detachments so that we can sync up the animation.
      closeOnOverlayDetachments: false,
      container: {
        type: MtxDrawerContainer,
        providers: () => [
          // Provide our config as the CDK config as well since it has the same interface as the
          // CDK one, but it contains the actual values passed in by the user for things like
          // `disableClose` which we disable for the CDK dialog since we handle it ourselves.
          {
            provide: MtxDrawerConfig,
            useValue: _config
          },
          {
            provide: DialogConfig,
            useValue: _config
          }
        ]
      },
      scrollStrategy: _config.scrollStrategy || this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay.position().global()[_config.position]("0"),
      templateContext: () => ({
        drawerRef
      }),
      providers: (cdkRef, _cdkConfig, container) => {
        drawerRef = new MtxDrawerRef(cdkRef, _config, container);
        return [{
          provide: MtxDrawerRef,
          useValue: drawerRef
        }, {
          provide: MTX_DRAWER_DATA,
          useValue: _config.data
        }];
      }
    }));
    this.openDrawers.push(drawerRef);
    this.afterOpened.next(drawerRef);
    drawerRef.afterDismissed().subscribe(() => {
      const index = this.openDrawers.indexOf(drawerRef);
      if (index > -1) {
        this.openDrawers.splice(index, 1);
        if (!this.openDrawers.length) {
          this._getAfterAllDismissed().next();
        }
      }
    });
    return drawerRef;
  }
  /**
   * Dismisses all of the currently-open drawers.
   */
  dismissAll() {
    this._dismissDrawers(this.openDrawers);
  }
  /**
   * Finds an open drawer by its id.
   * @param id ID to use when looking up the drawer.
   */
  getDrawerById(id) {
    return this.openDrawers.find((drawer) => drawer.id === id);
  }
  ngOnDestroy() {
    this._dismissDrawers(this._openDrawersAtThisLevel);
    this._afterAllDismissedAtThisLevel.complete();
    this._afterOpenedAtThisLevel.complete();
  }
  _dismissDrawers(drawers) {
    let i = drawers.length;
    while (i--) {
      drawers[i].dismiss();
    }
  }
  static {
    this.ɵfac = function MtxDrawer_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxDrawer)(ɵɵinject(Overlay), ɵɵinject(Injector), ɵɵinject(_MtxDrawer, 12), ɵɵinject(MTX_DRAWER_DEFAULT_OPTIONS, 8));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _MtxDrawer,
      factory: _MtxDrawer.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxDrawer, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: Overlay
  }, {
    type: Injector
  }, {
    type: MtxDrawer,
    decorators: [{
      type: Optional
    }, {
      type: SkipSelf
    }]
  }, {
    type: MtxDrawerConfig,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MTX_DRAWER_DEFAULT_OPTIONS]
    }]
  }], null);
})();
var MtxDrawerModule = class _MtxDrawerModule {
  static {
    this.ɵfac = function MtxDrawerModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxDrawerModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _MtxDrawerModule,
      imports: [DialogModule, PortalModule, MatCommonModule, MtxDrawerContainer],
      exports: [MtxDrawerContainer, MatCommonModule]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [MtxDrawer],
      imports: [DialogModule, PortalModule, MatCommonModule, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxDrawerModule, [{
    type: NgModule,
    args: [{
      imports: [DialogModule, PortalModule, MatCommonModule, MtxDrawerContainer],
      exports: [MtxDrawerContainer, MatCommonModule],
      providers: [MtxDrawer]
    }]
  }], null, null);
})();
export {
  MTX_DRAWER_DATA,
  MTX_DRAWER_DEFAULT_OPTIONS,
  MtxDrawer,
  MtxDrawerConfig,
  MtxDrawerContainer,
  MtxDrawerModule,
  MtxDrawerRef,
  mtxDrawerAnimations
};
//# sourceMappingURL=@ng-matero_extensions_drawer.js.map
