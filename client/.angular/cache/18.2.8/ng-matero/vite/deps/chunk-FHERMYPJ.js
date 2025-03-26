import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Directive,
  InjectionToken,
  RuntimeError,
  assertInInjectionContext,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  setClassMetadata,
  signal,
  untracked,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵstyleProp,
  ɵɵtemplate
} from "./chunk-57TCTXNO.js";
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  delay,
  finalize,
  of,
  switchMap,
  takeUntil,
  tap,
  timer
} from "./chunk-BONRK7YY.js";
import {
  __spreadValues
} from "./chunk-PEHFQLBM.js";

// node_modules/@angular/core/fesm2022/rxjs-interop.mjs
function takeUntilDestroyed(destroyRef) {
  if (!destroyRef) {
    assertInInjectionContext(takeUntilDestroyed);
    destroyRef = inject(DestroyRef);
  }
  const destroyed$ = new Observable((observer) => {
    const unregisterFn = destroyRef.onDestroy(observer.next.bind(observer));
    return unregisterFn;
  });
  return (source) => {
    return source.pipe(takeUntil(destroyed$));
  };
}
var OutputFromObservableRef = class {
  constructor(source) {
    this.source = source;
    this.destroyed = false;
    this.destroyRef = inject(DestroyRef);
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
    });
  }
  subscribe(callbackFn) {
    if (this.destroyed) {
      throw new RuntimeError(953, ngDevMode && "Unexpected subscription to destroyed `OutputRef`. The owning directive/component is destroyed.");
    }
    const subscription = this.source.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (value) => callbackFn(value)
    });
    return {
      unsubscribe: () => subscription.unsubscribe()
    };
  }
};
function outputFromObservable(observable, opts) {
  ngDevMode && assertInInjectionContext(outputFromObservable);
  return new OutputFromObservableRef(observable);
}

// node_modules/ngx-progressbar/fesm2022/ngx-progressbar.mjs
function NgProgressbar_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 3);
  }
}
function NgProgressbar_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 4);
    ɵɵelement(1, "div", 5);
    ɵɵelementEnd();
  }
}
var defaultOptions = {
  min: 8,
  max: 100,
  speed: 200,
  debounceTime: 0,
  trickleSpeed: 300,
  relative: false,
  flat: false,
  spinner: false,
  direction: "ltr+",
  spinnerPosition: "right",
  trickleFunc: (n) => {
    if (n >= 0 && n < 20) {
      return 10;
    }
    if (n >= 20 && n < 50) {
      return 4;
    }
    if (n >= 50 && n < 80) {
      return 2;
    }
    if (n >= 80 && n < 99) {
      return 0.5;
    }
    return 0;
  }
};
var NG_PROGRESS_OPTIONS = new InjectionToken("NG_PROGRESS_OPTIONS", {
  providedIn: "root",
  factory: () => defaultOptions
});
function provideNgProgressOptions(options) {
  return {
    provide: NG_PROGRESS_OPTIONS,
    useValue: __spreadValues(__spreadValues({}, defaultOptions), options)
  };
}
var TriggerType;
(function(TriggerType2) {
  TriggerType2["START"] = "START";
  TriggerType2["COMPLETE"] = "COMPLETE";
})(TriggerType || (TriggerType = {}));
var NgProgressRef = class _NgProgressRef {
  constructor() {
    this._config = signal(inject(NG_PROGRESS_OPTIONS));
    this._progress = signal(0);
    this._active = signal(false);
    this.active = computed(() => this._active());
    this.progress = computed(() => this._progress());
    this.config = computed(() => this._config());
    this._trigger = new BehaviorSubject(null);
    this._started = new Subject();
    this.started = this._started.asObservable();
    this._completed = new Subject();
    this.completed = this._completed.asObservable();
    let sub$;
    effect((onCleanup) => {
      const config = this.config();
      untracked(() => {
        sub$?.unsubscribe();
        sub$ = this._trigger.pipe(switchMap((trigger) => {
          if (trigger === TriggerType.START) {
            return timer(config.debounceTime).pipe(switchMap(() => this.onTrickling(config)));
          } else if (trigger === TriggerType.COMPLETE) {
            return this.onComplete(config);
          }
          return EMPTY;
        })).subscribe();
      });
      onCleanup(() => sub$?.unsubscribe());
    });
  }
  /**
   * Start the progress
   */
  start() {
    this._started.next();
    this._trigger.next(TriggerType.START);
    this._active.set(true);
  }
  /**
   * Complete the progress
   */
  complete() {
    this._trigger.next(TriggerType.COMPLETE);
  }
  /**
   * Increment the progress
   */
  inc(amount) {
    const n = this.progress();
    if (!this.active()) {
      this.start();
    } else {
      if (typeof amount !== "number") {
        amount = this.config().trickleFunc(n);
      }
      this.set(n + amount);
    }
  }
  /**
   * Set the progress
   */
  set(n) {
    this._active.set(true);
    this._progress.set(this.clamp(n));
  }
  /**
   * Set config
   */
  setConfig(config) {
    this._config.set(__spreadValues(__spreadValues({}, this.config()), config));
  }
  /**
   * Clamps a value to be between min and max
   */
  clamp(n) {
    return Math.max(this.config().min, Math.min(this.config().max, n));
  }
  /**
   * Keeps incrementing the progress
   */
  onTrickling(config) {
    if (!this.active()) {
      this.set(config.min);
    }
    return timer(0, config.trickleSpeed).pipe(tap(() => this.inc()));
  }
  /**
   * Completes then resets the progress
   */
  onComplete(config) {
    if (!this.active()) {
      return EMPTY;
    }
    this._completed.next();
    return of({}).pipe(
      // Complete the progress
      tap(() => this._progress.set(100)),
      // Deactivate the progress after a tiny delay
      delay(config.speed * 1.7),
      tap(() => this._active.set(false)),
      // Use a tiny delay before resetting
      delay(config.speed),
      // Force the progress to reset even it got cancelled
      finalize(() => this._progress.set(0)),
      // Cancel any of the finalizing delays if the progress has started again
      takeUntil(this._started)
    );
  }
  static {
    this.ɵfac = function NgProgressRef_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgProgressRef)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NgProgressRef,
      selectors: [["", "ngProgressRef", ""]],
      exportAs: ["ngProgressRef"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgProgressRef, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "[ngProgressRef]",
      exportAs: "ngProgressRef"
    }]
  }], () => [], null);
})();
var NgProgressbar = class _NgProgressbar {
  constructor() {
    this.config = inject(NG_PROGRESS_OPTIONS);
    this.progressRef = inject(NgProgressRef, {
      host: true,
      self: true
    });
    this.min = input(this.config.min, {
      transform: numberAttribute
    });
    this.max = input(this.config.max, {
      transform: numberAttribute
    });
    this.speed = input(this.config.speed, {
      transform: numberAttribute
    });
    this.trickleSpeed = input(this.config.trickleSpeed, {
      transform: numberAttribute
    });
    this.debounceTime = input(this.config.debounceTime, {
      transform: numberAttribute
    });
    this.flat = input(this.config.flat, {
      transform: booleanAttribute
    });
    this.spinner = input(this.config.spinner, {
      transform: booleanAttribute
    });
    this.relative = input(this.config.relative, {
      transform: booleanAttribute
    });
    this.trickleFunc = input(this.config.trickleFunc);
    this.spinnerPosition = input(this.config.spinnerPosition);
    this.direction = input(this.config.direction);
    this.progressTransform = computed(() => {
      return `translate3d(${this.progressRef.progress()}%,0,0)`;
    });
    this.started = outputFromObservable(this.progressRef.started);
    this.completed = outputFromObservable(this.progressRef.completed);
    effect(() => {
      const config = {
        max: this.max() > 0 && this.max() <= 100 ? this.max() : 100,
        min: this.min() < 100 && this.min() >= 0 ? this.min() : 0,
        speed: this.speed(),
        trickleSpeed: this.trickleSpeed(),
        trickleFunc: this.trickleFunc(),
        debounceTime: this.debounceTime()
      };
      untracked(() => this.progressRef.setConfig(config));
    });
  }
  start() {
    this.progressRef.start();
  }
  complete() {
    this.progressRef.complete();
  }
  inc(n) {
    this.progressRef.inc(n);
  }
  set(n) {
    this.progressRef.set(n);
  }
  static {
    this.ɵfac = function NgProgressbar_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgProgressbar)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgProgressbar,
      selectors: [["ng-progress"]],
      hostAttrs: ["role", "progressbar"],
      hostVars: 10,
      hostBindings: function NgProgressbar_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("spinnerPosition", ctx.spinnerPosition())("direction", ctx.direction());
          ɵɵstyleProp("--_ng-progress-speed", ctx.speed() + "ms");
          ɵɵclassProp("ng-progress-bar", true)("ng-progress-bar-active", ctx.progressRef.active())("ng-progress-bar-relative", ctx.relative());
        }
      },
      inputs: {
        min: [1, "min"],
        max: [1, "max"],
        speed: [1, "speed"],
        trickleSpeed: [1, "trickleSpeed"],
        debounceTime: [1, "debounceTime"],
        flat: [1, "flat"],
        spinner: [1, "spinner"],
        relative: [1, "relative"],
        trickleFunc: [1, "trickleFunc"],
        spinnerPosition: [1, "spinnerPosition"],
        direction: [1, "direction"]
      },
      outputs: {
        started: "started",
        completed: "completed"
      },
      exportAs: ["ngProgress"],
      standalone: true,
      features: [ɵɵProvidersFeature([NgProgressRef]), ɵɵStandaloneFeature],
      decls: 5,
      vars: 4,
      consts: [[1, "ng-progress-bar-wrapper"], [1, "ng-bar-placeholder"], [1, "ng-bar"], [1, "ng-meteor"], [1, "ng-spinner"], [1, "ng-spinner-icon"]],
      template: function NgProgressbar_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
          ɵɵtemplate(3, NgProgressbar_Conditional_3_Template, 1, 0, "div", 3);
          ɵɵelementEnd()();
          ɵɵtemplate(4, NgProgressbar_Conditional_4_Template, 2, 0, "div", 4);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵadvance(2);
          ɵɵstyleProp("transform", ctx.progressTransform());
          ɵɵadvance();
          ɵɵconditional(!ctx.flat() ? 3 : -1);
          ɵɵadvance();
          ɵɵconditional(ctx.spinner() ? 4 : -1);
        }
      },
      styles: ['[_nghost-%COMP%]{--_ng-progress-thickness: var(--ng-progress-thickness, 2);--_ng-progress-thickness-px: calc(var(--_ng-progress-thickness) * 1px);--_ng-progress-thickness-add-one: calc(var(--_ng-progress-thickness) + 1);--_ng-progress-meteor-position-px: calc(var(--_ng-progress-thickness-add-one) * -1px);--_ng-progress-color: var(--ng-progress-color, #1B95E0);--_ng-progress-holder-color: var(--ng-progress-holder-color, transparent);--_ng-progress-ease: var(--ng-progress-ease, linear);--_ng-progress-spinner-thickness: var(--ng-progress-spinner-thickness, 2);--_ng-progress-spinner-thickness-px: calc(var(--_ng-progress-spinner-thickness) * 1px);--_ng-progress-spinner-spacing: var(--ng-progress-spinner-spacing, 15);--_ng-progress-spinner-spacing-px: calc(var(--_ng-progress-spinner-spacing) * 1px);--_ng-progress-spinner-size: var(--ng-progress-spinner-size, 18);--_ng-progress-spinner-size-px: calc(var(--_ng-progress-spinner-size) * 1px);z-index:999999;pointer-events:none}.ng-progress-bar-active[_nghost-%COMP%]   .ng-progress-bar-wrapper[_ngcontent-%COMP%]{filter:alpha(opacity=100);opacity:1;transition:none}.ng-progress-bar-active[_nghost-%COMP%]   .ng-bar[_ngcontent-%COMP%]{transition:all var(--_ng-progress-speed) var(--_ng-progress-ease)}.ng-progress-bar-relative[_nghost-%COMP%]   .ng-progress-bar-wrapper[_ngcontent-%COMP%]{position:relative}[direction="ltr+"][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%], [direction=ltr-][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%]{rotate:calc(var(--_ng-progress-thickness-add-one) * 1deg)}[direction="ltr+"][_nghost-%COMP%]   .ng-bar[_ngcontent-%COMP%], [direction="rtl+"][_nghost-%COMP%]   .ng-bar[_ngcontent-%COMP%]{margin-left:-100%}[direction="ltr+"][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%], [direction="rtl+"][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%]{right:0}[direction="ltr+"][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%], [direction=rtl-][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%]{top:var(--_ng-progress-meteor-position-px)}[direction=ltr-][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%], [direction="rtl+"][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%]{bottom:var(--_ng-progress-meteor-position-px)}[direction=ltr-][_nghost-%COMP%]   .ng-bar-placeholder[_ngcontent-%COMP%], [direction="rtl+"][_nghost-%COMP%]   .ng-bar-placeholder[_ngcontent-%COMP%]{transform:rotate(180deg)}[direction=ltr-][_nghost-%COMP%]   .ng-spinner-icon[_ngcontent-%COMP%], [direction="rtl+"][_nghost-%COMP%]   .ng-spinner-icon[_ngcontent-%COMP%]{animation-direction:reverse}[direction="rtl+"][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%], [direction=rtl-][_nghost-%COMP%]   .ng-meteor[_ngcontent-%COMP%]{rotate:calc(var(--_ng-progress-thickness-add-one) * -1deg)}[_nghost-%COMP%]   .ng-spinner[_ngcontent-%COMP%]{top:var(--_ng-progress-spinner-spacing-px)}[spinnerPosition=left][_nghost-%COMP%]   .ng-spinner[_ngcontent-%COMP%]{left:var(--_ng-progress-spinner-spacing-px)}[spinnerPosition=right][_nghost-%COMP%]   .ng-spinner[_ngcontent-%COMP%]{right:var(--_ng-progress-spinner-spacing-px)}.ng-progress-bar-wrapper[_ngcontent-%COMP%]{position:fixed;z-index:999999;top:0;left:0;width:100%;transform:scale(1);filter:alpha(opacity=0);opacity:0;transition:opacity var(--_ng-progress-speed) var(--_ng-progress-ease)}.ng-bar-placeholder[_ngcontent-%COMP%]{position:absolute;height:var(--_ng-progress-thickness-px);width:100%}.ng-bar[_ngcontent-%COMP%]{width:100%;height:100%;transform:translate(-100%,0,0);background:var(--_ng-progress-color);transition:all var(--_ng-progress-speed) var(--_ng-progress-ease)}.ng-meteor[_ngcontent-%COMP%]{display:block;position:absolute;width:100px;height:100%;opacity:1;box-shadow:0 0 10px var(--_ng-progress-color),0 0 5px var(--_ng-progress-color)}.ng-spinner[_ngcontent-%COMP%]{position:absolute;display:block;z-index:1031;top:10px}.ng-spinner-icon[_ngcontent-%COMP%]{box-sizing:border-box;animation:_ngcontent-%COMP%_spinner-animation .25s linear infinite;border-style:solid;border-color:transparent;border-radius:50%;border-top-color:var(--_ng-progress-color);border-left-color:var(--_ng-progress-color);width:var(--_ng-progress-spinner-size-px);height:var(--_ng-progress-spinner-size-px);border-width:var(--_ng-progress-spinner-thickness-px)}@keyframes _ngcontent-%COMP%_spinner-animation{0%{transform:rotate(0)}to{transform:rotate(360deg)}}'],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgProgressbar, [{
    type: Component,
    args: [{
      standalone: true,
      selector: "ng-progress",
      exportAs: "ngProgress",
      host: {
        "role": "progressbar",
        "[class.ng-progress-bar]": "true",
        "[class.ng-progress-bar-active]": "progressRef.active()",
        "[class.ng-progress-bar-relative]": "relative()",
        "[attr.spinnerPosition]": "spinnerPosition()",
        "[attr.direction]": "direction()",
        "[style.--_ng-progress-speed]": 'this.speed() + "ms"'
      },
      template: `
    <div class="ng-progress-bar-wrapper">
      <div class="ng-bar-placeholder">
        <div class="ng-bar" [style.transform]="progressTransform()">
          @if (!flat()) {
            <div class="ng-meteor"></div>
          }
        </div>
      </div>
      @if (spinner()) {
        <div class="ng-spinner">
          <div class="ng-spinner-icon"></div>
        </div>
      }
    </div>
  `,
      providers: [NgProgressRef],
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: [':host{--_ng-progress-thickness: var(--ng-progress-thickness, 2);--_ng-progress-thickness-px: calc(var(--_ng-progress-thickness) * 1px);--_ng-progress-thickness-add-one: calc(var(--_ng-progress-thickness) + 1);--_ng-progress-meteor-position-px: calc(var(--_ng-progress-thickness-add-one) * -1px);--_ng-progress-color: var(--ng-progress-color, #1B95E0);--_ng-progress-holder-color: var(--ng-progress-holder-color, transparent);--_ng-progress-ease: var(--ng-progress-ease, linear);--_ng-progress-spinner-thickness: var(--ng-progress-spinner-thickness, 2);--_ng-progress-spinner-thickness-px: calc(var(--_ng-progress-spinner-thickness) * 1px);--_ng-progress-spinner-spacing: var(--ng-progress-spinner-spacing, 15);--_ng-progress-spinner-spacing-px: calc(var(--_ng-progress-spinner-spacing) * 1px);--_ng-progress-spinner-size: var(--ng-progress-spinner-size, 18);--_ng-progress-spinner-size-px: calc(var(--_ng-progress-spinner-size) * 1px);z-index:999999;pointer-events:none}:host.ng-progress-bar-active .ng-progress-bar-wrapper{filter:alpha(opacity=100);opacity:1;transition:none}:host.ng-progress-bar-active .ng-bar{transition:all var(--_ng-progress-speed) var(--_ng-progress-ease)}:host.ng-progress-bar-relative .ng-progress-bar-wrapper{position:relative}:host[direction="ltr+"] .ng-meteor,:host[direction=ltr-] .ng-meteor{rotate:calc(var(--_ng-progress-thickness-add-one) * 1deg)}:host[direction="ltr+"] .ng-bar,:host[direction="rtl+"] .ng-bar{margin-left:-100%}:host[direction="ltr+"] .ng-meteor,:host[direction="rtl+"] .ng-meteor{right:0}:host[direction="ltr+"] .ng-meteor,:host[direction=rtl-] .ng-meteor{top:var(--_ng-progress-meteor-position-px)}:host[direction=ltr-] .ng-meteor,:host[direction="rtl+"] .ng-meteor{bottom:var(--_ng-progress-meteor-position-px)}:host[direction=ltr-] .ng-bar-placeholder,:host[direction="rtl+"] .ng-bar-placeholder{transform:rotate(180deg)}:host[direction=ltr-] .ng-spinner-icon,:host[direction="rtl+"] .ng-spinner-icon{animation-direction:reverse}:host[direction="rtl+"] .ng-meteor,:host[direction=rtl-] .ng-meteor{rotate:calc(var(--_ng-progress-thickness-add-one) * -1deg)}:host .ng-spinner{top:var(--_ng-progress-spinner-spacing-px)}:host[spinnerPosition=left] .ng-spinner{left:var(--_ng-progress-spinner-spacing-px)}:host[spinnerPosition=right] .ng-spinner{right:var(--_ng-progress-spinner-spacing-px)}.ng-progress-bar-wrapper{position:fixed;z-index:999999;top:0;left:0;width:100%;transform:scale(1);filter:alpha(opacity=0);opacity:0;transition:opacity var(--_ng-progress-speed) var(--_ng-progress-ease)}.ng-bar-placeholder{position:absolute;height:var(--_ng-progress-thickness-px);width:100%}.ng-bar{width:100%;height:100%;transform:translate(-100%,0,0);background:var(--_ng-progress-color);transition:all var(--_ng-progress-speed) var(--_ng-progress-ease)}.ng-meteor{display:block;position:absolute;width:100px;height:100%;opacity:1;box-shadow:0 0 10px var(--_ng-progress-color),0 0 5px var(--_ng-progress-color)}.ng-spinner{position:absolute;display:block;z-index:1031;top:10px}.ng-spinner-icon{box-sizing:border-box;animation:spinner-animation .25s linear infinite;border-style:solid;border-color:transparent;border-radius:50%;border-top-color:var(--_ng-progress-color);border-left-color:var(--_ng-progress-color);width:var(--_ng-progress-spinner-size-px);height:var(--_ng-progress-spinner-size-px);border-width:var(--_ng-progress-spinner-thickness-px)}@keyframes spinner-animation{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n']
    }]
  }], () => [], null);
})();

export {
  NG_PROGRESS_OPTIONS,
  provideNgProgressOptions,
  NgProgressRef,
  NgProgressbar
};
/*! Bundled license information:

@angular/core/fesm2022/rxjs-interop.mjs:
  (**
   * @license Angular v18.2.8
   * (c) 2010-2024 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-FHERMYPJ.js.map
