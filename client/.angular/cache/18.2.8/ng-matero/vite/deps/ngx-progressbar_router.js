import {
  NgProgressRef
} from "./chunk-FHERMYPJ.js";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from "./chunk-4ZQV5WSJ.js";
import "./chunk-65H4I3RJ.js";
import "./chunk-6FVM5ZDU.js";
import "./chunk-R3EXXSPB.js";
import {
  Directive,
  InjectionToken,
  inject,
  setClassMetadata,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵdefineDirective,
  ɵɵgetInheritedFactory
} from "./chunk-57TCTXNO.js";
import "./chunk-O6VDDHVS.js";
import "./chunk-IXUSS67I.js";
import {
  delay,
  filter,
  of,
  switchMap,
  tap
} from "./chunk-BONRK7YY.js";
import {
  __spreadValues
} from "./chunk-PEHFQLBM.js";

// node_modules/ngx-progressbar/fesm2022/ngx-progressbar-router.mjs
var defaultRouterOptions = {
  minDuration: 0,
  startEvents: [NavigationStart],
  completeEvents: [NavigationEnd, NavigationCancel, NavigationError]
};
var NG_PROGRESS_ROUTER_OPTIONS = new InjectionToken("NG_PROGRESS_ROUTER_OPTIONS", {
  providedIn: "root",
  factory: () => defaultRouterOptions
});
function provideNgProgressRouter(options) {
  return {
    provide: NG_PROGRESS_ROUTER_OPTIONS,
    useValue: __spreadValues(__spreadValues({}, defaultRouterOptions), options)
  };
}
function eventExists(routerEvent, events) {
  return events.some((e) => routerEvent instanceof e);
}
var NgProgressRouterBase = class _NgProgressRouterBase {
  constructor() {
    this.router = inject(Router);
    this.progressRef = inject(NgProgressRef, {
      host: true,
      self: true
    });
    this.config = inject(NG_PROGRESS_ROUTER_OPTIONS);
  }
  ngOnInit() {
    const startProgress = of({}).pipe(tap(() => this.progressRef.start()));
    const completeProgress = of({}).pipe(delay(this.config.minDuration), tap(() => this.progressRef.complete()));
    const filterEvents = [...this.config.startEvents, ...this.config.completeEvents];
    this.subscription = this.router.events.pipe(filter((event) => eventExists(event, filterEvents)), switchMap((event) => eventExists(event, this.config.startEvents) ? startProgress : completeProgress)).subscribe();
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  static {
    this.ɵfac = function NgProgressRouterBase_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgProgressRouterBase)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NgProgressRouterBase
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgProgressRouterBase, [{
    type: Directive
  }], null, null);
})();
var NgProgressRouter = class _NgProgressRouter extends NgProgressRouterBase {
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵNgProgressRouter_BaseFactory;
      return function NgProgressRouter_Factory(__ngFactoryType__) {
        return (ɵNgProgressRouter_BaseFactory || (ɵNgProgressRouter_BaseFactory = ɵɵgetInheritedFactory(_NgProgressRouter)))(__ngFactoryType__ || _NgProgressRouter);
      };
    })();
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NgProgressRouter,
      selectors: [["ng-progress", "ngProgressRouter", ""]],
      standalone: true,
      features: [ɵɵInheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgProgressRouter, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "ng-progress[ngProgressRouter]"
    }]
  }], null, null);
})();
var NgProgressRouterRef = class _NgProgressRouterRef extends NgProgressRouterBase {
  static {
    this.ɵfac = /* @__PURE__ */ (() => {
      let ɵNgProgressRouterRef_BaseFactory;
      return function NgProgressRouterRef_Factory(__ngFactoryType__) {
        return (ɵNgProgressRouterRef_BaseFactory || (ɵNgProgressRouterRef_BaseFactory = ɵɵgetInheritedFactory(_NgProgressRouterRef)))(__ngFactoryType__ || _NgProgressRouterRef);
      };
    })();
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NgProgressRouterRef,
      selectors: [["", "ngProgressRouter", "", 5, "ng-progress"]],
      standalone: true,
      features: [ɵɵHostDirectivesFeature([NgProgressRef]), ɵɵInheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgProgressRouterRef, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "[ngProgressRouter]:not(ng-progress)",
      hostDirectives: [NgProgressRef]
    }]
  }], null, null);
})();
export {
  NG_PROGRESS_ROUTER_OPTIONS,
  NgProgressRouter,
  NgProgressRouterRef,
  provideNgProgressRouter
};
//# sourceMappingURL=ngx-progressbar_router.js.map
