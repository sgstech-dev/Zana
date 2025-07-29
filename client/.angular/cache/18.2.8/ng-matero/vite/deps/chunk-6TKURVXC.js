import {
  FieldType,
  FieldWrapper,
  FormlyModule,
  FormlyValidationMessage,
  defineHiddenProp,
  observe
} from "./chunk-MFCAW62I.js";
import {
  MatError,
  MatFormField,
  MatFormFieldControl,
  MatFormFieldModule,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix
} from "./chunk-GJ36CECM.js";
import {
  ReactiveFormsModule
} from "./chunk-5C5M6BN6.js";
import {
  FocusMonitor
} from "./chunk-U7VVEHQ6.js";
import {
  CommonModule,
  NgIf,
  NgTemplateOutlet
} from "./chunk-R3EXXSPB.js";
import {
  Component,
  Directive,
  ElementRef,
  NO_ERRORS_SCHEMA,
  NgModule,
  Renderer2,
  Type,
  ViewChild,
  ViewChildren,
  ViewEncapsulation$1,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetInheritedFactory,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-57TCTXNO.js";
import {
  Subject
} from "./chunk-BONRK7YY.js";

// node_modules/@ngx-formly/material/fesm2020/ngx-formly-material-form-field.mjs
var _c0 = (a0) => ({
  field: a0
});
var _c1 = (a0) => ({
  content: a0
});
function FormlyWrapperFormField_mat_label_3_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 12);
    ɵɵtext(1, "*");
    ɵɵelementEnd();
  }
}
function FormlyWrapperFormField_mat_label_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-label");
    ɵɵtext(1);
    ɵɵtemplate(2, FormlyWrapperFormField_mat_label_3_span_2_Template, 2, 0, "span", 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.props.label, " ");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.props.required && ctx_r0.props.hideRequiredMarker !== true);
  }
}
function FormlyWrapperFormField_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0, 13);
    ɵɵelementContainer(1, 14);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.props.textPrefix)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c0, ctx_r0.field));
  }
}
function FormlyWrapperFormField_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0, 15);
    ɵɵelementContainer(1, 14);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.props.prefix)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c0, ctx_r0.field));
  }
}
function FormlyWrapperFormField_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0, 16);
    ɵɵelementContainer(1, 14);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.props.textSuffix)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c0, ctx_r0.field));
  }
}
function FormlyWrapperFormField_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0, 17);
    ɵɵelementContainer(1, 14);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.props.suffix)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c0, ctx_r0.field));
  }
}
function FormlyWrapperFormField_mat_hint_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-hint");
    ɵɵelementContainer(1, 14);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const hint_r2 = ctx.ngIf;
    ɵɵnextContext();
    const stringOrTemplate_r3 = ɵɵreference(13);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", stringOrTemplate_r3)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c1, hint_r2));
  }
}
function FormlyWrapperFormField_mat_hint_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-hint", 18);
    ɵɵelementContainer(1, 14);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const hintEnd_r4 = ctx.ngIf;
    ɵɵnextContext();
    const stringOrTemplate_r3 = ɵɵreference(13);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", stringOrTemplate_r3)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c1, hintEnd_r4));
  }
}
function FormlyWrapperFormField_ng_template_12_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const content_r5 = ɵɵnextContext().content;
    ɵɵadvance();
    ɵɵtextInterpolate(content_r5);
  }
}
function FormlyWrapperFormField_ng_template_12_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, 14);
  }
  if (rf & 2) {
    const content_r5 = ɵɵnextContext().content;
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", content_r5)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c0, ctx_r0.field));
  }
}
function FormlyWrapperFormField_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, FormlyWrapperFormField_ng_template_12_ng_container_0_Template, 2, 1, "ng-container", 19)(1, FormlyWrapperFormField_ng_template_12_ng_template_1_Template, 1, 4, "ng-template", null, 2, ɵɵtemplateRefExtractor);
  }
  if (rf & 2) {
    const content_r5 = ctx.content;
    const template_r6 = ɵɵreference(2);
    ɵɵproperty("ngIf", !content_r5.createEmbeddedView)("ngIfElse", template_r6);
  }
}
var _c2 = ["matPrefix"];
var _c3 = ["matTextPrefix"];
var _c4 = ["matSuffix"];
var _c5 = ["matTextSuffix"];
var FormlyWrapperFormField = class extends FieldWrapper {
  constructor(renderer, elementRef, focusMonitor) {
    super();
    this.renderer = renderer;
    this.elementRef = elementRef;
    this.focusMonitor = focusMonitor;
  }
  ngOnInit() {
    defineHiddenProp(this.field, "_formField", this.formField);
    this.focusMonitor.monitor(this.elementRef, true).subscribe((origin) => {
      if (!origin && this.field.focus) {
        this.field.focus = false;
      }
    });
  }
  ngAfterViewInit() {
    if (this.formField.appearance !== "outline" && this.props.hideFieldUnderline === true) {
      const underlineElement = this.formField._elementRef.nativeElement.querySelector(".mat-form-field-underline");
      underlineElement && this.renderer.removeChild(underlineElement.parentNode, underlineElement);
    }
  }
  ngOnDestroy() {
    delete this.field._formField;
    this.focusMonitor.stopMonitoring(this.elementRef);
  }
};
FormlyWrapperFormField.ɵfac = function FormlyWrapperFormField_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FormlyWrapperFormField)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(FocusMonitor));
};
FormlyWrapperFormField.ɵcmp = ɵɵdefineComponent({
  type: FormlyWrapperFormField,
  selectors: [["formly-wrapper-mat-form-field"]],
  viewQuery: function FormlyWrapperFormField_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(MatFormField, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.formField = _t.first);
    }
  },
  features: [ɵɵInheritDefinitionFeature],
  decls: 14,
  vars: 13,
  consts: [["fieldComponent", ""], ["stringOrTemplate", ""], ["template", ""], [3, "hideRequiredMarker", "floatLabel", "appearance", "subscriptSizing", "color"], [4, "ngIf"], ["matTextPrefix", "", 4, "ngIf"], ["matPrefix", "", 4, "ngIf"], ["matTextSuffix", "", 4, "ngIf"], ["matSuffix", "", 4, "ngIf"], [3, "field"], ["align", "end", 4, "ngIf"], ["aria-hidden", "true", "class", "mat-form-field-required-marker mat-mdc-form-field-required-marker", 4, "ngIf"], ["aria-hidden", "true", 1, "mat-form-field-required-marker", "mat-mdc-form-field-required-marker"], ["matTextPrefix", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["matPrefix", ""], ["matTextSuffix", ""], ["matSuffix", ""], ["align", "end"], [4, "ngIf", "ngIfElse"]],
  template: function FormlyWrapperFormField_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "mat-form-field", 3);
      ɵɵelementContainer(1, null, 0);
      ɵɵtemplate(3, FormlyWrapperFormField_mat_label_3_Template, 3, 2, "mat-label", 4)(4, FormlyWrapperFormField_ng_container_4_Template, 2, 4, "ng-container", 5)(5, FormlyWrapperFormField_ng_container_5_Template, 2, 4, "ng-container", 6)(6, FormlyWrapperFormField_ng_container_6_Template, 2, 4, "ng-container", 7)(7, FormlyWrapperFormField_ng_container_7_Template, 2, 4, "ng-container", 8);
      ɵɵelementStart(8, "mat-error");
      ɵɵelement(9, "formly-validation-message", 9);
      ɵɵelementEnd();
      ɵɵtemplate(10, FormlyWrapperFormField_mat_hint_10_Template, 2, 4, "mat-hint", 4)(11, FormlyWrapperFormField_mat_hint_11_Template, 2, 4, "mat-hint", 10);
      ɵɵelementEnd();
      ɵɵtemplate(12, FormlyWrapperFormField_ng_template_12_Template, 3, 2, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    }
    if (rf & 2) {
      let tmp_6_0;
      ɵɵproperty("hideRequiredMarker", true)("floatLabel", ctx.props.floatLabel)("appearance", ctx.props.appearance)("subscriptSizing", ctx.props.subscriptSizing)("color", (tmp_6_0 = ctx.props.color) !== null && tmp_6_0 !== void 0 ? tmp_6_0 : "primary");
      ɵɵadvance(3);
      ɵɵproperty("ngIf", ctx.props.label && ctx.props.hideLabel !== true);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.props.textPrefix);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.props.prefix);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.props.textSuffix);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.props.suffix);
      ɵɵadvance(2);
      ɵɵproperty("field", ctx.field);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.props.description || ctx.props.hintStart);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.props.hintEnd);
    }
  },
  dependencies: [MatFormField, FormlyValidationMessage, NgIf, MatLabel, NgTemplateOutlet, MatPrefix, MatSuffix, MatError, MatHint],
  styles: ["formly-wrapper-mat-form-field .mat-mdc-form-field,formly-wrapper-mat-form-field .mat-form-field{width:100%}\n"],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyWrapperFormField, [{
    type: Component,
    args: [{
      selector: "formly-wrapper-mat-form-field",
      template: `
    <!-- fix https://github.com/angular/material2/pull/7083 by setting width to 100% -->
    <mat-form-field
      [hideRequiredMarker]="true"
      [floatLabel]="props.floatLabel"
      [appearance]="props.appearance"
      [subscriptSizing]="props.subscriptSizing"
      [color]="props.color ?? 'primary'"
    >
      <ng-container #fieldComponent></ng-container>
      <mat-label *ngIf="props.label && props.hideLabel !== true">
        {{ props.label }}
        <span
          *ngIf="props.required && props.hideRequiredMarker !== true"
          aria-hidden="true"
          class="mat-form-field-required-marker mat-mdc-form-field-required-marker"
          >*</span
        >
      </mat-label>

      <ng-container matTextPrefix *ngIf="props.textPrefix">
        <ng-container [ngTemplateOutlet]="props.textPrefix" [ngTemplateOutletContext]="{ field: field }"></ng-container>
      </ng-container>

      <ng-container matPrefix *ngIf="props.prefix">
        <ng-container [ngTemplateOutlet]="props.prefix" [ngTemplateOutletContext]="{ field: field }"></ng-container>
      </ng-container>

      <ng-container matTextSuffix *ngIf="props.textSuffix">
        <ng-container [ngTemplateOutlet]="props.textSuffix" [ngTemplateOutletContext]="{ field: field }"></ng-container>
      </ng-container>

      <ng-container matSuffix *ngIf="props.suffix">
        <ng-container [ngTemplateOutlet]="props.suffix" [ngTemplateOutletContext]="{ field: field }"></ng-container>
      </ng-container>

      <mat-error>
        <formly-validation-message [field]="field"></formly-validation-message>
      </mat-error>

      <mat-hint *ngIf="props.description || props.hintStart as hint">
        <ng-container [ngTemplateOutlet]="stringOrTemplate" [ngTemplateOutletContext]="{ content: hint }">
        </ng-container>
      </mat-hint>

      <mat-hint *ngIf="props.hintEnd as hintEnd" align="end">
        <ng-container [ngTemplateOutlet]="stringOrTemplate" [ngTemplateOutletContext]="{ content: hintEnd }">
        </ng-container>
      </mat-hint>
    </mat-form-field>

    <ng-template #stringOrTemplate let-content="content">
      <ng-container *ngIf="!content.createEmbeddedView; else template">{{ content }}</ng-container>
      <ng-template #template>
        <ng-container [ngTemplateOutlet]="content" [ngTemplateOutletContext]="{ field: field }"></ng-container>
      </ng-template>
    </ng-template>
  `,
      encapsulation: ViewEncapsulation$1.None,
      styles: ["formly-wrapper-mat-form-field .mat-mdc-form-field,formly-wrapper-mat-form-field .mat-form-field{width:100%}\n"]
    }]
  }], function() {
    return [{
      type: Renderer2
    }, {
      type: ElementRef
    }, {
      type: FocusMonitor
    }];
  }, {
    formField: [{
      type: ViewChild,
      args: [MatFormField, {
        static: true
      }]
    }]
  });
})();
var FormlyMatFormFieldModule = class {
};
FormlyMatFormFieldModule.ɵfac = function FormlyMatFormFieldModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FormlyMatFormFieldModule)();
};
FormlyMatFormFieldModule.ɵmod = ɵɵdefineNgModule({
  type: FormlyMatFormFieldModule,
  declarations: [FormlyWrapperFormField],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, FormlyModule]
});
FormlyMatFormFieldModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, ReactiveFormsModule, MatFormFieldModule, FormlyModule.forChild({
    wrappers: [{
      name: "form-field",
      component: FormlyWrapperFormField
    }]
  })]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyMatFormFieldModule, [{
    type: NgModule,
    args: [{
      declarations: [FormlyWrapperFormField],
      imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, FormlyModule.forChild({
        wrappers: [{
          name: "form-field",
          component: FormlyWrapperFormField
        }]
      })],
      schemas: [NO_ERRORS_SCHEMA]
    }]
  }], null, null);
})();
var FieldType2 = class extends FieldType {
  constructor() {
    super(...arguments);
    this.errorStateMatcher = {
      isErrorState: () => this.field && this.showError
    };
    this.stateChanges = new Subject();
    this._errorState = false;
    this._focused = false;
  }
  set matPrefix(prefix) {
    if (prefix) {
      this.props.prefix = prefix;
    }
  }
  set matTextPrefix(textPrefix) {
    if (textPrefix) {
      this.props.textPrefix = textPrefix;
    }
  }
  set matSuffix(suffix) {
    if (suffix) {
      this.props.suffix = suffix;
    }
  }
  set matTextSuffix(textSuffix) {
    if (textSuffix) {
      this.props.textSuffix = textSuffix;
    }
  }
  set _controls(controls) {
    this.attachControl(controls.length === 1 ? controls.first : this);
  }
  ngOnDestroy() {
    delete this.formField?._control;
    this.stateChanges.complete();
  }
  setDescribedByIds(_ids) {
  }
  onContainerClick(_event) {
    this.field.focus = true;
    this.stateChanges.next();
  }
  get errorState() {
    const showError = this.options.showError(this);
    if (showError !== this._errorState) {
      this._errorState = showError;
      this.stateChanges.next();
    }
    return showError;
  }
  get controlType() {
    if (this.props.type) {
      return this.props.type;
    }
    const type = this.field.type;
    return type instanceof Type ? type.prototype.constructor.name : type;
  }
  get focused() {
    const focused = !!this.field.focus && !this.disabled;
    if (focused !== this._focused) {
      this._focused = focused;
      this.stateChanges.next();
    }
    return focused;
  }
  get disabled() {
    return !!this.props.disabled;
  }
  get required() {
    return !!this.props.required;
  }
  get placeholder() {
    return this.props.placeholder || "";
  }
  get shouldPlaceholderFloat() {
    return this.shouldLabelFloat;
  }
  get value() {
    return this.formControl?.value;
  }
  set value(value) {
    this.formControl?.patchValue(value);
  }
  get ngControl() {
    return this.formControl;
  }
  get empty() {
    return this.value == null || this.value === "";
  }
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  get formField() {
    return this.field?.["_formField"];
  }
  attachControl(control) {
    if (this.formField && control !== this.formField._control) {
      this.formField._control = control;
      const ngControl = control?.ngControl;
      if (ngControl?.valueAccessor?.hasOwnProperty("_formField")) {
        ngControl.valueAccessor["_formField"] = this.formField;
      }
      if (ngControl?.valueAccessor?.hasOwnProperty("_parentFormField")) {
        ngControl.valueAccessor["_parentFormField"] = this.formField;
      }
      ["prefix", "suffix", "textPrefix", "textSuffix"].forEach((type) => observe(this.field, ["props", type], ({
        currentValue
      }) => currentValue && Promise.resolve().then(() => {
        this.options.detectChanges(this.field);
      })));
      const setDescribedByIds = control.setDescribedByIds.bind(control);
      control.setDescribedByIds = (ids) => {
        setTimeout(() => setDescribedByIds(ids));
      };
    }
  }
};
FieldType2.ɵfac = /* @__PURE__ */ (() => {
  let ɵFieldType_BaseFactory;
  return function FieldType_Factory(__ngFactoryType__) {
    return (ɵFieldType_BaseFactory || (ɵFieldType_BaseFactory = ɵɵgetInheritedFactory(FieldType2)))(__ngFactoryType__ || FieldType2);
  };
})();
FieldType2.ɵdir = ɵɵdefineDirective({
  type: FieldType2,
  viewQuery: function FieldType_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c2, 5);
      ɵɵviewQuery(_c3, 5);
      ɵɵviewQuery(_c4, 5);
      ɵɵviewQuery(_c5, 5);
      ɵɵviewQuery(MatFormFieldControl, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.matPrefix = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.matTextPrefix = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.matSuffix = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.matTextSuffix = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._controls = _t);
    }
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FieldType2, [{
    type: Directive
  }], null, {
    matPrefix: [{
      type: ViewChild,
      args: ["matPrefix"]
    }],
    matTextPrefix: [{
      type: ViewChild,
      args: ["matTextPrefix"]
    }],
    matSuffix: [{
      type: ViewChild,
      args: ["matSuffix"]
    }],
    matTextSuffix: [{
      type: ViewChild,
      args: ["matTextSuffix"]
    }],
    _controls: [{
      type: ViewChildren,
      args: [MatFormFieldControl]
    }]
  });
})();

export {
  FormlyMatFormFieldModule,
  FieldType2 as FieldType
};
//# sourceMappingURL=chunk-6TKURVXC.js.map
