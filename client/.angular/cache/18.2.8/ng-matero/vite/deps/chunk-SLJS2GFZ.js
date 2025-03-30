import {
  MtxPipesModule,
  MtxToObservablePipe
} from "./chunk-VMQW4LMA.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-BJ333ND4.js";
import {
  MatButton,
  MatButtonModule,
  MatFabButton,
  MatIconButton,
  MatMiniFabButton
} from "./chunk-O3D5ZRSY.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from "./chunk-WKXLXFNL.js";
import {
  AsyncPipe,
  CommonModule
} from "./chunk-R3EXXSPB.js";
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injectable,
  NgModule,
  ViewEncapsulation$1,
  setClassMetadata,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-57TCTXNO.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-PEHFQLBM.js";

// node_modules/@ng-matero/extensions/fesm2022/mtxDialog.mjs
function MtxDialogContainer_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 4);
    ɵɵlistener("click", function MtxDialogContainer_Conditional_0_Conditional_5_Template_button_click_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1._onClose());
    });
    ɵɵelementStart(1, "mat-icon");
    ɵɵtext(2, "close");
    ɵɵelementEnd()();
  }
}
function MtxDialogContainer_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "h1", 0)(1, "span");
    ɵɵtext(2);
    ɵɵpipe(3, "toObservable");
    ɵɵpipe(4, "async");
    ɵɵelementEnd();
    ɵɵtemplate(5, MtxDialogContainer_Conditional_0_Conditional_5_Template, 3, 0, "button", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 4, ɵɵpipeBind1(3, 2, ctx_r1.data.title)));
    ɵɵadvance(3);
    ɵɵconditional(ctx_r1.data.showCloseIcon ? 5 : -1);
  }
}
function MtxDialogContainer_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 1)(1, "p");
    ɵɵtext(2);
    ɵɵpipe(3, "toObservable");
    ɵɵpipe(4, "async");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 3, ɵɵpipeBind1(3, 1, ctx_r1.data.description)));
  }
}
function MtxDialogContainer_For_4_Case_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 7);
    ɵɵlistener("click", function MtxDialogContainer_For_4_Case_0_Conditional_0_Template_button_click_0_listener() {
      ɵɵrestoreView(_r3);
      const btn_r4 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._onClick(btn_r4.onClick));
    });
    ɵɵtext(1);
    ɵɵpipe(2, "toObservable");
    ɵɵpipe(3, "async");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const btn_r4 = ɵɵnextContext(2).$implicit;
    ɵɵclassMap(btn_r4.class);
    ɵɵproperty("color", btn_r4.color);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(3, 6, ɵɵpipeBind1(2, 4, btn_r4.text)), " ");
  }
}
function MtxDialogContainer_For_4_Case_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 8);
    ɵɵlistener("click", function MtxDialogContainer_For_4_Case_0_Conditional_1_Template_button_click_0_listener() {
      ɵɵrestoreView(_r5);
      const btn_r4 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._onClick(btn_r4.onClick));
    });
    ɵɵtext(1);
    ɵɵpipe(2, "toObservable");
    ɵɵpipe(3, "async");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const btn_r4 = ɵɵnextContext(2).$implicit;
    ɵɵclassMap(btn_r4.class);
    ɵɵproperty("color", btn_r4.color);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(3, 6, ɵɵpipeBind1(2, 4, btn_r4.text)), " ");
  }
}
function MtxDialogContainer_For_4_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MtxDialogContainer_For_4_Case_0_Conditional_0_Template, 4, 8, "button", 5)(1, MtxDialogContainer_For_4_Case_0_Conditional_1_Template, 4, 8, "button", 6);
  }
  if (rf & 2) {
    const btn_r4 = ɵɵnextContext().$implicit;
    ɵɵconditional(btn_r4.focusInitial ? 0 : 1);
  }
}
function MtxDialogContainer_For_4_Case_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 11);
    ɵɵlistener("click", function MtxDialogContainer_For_4_Case_1_Conditional_0_Template_button_click_0_listener() {
      ɵɵrestoreView(_r6);
      const btn_r4 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._onClick(btn_r4.onClick));
    });
    ɵɵtext(1);
    ɵɵpipe(2, "toObservable");
    ɵɵpipe(3, "async");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const btn_r4 = ɵɵnextContext(2).$implicit;
    ɵɵclassMap(btn_r4.class);
    ɵɵproperty("color", btn_r4.color);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(3, 6, ɵɵpipeBind1(2, 4, btn_r4.text)), " ");
  }
}
function MtxDialogContainer_For_4_Case_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 12);
    ɵɵlistener("click", function MtxDialogContainer_For_4_Case_1_Conditional_1_Template_button_click_0_listener() {
      ɵɵrestoreView(_r7);
      const btn_r4 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._onClick(btn_r4.onClick));
    });
    ɵɵtext(1);
    ɵɵpipe(2, "toObservable");
    ɵɵpipe(3, "async");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const btn_r4 = ɵɵnextContext(2).$implicit;
    ɵɵclassMap(btn_r4.class);
    ɵɵproperty("color", btn_r4.color);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(3, 6, ɵɵpipeBind1(2, 4, btn_r4.text)), " ");
  }
}
function MtxDialogContainer_For_4_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MtxDialogContainer_For_4_Case_1_Conditional_0_Template, 4, 8, "button", 9)(1, MtxDialogContainer_For_4_Case_1_Conditional_1_Template, 4, 8, "button", 10);
  }
  if (rf & 2) {
    const btn_r4 = ɵɵnextContext().$implicit;
    ɵɵconditional(btn_r4.focusInitial ? 0 : 1);
  }
}
function MtxDialogContainer_For_4_Case_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 15);
    ɵɵlistener("click", function MtxDialogContainer_For_4_Case_2_Conditional_0_Template_button_click_0_listener() {
      ɵɵrestoreView(_r8);
      const btn_r4 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._onClick(btn_r4.onClick));
    });
    ɵɵtext(1);
    ɵɵpipe(2, "toObservable");
    ɵɵpipe(3, "async");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const btn_r4 = ɵɵnextContext(2).$implicit;
    ɵɵclassMap(btn_r4.class);
    ɵɵproperty("color", btn_r4.color);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(3, 6, ɵɵpipeBind1(2, 4, btn_r4.text)), " ");
  }
}
function MtxDialogContainer_For_4_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 16);
    ɵɵlistener("click", function MtxDialogContainer_For_4_Case_2_Conditional_1_Template_button_click_0_listener() {
      ɵɵrestoreView(_r9);
      const btn_r4 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._onClick(btn_r4.onClick));
    });
    ɵɵtext(1);
    ɵɵpipe(2, "toObservable");
    ɵɵpipe(3, "async");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const btn_r4 = ɵɵnextContext(2).$implicit;
    ɵɵclassMap(btn_r4.class);
    ɵɵproperty("color", btn_r4.color);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(3, 6, ɵɵpipeBind1(2, 4, btn_r4.text)), " ");
  }
}
function MtxDialogContainer_For_4_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MtxDialogContainer_For_4_Case_2_Conditional_0_Template, 4, 8, "button", 13)(1, MtxDialogContainer_For_4_Case_2_Conditional_1_Template, 4, 8, "button", 14);
  }
  if (rf & 2) {
    const btn_r4 = ɵɵnextContext().$implicit;
    ɵɵconditional(btn_r4.focusInitial ? 0 : 1);
  }
}
function MtxDialogContainer_For_4_Case_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 19);
    ɵɵlistener("click", function MtxDialogContainer_For_4_Case_3_Conditional_0_Template_button_click_0_listener() {
      ɵɵrestoreView(_r10);
      const btn_r4 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._onClick(btn_r4.onClick));
    });
    ɵɵtext(1);
    ɵɵpipe(2, "toObservable");
    ɵɵpipe(3, "async");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const btn_r4 = ɵɵnextContext(2).$implicit;
    ɵɵclassMap(btn_r4.class);
    ɵɵproperty("color", btn_r4.color);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(3, 6, ɵɵpipeBind1(2, 4, btn_r4.text)), " ");
  }
}
function MtxDialogContainer_For_4_Case_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 20);
    ɵɵlistener("click", function MtxDialogContainer_For_4_Case_3_Conditional_1_Template_button_click_0_listener() {
      ɵɵrestoreView(_r11);
      const btn_r4 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._onClick(btn_r4.onClick));
    });
    ɵɵtext(1);
    ɵɵpipe(2, "toObservable");
    ɵɵpipe(3, "async");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const btn_r4 = ɵɵnextContext(2).$implicit;
    ɵɵclassMap(btn_r4.class);
    ɵɵproperty("color", btn_r4.color);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(3, 6, ɵɵpipeBind1(2, 4, btn_r4.text)), " ");
  }
}
function MtxDialogContainer_For_4_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MtxDialogContainer_For_4_Case_3_Conditional_0_Template, 4, 8, "button", 17)(1, MtxDialogContainer_For_4_Case_3_Conditional_1_Template, 4, 8, "button", 18);
  }
  if (rf & 2) {
    const btn_r4 = ɵɵnextContext().$implicit;
    ɵɵconditional(btn_r4.focusInitial ? 0 : 1);
  }
}
function MtxDialogContainer_For_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MtxDialogContainer_For_4_Case_0_Template, 2, 1)(1, MtxDialogContainer_For_4_Case_1_Template, 2, 1)(2, MtxDialogContainer_For_4_Case_2_Template, 2, 1)(3, MtxDialogContainer_For_4_Case_3_Template, 2, 1);
  }
  if (rf & 2) {
    let tmp_10_0;
    const btn_r4 = ctx.$implicit;
    ɵɵconditional((tmp_10_0 = btn_r4.type) === "raised" ? 0 : tmp_10_0 === "stroked" ? 1 : tmp_10_0 === "flat" ? 2 : 3);
  }
}
var MtxDialogContainer = class _MtxDialogContainer {
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
  }
  _onClick(fn) {
    if (fn) {
      fn.call(this);
    }
    this._onClose();
  }
  _onClose() {
    this.dialogRef.close();
  }
  static {
    this.ɵfac = function MtxDialogContainer_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxDialogContainer)(ɵɵdirectiveInject(MatDialogRef), ɵɵdirectiveInject(MAT_DIALOG_DATA));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _MtxDialogContainer,
      selectors: [["mtx-dialog-container"]],
      hostAttrs: [1, "mtx-dialog-container"],
      exportAs: ["mtxDialogContainer"],
      standalone: true,
      features: [ɵɵStandaloneFeature],
      decls: 5,
      vars: 2,
      consts: [[1, "mtx-dialog-title"], [1, "mtx-dialog-content"], [1, "mtx-dialog-actions"], ["mat-icon-button", ""], ["mat-icon-button", "", 3, "click"], ["mat-raised-button", "", "cdkFocusInitial", "", 3, "color", "class"], ["mat-raised-button", "", 3, "color", "class"], ["mat-raised-button", "", "cdkFocusInitial", "", 3, "click", "color"], ["mat-raised-button", "", 3, "click", "color"], ["mat-stroked-button", "", "cdkFocusInitial", "", 3, "color", "class"], ["mat-stroked-button", "", 3, "color", "class"], ["mat-stroked-button", "", "cdkFocusInitial", "", 3, "click", "color"], ["mat-stroked-button", "", 3, "click", "color"], ["mat-flat-button", "", "cdkFocusInitial", "", 3, "color", "class"], ["mat-flat-button", "", 3, "color", "class"], ["mat-flat-button", "", "cdkFocusInitial", "", 3, "click", "color"], ["mat-flat-button", "", 3, "click", "color"], ["mat-button", "", "cdkFocusInitial", "", 3, "color", "class"], ["mat-button", "", 3, "color", "class"], ["mat-button", "", "cdkFocusInitial", "", 3, "click", "color"], ["mat-button", "", 3, "click", "color"]],
      template: function MtxDialogContainer_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, MtxDialogContainer_Conditional_0_Template, 6, 6, "h1", 0)(1, MtxDialogContainer_Conditional_1_Template, 5, 5, "div", 1);
          ɵɵelementStart(2, "div", 2);
          ɵɵrepeaterCreate(3, MtxDialogContainer_For_4_Template, 4, 1, null, null, ɵɵrepeaterTrackByIdentity);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵconditional(ctx.data.title ? 0 : -1);
          ɵɵadvance();
          ɵɵconditional(ctx.data.description ? 1 : -1);
          ɵɵadvance(2);
          ɵɵrepeater(ctx.data.buttons);
        }
      },
      dependencies: [AsyncPipe, MatButton, MatIconButton, MatIcon, MtxToObservablePipe],
      styles: [".mtx-dialog-title{display:flex;justify-content:space-between;align-items:center;padding:8px 24px;margin:0;line-height:48px;font-weight:500;font-size:20px}.mtx-dialog-title .mat-mdc-button-base{margin-right:-16px}[dir=rtl] .mtx-dialog-title .mat-mdc-button-base{margin-right:0;margin-left:-16px}.mtx-dialog-content{display:block;max-height:65vh;padding:0 24px;overflow:auto;-webkit-overflow-scrolling:touch}.mtx-dialog-content p{margin-top:0}.mtx-dialog-actions{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;padding:8px}.mtx-dialog-actions .mat-mdc-button-base{margin-left:8px}[dir=rtl] .mtx-dialog-actions .mat-mdc-button-base{margin-left:0;margin-right:8px}\n"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxDialogContainer, [{
    type: Component,
    args: [{
      selector: "mtx-dialog-container",
      exportAs: "mtxDialogContainer",
      host: {
        class: "mtx-dialog-container"
      },
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [AsyncPipe, MatButton, MatIconButton, MatFabButton, MatMiniFabButton, MatIcon, MtxToObservablePipe],
      template: `@if (data.title) {
  <h1 class="mtx-dialog-title">
    <span>{{data.title | toObservable | async}}</span>
    @if (data.showCloseIcon) {
      <button mat-icon-button (click)="_onClose()">
        <mat-icon>close</mat-icon>
      </button>
    }
  </h1>
}
@if (data.description) {
  <div class="mtx-dialog-content">
    <p>{{data.description | toObservable | async}}</p>
  </div>
}
<div class="mtx-dialog-actions">
  @for (btn of data.buttons; track btn) {
    @switch (btn.type) {
      @case ('raised') {
        @if (btn.focusInitial) {
          <button mat-raised-button cdkFocusInitial
            [color]="btn.color" [class]="btn.class" (click)="_onClick(btn.onClick!)">
            {{btn.text | toObservable | async}}
          </button>
        } @else {
          <button mat-raised-button
            [color]="btn.color" [class]="btn.class" (click)="_onClick(btn.onClick!)">
            {{btn.text | toObservable | async}}
          </button>
        }
      }
      @case ('stroked') {
        @if (btn.focusInitial) {
          <button mat-stroked-button cdkFocusInitial
            [color]="btn.color" [class]="btn.class" (click)="_onClick(btn.onClick!)">
            {{btn.text | toObservable | async}}
          </button>
        } @else {
          <button mat-stroked-button
            [color]="btn.color" [class]="btn.class" (click)="_onClick(btn.onClick!)">
            {{btn.text | toObservable | async}}
          </button>
        }
      }
      @case ('flat') {
        @if (btn.focusInitial) {
          <button mat-flat-button cdkFocusInitial
            [color]="btn.color" [class]="btn.class" (click)="_onClick(btn.onClick!)">
            {{btn.text | toObservable | async}}
          </button>
        } @else {
          <button mat-flat-button
            [color]="btn.color" [class]="btn.class" (click)="_onClick(btn.onClick!)">
            {{btn.text | toObservable | async}}
          </button>
        }
      }
      @default {
        @if (btn.focusInitial) {
          <button mat-button cdkFocusInitial
            [color]="btn.color" [class]="btn.class" (click)="_onClick(btn.onClick!)">
            {{btn.text | toObservable | async}}
          </button>
        } @else {
          <button mat-button
            [color]="btn.color" [class]="btn.class" (click)="_onClick(btn.onClick!)">
            {{btn.text | toObservable | async}}
          </button>
        }
      }
    }
  }
</div>
`,
      styles: [".mtx-dialog-title{display:flex;justify-content:space-between;align-items:center;padding:8px 24px;margin:0;line-height:48px;font-weight:500;font-size:20px}.mtx-dialog-title .mat-mdc-button-base{margin-right:-16px}[dir=rtl] .mtx-dialog-title .mat-mdc-button-base{margin-right:0;margin-left:-16px}.mtx-dialog-content{display:block;max-height:65vh;padding:0 24px;overflow:auto;-webkit-overflow-scrolling:touch}.mtx-dialog-content p{margin-top:0}.mtx-dialog-actions{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;padding:8px}.mtx-dialog-actions .mat-mdc-button-base{margin-left:8px}[dir=rtl] .mtx-dialog-actions .mat-mdc-button-base{margin-left:0;margin-right:8px}\n"]
    }]
  }], () => [{
    type: MatDialogRef
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MAT_DIALOG_DATA]
    }]
  }], null);
})();
var defaults = {
  title: "",
  description: "",
  buttons: [{
    color: "warn",
    text: "OK",
    focusInitial: true,
    onClick: () => {
    }
  }, {
    text: "CLOSE",
    onClick: () => {
    }
  }],
  showCloseIcon: false,
  disableClose: true,
  width: "300px"
};
var MtxDialog = class _MtxDialog {
  constructor(dialog) {
    this.dialog = dialog;
  }
  originalOpen(componentOrTemplateRef = MtxDialogContainer, config) {
    return this.dialog.open(componentOrTemplateRef, config);
  }
  open(config, componentOrTemplateRef = MtxDialogContainer) {
    const data = Object.assign({}, defaults, config);
    return this.dialog.open(componentOrTemplateRef, __spreadProps(__spreadValues({}, data), {
      data
    }));
  }
  alert(title, description = "", onOk = () => {
  }) {
    this.open({
      title,
      description,
      buttons: [{
        color: "warn",
        text: "OK",
        onClick: () => onOk()
      }]
    });
  }
  confirm(title, description = "", onOk = () => {
  }, onClose = () => {
  }) {
    this.open({
      title,
      description,
      buttons: [{
        color: "warn",
        text: "OK",
        onClick: () => onOk()
      }, {
        text: "CLOSE",
        onClick: () => onClose()
      }]
    });
  }
  static {
    this.ɵfac = function MtxDialog_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxDialog)(ɵɵinject(MatDialog));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _MtxDialog,
      factory: _MtxDialog.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxDialog, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: MatDialog
  }], null);
})();
var MtxDialogModule = class _MtxDialogModule {
  static {
    this.ɵfac = function MtxDialogModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MtxDialogModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _MtxDialogModule,
      imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MtxPipesModule, MtxDialogContainer],
      exports: [MtxDialogContainer]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      providers: [MtxDialog],
      imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MtxPipesModule, MtxDialogContainer]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxDialogModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MtxPipesModule, MtxDialogContainer],
      exports: [MtxDialogContainer],
      providers: [MtxDialog]
    }]
  }], null, null);
})();

export {
  MtxDialogContainer,
  MtxDialog,
  MtxDialogModule
};
//# sourceMappingURL=chunk-SLJS2GFZ.js.map
