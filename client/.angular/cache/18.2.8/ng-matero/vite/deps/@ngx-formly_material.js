import {
  FieldType,
  FormlyMatFormFieldModule
} from "./chunk-6TKURVXC.js";
import {
  FormlyAttributes,
  FormlyModule,
  observe
} from "./chunk-MFCAW62I.js";
import {
  MatRadioButton,
  MatRadioGroup,
  MatRadioModule
} from "./chunk-24QVRYEB.js";
import "./chunk-65H4I3RJ.js";
import {
  MAT_INPUT_VALUE_ACCESSOR,
  MatInput,
  MatInputModule
} from "./chunk-NIJXQKIL.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-MPBGWVKW.js";
import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-KFDTBRMB.js";
import "./chunk-6FVM5ZDU.js";
import "./chunk-GJ36CECM.js";
import "./chunk-7MGLFPMK.js";
import {
  DefaultValueAccessor,
  FormControlDirective,
  NgControlStatus,
  NumberValueAccessor,
  ReactiveFormsModule,
  RequiredValidator
} from "./chunk-5C5M6BN6.js";
import "./chunk-45RO3P3H.js";
import "./chunk-RRYMOHQ3.js";
import {
  MatOptgroup,
  MatOption,
  MatPseudoCheckbox,
  MatPseudoCheckboxModule
} from "./chunk-HBP6OA6Q.js";
import "./chunk-IPQJSEC4.js";
import "./chunk-2NPGNF2M.js";
import {
  FocusMonitor
} from "./chunk-U7VVEHQ6.js";
import "./chunk-5SQMXRTA.js";
import "./chunk-X7CATLYX.js";
import "./chunk-SWKTGBAV.js";
import {
  CdkTextareaAutosize
} from "./chunk-YPI3GO37.js";
import "./chunk-5DDL3Q73.js";
import {
  AsyncPipe,
  CommonModule,
  NgForOf,
  NgIf,
  NgTemplateOutlet
} from "./chunk-R3EXXSPB.js";
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  Pipe,
  Renderer2,
  ViewChild,
  ViewChildren,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵhostProperty,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-57TCTXNO.js";
import "./chunk-O6VDDHVS.js";
import "./chunk-IXUSS67I.js";
import {
  BehaviorSubject,
  Observable,
  filter,
  map,
  tap
} from "./chunk-BONRK7YY.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-PEHFQLBM.js";

// node_modules/@ngx-formly/material/fesm2020/ngx-formly-material-input.mjs
function FormlyFieldInput_input_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "input", 2);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("id", ctx_r0.id)("name", ctx_r0.field.name)("type", ctx_r0.type || "text")("readonly", ctx_r0.props.readonly)("required", ctx_r0.required)("errorStateMatcher", ctx_r0.errorStateMatcher)("formControl", ctx_r0.formControl)("formlyAttributes", ctx_r0.field)("tabIndex", ctx_r0.props.tabindex)("placeholder", ctx_r0.props.placeholder);
  }
}
function FormlyFieldInput_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "input", 3);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("id", ctx_r0.id)("name", ctx_r0.field.name)("readonly", ctx_r0.props.readonly)("required", ctx_r0.required)("errorStateMatcher", ctx_r0.errorStateMatcher)("formControl", ctx_r0.formControl)("formlyAttributes", ctx_r0.field)("tabIndex", ctx_r0.props.tabindex)("placeholder", ctx_r0.props.placeholder);
  }
}
var FormlyFieldInput = class extends FieldType {
  get type() {
    return this.props.type || "text";
  }
};
FormlyFieldInput.ɵfac = /* @__PURE__ */ (() => {
  let ɵFormlyFieldInput_BaseFactory;
  return function FormlyFieldInput_Factory(__ngFactoryType__) {
    return (ɵFormlyFieldInput_BaseFactory || (ɵFormlyFieldInput_BaseFactory = ɵɵgetInheritedFactory(FormlyFieldInput)))(__ngFactoryType__ || FormlyFieldInput);
  };
})();
FormlyFieldInput.ɵcmp = ɵɵdefineComponent({
  type: FormlyFieldInput,
  selectors: [["formly-field-mat-input"]],
  features: [ɵɵInheritDefinitionFeature],
  decls: 3,
  vars: 2,
  consts: [["numberTmp", ""], ["matInput", "", 3, "id", "name", "type", "readonly", "required", "errorStateMatcher", "formControl", "formlyAttributes", "tabIndex", "placeholder", 4, "ngIf", "ngIfElse"], ["matInput", "", 3, "id", "name", "type", "readonly", "required", "errorStateMatcher", "formControl", "formlyAttributes", "tabIndex", "placeholder"], ["matInput", "", "type", "number", 3, "id", "name", "readonly", "required", "errorStateMatcher", "formControl", "formlyAttributes", "tabIndex", "placeholder"]],
  template: function FormlyFieldInput_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, FormlyFieldInput_input_0_Template, 1, 10, "input", 1)(1, FormlyFieldInput_ng_template_1_Template, 1, 9, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    }
    if (rf & 2) {
      const numberTmp_r2 = ɵɵreference(2);
      ɵɵproperty("ngIf", ctx.type !== "number")("ngIfElse", numberTmp_r2);
    }
  },
  dependencies: [NgIf, MatInput, DefaultValueAccessor, RequiredValidator, NgControlStatus, FormControlDirective, FormlyAttributes, NumberValueAccessor],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyFieldInput, [{
    type: Component,
    args: [{
      selector: "formly-field-mat-input",
      template: `
    <input
      *ngIf="type !== 'number'; else numberTmp"
      matInput
      [id]="id"
      [name]="field.name"
      [type]="type || 'text'"
      [readonly]="props.readonly"
      [required]="required"
      [errorStateMatcher]="errorStateMatcher"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [tabIndex]="props.tabindex"
      [placeholder]="props.placeholder"
    />
    <ng-template #numberTmp>
      <input
        matInput
        [id]="id"
        [name]="field.name"
        type="number"
        [readonly]="props.readonly"
        [required]="required"
        [errorStateMatcher]="errorStateMatcher"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [tabIndex]="props.tabindex"
        [placeholder]="props.placeholder"
      />
    </ng-template>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, null);
})();
var FormlyMatInputModule = class {
};
FormlyMatInputModule.ɵfac = function FormlyMatInputModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FormlyMatInputModule)();
};
FormlyMatInputModule.ɵmod = ɵɵdefineNgModule({
  type: FormlyMatInputModule,
  declarations: [FormlyFieldInput],
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, FormlyMatFormFieldModule, FormlyModule]
});
FormlyMatInputModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, ReactiveFormsModule, MatInputModule, FormlyMatFormFieldModule, FormlyModule.forChild({
    types: [{
      name: "input",
      component: FormlyFieldInput,
      wrappers: ["form-field"]
    }, {
      name: "string",
      extends: "input"
    }, {
      name: "number",
      extends: "input",
      defaultOptions: {
        props: {
          type: "number"
        }
      }
    }, {
      name: "integer",
      extends: "input",
      defaultOptions: {
        props: {
          type: "number"
        }
      }
    }]
  })]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyMatInputModule, [{
    type: NgModule,
    args: [{
      declarations: [FormlyFieldInput],
      imports: [CommonModule, ReactiveFormsModule, MatInputModule, FormlyMatFormFieldModule, FormlyModule.forChild({
        types: [{
          name: "input",
          component: FormlyFieldInput,
          wrappers: ["form-field"]
        }, {
          name: "string",
          extends: "input"
        }, {
          name: "number",
          extends: "input",
          defaultOptions: {
            props: {
              type: "number"
            }
          }
        }, {
          name: "integer",
          extends: "input",
          defaultOptions: {
            props: {
              type: "number"
            }
          }
        }]
      })]
    }]
  }], null, null);
})();

// node_modules/@ngx-formly/material/fesm2020/ngx-formly-material-textarea.mjs
var FormlyFieldTextArea = class extends FieldType {
  constructor() {
    super(...arguments);
    this.defaultOptions = {
      props: {
        cols: 1,
        rows: 1
      }
    };
  }
};
FormlyFieldTextArea.ɵfac = /* @__PURE__ */ (() => {
  let ɵFormlyFieldTextArea_BaseFactory;
  return function FormlyFieldTextArea_Factory(__ngFactoryType__) {
    return (ɵFormlyFieldTextArea_BaseFactory || (ɵFormlyFieldTextArea_BaseFactory = ɵɵgetInheritedFactory(FormlyFieldTextArea)))(__ngFactoryType__ || FormlyFieldTextArea);
  };
})();
FormlyFieldTextArea.ɵcmp = ɵɵdefineComponent({
  type: FormlyFieldTextArea,
  selectors: [["formly-field-mat-textarea"]],
  features: [ɵɵProvidersFeature([
    // fix for https://github.com/ngx-formly/ngx-formly/issues/1688
    // rely on formControl value instead of elementRef which return empty value in Firefox.
    {
      provide: MAT_INPUT_VALUE_ACCESSOR,
      useExisting: FormlyFieldTextArea
    }
  ]), ɵɵInheritDefinitionFeature],
  decls: 1,
  vars: 16,
  consts: [["matInput", "", 3, "id", "name", "readonly", "required", "formControl", "errorStateMatcher", "cols", "rows", "formlyAttributes", "placeholder", "tabindex", "cdkTextareaAutosize", "cdkAutosizeMinRows", "cdkAutosizeMaxRows"]],
  template: function FormlyFieldTextArea_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelement(0, "textarea", 0);
    }
    if (rf & 2) {
      ɵɵclassProp("cdk-textarea-autosize", ctx.props.autosize);
      ɵɵproperty("id", ctx.id)("name", ctx.field.name)("readonly", ctx.props.readonly)("required", ctx.required)("formControl", ctx.formControl)("errorStateMatcher", ctx.errorStateMatcher)("cols", ctx.props.cols)("rows", ctx.props.rows)("formlyAttributes", ctx.field)("placeholder", ctx.props.placeholder)("tabindex", ctx.props.tabindex)("cdkTextareaAutosize", ctx.props.autosize)("cdkAutosizeMinRows", ctx.props.autosizeMinRows)("cdkAutosizeMaxRows", ctx.props.autosizeMaxRows);
    }
  },
  dependencies: [MatInput, DefaultValueAccessor, CdkTextareaAutosize, RequiredValidator, NgControlStatus, FormControlDirective, FormlyAttributes],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyFieldTextArea, [{
    type: Component,
    args: [{
      selector: "formly-field-mat-textarea",
      template: `
    <textarea
      matInput
      [id]="id"
      [name]="field.name"
      [readonly]="props.readonly"
      [required]="required"
      [formControl]="formControl"
      [errorStateMatcher]="errorStateMatcher"
      [cols]="props.cols"
      [rows]="props.rows"
      [formlyAttributes]="field"
      [placeholder]="props.placeholder"
      [tabindex]="props.tabindex"
      [cdkTextareaAutosize]="props.autosize"
      [cdkAutosizeMinRows]="props.autosizeMinRows"
      [cdkAutosizeMaxRows]="props.autosizeMaxRows"
      [class.cdk-textarea-autosize]="props.autosize"
    ></textarea>
  `,
      providers: [
        // fix for https://github.com/ngx-formly/ngx-formly/issues/1688
        // rely on formControl value instead of elementRef which return empty value in Firefox.
        {
          provide: MAT_INPUT_VALUE_ACCESSOR,
          useExisting: FormlyFieldTextArea
        }
      ],
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, null);
})();
var FormlyMatTextAreaModule = class {
};
FormlyMatTextAreaModule.ɵfac = function FormlyMatTextAreaModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FormlyMatTextAreaModule)();
};
FormlyMatTextAreaModule.ɵmod = ɵɵdefineNgModule({
  type: FormlyMatTextAreaModule,
  declarations: [FormlyFieldTextArea],
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, FormlyMatFormFieldModule, FormlyModule]
});
FormlyMatTextAreaModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, ReactiveFormsModule, MatInputModule, FormlyMatFormFieldModule, FormlyModule.forChild({
    types: [{
      name: "textarea",
      component: FormlyFieldTextArea,
      wrappers: ["form-field"]
    }]
  })]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyMatTextAreaModule, [{
    type: NgModule,
    args: [{
      declarations: [FormlyFieldTextArea],
      imports: [CommonModule, ReactiveFormsModule, MatInputModule, FormlyMatFormFieldModule, FormlyModule.forChild({
        types: [{
          name: "textarea",
          component: FormlyFieldTextArea,
          wrappers: ["form-field"]
        }]
      })]
    }]
  }], null, null);
})();

// node_modules/@ngx-formly/core/fesm2020/ngx-formly-core-select.mjs
var FormlySelectOptionsPipe = class {
  transform(options, field) {
    if (!(options instanceof Observable)) {
      options = this.observableOf(options, field);
    } else {
      this.dispose();
    }
    return options.pipe(map((value) => this.transformOptions(value, field)));
  }
  ngOnDestroy() {
    this.dispose();
  }
  transformOptions(options, field) {
    const to = this.transformSelectProps(field);
    const opts = [];
    const groups = {};
    options?.forEach((option) => {
      const o = this.transformOption(option, to);
      if (o.group) {
        const id = groups[o.label];
        if (id === void 0) {
          groups[o.label] = opts.push(o) - 1;
        } else {
          o.group.forEach((o2) => opts[id].group.push(o2));
        }
      } else {
        opts.push(o);
      }
    });
    return opts;
  }
  transformOption(option, props) {
    const group = props.groupProp(option);
    if (Array.isArray(group)) {
      return {
        label: props.labelProp(option),
        group: group.map((opt) => this.transformOption(opt, props))
      };
    }
    option = {
      label: props.labelProp(option),
      value: props.valueProp(option),
      disabled: !!props.disabledProp(option)
    };
    if (group) {
      return {
        label: group,
        group: [option]
      };
    }
    return option;
  }
  transformSelectProps(field) {
    const props = field?.props || field?.templateOptions || {};
    const selectPropFn = (prop) => typeof prop === "function" ? prop : (o) => o[prop];
    return {
      groupProp: selectPropFn(props.groupProp || "group"),
      labelProp: selectPropFn(props.labelProp || "label"),
      valueProp: selectPropFn(props.valueProp || "value"),
      disabledProp: selectPropFn(props.disabledProp || "disabled")
    };
  }
  dispose() {
    if (this._options) {
      this._options.complete();
      this._options = null;
    }
    if (this._subscription) {
      this._subscription.unsubscribe();
      this._subscription = null;
    }
  }
  observableOf(options, f) {
    this.dispose();
    if (f && f.options && f.options.fieldChanges) {
      this._subscription = f.options.fieldChanges.pipe(filter(({
        property,
        type,
        field
      }) => {
        return type === "expressionChanges" && (property.indexOf("templateOptions.options") === 0 || property.indexOf("props.options") === 0) && field === f && Array.isArray(field.props.options) && !!this._options;
      }), tap(() => this._options.next(f.props.options))).subscribe();
    }
    this._options = new BehaviorSubject(options);
    return this._options.asObservable();
  }
};
FormlySelectOptionsPipe.ɵfac = function FormlySelectOptionsPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FormlySelectOptionsPipe)();
};
FormlySelectOptionsPipe.ɵpipe = ɵɵdefinePipe({
  name: "formlySelectOptions",
  type: FormlySelectOptionsPipe,
  pure: true
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlySelectOptionsPipe, [{
    type: Pipe,
    args: [{
      name: "formlySelectOptions"
    }]
  }], null, null);
})();
var FormlySelectModule = class {
};
FormlySelectModule.ɵfac = function FormlySelectModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FormlySelectModule)();
};
FormlySelectModule.ɵmod = ɵɵdefineNgModule({
  type: FormlySelectModule,
  declarations: [FormlySelectOptionsPipe],
  exports: [FormlySelectOptionsPipe]
});
FormlySelectModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlySelectModule, [{
    type: NgModule,
    args: [{
      declarations: [FormlySelectOptionsPipe],
      exports: [FormlySelectOptionsPipe]
    }]
  }], null, null);
})();

// node_modules/@ngx-formly/material/fesm2020/ngx-formly-material-radio.mjs
function FormlyFieldRadio_mat_radio_button_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-radio-button", 2);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const option_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("id", ctx_r2.id + "_" + i_r2)("color", ctx_r2.props.color)("labelPosition", ctx_r2.props.labelPosition)("disabled", option_r1.disabled)("value", option_r1.value);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", option_r1.label, " ");
  }
}
var FormlyFieldRadio = class extends FieldType {
  constructor() {
    super(...arguments);
    this.defaultOptions = {
      props: {
        hideFieldUnderline: true,
        floatLabel: "always",
        tabindex: -1
      }
    };
  }
  ngAfterViewInit() {
    this.focusObserver = observe(this.field, ["focus"], ({
      currentValue
    }) => {
      if (this.props.tabindex === -1 && currentValue && this.radioGroup._radios.length > 0) {
        setTimeout(() => {
          const radio = this.radioGroup.selected ? this.radioGroup.selected : this.radioGroup._radios.first;
          radio.focus();
        });
      }
    });
  }
  // TODO: find a solution to prevent scroll on focus
  onContainerClick() {
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this.focusObserver && this.focusObserver.unsubscribe();
  }
};
FormlyFieldRadio.ɵfac = /* @__PURE__ */ (() => {
  let ɵFormlyFieldRadio_BaseFactory;
  return function FormlyFieldRadio_Factory(__ngFactoryType__) {
    return (ɵFormlyFieldRadio_BaseFactory || (ɵFormlyFieldRadio_BaseFactory = ɵɵgetInheritedFactory(FormlyFieldRadio)))(__ngFactoryType__ || FormlyFieldRadio);
  };
})();
FormlyFieldRadio.ɵcmp = ɵɵdefineComponent({
  type: FormlyFieldRadio,
  selectors: [["formly-field-mat-radio"]],
  viewQuery: function FormlyFieldRadio_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(MatRadioGroup, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.radioGroup = _t.first);
    }
  },
  features: [ɵɵInheritDefinitionFeature],
  decls: 4,
  vars: 10,
  consts: [[3, "formControl", "formlyAttributes", "required", "tabindex"], [3, "id", "color", "labelPosition", "disabled", "value", 4, "ngFor", "ngForOf"], [3, "id", "color", "labelPosition", "disabled", "value"]],
  template: function FormlyFieldRadio_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "mat-radio-group", 0);
      ɵɵtemplate(1, FormlyFieldRadio_mat_radio_button_1_Template, 2, 6, "mat-radio-button", 1);
      ɵɵpipe(2, "formlySelectOptions");
      ɵɵpipe(3, "async");
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("formControl", ctx.formControl)("formlyAttributes", ctx.field)("required", ctx.required)("tabindex", ctx.props.tabindex);
      ɵɵadvance();
      ɵɵproperty("ngForOf", ɵɵpipeBind1(3, 8, ɵɵpipeBind2(2, 5, ctx.props.options, ctx.field)));
    }
  },
  dependencies: [MatRadioButton, MatRadioGroup, NgControlStatus, FormControlDirective, FormlyAttributes, RequiredValidator, NgForOf, AsyncPipe, FormlySelectOptionsPipe],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyFieldRadio, [{
    type: Component,
    args: [{
      selector: "formly-field-mat-radio",
      template: `
    <mat-radio-group
      [formControl]="formControl"
      [formlyAttributes]="field"
      [required]="required"
      [tabindex]="props.tabindex"
    >
      <mat-radio-button
        *ngFor="let option of props.options | formlySelectOptions : field | async; let i = index"
        [id]="id + '_' + i"
        [color]="props.color"
        [labelPosition]="props.labelPosition"
        [disabled]="option.disabled"
        [value]="option.value"
      >
        {{ option.label }}
      </mat-radio-button>
    </mat-radio-group>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, {
    radioGroup: [{
      type: ViewChild,
      args: [MatRadioGroup, {
        static: true
      }]
    }]
  });
})();
var FormlyMatRadioModule = class {
};
FormlyMatRadioModule.ɵfac = function FormlyMatRadioModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FormlyMatRadioModule)();
};
FormlyMatRadioModule.ɵmod = ɵɵdefineNgModule({
  type: FormlyMatRadioModule,
  declarations: [FormlyFieldRadio],
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule, FormlyMatFormFieldModule, FormlySelectModule, FormlyModule]
});
FormlyMatRadioModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, ReactiveFormsModule, MatRadioModule, FormlyMatFormFieldModule, FormlySelectModule, FormlyModule.forChild({
    types: [{
      name: "radio",
      component: FormlyFieldRadio,
      wrappers: ["form-field"]
    }]
  })]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyMatRadioModule, [{
    type: NgModule,
    args: [{
      declarations: [FormlyFieldRadio],
      imports: [CommonModule, ReactiveFormsModule, MatRadioModule, FormlyMatFormFieldModule, FormlySelectModule, FormlyModule.forChild({
        types: [{
          name: "radio",
          component: FormlyFieldRadio,
          wrappers: ["form-field"]
        }]
      })]
    }]
  }], null, null);
})();

// node_modules/@ngx-formly/material/fesm2020/ngx-formly-material-checkbox.mjs
function FormlyFieldCheckbox_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 2);
    ɵɵtext(1, "*");
    ɵɵelementEnd();
  }
}
var FormlyFieldCheckbox = class extends FieldType {
  constructor(renderer, focusMonitor) {
    super();
    this.renderer = renderer;
    this.focusMonitor = focusMonitor;
    this.defaultOptions = {
      props: {
        hideFieldUnderline: true,
        indeterminate: true,
        floatLabel: "always",
        hideLabel: true,
        color: "accent"
        // workaround for https://github.com/angular/components/issues/18465
      }
    };
  }
  onContainerClick(event) {
    this.checkbox.focus();
    super.onContainerClick(event);
  }
  ngAfterViewInit() {
    if (this.checkbox) {
      this.focusMonitor.monitor(this.checkbox._inputElement, true).subscribe((focusOrigin) => {
        this.field.focus = !!focusOrigin;
        this.stateChanges.next();
        if (focusOrigin) {
          this.props.focus && this.props.focus(this.field);
        } else {
          this.props.blur && this.props.blur(this.field);
        }
      });
    }
  }
  ngAfterViewChecked() {
    if (this.required !== this._required && this.checkbox && this.checkbox._inputElement) {
      this._required = this.required;
      const inputElement = this.checkbox._inputElement.nativeElement;
      if (this.required) {
        this.renderer.setAttribute(inputElement, "required", "required");
      } else {
        this.renderer.removeAttribute(inputElement, "required");
      }
    }
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.checkbox) {
      this.focusMonitor.stopMonitoring(this.checkbox._inputElement);
    }
  }
};
FormlyFieldCheckbox.ɵfac = function FormlyFieldCheckbox_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FormlyFieldCheckbox)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(FocusMonitor));
};
FormlyFieldCheckbox.ɵcmp = ɵɵdefineComponent({
  type: FormlyFieldCheckbox,
  selectors: [["formly-field-mat-checkbox"]],
  viewQuery: function FormlyFieldCheckbox_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(MatCheckbox, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.checkbox = _t.first);
    }
  },
  features: [ɵɵInheritDefinitionFeature],
  decls: 3,
  vars: 10,
  consts: [[3, "formControl", "id", "name", "formlyAttributes", "tabIndex", "indeterminate", "color", "labelPosition"], ["aria-hidden", "true", "class", "mat-form-field-required-marker mat-mdc-form-field-required-marker", 4, "ngIf"], ["aria-hidden", "true", 1, "mat-form-field-required-marker", "mat-mdc-form-field-required-marker"]],
  template: function FormlyFieldCheckbox_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "mat-checkbox", 0);
      ɵɵtext(1);
      ɵɵtemplate(2, FormlyFieldCheckbox_span_2_Template, 2, 0, "span", 1);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("formControl", ctx.formControl)("id", ctx.id)("name", ctx.field.name)("formlyAttributes", ctx.field)("tabIndex", ctx.props.tabindex)("indeterminate", ctx.props.indeterminate && ctx.formControl.value == null)("color", ctx.props.color)("labelPosition", ctx.props.labelPosition);
      ɵɵadvance();
      ɵɵtextInterpolate1(" ", ctx.props.label, " ");
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.props.required && ctx.props.hideRequiredMarker !== true);
    }
  },
  dependencies: [MatCheckbox, NgControlStatus, FormControlDirective, FormlyAttributes, NgIf],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyFieldCheckbox, [{
    type: Component,
    args: [{
      selector: "formly-field-mat-checkbox",
      template: `
    <mat-checkbox
      [formControl]="formControl"
      [id]="id"
      [name]="field.name"
      [formlyAttributes]="field"
      [tabIndex]="props.tabindex"
      [indeterminate]="props.indeterminate && formControl.value == null"
      [color]="props.color"
      [labelPosition]="props.labelPosition"
    >
      {{ props.label }}
      <span
        *ngIf="props.required && props.hideRequiredMarker !== true"
        aria-hidden="true"
        class="mat-form-field-required-marker mat-mdc-form-field-required-marker"
        >*</span
      >
    </mat-checkbox>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], function() {
    return [{
      type: Renderer2
    }, {
      type: FocusMonitor
    }];
  }, {
    checkbox: [{
      type: ViewChild,
      args: [MatCheckbox, {
        static: true
      }]
    }]
  });
})();
var FormlyMatCheckboxModule = class {
};
FormlyMatCheckboxModule.ɵfac = function FormlyMatCheckboxModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FormlyMatCheckboxModule)();
};
FormlyMatCheckboxModule.ɵmod = ɵɵdefineNgModule({
  type: FormlyMatCheckboxModule,
  declarations: [FormlyFieldCheckbox],
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, FormlyMatFormFieldModule, FormlyModule]
});
FormlyMatCheckboxModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, ReactiveFormsModule, MatCheckboxModule, FormlyMatFormFieldModule, FormlyModule.forChild({
    types: [{
      name: "checkbox",
      component: FormlyFieldCheckbox,
      wrappers: ["form-field"]
    }, {
      name: "boolean",
      extends: "checkbox"
    }]
  })]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyMatCheckboxModule, [{
    type: NgModule,
    args: [{
      declarations: [FormlyFieldCheckbox],
      imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, FormlyMatFormFieldModule, FormlyModule.forChild({
        types: [{
          name: "checkbox",
          component: FormlyFieldCheckbox,
          wrappers: ["form-field"]
        }, {
          name: "boolean",
          extends: "checkbox"
        }]
      })]
    }]
  }], null, null);
})();

// node_modules/@ngx-formly/material/fesm2020/ngx-formly-material-multicheckbox.mjs
function FormlyFieldMultiCheckbox_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "mat-checkbox", 1);
    ɵɵlistener("change", function FormlyFieldMultiCheckbox_ng_container_0_Template_mat_checkbox_change_1_listener($event) {
      const option_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onChange(option_r2.value, $event.checked));
    });
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const option_r2 = ctx.$implicit;
    const i_r4 = ctx.index;
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("id", ctx_r2.id + "_" + i_r4)("formlyAttributes", ctx_r2.field)("tabIndex", ctx_r2.props.tabindex)("color", ctx_r2.props.color)("labelPosition", ctx_r2.props.labelPosition)("checked", ctx_r2.isChecked(option_r2))("disabled", ctx_r2.formControl.disabled || option_r2.disabled);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", option_r2.label, " ");
  }
}
var FormlyFieldMultiCheckbox = class extends FieldType {
  constructor() {
    super(...arguments);
    this.defaultOptions = {
      props: {
        hideFieldUnderline: true,
        floatLabel: "always",
        color: "accent"
        // workaround for https://github.com/angular/components/issues/18465
      }
    };
  }
  onChange(value, checked) {
    this.formControl.markAsDirty();
    if (this.props.type === "array") {
      this.formControl.patchValue(checked ? [...this.formControl.value || [], value] : [...this.formControl.value || []].filter((o) => o !== value));
    } else {
      this.formControl.patchValue(__spreadProps(__spreadValues({}, this.formControl.value), {
        [value]: checked
      }));
    }
    this.formControl.markAsTouched();
  }
  // TODO: find a solution to prevent scroll on focus
  onContainerClick() {
  }
  isChecked(option) {
    const value = this.formControl.value;
    return value && (this.props.type === "array" ? value.indexOf(option.value) !== -1 : value[option.value]);
  }
};
FormlyFieldMultiCheckbox.ɵfac = /* @__PURE__ */ (() => {
  let ɵFormlyFieldMultiCheckbox_BaseFactory;
  return function FormlyFieldMultiCheckbox_Factory(__ngFactoryType__) {
    return (ɵFormlyFieldMultiCheckbox_BaseFactory || (ɵFormlyFieldMultiCheckbox_BaseFactory = ɵɵgetInheritedFactory(FormlyFieldMultiCheckbox)))(__ngFactoryType__ || FormlyFieldMultiCheckbox);
  };
})();
FormlyFieldMultiCheckbox.ɵcmp = ɵɵdefineComponent({
  type: FormlyFieldMultiCheckbox,
  selectors: [["formly-field-mat-multicheckbox"]],
  viewQuery: function FormlyFieldMultiCheckbox_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(MatCheckbox, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.checkboxes = _t);
    }
  },
  hostVars: 1,
  hostBindings: function FormlyFieldMultiCheckbox_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵhostProperty("id", ctx.id);
    }
  },
  features: [ɵɵInheritDefinitionFeature],
  decls: 3,
  vars: 6,
  consts: [[4, "ngFor", "ngForOf"], [3, "change", "id", "formlyAttributes", "tabIndex", "color", "labelPosition", "checked", "disabled"]],
  template: function FormlyFieldMultiCheckbox_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, FormlyFieldMultiCheckbox_ng_container_0_Template, 3, 8, "ng-container", 0);
      ɵɵpipe(1, "formlySelectOptions");
      ɵɵpipe(2, "async");
    }
    if (rf & 2) {
      ɵɵproperty("ngForOf", ɵɵpipeBind1(2, 4, ɵɵpipeBind2(1, 1, ctx.props.options, ctx.field)));
    }
  },
  dependencies: [MatCheckbox, NgForOf, FormlyAttributes, AsyncPipe, FormlySelectOptionsPipe],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyFieldMultiCheckbox, [{
    type: Component,
    args: [{
      selector: "formly-field-mat-multicheckbox",
      template: `
    <ng-container *ngFor="let option of props.options | formlySelectOptions : field | async; let i = index">
      <mat-checkbox
        [id]="id + '_' + i"
        [formlyAttributes]="field"
        [tabIndex]="props.tabindex"
        [color]="props.color"
        [labelPosition]="props.labelPosition"
        [checked]="isChecked(option)"
        [disabled]="formControl.disabled || option.disabled"
        (change)="onChange(option.value, $event.checked)"
      >
        {{ option.label }}
      </mat-checkbox>
    </ng-container>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[id]": "id"
      }
    }]
  }], null, {
    checkboxes: [{
      type: ViewChildren,
      args: [MatCheckbox]
    }]
  });
})();
var FormlyMatMultiCheckboxModule = class {
};
FormlyMatMultiCheckboxModule.ɵfac = function FormlyMatMultiCheckboxModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FormlyMatMultiCheckboxModule)();
};
FormlyMatMultiCheckboxModule.ɵmod = ɵɵdefineNgModule({
  type: FormlyMatMultiCheckboxModule,
  declarations: [FormlyFieldMultiCheckbox],
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, FormlyMatFormFieldModule, FormlySelectModule, FormlyModule]
});
FormlyMatMultiCheckboxModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, ReactiveFormsModule, MatCheckboxModule, FormlyMatFormFieldModule, FormlySelectModule, FormlyModule.forChild({
    types: [{
      name: "multicheckbox",
      component: FormlyFieldMultiCheckbox,
      wrappers: ["form-field"]
    }]
  })]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyMatMultiCheckboxModule, [{
    type: NgModule,
    args: [{
      declarations: [FormlyFieldMultiCheckbox],
      imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, FormlyMatFormFieldModule, FormlySelectModule, FormlyModule.forChild({
        types: [{
          name: "multicheckbox",
          component: FormlyFieldMultiCheckbox,
          wrappers: ["form-field"]
        }]
      })]
    }]
  }], null, null);
})();

// node_modules/@ngx-formly/material/fesm2020/ngx-formly-material-select.mjs
var _c0 = (a0) => ({
  selectOptions: a0
});
function FormlyFieldSelect_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "mat-option", 3);
    ɵɵlistener("click", function FormlyFieldSelect_ng_template_0_Template_mat_option_click_0_listener() {
      const selectOptions_r3 = ɵɵrestoreView(_r2).selectOptions;
      const ctx_r3 = ɵɵnextContext();
      return ɵɵresetView(ctx_r3.toggleSelectAll(selectOptions_r3));
    });
    ɵɵelement(1, "mat-pseudo-checkbox", 4);
    ɵɵtext(2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const selectOptions_r3 = ctx.selectOptions;
    const ctx_r3 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("state", ctx_r3.getSelectAllState(selectOptions_r3));
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r3.props.selectAllOption, " ");
  }
}
function FormlyFieldSelect_ng_container_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, 7);
  }
  if (rf & 2) {
    const selectOptions_r5 = ɵɵnextContext().ngIf;
    ɵɵnextContext();
    const selectAll_r6 = ɵɵreference(1);
    ɵɵproperty("ngTemplateOutlet", selectAll_r6)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c0, selectOptions_r5));
  }
}
function FormlyFieldSelect_ng_container_3_ng_container_2_mat_optgroup_1_mat_option_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-option", 12);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const child_r7 = ctx.$implicit;
    ɵɵproperty("value", child_r7.value)("disabled", child_r7.disabled);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", child_r7.label, " ");
  }
}
function FormlyFieldSelect_ng_container_3_ng_container_2_mat_optgroup_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-optgroup", 10);
    ɵɵtemplate(1, FormlyFieldSelect_ng_container_3_ng_container_2_mat_optgroup_1_mat_option_1_Template, 2, 3, "mat-option", 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r8 = ɵɵnextContext().$implicit;
    ɵɵproperty("label", item_r8.label);
    ɵɵadvance();
    ɵɵproperty("ngForOf", item_r8.group);
  }
}
function FormlyFieldSelect_ng_container_3_ng_container_2_mat_option_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-option", 12);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r8 = ɵɵnextContext().$implicit;
    ɵɵproperty("value", item_r8.value)("disabled", item_r8.disabled);
    ɵɵadvance();
    ɵɵtextInterpolate(item_r8.label);
  }
}
function FormlyFieldSelect_ng_container_3_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, FormlyFieldSelect_ng_container_3_ng_container_2_mat_optgroup_1_Template, 2, 2, "mat-optgroup", 8)(2, FormlyFieldSelect_ng_container_3_ng_container_2_mat_option_2_Template, 2, 3, "mat-option", 9);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    ɵɵadvance();
    ɵɵproperty("ngIf", item_r8.group);
    ɵɵadvance();
    ɵɵproperty("ngIf", !item_r8.group);
  }
}
function FormlyFieldSelect_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, FormlyFieldSelect_ng_container_3_ng_container_1_Template, 1, 4, "ng-container", 5)(2, FormlyFieldSelect_ng_container_3_ng_container_2_Template, 3, 2, "ng-container", 6);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const selectOptions_r5 = ctx.ngIf;
    const ctx_r3 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r3.props.multiple && ctx_r3.props.selectAllOption);
    ɵɵadvance();
    ɵɵproperty("ngForOf", selectOptions_r5);
  }
}
var FormlyFieldSelect = class extends FieldType {
  constructor() {
    super(...arguments);
    this.defaultOptions = {
      props: {
        compareWith(o1, o2) {
          return o1 === o2;
        }
      }
    };
  }
  set select(select) {
    observe(select, ["_parentFormField", "_textField"], ({
      currentValue
    }) => {
      if (currentValue) {
        select._preferredOverlayOrigin = select._parentFormField.getConnectedOverlayOrigin();
      }
    });
  }
  getSelectAllState(options) {
    if (this.empty || this.value.length === 0) {
      return null;
    }
    return this.value.length !== this.getSelectAllValue(options).length ? "indeterminate" : "checked";
  }
  toggleSelectAll(options) {
    const selectAllValue = this.getSelectAllValue(options);
    this.formControl.markAsDirty();
    this.formControl.setValue(!this.value || this.value.length !== selectAllValue.length ? selectAllValue : []);
  }
  change($event) {
    this.props.change?.(this.field, $event);
  }
  _getAriaLabelledby() {
    if (this.props.attributes?.["aria-labelledby"]) {
      return this.props.attributes["aria-labelledby"];
    }
    return this.formField?._labelId;
  }
  _getAriaLabel() {
    return this.props.attributes?.["aria-label"];
  }
  getSelectAllValue(options) {
    if (!this.selectAllValue || options !== this.selectAllValue.options) {
      const flatOptions = [];
      options.forEach((o) => o.group ? flatOptions.push(...o.group) : flatOptions.push(o));
      this.selectAllValue = {
        options,
        value: flatOptions.filter((o) => !o.disabled).map((o) => o.value)
      };
    }
    return this.selectAllValue.value;
  }
};
FormlyFieldSelect.ɵfac = /* @__PURE__ */ (() => {
  let ɵFormlyFieldSelect_BaseFactory;
  return function FormlyFieldSelect_Factory(__ngFactoryType__) {
    return (ɵFormlyFieldSelect_BaseFactory || (ɵFormlyFieldSelect_BaseFactory = ɵɵgetInheritedFactory(FormlyFieldSelect)))(__ngFactoryType__ || FormlyFieldSelect);
  };
})();
FormlyFieldSelect.ɵcmp = ɵɵdefineComponent({
  type: FormlyFieldSelect,
  selectors: [["formly-field-mat-select"]],
  viewQuery: function FormlyFieldSelect_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(MatSelect, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.select = _t.first);
    }
  },
  features: [ɵɵInheritDefinitionFeature],
  decls: 6,
  vars: 20,
  consts: [["selectAll", ""], [3, "selectionChange", "id", "formControl", "formlyAttributes", "placeholder", "tabIndex", "required", "compareWith", "multiple", "errorStateMatcher", "aria-label", "aria-labelledby", "disableOptionCentering", "typeaheadDebounceInterval", "panelClass"], [4, "ngIf"], [3, "click"], [1, "mat-option-pseudo-checkbox", 3, "state"], [3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngIf"], [4, "ngFor", "ngForOf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "label", 4, "ngIf"], [3, "value", "disabled", 4, "ngIf"], [3, "label"], [3, "value", "disabled", 4, "ngFor", "ngForOf"], [3, "value", "disabled"]],
  template: function FormlyFieldSelect_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵtemplate(0, FormlyFieldSelect_ng_template_0_Template, 3, 2, "ng-template", null, 0, ɵɵtemplateRefExtractor);
      ɵɵelementStart(2, "mat-select", 1);
      ɵɵlistener("selectionChange", function FormlyFieldSelect_Template_mat_select_selectionChange_2_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.change($event));
      });
      ɵɵtemplate(3, FormlyFieldSelect_ng_container_3_Template, 3, 2, "ng-container", 2);
      ɵɵpipe(4, "formlySelectOptions");
      ɵɵpipe(5, "async");
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵadvance(2);
      ɵɵproperty("id", ctx.id)("formControl", ctx.formControl)("formlyAttributes", ctx.field)("placeholder", ctx.props.placeholder)("tabIndex", ctx.props.tabindex)("required", ctx.required)("compareWith", ctx.props.compareWith)("multiple", ctx.props.multiple)("errorStateMatcher", ctx.errorStateMatcher)("aria-label", ctx._getAriaLabel())("aria-labelledby", ctx._getAriaLabelledby())("disableOptionCentering", ctx.props.disableOptionCentering)("typeaheadDebounceInterval", ctx.props.typeaheadDebounceInterval)("panelClass", ctx.props.panelClass);
      ɵɵadvance();
      ɵɵproperty("ngIf", ɵɵpipeBind1(5, 18, ɵɵpipeBind2(4, 15, ctx.props.options, ctx.field)));
    }
  },
  dependencies: [MatOption, MatPseudoCheckbox, MatSelect, MatOptgroup, NgControlStatus, FormControlDirective, FormlyAttributes, RequiredValidator, NgIf, NgTemplateOutlet, NgForOf, AsyncPipe, FormlySelectOptionsPipe],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyFieldSelect, [{
    type: Component,
    args: [{
      selector: "formly-field-mat-select",
      template: `
    <ng-template #selectAll let-selectOptions="selectOptions">
      <mat-option (click)="toggleSelectAll(selectOptions)">
        <mat-pseudo-checkbox class="mat-option-pseudo-checkbox" [state]="getSelectAllState(selectOptions)">
        </mat-pseudo-checkbox>
        {{ props.selectAllOption }}
      </mat-option>
    </ng-template>

    <mat-select
      [id]="id"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [placeholder]="props.placeholder"
      [tabIndex]="props.tabindex"
      [required]="required"
      [compareWith]="props.compareWith"
      [multiple]="props.multiple"
      (selectionChange)="change($event)"
      [errorStateMatcher]="errorStateMatcher"
      [aria-label]="_getAriaLabel()"
      [aria-labelledby]="_getAriaLabelledby()"
      [disableOptionCentering]="props.disableOptionCentering"
      [typeaheadDebounceInterval]="props.typeaheadDebounceInterval"
      [panelClass]="props.panelClass"
    >
      <ng-container *ngIf="props.options | formlySelectOptions : field | async as selectOptions">
        <ng-container
          *ngIf="props.multiple && props.selectAllOption"
          [ngTemplateOutlet]="selectAll"
          [ngTemplateOutletContext]="{ selectOptions: selectOptions }"
        >
        </ng-container>
        <ng-container *ngFor="let item of selectOptions">
          <mat-optgroup *ngIf="item.group" [label]="item.label">
            <mat-option *ngFor="let child of item.group" [value]="child.value" [disabled]="child.disabled">
              {{ child.label }}
            </mat-option>
          </mat-optgroup>
          <mat-option *ngIf="!item.group" [value]="item.value" [disabled]="item.disabled">{{ item.label }}</mat-option>
        </ng-container>
      </ng-container>
    </mat-select>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, {
    select: [{
      type: ViewChild,
      args: [MatSelect, {
        static: true
      }]
    }]
  });
})();
var FormlyMatSelectModule = class {
};
FormlyMatSelectModule.ɵfac = function FormlyMatSelectModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FormlyMatSelectModule)();
};
FormlyMatSelectModule.ɵmod = ɵɵdefineNgModule({
  type: FormlyMatSelectModule,
  declarations: [FormlyFieldSelect],
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatPseudoCheckboxModule, FormlyMatFormFieldModule, FormlySelectModule, FormlyModule]
});
FormlyMatSelectModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, ReactiveFormsModule, MatSelectModule, MatPseudoCheckboxModule, FormlyMatFormFieldModule, FormlySelectModule, FormlyModule.forChild({
    types: [{
      name: "select",
      component: FormlyFieldSelect,
      wrappers: ["form-field"]
    }, {
      name: "enum",
      extends: "select"
    }]
  })]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyMatSelectModule, [{
    type: NgModule,
    args: [{
      declarations: [FormlyFieldSelect],
      imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatPseudoCheckboxModule, FormlyMatFormFieldModule, FormlySelectModule, FormlyModule.forChild({
        types: [{
          name: "select",
          component: FormlyFieldSelect,
          wrappers: ["form-field"]
        }, {
          name: "enum",
          extends: "select"
        }]
      })]
    }]
  }], null, null);
})();

// node_modules/@ngx-formly/material/fesm2020/ngx-formly-material.mjs
var FormlyMaterialModule = class {
};
FormlyMaterialModule.ɵfac = function FormlyMaterialModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FormlyMaterialModule)();
};
FormlyMaterialModule.ɵmod = ɵɵdefineNgModule({
  type: FormlyMaterialModule,
  imports: [FormlyMatFormFieldModule, FormlyMatInputModule, FormlyMatTextAreaModule, FormlyMatRadioModule, FormlyMatCheckboxModule, FormlyMatMultiCheckboxModule, FormlyMatSelectModule]
});
FormlyMaterialModule.ɵinj = ɵɵdefineInjector({
  imports: [[FormlyMatFormFieldModule, FormlyMatInputModule, FormlyMatTextAreaModule, FormlyMatRadioModule, FormlyMatCheckboxModule, FormlyMatMultiCheckboxModule, FormlyMatSelectModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormlyMaterialModule, [{
    type: NgModule,
    args: [{
      imports: [FormlyMatFormFieldModule, FormlyMatInputModule, FormlyMatTextAreaModule, FormlyMatRadioModule, FormlyMatCheckboxModule, FormlyMatMultiCheckboxModule, FormlyMatSelectModule]
    }]
  }], null, null);
})();
export {
  FieldType,
  FormlyMaterialModule
};
//# sourceMappingURL=@ngx-formly_material.js.map
