import {
  NgxFileUploadFactory,
  NgxFileUploadState,
  NgxFileUploadStorage
} from "./chunk-4YZEFOLS.js";
import "./chunk-6FVM5ZDU.js";
import {
  CommonModule,
  KeyValuePipe,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  NgTemplateOutlet
} from "./chunk-R3EXXSPB.js";
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  Optional,
  Output,
  Pipe,
  Renderer2,
  TemplateRef,
  ViewChild,
  setClassMetadata,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
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
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpropertyInterpolate,
  ɵɵpropertyInterpolate1,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-57TCTXNO.js";
import "./chunk-O6VDDHVS.js";
import "./chunk-IXUSS67I.js";
import {
  Subject,
  debounceTime,
  takeUntil
} from "./chunk-BONRK7YY.js";
import "./chunk-PEHFQLBM.js";

// node_modules/@ngx-file-upload/ui/fesm2022/ngx-file-upload-ui.mjs
var _c0 = ["defaultUploadItem"];
var _c1 = (a0, a1) => [a0, a1];
var _c2 = (a0) => ({
  width: a0
});
function UploadItemComponent_ng_template_0_button_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 23);
    ɵɵlistener("click", function UploadItemComponent_ng_template_0_button_17_Template_button_click_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctrl_r2 = ɵɵnextContext().ctrl;
      return ɵɵresetView(ctrl_r2.start($event));
    });
    ɵɵelement(1, "i", 24);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const upload_r4 = ɵɵnextContext().data;
    const ctx_r4 = ɵɵnextContext();
    ɵɵproperty("disabled", upload_r4.state !== ctx_r4.uploadState.IDLE);
  }
}
function UploadItemComponent_ng_template_0_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 25);
    ɵɵlistener("click", function UploadItemComponent_ng_template_0_button_18_Template_button_click_0_listener($event) {
      ɵɵrestoreView(_r6);
      const ctrl_r2 = ɵɵnextContext().ctrl;
      return ɵɵresetView(ctrl_r2.retry($event));
    });
    ɵɵelement(1, "i", 26);
    ɵɵelementEnd();
  }
}
function UploadItemComponent_ng_template_0_ul_23_li_3_li_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 30);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const suberror_r8 = ctx.$implicit;
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", suberror_r8.value, " ");
  }
}
function UploadItemComponent_ng_template_0_ul_23_li_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 30);
    ɵɵtext(1);
    ɵɵelementStart(2, "ul");
    ɵɵtemplate(3, UploadItemComponent_ng_template_0_ul_23_li_3_li_3_Template, 2, 1, "li", 29);
    ɵɵpipe(4, "keyvalue");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const invalidFile_r9 = ctx.$implicit;
    const ctx_r4 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", invalidFile_r9.key, " ");
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ɵɵpipeBind2(4, 2, invalidFile_r9.value, ctx_r4.returnZero));
  }
}
function UploadItemComponent_ng_template_0_ul_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ul", 27)(1, "button", 28);
    ɵɵlistener("click", function UploadItemComponent_ng_template_0_ul_23_Template_button_click_1_listener($event) {
      ɵɵrestoreView(_r7);
      const ctrl_r2 = ɵɵnextContext().ctrl;
      return ɵɵresetView(ctrl_r2.removeInvalidFiles($event));
    });
    ɵɵtext(2, "remove invalid");
    ɵɵelementEnd();
    ɵɵtemplate(3, UploadItemComponent_ng_template_0_ul_23_li_3_Template, 5, 5, "li", 29);
    ɵɵpipe(4, "keyvalue");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const upload_r4 = ɵɵnextContext().data;
    const ctx_r4 = ɵɵnextContext();
    ɵɵadvance(3);
    ɵɵproperty("ngForOf", ɵɵpipeBind2(4, 1, upload_r4.validationErrors, ctx_r4.returnZero));
  }
}
function UploadItemComponent_ng_template_0_ng_container_24_ul_1_li_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 35);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const error_r10 = ctx.$implicit;
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", error_r10, " ");
  }
}
function UploadItemComponent_ng_template_0_ng_container_24_ul_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 33);
    ɵɵtemplate(1, UploadItemComponent_ng_template_0_ng_container_24_ul_1_li_1_Template, 2, 1, "li", 34);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const upload_r4 = ɵɵnextContext(2).data;
    ɵɵadvance();
    ɵɵproperty("ngForOf", upload_r4.response.errors);
  }
}
function UploadItemComponent_ng_template_0_ng_container_24_p_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const upload_r4 = ɵɵnextContext(3).data;
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", upload_r4.response.body.message, " ");
  }
}
function UploadItemComponent_ng_template_0_ng_container_24_p_2_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const upload_r4 = ɵɵnextContext(3).data;
    const ctx_r4 = ɵɵnextContext();
    ɵɵtextInterpolate2(" ", upload_r4.name, " ", (ctx_r4.i18n == null ? null : ctx_r4.i18n.UPLOADED) || "uploaded", " ");
  }
}
function UploadItemComponent_ng_template_0_ng_container_24_p_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "p", 36);
    ɵɵtemplate(1, UploadItemComponent_ng_template_0_ng_container_24_p_2_ng_container_1_Template, 2, 1, "ng-container", 37)(2, UploadItemComponent_ng_template_0_ng_container_24_p_2_ng_template_2_Template, 1, 2, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const uploadSuccess_r11 = ɵɵreference(3);
    const upload_r4 = ɵɵnextContext(2).data;
    ɵɵadvance();
    ɵɵproperty("ngIf", upload_r4.response.body && upload_r4.response.body.message)("ngIfElse", uploadSuccess_r11);
  }
}
function UploadItemComponent_ng_template_0_ng_container_24_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, UploadItemComponent_ng_template_0_ng_container_24_ul_1_Template, 2, 1, "ul", 31)(2, UploadItemComponent_ng_template_0_ng_container_24_p_2_Template, 4, 2, "p", 32);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const upload_r4 = ɵɵnextContext().data;
    ɵɵadvance();
    ɵɵproperty("ngIf", upload_r4.response.errors);
    ɵɵadvance();
    ɵɵproperty("ngIf", !upload_r4.response.errors);
  }
}
function UploadItemComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 3)(1, "div", 4)(2, "span", 5);
    ɵɵtext(3);
    ɵɵelementEnd();
    ɵɵelementStart(4, "button", 6);
    ɵɵlistener("click", function UploadItemComponent_ng_template_0_Template_button_click_4_listener($event) {
      const ctrl_r2 = ɵɵrestoreView(_r1).ctrl;
      return ɵɵresetView(ctrl_r2.remove($event));
    });
    ɵɵelement(5, "i", 7);
    ɵɵelementEnd()();
    ɵɵelementStart(6, "div", 8)(7, "div", 9);
    ɵɵelement(8, "i", 10);
    ɵɵpipe(9, "stateToString");
    ɵɵelementEnd();
    ɵɵelementStart(10, "div", 11)(11, "div", 12)(12, "span", 13);
    ɵɵtext(13);
    ɵɵpipe(14, "fileSize");
    ɵɵelementEnd();
    ɵɵelement(15, "div", 14);
    ɵɵelementEnd()();
    ɵɵelementStart(16, "div", 15);
    ɵɵtemplate(17, UploadItemComponent_ng_template_0_button_17_Template, 2, 1, "button", 16)(18, UploadItemComponent_ng_template_0_button_18_Template, 2, 0, "button", 17);
    ɵɵelementStart(19, "button", 18);
    ɵɵpipe(20, "isCancelAble");
    ɵɵlistener("click", function UploadItemComponent_ng_template_0_Template_button_click_19_listener($event) {
      const ctrl_r2 = ɵɵrestoreView(_r1).ctrl;
      return ɵɵresetView(ctrl_r2.stop($event));
    });
    ɵɵelement(21, "i", 19);
    ɵɵelementEnd()()();
    ɵɵelementStart(22, "div", 20);
    ɵɵtemplate(23, UploadItemComponent_ng_template_0_ul_23_Template, 5, 4, "ul", 21)(24, UploadItemComponent_ng_template_0_ng_container_24_Template, 3, 2, "ng-container", 22);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const upload_r4 = ctx.data;
    const ctx_r4 = ɵɵnextContext();
    ɵɵadvance(3);
    ɵɵtextInterpolate1(" ", upload_r4.name, " ");
    ɵɵadvance(5);
    ɵɵproperty("ngClass", ɵɵpureFunction2(15, _c1, "ngx-fileupload-icon--" + ɵɵpipeBind1(9, 9, upload_r4.state), upload_r4.state === ctx_r4.uploadState.COMPLETED ? upload_r4.hasError ? "error" : "success" : ""));
    ɵɵadvance(5);
    ɵɵtextInterpolate(ɵɵpipeBind1(14, 11, upload_r4.size));
    ɵɵadvance(2);
    ɵɵproperty("ngStyle", ɵɵpureFunction1(18, _c2, upload_r4.progress + "%"));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !upload_r4.hasError && upload_r4.state !== ctx_r4.uploadState.CANCELED);
    ɵɵadvance();
    ɵɵproperty("ngIf", upload_r4.hasError || upload_r4.state === ctx_r4.uploadState.CANCELED);
    ɵɵadvance();
    ɵɵproperty("disabled", !ɵɵpipeBind1(20, 13, upload_r4.state));
    ɵɵadvance(4);
    ɵɵproperty("ngIf", upload_r4.validationErrors);
    ɵɵadvance();
    ɵɵproperty("ngIf", upload_r4.state === ctx_r4.uploadState.COMPLETED);
  }
}
function UploadViewComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 4);
    ɵɵelement(1, "i", 5);
    ɵɵelementStart(2, "span");
    ɵɵtext(3);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(3);
    ɵɵtextInterpolate((ctx_r0.i18n == null ? null : ctx_r0.i18n.SELECT_FILES) || "Drag/Drop files here or click");
  }
}
function UploadViewComponent_div_3_ngx_file_upload_ui__item_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "ngx-file-upload-ui--item", 8);
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("upload", item_r2)("template", ctx_r0.itemTemplate);
  }
}
function UploadViewComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 6);
    ɵɵtemplate(1, UploadViewComponent_div_3_ngx_file_upload_ui__item_1_Template, 1, 2, "ngx-file-upload-ui--item", 7);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r0.uploads);
  }
}
var _c3 = ["progressbar"];
var _c4 = ["progressLine"];
var _c5 = (a0) => ({
  "stroke-dasharray": a0
});
var NgxFileUploadUiI18nKey;
(function(NgxFileUploadUiI18nKey2) {
  NgxFileUploadUiI18nKey2["Common"] = "common";
  NgxFileUploadUiI18nKey2["UploadItem"] = "item";
  NgxFileUploadUiI18nKey2["ToolBar"] = "toolbar";
})(NgxFileUploadUiI18nKey || (NgxFileUploadUiI18nKey = {}));
var NGX_FILE_UPLOAD_UI_I18N = new InjectionToken("NgxFileUpload UI I18n labels");
var NgxFileUploadUiI18nProvider = class _NgxFileUploadUiI18nProvider {
  constructor(labels) {
    this.labels = labels || {};
  }
  getI18n(k) {
    return this.labels[k.toString()];
  }
  static {
    this.ɵfac = function NgxFileUploadUiI18nProvider_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxFileUploadUiI18nProvider)(ɵɵinject(NGX_FILE_UPLOAD_UI_I18N, 8));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _NgxFileUploadUiI18nProvider,
      factory: _NgxFileUploadUiI18nProvider.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxFileUploadUiI18nProvider, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [NGX_FILE_UPLOAD_UI_I18N]
      }]
    }];
  }, null);
})();
var UploadToolbarComponent = class _UploadToolbarComponent {
  constructor(i18nProvider) {
    this.i18nProvider = i18nProvider;
    this.uploadInfo = {
      error: 0,
      pending: 0,
      idle: 0,
      progress: 0
    };
    this.hasUploadsInList = false;
    this.isCleanable = false;
    this.destroyed$ = new Subject();
  }
  ngOnInit() {
    this.i18n = this.i18nProvider.getI18n(NgxFileUploadUiI18nKey.ToolBar);
    this.registerStoreChange();
  }
  ngOnDestroy() {
    this.destroyed$.next(true);
  }
  /** start upload for all files */
  uploadAll() {
    if (this.storage) {
      this.storage.startAll();
    }
  }
  /** stop all uploads */
  stopAll() {
    if (this.storage) {
      this.storage.stopAll();
    }
  }
  /** purge uploads, invalid, completed, canceled will be removed */
  cleanAll() {
    if (this.storage) {
      this.storage.purge();
    }
  }
  registerStoreChange() {
    if (this.storage) {
      this.storage.change().pipe(debounceTime(10), takeUntil(this.destroyed$)).subscribe((uploads) => {
        this.updateInfoBar(uploads);
        this.isCleanable = uploads.some((upload) => upload.isCompleted(true) || upload.isInvalid());
        this.hasUploadsInList = uploads.length > 0;
      });
    }
  }
  updateInfoBar(uploads) {
    this.uploadInfo = uploads.reduce((data, upload) => {
      return {
        error: data.error + (upload.hasError() || upload.isInvalid() ? 1 : 0),
        idle: data.idle + (upload.isIdle() ? 1 : 0),
        pending: data.pending + (upload.isPending() ? 1 : 0),
        progress: data.progress + (upload.isProgress() ? 1 : 0)
      };
    }, {
      idle: 0,
      pending: 0,
      error: 0,
      progress: 0
    });
  }
  static {
    this.ɵfac = function UploadToolbarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UploadToolbarComponent)(ɵɵdirectiveInject(NgxFileUploadUiI18nProvider));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _UploadToolbarComponent,
      selectors: [["ngx-file-upload-ui--toolbar"]],
      inputs: {
        storage: "storage"
      },
      decls: 27,
      vars: 11,
      consts: [[1, "actions"], [1, "upload-all", 3, "click", "disabled"], [1, "ngx-fileupload-icon--upload"], [1, "clean", 3, "click", "disabled"], [1, "remove-all", 3, "click", "disabled"], [1, "info"], [1, "ngx-fileupload-icon--pending"], [1, "ngx-fileupload-icon--idle"], [1, "ngx-fileupload-icon--error"]],
      template: function UploadToolbarComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 0)(1, "button", 1);
          ɵɵlistener("click", function UploadToolbarComponent_Template_button_click_1_listener() {
            return ctx.uploadAll();
          });
          ɵɵelement(2, "i", 2);
          ɵɵtext(3);
          ɵɵelementEnd();
          ɵɵelementStart(4, "button", 3);
          ɵɵlistener("click", function UploadToolbarComponent_Template_button_click_4_listener() {
            return ctx.cleanAll();
          });
          ɵɵtext(5);
          ɵɵelementEnd();
          ɵɵelementStart(6, "button", 4);
          ɵɵlistener("click", function UploadToolbarComponent_Template_button_click_6_listener() {
            return ctx.stopAll();
          });
          ɵɵtext(7);
          ɵɵelementEnd()();
          ɵɵelementStart(8, "div", 5);
          ɵɵtext(9);
          ɵɵelementStart(10, "ul")(11, "li");
          ɵɵelement(12, "i", 2);
          ɵɵelementStart(13, "span");
          ɵɵtext(14);
          ɵɵelementEnd()();
          ɵɵelementStart(15, "li");
          ɵɵelement(16, "i", 6);
          ɵɵelementStart(17, "span");
          ɵɵtext(18);
          ɵɵelementEnd()();
          ɵɵelementStart(19, "li");
          ɵɵelement(20, "i", 7);
          ɵɵelementStart(21, "span");
          ɵɵtext(22);
          ɵɵelementEnd()();
          ɵɵelementStart(23, "li");
          ɵɵelement(24, "i", 8);
          ɵɵelementStart(25, "span");
          ɵɵtext(26);
          ɵɵelementEnd()()()();
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵproperty("disabled", ctx.uploadInfo.idle === 0);
          ɵɵadvance(2);
          ɵɵtextInterpolate1(" ", (ctx.i18n == null ? null : ctx.i18n.UPLOAD_ALL) || "Upload all", " ");
          ɵɵadvance();
          ɵɵproperty("disabled", !ctx.isCleanable);
          ɵɵadvance();
          ɵɵtextInterpolate1(" ", (ctx.i18n == null ? null : ctx.i18n.CLEAN_UP) || "Clear", " ");
          ɵɵadvance();
          ɵɵproperty("disabled", !ctx.hasUploadsInList);
          ɵɵadvance();
          ɵɵtextInterpolate1(" ", (ctx.i18n == null ? null : ctx.i18n.REMOVE_ALL) || "Remove", " ");
          ɵɵadvance(2);
          ɵɵtextInterpolate1(" ", (ctx.i18n == null ? null : ctx.i18n.UPLOADS) || "Uploads", ": ");
          ɵɵadvance(5);
          ɵɵtextInterpolate(ctx.uploadInfo.progress);
          ɵɵadvance(4);
          ɵɵtextInterpolate(ctx.uploadInfo.pending);
          ɵɵadvance(4);
          ɵɵtextInterpolate(ctx.uploadInfo.idle);
          ɵɵadvance(4);
          ɵɵtextInterpolate(ctx.uploadInfo.error);
        }
      },
      styles: ['@keyframes _ngcontent-%COMP%_rotating{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@font-face{font-family:ngx-fileupload;src:url(data:application/vnd.ms-fontobject;base64,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);src:url(data:application/vnd.ms-fontobject;base64,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) format("embedded-opentype"),url(data:font/ttf;base64,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) format("truetype"),url(data:font/woff;base64,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) format("woff"),url("data:image/svg+xml,%3C%3Fxml version%3D%221.0%22 standalone%3D%22no%22%3F%3E%0D%3C!DOCTYPE svg PUBLIC %22-%2F%2FW3C%2F%2FDTD SVG 1.1%2F%2FEN%22 %22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22 %3E%0D%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0D%3Cmetadata%3EGenerated by IcoMoon%3C%2Fmetadata%3E%0D%3Cdefs%3E%0D%3Cfont id%3D%22ngx-fileupload%22 horiz-adv-x%3D%221024%22%3E%0D%3Cfont-face units-per-em%3D%221024%22 ascent%3D%22960%22 descent%3D%22-64%22 %2F%3E%0D%3Cmissing-glyph horiz-adv-x%3D%221024%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23x20%3B%22 horiz-adv-x%3D%22512%22 d%3D%22%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe900%3B%22 glyph-name%3D%22upload%22 horiz-adv-x%3D%221097%22 d%3D%22M731.429 457.143c0 4.571-1.714 9.714-5.143 13.143l-201.143 201.143c-3.429 3.429-8 5.143-13.143 5.143-4.571 0-9.714-1.714-13.143-5.143l-200.571-200.571c-3.429-4-5.714-8.571-5.714-13.714 0-10.286 8-18.286 18.286-18.286h128v-201.143c0-9.714 8.571-18.286 18.286-18.286h109.714c9.714 0 18.286 8.571 18.286 18.286v201.143h128c10.286 0 18.286 8.571 18.286 18.286zM1097.143 292.571c0-121.143-98.286-219.429-219.429-219.429h-621.714c-141.143 0-256 114.857-256 256 0 99.429 57.714 189.714 147.429 231.429-0.571 8.571-1.143 16.571-1.143 24.571 0 161.714 130.857 292.571 292.571 292.571 118.857 0 225.714-72 270.857-181.714 26.286 22.857 60 35.429 94.857 35.429 80.571 0 146.286-65.714 146.286-146.286 0-28-8-55.429-23.429-78.857 99.429-23.429 169.714-112 169.714-213.714z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe94e%3B%22 glyph-name%3D%22pending%22 d%3D%22M658.744 210.744l-210.744 210.746v282.51h128v-229.49l173.256-173.254zM512 960c-282.77 0-512-229.23-512-512s229.23-512 512-512 512 229.23 512 512-229.23 512-512 512zM512 64c-212.078 0-384 171.922-384 384s171.922 384 384 384c212.078 0 384-171.922 384-384s-171.922-384-384-384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe979%3B%22 glyph-name%3D%22idle%22 d%3D%22M728.992 448c137.754 87.334 231.008 255.208 231.008 448 0 21.676-1.192 43.034-3.478 64h-889.042c-2.29-20.968-3.48-42.326-3.48-64 0-192.792 93.254-360.666 231.006-448-137.752-87.334-231.006-255.208-231.006-448 0-21.676 1.19-43.034 3.478-64h889.042c2.288 20.966 3.478 42.324 3.478 64 0.002 192.792-93.252 360.666-231.006 448zM160 0c0 186.912 80.162 345.414 224 397.708v100.586c-143.838 52.29-224 210.792-224 397.706v0h704c0-186.914-80.162-345.416-224-397.706v-100.586c143.838-52.294 224-210.796 224-397.708h-704zM619.626 290.406c-71.654 40.644-75.608 93.368-75.626 125.366v64.228c0 31.994 3.804 84.914 75.744 125.664 38.504 22.364 71.808 56.348 97.048 98.336h-409.582c25.266-42.032 58.612-76.042 97.166-98.406 71.654-40.644 75.606-93.366 75.626-125.366v-64.228c0-31.992-3.804-84.914-75.744-125.664-72.622-42.18-126.738-125.684-143.090-226.336h501.67c-16.364 100.708-70.53 184.248-143.212 226.406z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe984%3B%22 glyph-name%3D%22reload%22 d%3D%22M1024 576h-384l143.53 143.53c-72.53 72.526-168.96 112.47-271.53 112.47s-199-39.944-271.53-112.47c-72.526-72.53-112.47-168.96-112.47-271.53s39.944-199 112.47-271.53c72.53-72.526 168.96-112.47 271.53-112.47s199 39.944 271.528 112.472c6.056 6.054 11.86 12.292 17.456 18.668l96.32-84.282c-93.846-107.166-231.664-174.858-385.304-174.858-282.77 0-512 229.23-512 512s229.23 512 512 512c141.386 0 269.368-57.326 362.016-149.984l149.984 149.984v-384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea07%3B%22 glyph-name%3D%22error%22 d%3D%22M512 867.226l429.102-855.226h-858.206l429.104 855.226zM512 960c-22.070 0-44.14-14.882-60.884-44.648l-437.074-871.112c-33.486-59.532-5-108.24 63.304-108.24h869.308c68.3 0 96.792 48.708 63.3 108.24h0.002l-437.074 871.112c-16.742 29.766-38.812 44.648-60.882 44.648v0zM576 128c0-35.346-28.654-64-64-64s-64 28.654-64 64c0 35.346 28.654 64 64 64s64-28.654 64-64zM512 256c-35.346 0-64 28.654-64 64v192c0 35.346 28.654 64 64 64s64-28.654 64-64v-192c0-35.346-28.654-64-64-64z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0a%3B%22 glyph-name%3D%22plus%22 d%3D%22M992 576h-352v352c0 17.672-14.328 32-32 32h-192c-17.672 0-32-14.328-32-32v-352h-352c-17.672 0-32-14.328-32-32v-192c0-17.672 14.328-32 32-32h352v-352c0-17.672 14.328-32 32-32h192c17.672 0 32 14.328 32 32v352h352c17.672 0 32 14.328 32 32v192c0 17.672-14.328 32-32 32z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0d%3B%22 glyph-name%3D%22remove%22 d%3D%22M512 960c-282.77 0-512-229.23-512-512s229.23-512 512-512 512 229.23 512 512-229.23 512-512 512zM512 32c-229.75 0-416 186.25-416 416s186.25 416 416 416 416-186.25 416-416-186.25-416-416-416zM672 704l-160-160-160 160-96-96 160-160-160-160 96-96 160 160 160-160 96 96-160 160 160 160z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0e%3B%22 glyph-name%3D%22canceled%22 d%3D%22M874.040 810.040c-96.706 96.702-225.28 149.96-362.040 149.96s-265.334-53.258-362.040-149.96c-96.702-96.706-149.96-225.28-149.96-362.040s53.258-265.334 149.96-362.040c96.706-96.702 225.28-149.96 362.040-149.96s265.334 53.258 362.040 149.96c96.702 96.706 149.96 225.28 149.96 362.040s-53.258 265.334-149.96 362.040zM896 448c0-82.814-26.354-159.588-71.112-222.38l-535.266 535.268c62.792 44.758 139.564 71.112 222.378 71.112 211.738 0 384-172.262 384-384zM128 448c0 82.814 26.354 159.586 71.112 222.378l535.27-535.268c-62.794-44.756-139.568-71.11-222.382-71.11-211.738 0-384 172.262-384 384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea10%3B%22 glyph-name%3D%22success%22 d%3D%22M864 832l-480-480-224 224-160-160 384-384 640 640z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea2e%3B%22 glyph-name%3D%22progress%22 d%3D%22M889.68 793.68c-93.608 102.216-228.154 166.32-377.68 166.32-282.77 0-512-229.23-512-512h96c0 229.75 186.25 416 416 416 123.020 0 233.542-53.418 309.696-138.306l-149.696-149.694h352v352l-134.32-134.32zM928 448c0-229.75-186.25-416-416-416-123.020 0-233.542 53.418-309.694 138.306l149.694 149.694h-352v-352l134.32 134.32c93.608-102.216 228.154-166.32 377.68-166.32 282.77 0 512 229.23 512 512h-96z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xf07e%3B%22 glyph-name%3D%22connect%22 d%3D%22M1024 438.857c0-9.714-4-18.857-10.857-25.714l-146.286-146.286c-6.857-6.857-16-10.857-25.714-10.857-20 0-36.571 16.571-36.571 36.571v73.143h-585.143v-73.143c0-20-16.571-36.571-36.571-36.571-9.714 0-18.857 4-25.714 10.857l-146.286 146.286c-6.857 6.857-10.857 16-10.857 25.714s4 18.857 10.857 25.714l146.286 146.286c6.857 6.857 16 10.857 25.714 10.857 20 0 36.571-16.571 36.571-36.571v-73.143h585.143v73.143c0 20 16.571 36.571 36.571 36.571 9.714 0 18.857-4 25.714-10.857l146.286-146.286c6.857-6.857 10.857-16 10.857-25.714z%22 %2F%3E%0D%3C%2Ffont%3E%3C%2Fdefs%3E%3C%2Fsvg%3E") format("svg");font-weight:400;font-style:normal;font-display:block}[class^=ngx-fileupload-icon--][_ngcontent-%COMP%], [class*=" ngx-fileupload-icon--"][_ngcontent-%COMP%]{font-family:ngx-fileupload!important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1rem;font-size:inherit;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.ngx-fileupload-icon--start[_ngcontent-%COMP%]:before{color:#0073b1;content:"\\f07e"}.ngx-fileupload-icon--progress[_ngcontent-%COMP%]{color:#0073b1;display:inline-block;animation:_ngcontent-%COMP%_rotating 2s linear infinite}.ngx-fileupload-icon--progress[_ngcontent-%COMP%]:before{content:"\\ea2e"}.ngx-fileupload-icon--invalid[_ngcontent-%COMP%], .ngx-fileupload-icon--error[_ngcontent-%COMP%]{color:#d8000c}.ngx-fileupload-icon--invalid[_ngcontent-%COMP%]:before, .ngx-fileupload-icon--error[_ngcontent-%COMP%]:before{content:"\\ea07"}.ngx-fileupload-icon--upload[_ngcontent-%COMP%]:before{content:"\\e900"}.ngx-fileupload-icon--pending[_ngcontent-%COMP%]:before{content:"\\e94e"}.ngx-fileupload-icon--idle[_ngcontent-%COMP%]:before{content:"\\e979"}.ngx-fileupload-icon--reload[_ngcontent-%COMP%]:before{content:"\\e984"}.ngx-fileupload-icon--remove[_ngcontent-%COMP%]:before{content:"\\ea0d"}.ngx-fileupload-icon--add[_ngcontent-%COMP%]:before{content:"\\ea0a"}.ngx-fileupload-icon--cancel[_ngcontent-%COMP%]:before, .ngx-fileupload-icon--canceled[_ngcontent-%COMP%]:before{content:"\\ea0e"}.ngx-fileupload-icon--completed.success[_ngcontent-%COMP%]{color:#4bb543}.ngx-fileupload-icon--completed.success[_ngcontent-%COMP%]:before{content:"\\ea10"}.ngx-fileupload-icon--completed.error[_ngcontent-%COMP%]:before{content:"\\ea07"}[_nghost-%COMP%]{display:flex;background:#37474f;justify-content:space-between}[_nghost-%COMP%]   .info[_ngcontent-%COMP%]{padding:0 1rem;color:#c0ccd2;display:flex;align-items:center}[_nghost-%COMP%]   .info[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:0;padding:0;list-style-type:none;display:flex;flex-direction:row}[_nghost-%COMP%]   .info[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;align-items:center}[_nghost-%COMP%]   .info[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:inherit;margin:0 .25rem 0 .5rem;align-self:stretch;line-height:1.4rem}[_nghost-%COMP%]   .info[_ngcontent-%COMP%]   i[class$=upload][_ngcontent-%COMP%]{font-size:1.1rem}[_nghost-%COMP%]   .actions[_ngcontent-%COMP%]{display:flex}[_nghost-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:flex;padding:.25rem .5rem;border:0;align-items:center;color:#dee4e7;background:transparent;cursor:pointer;outline:none}[_nghost-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{margin-right:.5rem}[_nghost-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-child{margin:0}[_nghost-%COMP%]   .actions[_ngcontent-%COMP%]   button[disabled][_ngcontent-%COMP%]{color:#698390;cursor:default}']
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UploadToolbarComponent, [{
    type: Component,
    args: [{
      selector: "ngx-file-upload-ui--toolbar",
      template: '<div class="actions">\r\n    <button class="upload-all" [disabled]="uploadInfo.idle === 0" (click)="uploadAll()">\r\n        <i class="ngx-fileupload-icon--upload"></i>\r\n        {{i18n?.UPLOAD_ALL || "Upload all"}}\r\n    </button>\r\n    <button class="clean" [disabled]="!isCleanable" (click)="cleanAll()">\r\n        {{i18n?.CLEAN_UP || "Clear"}}\r\n    </button>\r\n    <button class="remove-all" [disabled]="!hasUploadsInList" (click)="stopAll()">\r\n        {{i18n?.REMOVE_ALL || "Remove"}}\r\n    </button>\r\n</div>\r\n\r\n<div class="info">\r\n    {{ i18n?.UPLOADS || "Uploads" }}:\r\n    <ul>\r\n        <li>\r\n            <i class="ngx-fileupload-icon--upload"></i>\r\n            <span>{{uploadInfo.progress}}</span>\r\n        </li>\r\n        <li>\r\n            <i class="ngx-fileupload-icon--pending"></i>\r\n            <span>{{uploadInfo.pending}}</span>\r\n        </li>\r\n        <li>\r\n            <i class="ngx-fileupload-icon--idle"></i>\r\n            <span>{{uploadInfo.idle}}</span>\r\n        </li>\r\n        <li>\r\n            <i class="ngx-fileupload-icon--error"></i>\r\n            <span>{{uploadInfo.error}}</span>\r\n        </li>\r\n    </ul>\r\n</div>\r\n',
      styles: ['@keyframes rotating{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@font-face{font-family:ngx-fileupload;src:url(data:application/vnd.ms-fontobject;base64,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);src:url(data:application/vnd.ms-fontobject;base64,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) format("embedded-opentype"),url(data:font/ttf;base64,AAEAAAALAIAAAwAwT1MvMg8SDYMAAAC8AAAAYGNtYXCX45HpAAABHAAAAJxnYXNwAAAAEAAAAbgAAAAIZ2x5Zv81GDoAAAHAAAAIMGhlYWQXHsFBAAAJ8AAAADZoaGVhCAsEGQAACigAAAAkaG10eDJJAE4AAApMAAAAPGxvY2EMhg6wAAAKiAAAACBtYXhwABQAagAACqgAAAAgbmFtZev9QeQAAArIAAAB2nBvc3QAAwAAAAAMpAAAACAAAwPbAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADwfgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAgAAAABwAEAADAAwAAQAg6QDpTul56YTqB+oK6g7qEOou8H7//f//AAAAAAAg6QDpTul56YTqB+oK6g3qEOou8H7//f//AAH/4xcEFrcWjRaDFgEV/xX9FfwV3w+QAAMAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAACAAAASQRJA24AHwBPAAABNCYvAS4BIyIGDwEOARUUFjsBFRQWOwEyNj0BMzI2NQUUBw4BBwYjISInLgEnJjU0Njc0JjU0Nz4BNzYzMhceARcWFz4BMzIWFRQGBx4BFQLbAgPJAgcEAwgCyQIDCgiACwduBwuACAoBbhERPCgoLf2SNS8uRhQUUEMBFxdQNTU9LCoqRhwcERMxGzxWDAxLXwHJBAcCyQMDAwPIAwcECArJCAsLCMkLB6QuKCg7EhEUFEYvLjVLfSAGDAY9NTVQFxcNDTAhIikRElU9FSgSEXhMAAADAAD/wAQAA8AABQAhAD0AACUnETMVFwMiBw4BBwYVFBceARcWMzI3PgE3NjU0Jy4BJyYDIicuAScmNTQ3PgE3NjMyFx4BFxYVFAcOAQcGApPTgK3tal1eiygoKCiLXl1qal1eiygoKCiLXl1qUEVGaR4eHh5pRkVQUEVGaR4eHh5pRkXT0gEb5a4Ckygoi15dampdXosoKCgoi15dampdXosoKPyAHh5pRkVQUEVGaR4eHh5pRkVQUEVGaR4eAAADAED/wAPAA8AAKgBLAGcAAAE2Nz4BNzY1NCYnIQ4BFRQXHgEXFhcGBw4BBwYVFBYXIT4BNTQnLgEnJicBNDc+ATc2NzUmJy4BJyY1MSEUBw4BBwYHFRYXHgEXFhUDLgE9ATQ2Nz4BNyEeARceAR0BFAYHDgEHIS4BAtk0Kis9EBECAfyGAQIRED0rKjQ0Kis9EBECAQN6AQIRED0rKjT9xw8POSkqNjYqKTkPDwLADw85KSo2NiopOQ8P9DYWFjYdMRP+ZhMxHTYWFjY2TQwB9gxNAcAhLy9zQ0NIECAQECAQSENDcy8vISEvL3NDQ0gQIBAQIBBIQ0NzLy8h/kBGQD9oJyYUZBQmJ2g/QEZGQD9oJyYUZBQmJ2g/QEYBIh9HGEAYRx8QMx8gMhAfRxhAGEcfH3hLTHcAAAAAAQAA/8AEAAPAADUAAAEhNy4BIyIGBw4BFRQWFx4BMzI2Nz4BNxcGBw4BBwYjIicuAScmNTQ3PgE3NjMyFx4BFxYXNwQA/oCQN4xNTYw3Njo6NjeMTU2MNwQJBGAjKytiNjY6al1eiygoKCiLXl1qNTIyXCkpI5YCQJA2Ojo2N4xNTYw3Njo6NgUJBVQoISAtDQwoKIteXWpqXV6LKCgKCycbHCOWAAAABAAO/8AD8gPAAAMAFQAhAC8AAAkBIQE1IgYHAQYWMyEyNicxAS4BIzETFAYjIiY1NDYzMhYnIiY9ATQ2MzIWHQEUBgIAAa38pgGtER8N/ksZJTMDZjMlGf5LDR8RQCUbGyUlGxslQBslJRsbJSUDY/ypA1ddFhf8mSxAQCwDZxcW/MAbJSUbGyUlZSUbwBslJRvAGyUAAAABAAD/wAQAA8AAIwAAASERNCYrASIGFREhIgYdARQWMyERFBY7ATI2NREhMjY9ATQmA+D+oBMNwA0T/qANExMNAWATDcANEwFgDRMTAkABYA0TEw3+oBMNwA0T/qANExMNAWATDcANEwAAAAADAAD/wAQAA8AAGwA3AEMAAAEiBw4BBwYVFBceARcWMzI3PgE3NjU0Jy4BJyYDIicuAScmNTQ3PgE3NjMyFx4BFxYVFAcOAQcGEwcnBxcHFzcXNyc3AgBqXV6LKCgoKIteXWpqXV6LKCgoKIteXWpWTExxICEhIHFMTFZWTExxICEhIHFMTEqgoGCgoGCgoGCgoAPAKCiLXl1qal1eiygoKCiLXl1qal1eiygo/GAhIHFMTFZWTExxICEhIHFMTFZWTExxICECoKCgYKCgYKCgYKCgAAMAAP/ABAADwAA4AEYAVQAAASYnLgEnJiMiBw4BBwYHBgcOAQcGFRQXHgEXFhcWFx4BFxYzMjc+ATc2NzY3PgE3NjU0Jy4BJyYnExQGBwE+ATMyFx4BFxYFNDY3AQ4BIyInLgEnJjUDaiQqKlwxMjMzMjFcKiokJBwcJgoKCgomHBwkJCoqXDEyMzMyMVwqKiQkHBwmCgoKCiYcHCQWJiH96S9xPk9GRmkeHv0AJiECFy9xPk9GRmkeHgMqJBwcJgoKCgomHBwkJCoqXDEyMzMyMVwqKiQkHBwmCgoKCiYcHCQkKipcMTIzMzIxXCoqJP6WPnEvAhchJh4eaUZGTz5xL/3pISYeHmlGRk8AAAAAAQAAACAEAANAAAUAAAkBJwcJAQNg/iDgoAGAAoADQP4g4KD+gAKAAAIAAP/ABAADwAAhAEIAAAEmJy4BJyYjIgcOAQcGFTM0Nz4BNzYzMhceARcWFwchEQcTFAcOAQcGIyInLgEnJic3IRE3FhceARcWMzI3PgE3NjUDeiMrKmA1NThqXV6LKChgISBxTExWLiwrTyIjHZYBYIYmISBxTExWLiwrTyIjHZb+oIYjKypgNTU4al1eiygoAxomHx8rCwwoKIteXWpWTExxICEKCSQaGSCWAWCG/qZWTExxICEKCSQaGSCW/qCGJh8fKwsMKCiLXl1qAAABAAABAAQAAm4ALgAAARQGDwEOASMiJj0BIRUUBiMiJi8BLgE1NDY/AT4BMzIWHQEhNTQ2MzIWHwEeARUEAAYFkgUOBw8V/bYVDwcOBZIFBgYFkgUOBw8VAkoVDwcOBZIFBgG3Bw4FkgUGFg9JSQ8WBgWSBQ4HBw0GkgUGFg9JSQ8WBgWSBg0HAAAAAAEAAAABAABdxkCfXw889QALBAAAAAAA2ds+YgAAAADZ2z5iAAD/wARJA8AAAAAIAAIAAAAAAAAAAQAAA8D/wAAABEkAAAAABEkAAQAAAAAAAAAAAAAAAAAAAA8EAAAAAAAAAAAAAAACAAAABEkAAAQAAAAEAABABAAAAAQAAA4EAAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAAAAAoAFAAeAJAA8AGOAeICLgJkAs4DVgNqA9IEGAABAAAADwBoAAQAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEADgAAAAEAAAAAAAIABwCfAAEAAAAAAAMADgBLAAEAAAAAAAQADgC0AAEAAAAAAAUACwAqAAEAAAAAAAYADgB1AAEAAAAAAAoAGgDeAAMAAQQJAAEAHAAOAAMAAQQJAAIADgCmAAMAAQQJAAMAHABZAAMAAQQJAAQAHADCAAMAAQQJAAUAFgA1AAMAAQQJAAYAHACDAAMAAQQJAAoANAD4bmd4LWZpbGV1cGxvYWQAbgBnAHgALQBmAGkAbABlAHUAcABsAG8AYQBkVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwbmd4LWZpbGV1cGxvYWQAbgBnAHgALQBmAGkAbABlAHUAcABsAG8AYQBkbmd4LWZpbGV1cGxvYWQAbgBnAHgALQBmAGkAbABlAHUAcABsAG8AYQBkUmVndWxhcgBSAGUAZwB1AGwAYQBybmd4LWZpbGV1cGxvYWQAbgBnAHgALQBmAGkAbABlAHUAcABsAG8AYQBkRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==) format("truetype"),url(data:font/woff;base64,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) format("woff"),url("data:image/svg+xml,%3C%3Fxml version%3D%221.0%22 standalone%3D%22no%22%3F%3E%0D%3C!DOCTYPE svg PUBLIC %22-%2F%2FW3C%2F%2FDTD SVG 1.1%2F%2FEN%22 %22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22 %3E%0D%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0D%3Cmetadata%3EGenerated by IcoMoon%3C%2Fmetadata%3E%0D%3Cdefs%3E%0D%3Cfont id%3D%22ngx-fileupload%22 horiz-adv-x%3D%221024%22%3E%0D%3Cfont-face units-per-em%3D%221024%22 ascent%3D%22960%22 descent%3D%22-64%22 %2F%3E%0D%3Cmissing-glyph horiz-adv-x%3D%221024%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23x20%3B%22 horiz-adv-x%3D%22512%22 d%3D%22%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe900%3B%22 glyph-name%3D%22upload%22 horiz-adv-x%3D%221097%22 d%3D%22M731.429 457.143c0 4.571-1.714 9.714-5.143 13.143l-201.143 201.143c-3.429 3.429-8 5.143-13.143 5.143-4.571 0-9.714-1.714-13.143-5.143l-200.571-200.571c-3.429-4-5.714-8.571-5.714-13.714 0-10.286 8-18.286 18.286-18.286h128v-201.143c0-9.714 8.571-18.286 18.286-18.286h109.714c9.714 0 18.286 8.571 18.286 18.286v201.143h128c10.286 0 18.286 8.571 18.286 18.286zM1097.143 292.571c0-121.143-98.286-219.429-219.429-219.429h-621.714c-141.143 0-256 114.857-256 256 0 99.429 57.714 189.714 147.429 231.429-0.571 8.571-1.143 16.571-1.143 24.571 0 161.714 130.857 292.571 292.571 292.571 118.857 0 225.714-72 270.857-181.714 26.286 22.857 60 35.429 94.857 35.429 80.571 0 146.286-65.714 146.286-146.286 0-28-8-55.429-23.429-78.857 99.429-23.429 169.714-112 169.714-213.714z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe94e%3B%22 glyph-name%3D%22pending%22 d%3D%22M658.744 210.744l-210.744 210.746v282.51h128v-229.49l173.256-173.254zM512 960c-282.77 0-512-229.23-512-512s229.23-512 512-512 512 229.23 512 512-229.23 512-512 512zM512 64c-212.078 0-384 171.922-384 384s171.922 384 384 384c212.078 0 384-171.922 384-384s-171.922-384-384-384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe979%3B%22 glyph-name%3D%22idle%22 d%3D%22M728.992 448c137.754 87.334 231.008 255.208 231.008 448 0 21.676-1.192 43.034-3.478 64h-889.042c-2.29-20.968-3.48-42.326-3.48-64 0-192.792 93.254-360.666 231.006-448-137.752-87.334-231.006-255.208-231.006-448 0-21.676 1.19-43.034 3.478-64h889.042c2.288 20.966 3.478 42.324 3.478 64 0.002 192.792-93.252 360.666-231.006 448zM160 0c0 186.912 80.162 345.414 224 397.708v100.586c-143.838 52.29-224 210.792-224 397.706v0h704c0-186.914-80.162-345.416-224-397.706v-100.586c143.838-52.294 224-210.796 224-397.708h-704zM619.626 290.406c-71.654 40.644-75.608 93.368-75.626 125.366v64.228c0 31.994 3.804 84.914 75.744 125.664 38.504 22.364 71.808 56.348 97.048 98.336h-409.582c25.266-42.032 58.612-76.042 97.166-98.406 71.654-40.644 75.606-93.366 75.626-125.366v-64.228c0-31.992-3.804-84.914-75.744-125.664-72.622-42.18-126.738-125.684-143.090-226.336h501.67c-16.364 100.708-70.53 184.248-143.212 226.406z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe984%3B%22 glyph-name%3D%22reload%22 d%3D%22M1024 576h-384l143.53 143.53c-72.53 72.526-168.96 112.47-271.53 112.47s-199-39.944-271.53-112.47c-72.526-72.53-112.47-168.96-112.47-271.53s39.944-199 112.47-271.53c72.53-72.526 168.96-112.47 271.53-112.47s199 39.944 271.528 112.472c6.056 6.054 11.86 12.292 17.456 18.668l96.32-84.282c-93.846-107.166-231.664-174.858-385.304-174.858-282.77 0-512 229.23-512 512s229.23 512 512 512c141.386 0 269.368-57.326 362.016-149.984l149.984 149.984v-384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea07%3B%22 glyph-name%3D%22error%22 d%3D%22M512 867.226l429.102-855.226h-858.206l429.104 855.226zM512 960c-22.070 0-44.14-14.882-60.884-44.648l-437.074-871.112c-33.486-59.532-5-108.24 63.304-108.24h869.308c68.3 0 96.792 48.708 63.3 108.24h0.002l-437.074 871.112c-16.742 29.766-38.812 44.648-60.882 44.648v0zM576 128c0-35.346-28.654-64-64-64s-64 28.654-64 64c0 35.346 28.654 64 64 64s64-28.654 64-64zM512 256c-35.346 0-64 28.654-64 64v192c0 35.346 28.654 64 64 64s64-28.654 64-64v-192c0-35.346-28.654-64-64-64z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0a%3B%22 glyph-name%3D%22plus%22 d%3D%22M992 576h-352v352c0 17.672-14.328 32-32 32h-192c-17.672 0-32-14.328-32-32v-352h-352c-17.672 0-32-14.328-32-32v-192c0-17.672 14.328-32 32-32h352v-352c0-17.672 14.328-32 32-32h192c17.672 0 32 14.328 32 32v352h352c17.672 0 32 14.328 32 32v192c0 17.672-14.328 32-32 32z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0d%3B%22 glyph-name%3D%22remove%22 d%3D%22M512 960c-282.77 0-512-229.23-512-512s229.23-512 512-512 512 229.23 512 512-229.23 512-512 512zM512 32c-229.75 0-416 186.25-416 416s186.25 416 416 416 416-186.25 416-416-186.25-416-416-416zM672 704l-160-160-160 160-96-96 160-160-160-160 96-96 160 160 160-160 96 96-160 160 160 160z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0e%3B%22 glyph-name%3D%22canceled%22 d%3D%22M874.040 810.040c-96.706 96.702-225.28 149.96-362.040 149.96s-265.334-53.258-362.040-149.96c-96.702-96.706-149.96-225.28-149.96-362.040s53.258-265.334 149.96-362.040c96.706-96.702 225.28-149.96 362.040-149.96s265.334 53.258 362.040 149.96c96.702 96.706 149.96 225.28 149.96 362.040s-53.258 265.334-149.96 362.040zM896 448c0-82.814-26.354-159.588-71.112-222.38l-535.266 535.268c62.792 44.758 139.564 71.112 222.378 71.112 211.738 0 384-172.262 384-384zM128 448c0 82.814 26.354 159.586 71.112 222.378l535.27-535.268c-62.794-44.756-139.568-71.11-222.382-71.11-211.738 0-384 172.262-384 384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea10%3B%22 glyph-name%3D%22success%22 d%3D%22M864 832l-480-480-224 224-160-160 384-384 640 640z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea2e%3B%22 glyph-name%3D%22progress%22 d%3D%22M889.68 793.68c-93.608 102.216-228.154 166.32-377.68 166.32-282.77 0-512-229.23-512-512h96c0 229.75 186.25 416 416 416 123.020 0 233.542-53.418 309.696-138.306l-149.696-149.694h352v352l-134.32-134.32zM928 448c0-229.75-186.25-416-416-416-123.020 0-233.542 53.418-309.694 138.306l149.694 149.694h-352v-352l134.32 134.32c93.608-102.216 228.154-166.32 377.68-166.32 282.77 0 512 229.23 512 512h-96z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xf07e%3B%22 glyph-name%3D%22connect%22 d%3D%22M1024 438.857c0-9.714-4-18.857-10.857-25.714l-146.286-146.286c-6.857-6.857-16-10.857-25.714-10.857-20 0-36.571 16.571-36.571 36.571v73.143h-585.143v-73.143c0-20-16.571-36.571-36.571-36.571-9.714 0-18.857 4-25.714 10.857l-146.286 146.286c-6.857 6.857-10.857 16-10.857 25.714s4 18.857 10.857 25.714l146.286 146.286c6.857 6.857 16 10.857 25.714 10.857 20 0 36.571-16.571 36.571-36.571v-73.143h585.143v73.143c0 20 16.571 36.571 36.571 36.571 9.714 0 18.857-4 25.714-10.857l146.286-146.286c6.857-6.857 10.857-16 10.857-25.714z%22 %2F%3E%0D%3C%2Ffont%3E%3C%2Fdefs%3E%3C%2Fsvg%3E") format("svg");font-weight:400;font-style:normal;font-display:block}[class^=ngx-fileupload-icon--],[class*=" ngx-fileupload-icon--"]{font-family:ngx-fileupload!important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1rem;font-size:inherit;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.ngx-fileupload-icon--start:before{color:#0073b1;content:"\\f07e"}.ngx-fileupload-icon--progress{color:#0073b1;display:inline-block;animation:rotating 2s linear infinite}.ngx-fileupload-icon--progress:before{content:"\\ea2e"}.ngx-fileupload-icon--invalid,.ngx-fileupload-icon--error{color:#d8000c}.ngx-fileupload-icon--invalid:before,.ngx-fileupload-icon--error:before{content:"\\ea07"}.ngx-fileupload-icon--upload:before{content:"\\e900"}.ngx-fileupload-icon--pending:before{content:"\\e94e"}.ngx-fileupload-icon--idle:before{content:"\\e979"}.ngx-fileupload-icon--reload:before{content:"\\e984"}.ngx-fileupload-icon--remove:before{content:"\\ea0d"}.ngx-fileupload-icon--add:before{content:"\\ea0a"}.ngx-fileupload-icon--cancel:before,.ngx-fileupload-icon--canceled:before{content:"\\ea0e"}.ngx-fileupload-icon--completed.success{color:#4bb543}.ngx-fileupload-icon--completed.success:before{content:"\\ea10"}.ngx-fileupload-icon--completed.error:before{content:"\\ea07"}:host{display:flex;background:#37474f;justify-content:space-between}:host .info{padding:0 1rem;color:#c0ccd2;display:flex;align-items:center}:host .info ul{margin:0;padding:0;list-style-type:none;display:flex;flex-direction:row}:host .info li{display:flex;align-items:center}:host .info i{color:inherit;margin:0 .25rem 0 .5rem;align-self:stretch;line-height:1.4rem}:host .info i[class$=upload]{font-size:1.1rem}:host .actions{display:flex}:host .actions button{display:flex;padding:.25rem .5rem;border:0;align-items:center;color:#dee4e7;background:transparent;cursor:pointer;outline:none}:host .actions button i{margin-right:.5rem}:host .actions button:last-child{margin:0}:host .actions button[disabled]{color:#698390;cursor:default}\n']
    }]
  }], function() {
    return [{
      type: NgxFileUploadUiI18nProvider
    }];
  }, {
    storage: [{
      type: Input
    }]
  });
})();
var Control = class {
  constructor(upload) {
    this.upload = upload;
  }
  /**
   * if upload has been failed (http error) it has not completed
   * since connection can be broken or something dont has started yet.
   *
   * Give them a chance for a retry
   */
  retry(event) {
    this.handleEvent(event);
    this.upload.retry();
  }
  /**
   * start single upload
   */
  start($event) {
    this.handleEvent($event);
    this.upload.start();
  }
  /**
   * cancel / stop single upload
   */
  stop($event) {
    this.handleEvent($event);
    this.upload.cancel();
  }
  remove($event) {
    this.handleEvent($event);
    this.upload.destroy();
  }
  removeInvalidFiles($event) {
    this.handleEvent($event);
    this.upload.removeInvalidFiles();
  }
  handleEvent(event) {
    if (event && event instanceof MouseEvent) {
      event.stopPropagation();
    }
  }
};
var StateToStringPipe = class _StateToStringPipe {
  transform(state) {
    switch (state) {
      case NgxFileUploadState.CANCELED:
        return "canceled";
      case NgxFileUploadState.PENDING:
        return "pending";
      case NgxFileUploadState.PROGRESS:
        return "progress";
      case NgxFileUploadState.COMPLETED:
        return "completed";
      case NgxFileUploadState.START:
        return "start";
      case NgxFileUploadState.INVALID:
        return "invalid";
      default:
        return "idle";
    }
  }
  static {
    this.ɵfac = function StateToStringPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _StateToStringPipe)();
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "stateToString",
      type: _StateToStringPipe,
      pure: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StateToStringPipe, [{
    type: Pipe,
    args: [{
      name: "stateToString"
    }]
  }], null, null);
})();
var FileSizePipe = class _FileSizePipe {
  constructor() {
    this.units = ["Byte", "Kb", "Mb", "Gb"];
  }
  transform(size) {
    let bytes = isNaN(size) ? parseFloat(size.toString()) : size;
    let unit = 0;
    while (bytes >= 1024 && this.units.length > unit) {
      bytes = bytes / 1024;
      unit++;
    }
    const formatter = /^[^\.]+(\.(?!0{2})\d[^0]?)?/g;
    const total = bytes.toString().match(formatter)?.[0] ?? bytes.toString();
    return `${total} ${this.units[unit]}`;
  }
  static {
    this.ɵfac = function FileSizePipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FileSizePipe)();
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "fileSize",
      type: _FileSizePipe,
      pure: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FileSizePipe, [{
    type: Pipe,
    args: [{
      name: "fileSize"
    }]
  }], null, null);
})();
var CancelAblePipe = class _CancelAblePipe {
  transform(state) {
    let isCancelAble = state === NgxFileUploadState.PENDING;
    isCancelAble = isCancelAble || state === NgxFileUploadState.START;
    isCancelAble = isCancelAble || state === NgxFileUploadState.PROGRESS;
    return isCancelAble;
  }
  static {
    this.ɵfac = function CancelAblePipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CancelAblePipe)();
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "isCancelAble",
      type: _CancelAblePipe,
      pure: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CancelAblePipe, [{
    type: Pipe,
    args: [{
      name: "isCancelAble"
    }]
  }], null, null);
})();
var UploadItemComponent = class _UploadItemComponent {
  set template(tpl) {
    if (tpl instanceof TemplateRef) {
      this.itemTpl = tpl;
    }
  }
  /**
   * sets upload we want to bind with current view
   */
  set upload(request) {
    this.fileUpload = request;
    this.context = {
      data: request.data,
      ctrl: new Control(request)
    };
  }
  constructor(i18nProvider) {
    this.i18nProvider = i18nProvider;
    this.uploadState = NgxFileUploadState;
    this.destroyed = new Subject();
  }
  /**
   * ensure all click events will canceled
   * so we dont affect anything other
   */
  onItemClick(event) {
    event.stopPropagation();
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  /**
   * register on upload change event to get current informations from upload
   * and pass to template context to render them
   *
   * @inheritdoc
   */
  ngAfterViewInit() {
    if (!this.fileUpload) {
      return;
    }
    this.fileUpload.change.pipe(takeUntil(this.destroyed)).subscribe((fileUpload) => this.context.data = fileUpload);
  }
  ngOnInit() {
    this.i18n = this.i18nProvider.getI18n(NgxFileUploadUiI18nKey.UploadItem);
  }
  /**
   * if component gets destroyed remove change subscription
   */
  ngOnDestroy() {
    this.destroyed.next(true);
  }
  /**
   * just to disable sort for keyvalue pipe
   */
  returnZero() {
    return 0;
  }
  static {
    this.ɵfac = function UploadItemComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UploadItemComponent)(ɵɵdirectiveInject(NgxFileUploadUiI18nProvider));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _UploadItemComponent,
      selectors: [["ngx-file-upload-ui--item"]],
      viewQuery: function UploadItemComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c0, 7);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemTpl = _t.first);
        }
      },
      hostBindings: function UploadItemComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function UploadItemComponent_click_HostBindingHandler($event) {
            return ctx.onItemClick($event);
          });
        }
      },
      inputs: {
        template: "template",
        upload: "upload"
      },
      decls: 3,
      vars: 2,
      consts: [["defaultUploadItem", ""], ["uploadSuccess", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "upload-item"], [1, "upload-item--header"], [1, "title"], ["type", "button", 1, "action-remove", "item-action--remove", 3, "click"], [1, "ngx-fileupload-icon--remove"], [1, "upload-item--body"], [1, "upload-item--state"], [3, "ngClass"], [1, "upload-item--progress"], [1, "progressbar"], [1, "label-size"], [1, "progressbar-inner", 3, "ngStyle"], [1, "upload-item--actions"], ["type", "button", "class", "item-action--upload", 3, "disabled", "click", 4, "ngIf"], ["type", "button", "class", "item-action--reload", 3, "click", 4, "ngIf"], ["type", "button", 1, "item-action--cancel", 3, "click", "disabled"], [1, "ngx-fileupload-icon--cancel"], [1, "upload-item--footer"], ["class", "upload-item--validation", 4, "ngIf"], [4, "ngIf"], ["type", "button", 1, "item-action--upload", 3, "click", "disabled"], [1, "ngx-fileupload-icon--upload"], ["type", "button", 1, "item-action--reload", 3, "click"], [1, "ngx-fileupload-icon--reload"], [1, "upload-item--validation"], [3, "click"], ["class", "message", 4, "ngFor", "ngForOf"], [1, "message"], ["class", "upload-item--response-errors", 4, "ngIf"], ["class", "message success", 4, "ngIf"], [1, "upload-item--response-errors"], ["class", "message error", 4, "ngFor", "ngForOf"], [1, "message", "error"], [1, "message", "success"], [4, "ngIf", "ngIfElse"]],
      template: function UploadItemComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, UploadItemComponent_ng_template_0_Template, 25, 20, "ng-template", null, 0, ɵɵtemplateRefExtractor);
          ɵɵelementContainer(2, 2);
        }
        if (rf & 2) {
          ɵɵadvance(2);
          ɵɵproperty("ngTemplateOutlet", ctx.itemTpl)("ngTemplateOutletContext", ctx.context);
        }
      },
      dependencies: [NgClass, NgForOf, NgIf, NgTemplateOutlet, NgStyle, KeyValuePipe, StateToStringPipe, FileSizePipe, CancelAblePipe],
      styles: ['@keyframes _ngcontent-%COMP%_rotating{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@font-face{font-family:ngx-fileupload;src:url(data:application/vnd.ms-fontobject;base64,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);src:url(data:application/vnd.ms-fontobject;base64,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) format("embedded-opentype"),url(data:font/ttf;base64,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) format("truetype"),url(data:font/woff;base64,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) format("woff"),url("data:image/svg+xml,%3C%3Fxml version%3D%221.0%22 standalone%3D%22no%22%3F%3E%0D%3C!DOCTYPE svg PUBLIC %22-%2F%2FW3C%2F%2FDTD SVG 1.1%2F%2FEN%22 %22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22 %3E%0D%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0D%3Cmetadata%3EGenerated by IcoMoon%3C%2Fmetadata%3E%0D%3Cdefs%3E%0D%3Cfont id%3D%22ngx-fileupload%22 horiz-adv-x%3D%221024%22%3E%0D%3Cfont-face units-per-em%3D%221024%22 ascent%3D%22960%22 descent%3D%22-64%22 %2F%3E%0D%3Cmissing-glyph horiz-adv-x%3D%221024%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23x20%3B%22 horiz-adv-x%3D%22512%22 d%3D%22%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe900%3B%22 glyph-name%3D%22upload%22 horiz-adv-x%3D%221097%22 d%3D%22M731.429 457.143c0 4.571-1.714 9.714-5.143 13.143l-201.143 201.143c-3.429 3.429-8 5.143-13.143 5.143-4.571 0-9.714-1.714-13.143-5.143l-200.571-200.571c-3.429-4-5.714-8.571-5.714-13.714 0-10.286 8-18.286 18.286-18.286h128v-201.143c0-9.714 8.571-18.286 18.286-18.286h109.714c9.714 0 18.286 8.571 18.286 18.286v201.143h128c10.286 0 18.286 8.571 18.286 18.286zM1097.143 292.571c0-121.143-98.286-219.429-219.429-219.429h-621.714c-141.143 0-256 114.857-256 256 0 99.429 57.714 189.714 147.429 231.429-0.571 8.571-1.143 16.571-1.143 24.571 0 161.714 130.857 292.571 292.571 292.571 118.857 0 225.714-72 270.857-181.714 26.286 22.857 60 35.429 94.857 35.429 80.571 0 146.286-65.714 146.286-146.286 0-28-8-55.429-23.429-78.857 99.429-23.429 169.714-112 169.714-213.714z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe94e%3B%22 glyph-name%3D%22pending%22 d%3D%22M658.744 210.744l-210.744 210.746v282.51h128v-229.49l173.256-173.254zM512 960c-282.77 0-512-229.23-512-512s229.23-512 512-512 512 229.23 512 512-229.23 512-512 512zM512 64c-212.078 0-384 171.922-384 384s171.922 384 384 384c212.078 0 384-171.922 384-384s-171.922-384-384-384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe979%3B%22 glyph-name%3D%22idle%22 d%3D%22M728.992 448c137.754 87.334 231.008 255.208 231.008 448 0 21.676-1.192 43.034-3.478 64h-889.042c-2.29-20.968-3.48-42.326-3.48-64 0-192.792 93.254-360.666 231.006-448-137.752-87.334-231.006-255.208-231.006-448 0-21.676 1.19-43.034 3.478-64h889.042c2.288 20.966 3.478 42.324 3.478 64 0.002 192.792-93.252 360.666-231.006 448zM160 0c0 186.912 80.162 345.414 224 397.708v100.586c-143.838 52.29-224 210.792-224 397.706v0h704c0-186.914-80.162-345.416-224-397.706v-100.586c143.838-52.294 224-210.796 224-397.708h-704zM619.626 290.406c-71.654 40.644-75.608 93.368-75.626 125.366v64.228c0 31.994 3.804 84.914 75.744 125.664 38.504 22.364 71.808 56.348 97.048 98.336h-409.582c25.266-42.032 58.612-76.042 97.166-98.406 71.654-40.644 75.606-93.366 75.626-125.366v-64.228c0-31.992-3.804-84.914-75.744-125.664-72.622-42.18-126.738-125.684-143.090-226.336h501.67c-16.364 100.708-70.53 184.248-143.212 226.406z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe984%3B%22 glyph-name%3D%22reload%22 d%3D%22M1024 576h-384l143.53 143.53c-72.53 72.526-168.96 112.47-271.53 112.47s-199-39.944-271.53-112.47c-72.526-72.53-112.47-168.96-112.47-271.53s39.944-199 112.47-271.53c72.53-72.526 168.96-112.47 271.53-112.47s199 39.944 271.528 112.472c6.056 6.054 11.86 12.292 17.456 18.668l96.32-84.282c-93.846-107.166-231.664-174.858-385.304-174.858-282.77 0-512 229.23-512 512s229.23 512 512 512c141.386 0 269.368-57.326 362.016-149.984l149.984 149.984v-384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea07%3B%22 glyph-name%3D%22error%22 d%3D%22M512 867.226l429.102-855.226h-858.206l429.104 855.226zM512 960c-22.070 0-44.14-14.882-60.884-44.648l-437.074-871.112c-33.486-59.532-5-108.24 63.304-108.24h869.308c68.3 0 96.792 48.708 63.3 108.24h0.002l-437.074 871.112c-16.742 29.766-38.812 44.648-60.882 44.648v0zM576 128c0-35.346-28.654-64-64-64s-64 28.654-64 64c0 35.346 28.654 64 64 64s64-28.654 64-64zM512 256c-35.346 0-64 28.654-64 64v192c0 35.346 28.654 64 64 64s64-28.654 64-64v-192c0-35.346-28.654-64-64-64z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0a%3B%22 glyph-name%3D%22plus%22 d%3D%22M992 576h-352v352c0 17.672-14.328 32-32 32h-192c-17.672 0-32-14.328-32-32v-352h-352c-17.672 0-32-14.328-32-32v-192c0-17.672 14.328-32 32-32h352v-352c0-17.672 14.328-32 32-32h192c17.672 0 32 14.328 32 32v352h352c17.672 0 32 14.328 32 32v192c0 17.672-14.328 32-32 32z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0d%3B%22 glyph-name%3D%22remove%22 d%3D%22M512 960c-282.77 0-512-229.23-512-512s229.23-512 512-512 512 229.23 512 512-229.23 512-512 512zM512 32c-229.75 0-416 186.25-416 416s186.25 416 416 416 416-186.25 416-416-186.25-416-416-416zM672 704l-160-160-160 160-96-96 160-160-160-160 96-96 160 160 160-160 96 96-160 160 160 160z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0e%3B%22 glyph-name%3D%22canceled%22 d%3D%22M874.040 810.040c-96.706 96.702-225.28 149.96-362.040 149.96s-265.334-53.258-362.040-149.96c-96.702-96.706-149.96-225.28-149.96-362.040s53.258-265.334 149.96-362.040c96.706-96.702 225.28-149.96 362.040-149.96s265.334 53.258 362.040 149.96c96.702 96.706 149.96 225.28 149.96 362.040s-53.258 265.334-149.96 362.040zM896 448c0-82.814-26.354-159.588-71.112-222.38l-535.266 535.268c62.792 44.758 139.564 71.112 222.378 71.112 211.738 0 384-172.262 384-384zM128 448c0 82.814 26.354 159.586 71.112 222.378l535.27-535.268c-62.794-44.756-139.568-71.11-222.382-71.11-211.738 0-384 172.262-384 384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea10%3B%22 glyph-name%3D%22success%22 d%3D%22M864 832l-480-480-224 224-160-160 384-384 640 640z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea2e%3B%22 glyph-name%3D%22progress%22 d%3D%22M889.68 793.68c-93.608 102.216-228.154 166.32-377.68 166.32-282.77 0-512-229.23-512-512h96c0 229.75 186.25 416 416 416 123.020 0 233.542-53.418 309.696-138.306l-149.696-149.694h352v352l-134.32-134.32zM928 448c0-229.75-186.25-416-416-416-123.020 0-233.542 53.418-309.694 138.306l149.694 149.694h-352v-352l134.32 134.32c93.608-102.216 228.154-166.32 377.68-166.32 282.77 0 512 229.23 512 512h-96z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xf07e%3B%22 glyph-name%3D%22connect%22 d%3D%22M1024 438.857c0-9.714-4-18.857-10.857-25.714l-146.286-146.286c-6.857-6.857-16-10.857-25.714-10.857-20 0-36.571 16.571-36.571 36.571v73.143h-585.143v-73.143c0-20-16.571-36.571-36.571-36.571-9.714 0-18.857 4-25.714 10.857l-146.286 146.286c-6.857 6.857-10.857 16-10.857 25.714s4 18.857 10.857 25.714l146.286 146.286c6.857 6.857 16 10.857 25.714 10.857 20 0 36.571-16.571 36.571-36.571v-73.143h585.143v73.143c0 20 16.571 36.571 36.571 36.571 9.714 0 18.857-4 25.714-10.857l146.286-146.286c6.857-6.857 10.857-16 10.857-25.714z%22 %2F%3E%0D%3C%2Ffont%3E%3C%2Fdefs%3E%3C%2Fsvg%3E") format("svg");font-weight:400;font-style:normal;font-display:block}[class^=ngx-fileupload-icon--][_ngcontent-%COMP%], [class*=" ngx-fileupload-icon--"][_ngcontent-%COMP%]{font-family:ngx-fileupload!important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1rem;font-size:inherit;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.ngx-fileupload-icon--start[_ngcontent-%COMP%]:before{color:#0073b1;content:"\\f07e"}.ngx-fileupload-icon--progress[_ngcontent-%COMP%]{color:#0073b1;display:inline-block;animation:_ngcontent-%COMP%_rotating 2s linear infinite}.ngx-fileupload-icon--progress[_ngcontent-%COMP%]:before{content:"\\ea2e"}.ngx-fileupload-icon--invalid[_ngcontent-%COMP%], .ngx-fileupload-icon--error[_ngcontent-%COMP%]{color:#d8000c}.ngx-fileupload-icon--invalid[_ngcontent-%COMP%]:before, .ngx-fileupload-icon--error[_ngcontent-%COMP%]:before{content:"\\ea07"}.ngx-fileupload-icon--upload[_ngcontent-%COMP%]:before{content:"\\e900"}.ngx-fileupload-icon--pending[_ngcontent-%COMP%]:before{content:"\\e94e"}.ngx-fileupload-icon--idle[_ngcontent-%COMP%]:before{content:"\\e979"}.ngx-fileupload-icon--reload[_ngcontent-%COMP%]:before{content:"\\e984"}.ngx-fileupload-icon--remove[_ngcontent-%COMP%]:before{content:"\\ea0d"}.ngx-fileupload-icon--add[_ngcontent-%COMP%]:before{content:"\\ea0a"}.ngx-fileupload-icon--cancel[_ngcontent-%COMP%]:before, .ngx-fileupload-icon--canceled[_ngcontent-%COMP%]:before{content:"\\ea0e"}.ngx-fileupload-icon--completed.success[_ngcontent-%COMP%]{color:#4bb543}.ngx-fileupload-icon--completed.success[_ngcontent-%COMP%]:before{content:"\\ea10"}.ngx-fileupload-icon--completed.error[_ngcontent-%COMP%]:before{content:"\\ea07"}[_nghost-%COMP%]{display:block;color:#37474f}[_nghost-%COMP%]   .upload-item[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:.25rem .5rem;border-radius:.4rem;border:1px solid #E4E4E4;background:#FDFDFD;background:linear-gradient(to bottom,#FDFDFD 50%,#F7F7F7 100%)}[_nghost-%COMP%]   .upload-item--header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;border-bottom:1px solid #e9e9e9;padding:0 0 .25rem;margin:0 0 .25rem}[_nghost-%COMP%]   .upload-item--header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}[_nghost-%COMP%]   .upload-item--header[_ngcontent-%COMP%]   .action-remove[_ngcontent-%COMP%]{padding:0;margin:0;border:0;background:transparent;align-self:center;line-height:.9rem;font-size:.9rem;color:#37474f}[_nghost-%COMP%]   .upload-item--body[_ngcontent-%COMP%]{margin:.5rem 0 0;align-items:center;display:flex;flex-direction:row}[_nghost-%COMP%]   .upload-item--body[_ngcontent-%COMP%]   .upload-item--state[_ngcontent-%COMP%]{font-size:.85rem}[_nghost-%COMP%]   .upload-item--actions[_ngcontent-%COMP%], [_nghost-%COMP%]   .upload-item--state[_ngcontent-%COMP%]{flex:0}[_nghost-%COMP%]   .upload-item--progress[_ngcontent-%COMP%]{flex:1;display:flex;margin:0 .5rem;padding:0 .5rem;border:1px solid #E4E4E4;border-width:0 1px}[_nghost-%COMP%]   .upload-item--progress[_ngcontent-%COMP%]   .progressbar[_ngcontent-%COMP%]{flex:1;height:1rem;border-radius:.5rem;overflow:hidden;padding:1px;border:1px solid #E4E4E4;position:relative}[_nghost-%COMP%]   .upload-item--progress[_ngcontent-%COMP%]   .label-size[_ngcontent-%COMP%]{position:absolute;z-index:5;left:50%;top:50%;transform:translate(-50%,-50%);font-size:.8rem}[_nghost-%COMP%]   .upload-item--progress[_ngcontent-%COMP%]   .progressbar-inner[_ngcontent-%COMP%]{height:100%;background:#0073B1;border-radius:.5rem;transition:width .25s linear}[_nghost-%COMP%]   .upload-item--actions[_ngcontent-%COMP%]{display:flex}[_nghost-%COMP%]   .upload-item--actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:flex;padding:0;color:#37474f;cursor:pointer;outline:none;background:transparent;line-height:1rem;border:0;font-size:1rem;margin:0 .5rem 0 0}[_nghost-%COMP%]   .upload-item--actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-child{margin:0}[_nghost-%COMP%]   .upload-item--actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled{color:#b8c6cd;cursor:default}[_nghost-%COMP%]   .upload-item--actions[_ngcontent-%COMP%]   .item-action--reload[_ngcontent-%COMP%], [_nghost-%COMP%]   .upload-item--actions[_ngcontent-%COMP%]   .item-action--cancel[_ngcontent-%COMP%]{font-size:.9rem}[_nghost-%COMP%]   .upload-item--footer[_ngcontent-%COMP%]{font-size:.8rem}[_nghost-%COMP%]   .upload-item--footer[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]{white-space:nowrap;text-overflow:ellipsis;line-height:1.1rem;text-align:left}[_nghost-%COMP%]   .upload-item--footer[_ngcontent-%COMP%]   .message.error[_ngcontent-%COMP%]{color:#d8000c}[_nghost-%COMP%]   .upload-item--footer[_ngcontent-%COMP%]   .message.success[_ngcontent-%COMP%]{color:#4bb543}[_nghost-%COMP%]   .upload-item--footer[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:.5rem 0 0;padding:0;list-style-type:none}']
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UploadItemComponent, [{
    type: Component,
    args: [{
      selector: "ngx-file-upload-ui--item",
      template: `<ng-template #defaultUploadItem let-upload="data" let-ctrl="ctrl">\r
\r
  <div class="upload-item">\r
    <div class="upload-item--header">\r
      <span class="title">\r
        {{upload.name}}\r
      </span>\r
\r
      <!-- remove upload completly -->\r
      <button type="button" class="action-remove item-action--remove" (click)="ctrl.remove($event);">\r
        <i class="ngx-fileupload-icon--remove"></i>\r
      </button>\r
    </div>\r
\r
    <div class="upload-item--body">\r
      <!-- upload state icon -->\r
      <div class="upload-item--state">\r
        <i [ngClass]="[\r
          'ngx-fileupload-icon--' + (upload.state | stateToString),\r
          upload.state === uploadState.COMPLETED ? upload.hasError ? 'error' : 'success' : ''\r
        ]"></i>\r
      </div>\r
\r
      <!-- file progress: current state | progressbar -->\r
      <div class="upload-item--progress">\r
        <div class="progressbar">\r
          <span class="label-size">{{upload.size | fileSize}}</span>\r
          <div class="progressbar-inner" [ngStyle]="{width: upload.progress + '%'}"></div>\r
        </div>\r
      </div>\r
\r
      <!-- upload actions: cancel | retry -->\r
      <div class="upload-item--actions">\r
        <!-- start upload action -->\r
        <button type="button" class="item-action--upload" (click)="ctrl.start($event)"\r
          *ngIf="!upload.hasError && upload.state !== uploadState.CANCELED"\r
          [disabled]="upload.state !== uploadState.IDLE">\r
          <i class="ngx-fileupload-icon--upload"></i>\r
        </button>\r
\r
        <!-- retry upload action -->\r
        <button type="button" class="item-action--reload" (click)="ctrl.retry($event)"\r
          *ngIf="upload.hasError || upload.state === uploadState.CANCELED">\r
          <i class="ngx-fileupload-icon--reload"></i>\r
        </button>\r
\r
        <!-- cancel active upload -->\r
        <button type="button" [disabled]="!(upload.state | isCancelAble)" class="item-action--cancel"\r
          (click)="ctrl.stop($event);">\r
          <i class="ngx-fileupload-icon--cancel"></i>\r
        </button>\r
      </div>\r
    </div>\r
\r
    <!-- footer to display validation / upload errors or success notes -->\r
    <div class="upload-item--footer">\r
\r
      <!-- show validation errors -->\r
      <ul *ngIf="upload.validationErrors" class="upload-item--validation">\r
        <button (click)="ctrl.removeInvalidFiles($event)">remove invalid</button>\r
        <li *ngFor="let invalidFile of upload.validationErrors | keyvalue : returnZero" class="message">\r
          {{invalidFile.key}}\r
          <ul>\r
            <li *ngFor="let suberror of invalidFile.value | keyvalue : returnZero" class="message">\r
              {{suberror.value}}\r
            </li>\r
          </ul>\r
        </li>\r
      </ul>\r
\r
      <ng-container *ngIf="upload.state === uploadState.COMPLETED">\r
        <ul *ngIf="upload.response.errors" class="upload-item--response-errors">\r
          <li *ngFor="let error of upload.response.errors" class="message error">\r
            {{error}}\r
          </li>\r
        </ul>\r
\r
        <p class="message success" *ngIf="!upload.response.errors">\r
          <ng-container *ngIf="upload.response.body && upload.response.body.message; else uploadSuccess">\r
            {{upload.response.body.message}}\r
          </ng-container>\r
          <ng-template #uploadSuccess>\r
            {{upload.name}} {{i18n?.UPLOADED || "uploaded"}}\r
          </ng-template>\r
        </p>\r
      </ng-container>\r
    </div>\r
  </div>\r
</ng-template>\r
\r
<!-- display item template at this point -->\r
<ng-container [ngTemplateOutlet]="itemTpl" [ngTemplateOutletContext]="context"></ng-container>`,
      styles: ['@keyframes rotating{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@font-face{font-family:ngx-fileupload;src:url(data:application/vnd.ms-fontobject;base64,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);src:url(data:application/vnd.ms-fontobject;base64,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) format("embedded-opentype"),url(data:font/ttf;base64,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) format("truetype"),url(data:font/woff;base64,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) format("woff"),url("data:image/svg+xml,%3C%3Fxml version%3D%221.0%22 standalone%3D%22no%22%3F%3E%0D%3C!DOCTYPE svg PUBLIC %22-%2F%2FW3C%2F%2FDTD SVG 1.1%2F%2FEN%22 %22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22 %3E%0D%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0D%3Cmetadata%3EGenerated by IcoMoon%3C%2Fmetadata%3E%0D%3Cdefs%3E%0D%3Cfont id%3D%22ngx-fileupload%22 horiz-adv-x%3D%221024%22%3E%0D%3Cfont-face units-per-em%3D%221024%22 ascent%3D%22960%22 descent%3D%22-64%22 %2F%3E%0D%3Cmissing-glyph horiz-adv-x%3D%221024%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23x20%3B%22 horiz-adv-x%3D%22512%22 d%3D%22%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe900%3B%22 glyph-name%3D%22upload%22 horiz-adv-x%3D%221097%22 d%3D%22M731.429 457.143c0 4.571-1.714 9.714-5.143 13.143l-201.143 201.143c-3.429 3.429-8 5.143-13.143 5.143-4.571 0-9.714-1.714-13.143-5.143l-200.571-200.571c-3.429-4-5.714-8.571-5.714-13.714 0-10.286 8-18.286 18.286-18.286h128v-201.143c0-9.714 8.571-18.286 18.286-18.286h109.714c9.714 0 18.286 8.571 18.286 18.286v201.143h128c10.286 0 18.286 8.571 18.286 18.286zM1097.143 292.571c0-121.143-98.286-219.429-219.429-219.429h-621.714c-141.143 0-256 114.857-256 256 0 99.429 57.714 189.714 147.429 231.429-0.571 8.571-1.143 16.571-1.143 24.571 0 161.714 130.857 292.571 292.571 292.571 118.857 0 225.714-72 270.857-181.714 26.286 22.857 60 35.429 94.857 35.429 80.571 0 146.286-65.714 146.286-146.286 0-28-8-55.429-23.429-78.857 99.429-23.429 169.714-112 169.714-213.714z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe94e%3B%22 glyph-name%3D%22pending%22 d%3D%22M658.744 210.744l-210.744 210.746v282.51h128v-229.49l173.256-173.254zM512 960c-282.77 0-512-229.23-512-512s229.23-512 512-512 512 229.23 512 512-229.23 512-512 512zM512 64c-212.078 0-384 171.922-384 384s171.922 384 384 384c212.078 0 384-171.922 384-384s-171.922-384-384-384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe979%3B%22 glyph-name%3D%22idle%22 d%3D%22M728.992 448c137.754 87.334 231.008 255.208 231.008 448 0 21.676-1.192 43.034-3.478 64h-889.042c-2.29-20.968-3.48-42.326-3.48-64 0-192.792 93.254-360.666 231.006-448-137.752-87.334-231.006-255.208-231.006-448 0-21.676 1.19-43.034 3.478-64h889.042c2.288 20.966 3.478 42.324 3.478 64 0.002 192.792-93.252 360.666-231.006 448zM160 0c0 186.912 80.162 345.414 224 397.708v100.586c-143.838 52.29-224 210.792-224 397.706v0h704c0-186.914-80.162-345.416-224-397.706v-100.586c143.838-52.294 224-210.796 224-397.708h-704zM619.626 290.406c-71.654 40.644-75.608 93.368-75.626 125.366v64.228c0 31.994 3.804 84.914 75.744 125.664 38.504 22.364 71.808 56.348 97.048 98.336h-409.582c25.266-42.032 58.612-76.042 97.166-98.406 71.654-40.644 75.606-93.366 75.626-125.366v-64.228c0-31.992-3.804-84.914-75.744-125.664-72.622-42.18-126.738-125.684-143.090-226.336h501.67c-16.364 100.708-70.53 184.248-143.212 226.406z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe984%3B%22 glyph-name%3D%22reload%22 d%3D%22M1024 576h-384l143.53 143.53c-72.53 72.526-168.96 112.47-271.53 112.47s-199-39.944-271.53-112.47c-72.526-72.53-112.47-168.96-112.47-271.53s39.944-199 112.47-271.53c72.53-72.526 168.96-112.47 271.53-112.47s199 39.944 271.528 112.472c6.056 6.054 11.86 12.292 17.456 18.668l96.32-84.282c-93.846-107.166-231.664-174.858-385.304-174.858-282.77 0-512 229.23-512 512s229.23 512 512 512c141.386 0 269.368-57.326 362.016-149.984l149.984 149.984v-384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea07%3B%22 glyph-name%3D%22error%22 d%3D%22M512 867.226l429.102-855.226h-858.206l429.104 855.226zM512 960c-22.070 0-44.14-14.882-60.884-44.648l-437.074-871.112c-33.486-59.532-5-108.24 63.304-108.24h869.308c68.3 0 96.792 48.708 63.3 108.24h0.002l-437.074 871.112c-16.742 29.766-38.812 44.648-60.882 44.648v0zM576 128c0-35.346-28.654-64-64-64s-64 28.654-64 64c0 35.346 28.654 64 64 64s64-28.654 64-64zM512 256c-35.346 0-64 28.654-64 64v192c0 35.346 28.654 64 64 64s64-28.654 64-64v-192c0-35.346-28.654-64-64-64z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0a%3B%22 glyph-name%3D%22plus%22 d%3D%22M992 576h-352v352c0 17.672-14.328 32-32 32h-192c-17.672 0-32-14.328-32-32v-352h-352c-17.672 0-32-14.328-32-32v-192c0-17.672 14.328-32 32-32h352v-352c0-17.672 14.328-32 32-32h192c17.672 0 32 14.328 32 32v352h352c17.672 0 32 14.328 32 32v192c0 17.672-14.328 32-32 32z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0d%3B%22 glyph-name%3D%22remove%22 d%3D%22M512 960c-282.77 0-512-229.23-512-512s229.23-512 512-512 512 229.23 512 512-229.23 512-512 512zM512 32c-229.75 0-416 186.25-416 416s186.25 416 416 416 416-186.25 416-416-186.25-416-416-416zM672 704l-160-160-160 160-96-96 160-160-160-160 96-96 160 160 160-160 96 96-160 160 160 160z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0e%3B%22 glyph-name%3D%22canceled%22 d%3D%22M874.040 810.040c-96.706 96.702-225.28 149.96-362.040 149.96s-265.334-53.258-362.040-149.96c-96.702-96.706-149.96-225.28-149.96-362.040s53.258-265.334 149.96-362.040c96.706-96.702 225.28-149.96 362.040-149.96s265.334 53.258 362.040 149.96c96.702 96.706 149.96 225.28 149.96 362.040s-53.258 265.334-149.96 362.040zM896 448c0-82.814-26.354-159.588-71.112-222.38l-535.266 535.268c62.792 44.758 139.564 71.112 222.378 71.112 211.738 0 384-172.262 384-384zM128 448c0 82.814 26.354 159.586 71.112 222.378l535.27-535.268c-62.794-44.756-139.568-71.11-222.382-71.11-211.738 0-384 172.262-384 384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea10%3B%22 glyph-name%3D%22success%22 d%3D%22M864 832l-480-480-224 224-160-160 384-384 640 640z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea2e%3B%22 glyph-name%3D%22progress%22 d%3D%22M889.68 793.68c-93.608 102.216-228.154 166.32-377.68 166.32-282.77 0-512-229.23-512-512h96c0 229.75 186.25 416 416 416 123.020 0 233.542-53.418 309.696-138.306l-149.696-149.694h352v352l-134.32-134.32zM928 448c0-229.75-186.25-416-416-416-123.020 0-233.542 53.418-309.694 138.306l149.694 149.694h-352v-352l134.32 134.32c93.608-102.216 228.154-166.32 377.68-166.32 282.77 0 512 229.23 512 512h-96z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xf07e%3B%22 glyph-name%3D%22connect%22 d%3D%22M1024 438.857c0-9.714-4-18.857-10.857-25.714l-146.286-146.286c-6.857-6.857-16-10.857-25.714-10.857-20 0-36.571 16.571-36.571 36.571v73.143h-585.143v-73.143c0-20-16.571-36.571-36.571-36.571-9.714 0-18.857 4-25.714 10.857l-146.286 146.286c-6.857 6.857-10.857 16-10.857 25.714s4 18.857 10.857 25.714l146.286 146.286c6.857 6.857 16 10.857 25.714 10.857 20 0 36.571-16.571 36.571-36.571v-73.143h585.143v73.143c0 20 16.571 36.571 36.571 36.571 9.714 0 18.857-4 25.714-10.857l146.286-146.286c6.857-6.857 10.857-16 10.857-25.714z%22 %2F%3E%0D%3C%2Ffont%3E%3C%2Fdefs%3E%3C%2Fsvg%3E") format("svg");font-weight:400;font-style:normal;font-display:block}[class^=ngx-fileupload-icon--],[class*=" ngx-fileupload-icon--"]{font-family:ngx-fileupload!important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1rem;font-size:inherit;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.ngx-fileupload-icon--start:before{color:#0073b1;content:"\\f07e"}.ngx-fileupload-icon--progress{color:#0073b1;display:inline-block;animation:rotating 2s linear infinite}.ngx-fileupload-icon--progress:before{content:"\\ea2e"}.ngx-fileupload-icon--invalid,.ngx-fileupload-icon--error{color:#d8000c}.ngx-fileupload-icon--invalid:before,.ngx-fileupload-icon--error:before{content:"\\ea07"}.ngx-fileupload-icon--upload:before{content:"\\e900"}.ngx-fileupload-icon--pending:before{content:"\\e94e"}.ngx-fileupload-icon--idle:before{content:"\\e979"}.ngx-fileupload-icon--reload:before{content:"\\e984"}.ngx-fileupload-icon--remove:before{content:"\\ea0d"}.ngx-fileupload-icon--add:before{content:"\\ea0a"}.ngx-fileupload-icon--cancel:before,.ngx-fileupload-icon--canceled:before{content:"\\ea0e"}.ngx-fileupload-icon--completed.success{color:#4bb543}.ngx-fileupload-icon--completed.success:before{content:"\\ea10"}.ngx-fileupload-icon--completed.error:before{content:"\\ea07"}:host{display:block;color:#37474f}:host .upload-item{display:flex;flex-direction:column;padding:.25rem .5rem;border-radius:.4rem;border:1px solid #E4E4E4;background:#FDFDFD;background:linear-gradient(to bottom,#FDFDFD 50%,#F7F7F7 100%)}:host .upload-item--header{display:flex;justify-content:space-between;border-bottom:1px solid #e9e9e9;padding:0 0 .25rem;margin:0 0 .25rem}:host .upload-item--header .title{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}:host .upload-item--header .action-remove{padding:0;margin:0;border:0;background:transparent;align-self:center;line-height:.9rem;font-size:.9rem;color:#37474f}:host .upload-item--body{margin:.5rem 0 0;align-items:center;display:flex;flex-direction:row}:host .upload-item--body .upload-item--state{font-size:.85rem}:host .upload-item--actions,:host .upload-item--state{flex:0}:host .upload-item--progress{flex:1;display:flex;margin:0 .5rem;padding:0 .5rem;border:1px solid #E4E4E4;border-width:0 1px}:host .upload-item--progress .progressbar{flex:1;height:1rem;border-radius:.5rem;overflow:hidden;padding:1px;border:1px solid #E4E4E4;position:relative}:host .upload-item--progress .label-size{position:absolute;z-index:5;left:50%;top:50%;transform:translate(-50%,-50%);font-size:.8rem}:host .upload-item--progress .progressbar-inner{height:100%;background:#0073B1;border-radius:.5rem;transition:width .25s linear}:host .upload-item--actions{display:flex}:host .upload-item--actions button{display:flex;padding:0;color:#37474f;cursor:pointer;outline:none;background:transparent;line-height:1rem;border:0;font-size:1rem;margin:0 .5rem 0 0}:host .upload-item--actions button:last-child{margin:0}:host .upload-item--actions button:disabled{color:#b8c6cd;cursor:default}:host .upload-item--actions .item-action--reload,:host .upload-item--actions .item-action--cancel{font-size:.9rem}:host .upload-item--footer{font-size:.8rem}:host .upload-item--footer .message{white-space:nowrap;text-overflow:ellipsis;line-height:1.1rem;text-align:left}:host .upload-item--footer .message.error{color:#d8000c}:host .upload-item--footer .message.success{color:#4bb543}:host .upload-item--footer ul{margin:.5rem 0 0;padding:0;list-style-type:none}\n']
    }]
  }], function() {
    return [{
      type: NgxFileUploadUiI18nProvider
    }];
  }, {
    itemTpl: [{
      type: ViewChild,
      args: ["defaultUploadItem", {
        static: true
      }]
    }],
    template: [{
      type: Input
    }],
    upload: [{
      type: Input
    }],
    onItemClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var FileBrowserDirective = class _FileBrowserDirective {
  /**
   * Creates an instance of NgxFileUploadDirective.
   */
  constructor(renderer) {
    this.renderer = renderer;
    this.disabled = false;
    this.destroyed$ = new Subject();
    this.add = new EventEmitter();
    this.fileSelect = this.createFieldInputField();
  }
  /**
   * directive gets destroyed
   */
  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  /**
   * handle drag over event
   */
  onFileDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  /**
   * handle drop event
   */
  onFileDrop(event) {
    event.stopPropagation();
    event.preventDefault();
    if (!this.disabled && event.dataTransfer) {
      const files = Array.from(event.dataTransfer.files);
      this.add.emit(files);
    }
  }
  /**
   * add click host listener
   * to get notified we have a click event
   */
  onClick(event) {
    event.stopPropagation();
    event.preventDefault();
    if (!this.disabled) {
      this.fileSelect.click();
    }
  }
  /**
   * create dummy input field to select files
   * for security reasons, we cant trigger a file select window
   * without it
   */
  createFieldInputField() {
    const inputField = document.createElement("input");
    this.renderer.setAttribute(inputField, "type", "file");
    this.renderer.setProperty(inputField, "multiple", true);
    this.renderer.setStyle(inputField, "display", "none");
    this.renderer.listen(inputField, "change", (e) => this.onFileSelect(e));
    return inputField;
  }
  /**
   * register on change event on input[type="file"] field
   * and create the uploads
   */
  onFileSelect(event) {
    event.stopPropagation();
    event.preventDefault();
    const files = Array.from(this.fileSelect.files ?? []);
    this.add.emit(files);
    this.fileSelect.files = null;
    this.fileSelect.value = "";
  }
  static {
    this.ɵfac = function FileBrowserDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FileBrowserDirective)(ɵɵdirectiveInject(Renderer2));
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _FileBrowserDirective,
      selectors: [["", "ngxFileUpload", ""]],
      hostBindings: function FileBrowserDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("dragover", function FileBrowserDirective_dragover_HostBindingHandler($event) {
            return ctx.onFileDragOver($event);
          })("drop", function FileBrowserDirective_drop_HostBindingHandler($event) {
            return ctx.onFileDrop($event);
          })("click", function FileBrowserDirective_click_HostBindingHandler($event) {
            return ctx.onClick($event);
          });
        }
      },
      inputs: {
        disabled: "disabled"
      },
      outputs: {
        add: "add"
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FileBrowserDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxFileUpload]"
    }]
  }], function() {
    return [{
      type: Renderer2
    }];
  }, {
    add: [{
      type: Output
    }],
    disabled: [{
      type: Input
    }],
    onFileDragOver: [{
      type: HostListener,
      args: ["dragover", ["$event"]]
    }],
    onFileDrop: [{
      type: HostListener,
      args: ["drop", ["$event"]]
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var UploadViewComponent = class _UploadViewComponent {
  set storage(storage) {
    this.uploadStorage = storage;
    this.uploadStorageSet = true;
  }
  constructor(uploadFactory, i18nProvider) {
    this.uploadFactory = uploadFactory;
    this.i18nProvider = i18nProvider;
    this.useFormData = true;
    this.formDataName = "file";
    this.uploadStorage = new NgxFileUploadStorage();
    this.uploads = [];
    this.destroyed$ = new Subject();
    this.uploadStorageSet = false;
  }
  ngOnInit() {
    if (!this.url) {
      return;
    }
    this.i18n = this.i18nProvider.getI18n(NgxFileUploadUiI18nKey.Common);
    this.registerStoreEvents();
  }
  ngOnDestroy() {
    this.destroyed$.next(true);
    if (!this.uploadStorageSet && this.uploadStorage) {
      this.uploadStorage.destroy();
    }
  }
  /**
   * files get dropped
   */
  dropFiles(files) {
    if (files.length && this.url) {
      const uploadOptions = {
        url: this.url,
        formData: {
          enabled: this.useFormData,
          name: this.formDataName
        },
        headers: this.headers
      };
      const uploads = this.uploadFactory.createUploadRequest(files, uploadOptions, this.validator);
      if (uploads) {
        this.uploadStorage?.add(uploads);
      }
    }
  }
  /**
   * register events for store changes
   */
  registerStoreEvents() {
    this.uploadStorage.change().pipe(takeUntil(this.destroyed$)).subscribe({
      next: (uploads) => {
        this.uploads = uploads;
      }
    });
  }
  static {
    this.ɵfac = function UploadViewComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UploadViewComponent)(ɵɵdirectiveInject(NgxFileUploadFactory), ɵɵdirectiveInject(NgxFileUploadUiI18nProvider));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _UploadViewComponent,
      selectors: [["ngx-file-upload"]],
      inputs: {
        itemTemplate: "itemTemplate",
        url: "url",
        useFormData: "useFormData",
        formDataName: "formDataName",
        headers: "headers",
        validator: "validator",
        storage: "storage"
      },
      decls: 4,
      vars: 3,
      consts: [[3, "storage"], ["ngxFileUpload", "", 1, "upload--body", "fileupload", 3, "add"], ["class", "file-browser", 4, "ngIf"], ["class", "file-upload--list", 4, "ngIf"], [1, "file-browser"], [1, "ngx-fileupload-icon--add"], [1, "file-upload--list"], [3, "upload", "template", 4, "ngFor", "ngForOf"], [3, "upload", "template"]],
      template: function UploadViewComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelement(0, "ngx-file-upload-ui--toolbar", 0);
          ɵɵelementStart(1, "div", 1);
          ɵɵlistener("add", function UploadViewComponent_Template_div_add_1_listener($event) {
            return ctx.dropFiles($event);
          });
          ɵɵtemplate(2, UploadViewComponent_div_2_Template, 4, 1, "div", 2)(3, UploadViewComponent_div_3_Template, 2, 1, "div", 3);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵproperty("storage", ctx.uploadStorage);
          ɵɵadvance(2);
          ɵɵproperty("ngIf", !ctx.uploads.length);
          ɵɵadvance();
          ɵɵproperty("ngIf", ctx.uploads.length);
        }
      },
      dependencies: [NgForOf, NgIf, UploadToolbarComponent, UploadItemComponent, FileBrowserDirective],
      styles: ['@keyframes _ngcontent-%COMP%_rotating{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@font-face{font-family:ngx-fileupload;src:url(data:application/vnd.ms-fontobject;base64,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);src:url(data:application/vnd.ms-fontobject;base64,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) format("embedded-opentype"),url(data:font/ttf;base64,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) format("truetype"),url(data:font/woff;base64,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) format("woff"),url("data:image/svg+xml,%3C%3Fxml version%3D%221.0%22 standalone%3D%22no%22%3F%3E%0D%3C!DOCTYPE svg PUBLIC %22-%2F%2FW3C%2F%2FDTD SVG 1.1%2F%2FEN%22 %22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22 %3E%0D%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0D%3Cmetadata%3EGenerated by IcoMoon%3C%2Fmetadata%3E%0D%3Cdefs%3E%0D%3Cfont id%3D%22ngx-fileupload%22 horiz-adv-x%3D%221024%22%3E%0D%3Cfont-face units-per-em%3D%221024%22 ascent%3D%22960%22 descent%3D%22-64%22 %2F%3E%0D%3Cmissing-glyph horiz-adv-x%3D%221024%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23x20%3B%22 horiz-adv-x%3D%22512%22 d%3D%22%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe900%3B%22 glyph-name%3D%22upload%22 horiz-adv-x%3D%221097%22 d%3D%22M731.429 457.143c0 4.571-1.714 9.714-5.143 13.143l-201.143 201.143c-3.429 3.429-8 5.143-13.143 5.143-4.571 0-9.714-1.714-13.143-5.143l-200.571-200.571c-3.429-4-5.714-8.571-5.714-13.714 0-10.286 8-18.286 18.286-18.286h128v-201.143c0-9.714 8.571-18.286 18.286-18.286h109.714c9.714 0 18.286 8.571 18.286 18.286v201.143h128c10.286 0 18.286 8.571 18.286 18.286zM1097.143 292.571c0-121.143-98.286-219.429-219.429-219.429h-621.714c-141.143 0-256 114.857-256 256 0 99.429 57.714 189.714 147.429 231.429-0.571 8.571-1.143 16.571-1.143 24.571 0 161.714 130.857 292.571 292.571 292.571 118.857 0 225.714-72 270.857-181.714 26.286 22.857 60 35.429 94.857 35.429 80.571 0 146.286-65.714 146.286-146.286 0-28-8-55.429-23.429-78.857 99.429-23.429 169.714-112 169.714-213.714z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe94e%3B%22 glyph-name%3D%22pending%22 d%3D%22M658.744 210.744l-210.744 210.746v282.51h128v-229.49l173.256-173.254zM512 960c-282.77 0-512-229.23-512-512s229.23-512 512-512 512 229.23 512 512-229.23 512-512 512zM512 64c-212.078 0-384 171.922-384 384s171.922 384 384 384c212.078 0 384-171.922 384-384s-171.922-384-384-384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe979%3B%22 glyph-name%3D%22idle%22 d%3D%22M728.992 448c137.754 87.334 231.008 255.208 231.008 448 0 21.676-1.192 43.034-3.478 64h-889.042c-2.29-20.968-3.48-42.326-3.48-64 0-192.792 93.254-360.666 231.006-448-137.752-87.334-231.006-255.208-231.006-448 0-21.676 1.19-43.034 3.478-64h889.042c2.288 20.966 3.478 42.324 3.478 64 0.002 192.792-93.252 360.666-231.006 448zM160 0c0 186.912 80.162 345.414 224 397.708v100.586c-143.838 52.29-224 210.792-224 397.706v0h704c0-186.914-80.162-345.416-224-397.706v-100.586c143.838-52.294 224-210.796 224-397.708h-704zM619.626 290.406c-71.654 40.644-75.608 93.368-75.626 125.366v64.228c0 31.994 3.804 84.914 75.744 125.664 38.504 22.364 71.808 56.348 97.048 98.336h-409.582c25.266-42.032 58.612-76.042 97.166-98.406 71.654-40.644 75.606-93.366 75.626-125.366v-64.228c0-31.992-3.804-84.914-75.744-125.664-72.622-42.18-126.738-125.684-143.090-226.336h501.67c-16.364 100.708-70.53 184.248-143.212 226.406z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe984%3B%22 glyph-name%3D%22reload%22 d%3D%22M1024 576h-384l143.53 143.53c-72.53 72.526-168.96 112.47-271.53 112.47s-199-39.944-271.53-112.47c-72.526-72.53-112.47-168.96-112.47-271.53s39.944-199 112.47-271.53c72.53-72.526 168.96-112.47 271.53-112.47s199 39.944 271.528 112.472c6.056 6.054 11.86 12.292 17.456 18.668l96.32-84.282c-93.846-107.166-231.664-174.858-385.304-174.858-282.77 0-512 229.23-512 512s229.23 512 512 512c141.386 0 269.368-57.326 362.016-149.984l149.984 149.984v-384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea07%3B%22 glyph-name%3D%22error%22 d%3D%22M512 867.226l429.102-855.226h-858.206l429.104 855.226zM512 960c-22.070 0-44.14-14.882-60.884-44.648l-437.074-871.112c-33.486-59.532-5-108.24 63.304-108.24h869.308c68.3 0 96.792 48.708 63.3 108.24h0.002l-437.074 871.112c-16.742 29.766-38.812 44.648-60.882 44.648v0zM576 128c0-35.346-28.654-64-64-64s-64 28.654-64 64c0 35.346 28.654 64 64 64s64-28.654 64-64zM512 256c-35.346 0-64 28.654-64 64v192c0 35.346 28.654 64 64 64s64-28.654 64-64v-192c0-35.346-28.654-64-64-64z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0a%3B%22 glyph-name%3D%22plus%22 d%3D%22M992 576h-352v352c0 17.672-14.328 32-32 32h-192c-17.672 0-32-14.328-32-32v-352h-352c-17.672 0-32-14.328-32-32v-192c0-17.672 14.328-32 32-32h352v-352c0-17.672 14.328-32 32-32h192c17.672 0 32 14.328 32 32v352h352c17.672 0 32 14.328 32 32v192c0 17.672-14.328 32-32 32z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0d%3B%22 glyph-name%3D%22remove%22 d%3D%22M512 960c-282.77 0-512-229.23-512-512s229.23-512 512-512 512 229.23 512 512-229.23 512-512 512zM512 32c-229.75 0-416 186.25-416 416s186.25 416 416 416 416-186.25 416-416-186.25-416-416-416zM672 704l-160-160-160 160-96-96 160-160-160-160 96-96 160 160 160-160 96 96-160 160 160 160z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0e%3B%22 glyph-name%3D%22canceled%22 d%3D%22M874.040 810.040c-96.706 96.702-225.28 149.96-362.040 149.96s-265.334-53.258-362.040-149.96c-96.702-96.706-149.96-225.28-149.96-362.040s53.258-265.334 149.96-362.040c96.706-96.702 225.28-149.96 362.040-149.96s265.334 53.258 362.040 149.96c96.702 96.706 149.96 225.28 149.96 362.040s-53.258 265.334-149.96 362.040zM896 448c0-82.814-26.354-159.588-71.112-222.38l-535.266 535.268c62.792 44.758 139.564 71.112 222.378 71.112 211.738 0 384-172.262 384-384zM128 448c0 82.814 26.354 159.586 71.112 222.378l535.27-535.268c-62.794-44.756-139.568-71.11-222.382-71.11-211.738 0-384 172.262-384 384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea10%3B%22 glyph-name%3D%22success%22 d%3D%22M864 832l-480-480-224 224-160-160 384-384 640 640z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea2e%3B%22 glyph-name%3D%22progress%22 d%3D%22M889.68 793.68c-93.608 102.216-228.154 166.32-377.68 166.32-282.77 0-512-229.23-512-512h96c0 229.75 186.25 416 416 416 123.020 0 233.542-53.418 309.696-138.306l-149.696-149.694h352v352l-134.32-134.32zM928 448c0-229.75-186.25-416-416-416-123.020 0-233.542 53.418-309.694 138.306l149.694 149.694h-352v-352l134.32 134.32c93.608-102.216 228.154-166.32 377.68-166.32 282.77 0 512 229.23 512 512h-96z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xf07e%3B%22 glyph-name%3D%22connect%22 d%3D%22M1024 438.857c0-9.714-4-18.857-10.857-25.714l-146.286-146.286c-6.857-6.857-16-10.857-25.714-10.857-20 0-36.571 16.571-36.571 36.571v73.143h-585.143v-73.143c0-20-16.571-36.571-36.571-36.571-9.714 0-18.857 4-25.714 10.857l-146.286 146.286c-6.857 6.857-10.857 16-10.857 25.714s4 18.857 10.857 25.714l146.286 146.286c6.857 6.857 16 10.857 25.714 10.857 20 0 36.571-16.571 36.571-36.571v-73.143h585.143v73.143c0 20 16.571 36.571 36.571 36.571 9.714 0 18.857-4 25.714-10.857l146.286-146.286c6.857-6.857 10.857-16 10.857-25.714z%22 %2F%3E%0D%3C%2Ffont%3E%3C%2Fdefs%3E%3C%2Fsvg%3E") format("svg");font-weight:400;font-style:normal;font-display:block}[class^=ngx-fileupload-icon--][_ngcontent-%COMP%], [class*=" ngx-fileupload-icon--"][_ngcontent-%COMP%]{font-family:ngx-fileupload!important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1rem;font-size:inherit;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.ngx-fileupload-icon--start[_ngcontent-%COMP%]:before{color:#0073b1;content:"\\f07e"}.ngx-fileupload-icon--progress[_ngcontent-%COMP%]{color:#0073b1;display:inline-block;animation:_ngcontent-%COMP%_rotating 2s linear infinite}.ngx-fileupload-icon--progress[_ngcontent-%COMP%]:before{content:"\\ea2e"}.ngx-fileupload-icon--invalid[_ngcontent-%COMP%], .ngx-fileupload-icon--error[_ngcontent-%COMP%]{color:#d8000c}.ngx-fileupload-icon--invalid[_ngcontent-%COMP%]:before, .ngx-fileupload-icon--error[_ngcontent-%COMP%]:before{content:"\\ea07"}.ngx-fileupload-icon--upload[_ngcontent-%COMP%]:before{content:"\\e900"}.ngx-fileupload-icon--pending[_ngcontent-%COMP%]:before{content:"\\e94e"}.ngx-fileupload-icon--idle[_ngcontent-%COMP%]:before{content:"\\e979"}.ngx-fileupload-icon--reload[_ngcontent-%COMP%]:before{content:"\\e984"}.ngx-fileupload-icon--remove[_ngcontent-%COMP%]:before{content:"\\ea0d"}.ngx-fileupload-icon--add[_ngcontent-%COMP%]:before{content:"\\ea0a"}.ngx-fileupload-icon--cancel[_ngcontent-%COMP%]:before, .ngx-fileupload-icon--canceled[_ngcontent-%COMP%]:before{content:"\\ea0e"}.ngx-fileupload-icon--completed.success[_ngcontent-%COMP%]{color:#4bb543}.ngx-fileupload-icon--completed.success[_ngcontent-%COMP%]:before{content:"\\ea10"}.ngx-fileupload-icon--completed.error[_ngcontent-%COMP%]:before{content:"\\ea07"}[_nghost-%COMP%]{display:flex;flex-direction:column}[_nghost-%COMP%]   .fileupload[_ngcontent-%COMP%]{overflow:auto;display:flex;flex-direction:row-reverse;flex:1;border:1px solid #D2D2D2}[_nghost-%COMP%]   .file-upload--list[_ngcontent-%COMP%]{box-sizing:border-box;flex:1;overflow-x:hidden;flex-shrink:0;flex-grow:0;flex-basis:100%;padding:.5rem 1rem;max-height:50vh;overflow-y:auto}[_nghost-%COMP%]   ngx-file-upload-ui--item[_ngcontent-%COMP%]:not(:last-child){margin-bottom:.5rem}[_nghost-%COMP%]   .file-browser[_ngcontent-%COMP%]{padding:1rem 0;cursor:pointer;display:flex;flex:1;align-items:center;justify-content:center;flex-direction:column;color:#37474f}[_nghost-%COMP%]   .file-browser[_ngcontent-%COMP%]   .ngx-fileupload-icon--add[_ngcontent-%COMP%]{font-size:2.5rem;border:1px dashed #9aaeb8;width:4rem;line-height:4rem;text-align:center;border-radius:50%;margin-bottom:.5rem}']
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UploadViewComponent, [{
    type: Component,
    args: [{
      selector: "ngx-file-upload",
      template: '<ngx-file-upload-ui--toolbar [storage]="uploadStorage"></ngx-file-upload-ui--toolbar>\r\n\r\n<div class="upload--body fileupload" ngxFileUpload (add)="dropFiles($event)">\r\n\r\n    <div *ngIf="!uploads.length" class="file-browser">\r\n        <i class="ngx-fileupload-icon--add"></i>\r\n        <span>{{ i18n?.SELECT_FILES || "Drag/Drop files here or click"}}</span>\r\n    </div>\r\n\r\n    <div *ngIf="uploads.length" class="file-upload--list">\r\n        <ngx-file-upload-ui--item *ngFor="let item of uploads" [upload]="item" [template]="itemTemplate" >\r\n        </ngx-file-upload-ui--item>\r\n    </div>\r\n</div>\r\n',
      styles: ['@keyframes rotating{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@font-face{font-family:ngx-fileupload;src:url(data:application/vnd.ms-fontobject;base64,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);src:url(data:application/vnd.ms-fontobject;base64,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) format("embedded-opentype"),url(data:font/ttf;base64,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) format("truetype"),url(data:font/woff;base64,d09GRgABAAAAAA0QAAsAAAAADMQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxINg2NtYXAAAAFoAAAAnAAAAJyX45HpZ2FzcAAAAgQAAAAIAAAACAAAABBnbHlmAAACDAAACDAAAAgw/zUYOmhlYWQAAAo8AAAANgAAADYXHsFBaGhlYQAACnQAAAAkAAAAJAgLBBlobXR4AAAKmAAAADwAAAA8MkkATmxvY2EAAArUAAAAIAAAACAMhg6wbWF4cAAACvQAAAAgAAAAIAAUAGpuYW1lAAALFAAAAdoAAAHa6/1B5HBvc3QAAAzwAAAAIAAAACAAAwAAAAMD2wGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA8H4DwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEAIAAAAAcABAAAwAMAAEAIOkA6U7peemE6gfqCuoO6hDqLvB+//3//wAAAAAAIOkA6U7peemE6gfqCuoN6hDqLvB+//3//wAB/+MXBBa3Fo0WgxYBFf8V/RX8Fd8PkAADAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAgAAAEkESQNuAB8ATwAAATQmLwEuASMiBg8BDgEVFBY7ARUUFjsBMjY9ATMyNjUFFAcOAQcGIyEiJy4BJyY1NDY3NCY1NDc+ATc2MzIXHgEXFhc+ATMyFhUUBgceARUC2wIDyQIHBAMIAskCAwoIgAsHbgcLgAgKAW4RETwoKC39kjUvLkYUFFBDARcXUDU1PSwqKkYcHBETMRs8VgwMS18ByQQHAskDAwMDyAMHBAgKyQgLCwjJCwekLigoOxIRFBRGLy41S30gBgwGPTU1UBcXDQ0wISIpERJVPRUoEhF4TAAAAwAA/8AEAAPAAAUAIQA9AAAlJxEzFRcDIgcOAQcGFRQXHgEXFjMyNz4BNzY1NCcuAScmAyInLgEnJjU0Nz4BNzYzMhceARcWFRQHDgEHBgKT04Ct7WpdXosoKCgoi15dampdXosoKCgoi15dalBFRmkeHh4eaUZFUFBFRmkeHh4eaUZF09IBG+WuApMoKIteXWpqXV6LKCgoKIteXWpqXV6LKCj8gB4eaUZFUFBFRmkeHh4eaUZFUFBFRmkeHgAAAwBA/8ADwAPAACoASwBnAAABNjc+ATc2NTQmJyEOARUUFx4BFxYXBgcOAQcGFRQWFyE+ATU0Jy4BJyYnATQ3PgE3Njc1JicuAScmNTEhFAcOAQcGBxUWFx4BFxYVAy4BPQE0Njc+ATchHgEXHgEdARQGBw4BByEuAQLZNCorPRARAgH8hgECERA9Kyo0NCorPRARAgEDegECERA9Kyo0/ccPDzkpKjY2Kik5Dw8CwA8POSkqNjYqKTkPD/Q2FhY2HTET/mYTMR02FhY2Nk0MAfYMTQHAIS8vc0NDSBAgEBAgEEhDQ3MvLyEhLy9zQ0NIECAQECAQSENDcy8vIf5ARkA/aCcmFGQUJidoP0BGRkA/aCcmFGQUJidoP0BGASIfRxhAGEcfEDMfIDIQH0cYQBhHHx94S0x3AAAAAAEAAP/ABAADwAA1AAABITcuASMiBgcOARUUFhceATMyNjc+ATcXBgcOAQcGIyInLgEnJjU0Nz4BNzYzMhceARcWFzcEAP6AkDeMTU2MNzY6OjY3jE1NjDcECQRgIysrYjY2OmpdXosoKCgoi15dajUyMlwpKSOWAkCQNjo6NjeMTU2MNzY6OjYFCQVUKCEgLQ0MKCiLXl1qal1eiygoCgsnGxwjlgAAAAQADv/AA/IDwAADABUAIQAvAAAJASEBNSIGBwEGFjMhMjYnMQEuASMxExQGIyImNTQ2MzIWJyImPQE0NjMyFh0BFAYCAAGt/KYBrREfDf5LGSUzA2YzJRn+Sw0fEUAlGxslJRsbJUAbJSUbGyUlA2P8qQNXXRYX/JksQEAsA2cXFvzAGyUlGxslJWUlG8AbJSUbwBslAAAAAQAA/8AEAAPAACMAAAEhETQmKwEiBhURISIGHQEUFjMhERQWOwEyNjURITI2PQE0JgPg/qATDcANE/6gDRMTDQFgEw3ADRMBYA0TEwJAAWANExMN/qATDcANE/6gDRMTDQFgEw3ADRMAAAAAAwAA/8AEAAPAABsANwBDAAABIgcOAQcGFRQXHgEXFjMyNz4BNzY1NCcuAScmAyInLgEnJjU0Nz4BNzYzMhceARcWFRQHDgEHBhMHJwcXBxc3FzcnNwIAal1eiygoKCiLXl1qal1eiygoKCiLXl1qVkxMcSAhISBxTExWVkxMcSAhISBxTExKoKBgoKBgoKBgoKADwCgoi15dampdXosoKCgoi15dampdXosoKPxgISBxTExWVkxMcSAhISBxTExWVkxMcSAhAqCgoGCgoGCgoGCgoAADAAD/wAQAA8AAOABGAFUAAAEmJy4BJyYjIgcOAQcGBwYHDgEHBhUUFx4BFxYXFhceARcWMzI3PgE3Njc2Nz4BNzY1NCcuAScmJxMUBgcBPgEzMhceARcWBTQ2NwEOASMiJy4BJyY1A2okKipcMTIzMzIxXCoqJCQcHCYKCgoKJhwcJCQqKlwxMjMzMjFcKiokJBwcJgoKCgomHBwkFiYh/ekvcT5PRkZpHh79ACYhAhcvcT5PRkZpHh4DKiQcHCYKCgoKJhwcJCQqKlwxMjMzMjFcKiokJBwcJgoKCgomHBwkJCoqXDEyMzMyMVwqKiT+lj5xLwIXISYeHmlGRk8+cS/96SEmHh5pRkZPAAAAAAEAAAAgBAADQAAFAAAJAScHCQEDYP4g4KABgAKAA0D+IOCg/oACgAACAAD/wAQAA8AAIQBCAAABJicuAScmIyIHDgEHBhUzNDc+ATc2MzIXHgEXFhcHIREHExQHDgEHBiMiJy4BJyYnNyERNxYXHgEXFjMyNz4BNzY1A3ojKypgNTU4al1eiygoYCEgcUxMVi4sK08iIx2WAWCGJiEgcUxMVi4sK08iIx2W/qCGIysqYDU1OGpdXosoKAMaJh8fKwsMKCiLXl1qVkxMcSAhCgkkGhkglgFghv6mVkxMcSAhCgkkGhkglv6ghiYfHysLDCgoi15dagAAAQAAAQAEAAJuAC4AAAEUBg8BDgEjIiY9ASEVFAYjIiYvAS4BNTQ2PwE+ATMyFh0BITU0NjMyFh8BHgEVBAAGBZIFDgcPFf22FQ8HDgWSBQYGBZIFDgcPFQJKFQ8HDgWSBQYBtwcOBZIFBhYPSUkPFgYFkgUOBwcNBpIFBhYPSUkPFgYFkgYNBwAAAAABAAAAAQAAXcZAn18PPPUACwQAAAAAANnbPmIAAAAA2ds+YgAA/8AESQPAAAAACAACAAAAAAAAAAEAAAPA/8AAAARJAAAAAARJAAEAAAAAAAAAAAAAAAAAAAAPBAAAAAAAAAAAAAAAAgAAAARJAAAEAAAABAAAQAQAAAAEAAAOBAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAAAAAAAKABQAHgCQAPABjgHiAi4CZALOA1YDagPSBBgAAQAAAA8AaAAEAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAA4AAAABAAAAAAACAAcAnwABAAAAAAADAA4ASwABAAAAAAAEAA4AtAABAAAAAAAFAAsAKgABAAAAAAAGAA4AdQABAAAAAAAKABoA3gADAAEECQABABwADgADAAEECQACAA4ApgADAAEECQADABwAWQADAAEECQAEABwAwgADAAEECQAFABYANQADAAEECQAGABwAgwADAAEECQAKADQA+G5neC1maWxldXBsb2FkAG4AZwB4AC0AZgBpAGwAZQB1AHAAbABvAGEAZFZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMG5neC1maWxldXBsb2FkAG4AZwB4AC0AZgBpAGwAZQB1AHAAbABvAGEAZG5neC1maWxldXBsb2FkAG4AZwB4AC0AZgBpAGwAZQB1AHAAbABvAGEAZFJlZ3VsYXIAUgBlAGcAdQBsAGEAcm5neC1maWxldXBsb2FkAG4AZwB4AC0AZgBpAGwAZQB1AHAAbABvAGEAZEZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=) format("woff"),url("data:image/svg+xml,%3C%3Fxml version%3D%221.0%22 standalone%3D%22no%22%3F%3E%0D%3C!DOCTYPE svg PUBLIC %22-%2F%2FW3C%2F%2FDTD SVG 1.1%2F%2FEN%22 %22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22 %3E%0D%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0D%3Cmetadata%3EGenerated by IcoMoon%3C%2Fmetadata%3E%0D%3Cdefs%3E%0D%3Cfont id%3D%22ngx-fileupload%22 horiz-adv-x%3D%221024%22%3E%0D%3Cfont-face units-per-em%3D%221024%22 ascent%3D%22960%22 descent%3D%22-64%22 %2F%3E%0D%3Cmissing-glyph horiz-adv-x%3D%221024%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23x20%3B%22 horiz-adv-x%3D%22512%22 d%3D%22%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe900%3B%22 glyph-name%3D%22upload%22 horiz-adv-x%3D%221097%22 d%3D%22M731.429 457.143c0 4.571-1.714 9.714-5.143 13.143l-201.143 201.143c-3.429 3.429-8 5.143-13.143 5.143-4.571 0-9.714-1.714-13.143-5.143l-200.571-200.571c-3.429-4-5.714-8.571-5.714-13.714 0-10.286 8-18.286 18.286-18.286h128v-201.143c0-9.714 8.571-18.286 18.286-18.286h109.714c9.714 0 18.286 8.571 18.286 18.286v201.143h128c10.286 0 18.286 8.571 18.286 18.286zM1097.143 292.571c0-121.143-98.286-219.429-219.429-219.429h-621.714c-141.143 0-256 114.857-256 256 0 99.429 57.714 189.714 147.429 231.429-0.571 8.571-1.143 16.571-1.143 24.571 0 161.714 130.857 292.571 292.571 292.571 118.857 0 225.714-72 270.857-181.714 26.286 22.857 60 35.429 94.857 35.429 80.571 0 146.286-65.714 146.286-146.286 0-28-8-55.429-23.429-78.857 99.429-23.429 169.714-112 169.714-213.714z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe94e%3B%22 glyph-name%3D%22pending%22 d%3D%22M658.744 210.744l-210.744 210.746v282.51h128v-229.49l173.256-173.254zM512 960c-282.77 0-512-229.23-512-512s229.23-512 512-512 512 229.23 512 512-229.23 512-512 512zM512 64c-212.078 0-384 171.922-384 384s171.922 384 384 384c212.078 0 384-171.922 384-384s-171.922-384-384-384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe979%3B%22 glyph-name%3D%22idle%22 d%3D%22M728.992 448c137.754 87.334 231.008 255.208 231.008 448 0 21.676-1.192 43.034-3.478 64h-889.042c-2.29-20.968-3.48-42.326-3.48-64 0-192.792 93.254-360.666 231.006-448-137.752-87.334-231.006-255.208-231.006-448 0-21.676 1.19-43.034 3.478-64h889.042c2.288 20.966 3.478 42.324 3.478 64 0.002 192.792-93.252 360.666-231.006 448zM160 0c0 186.912 80.162 345.414 224 397.708v100.586c-143.838 52.29-224 210.792-224 397.706v0h704c0-186.914-80.162-345.416-224-397.706v-100.586c143.838-52.294 224-210.796 224-397.708h-704zM619.626 290.406c-71.654 40.644-75.608 93.368-75.626 125.366v64.228c0 31.994 3.804 84.914 75.744 125.664 38.504 22.364 71.808 56.348 97.048 98.336h-409.582c25.266-42.032 58.612-76.042 97.166-98.406 71.654-40.644 75.606-93.366 75.626-125.366v-64.228c0-31.992-3.804-84.914-75.744-125.664-72.622-42.18-126.738-125.684-143.090-226.336h501.67c-16.364 100.708-70.53 184.248-143.212 226.406z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xe984%3B%22 glyph-name%3D%22reload%22 d%3D%22M1024 576h-384l143.53 143.53c-72.53 72.526-168.96 112.47-271.53 112.47s-199-39.944-271.53-112.47c-72.526-72.53-112.47-168.96-112.47-271.53s39.944-199 112.47-271.53c72.53-72.526 168.96-112.47 271.53-112.47s199 39.944 271.528 112.472c6.056 6.054 11.86 12.292 17.456 18.668l96.32-84.282c-93.846-107.166-231.664-174.858-385.304-174.858-282.77 0-512 229.23-512 512s229.23 512 512 512c141.386 0 269.368-57.326 362.016-149.984l149.984 149.984v-384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea07%3B%22 glyph-name%3D%22error%22 d%3D%22M512 867.226l429.102-855.226h-858.206l429.104 855.226zM512 960c-22.070 0-44.14-14.882-60.884-44.648l-437.074-871.112c-33.486-59.532-5-108.24 63.304-108.24h869.308c68.3 0 96.792 48.708 63.3 108.24h0.002l-437.074 871.112c-16.742 29.766-38.812 44.648-60.882 44.648v0zM576 128c0-35.346-28.654-64-64-64s-64 28.654-64 64c0 35.346 28.654 64 64 64s64-28.654 64-64zM512 256c-35.346 0-64 28.654-64 64v192c0 35.346 28.654 64 64 64s64-28.654 64-64v-192c0-35.346-28.654-64-64-64z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0a%3B%22 glyph-name%3D%22plus%22 d%3D%22M992 576h-352v352c0 17.672-14.328 32-32 32h-192c-17.672 0-32-14.328-32-32v-352h-352c-17.672 0-32-14.328-32-32v-192c0-17.672 14.328-32 32-32h352v-352c0-17.672 14.328-32 32-32h192c17.672 0 32 14.328 32 32v352h352c17.672 0 32 14.328 32 32v192c0 17.672-14.328 32-32 32z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0d%3B%22 glyph-name%3D%22remove%22 d%3D%22M512 960c-282.77 0-512-229.23-512-512s229.23-512 512-512 512 229.23 512 512-229.23 512-512 512zM512 32c-229.75 0-416 186.25-416 416s186.25 416 416 416 416-186.25 416-416-186.25-416-416-416zM672 704l-160-160-160 160-96-96 160-160-160-160 96-96 160 160 160-160 96 96-160 160 160 160z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea0e%3B%22 glyph-name%3D%22canceled%22 d%3D%22M874.040 810.040c-96.706 96.702-225.28 149.96-362.040 149.96s-265.334-53.258-362.040-149.96c-96.702-96.706-149.96-225.28-149.96-362.040s53.258-265.334 149.96-362.040c96.706-96.702 225.28-149.96 362.040-149.96s265.334 53.258 362.040 149.96c96.702 96.706 149.96 225.28 149.96 362.040s-53.258 265.334-149.96 362.040zM896 448c0-82.814-26.354-159.588-71.112-222.38l-535.266 535.268c62.792 44.758 139.564 71.112 222.378 71.112 211.738 0 384-172.262 384-384zM128 448c0 82.814 26.354 159.586 71.112 222.378l535.27-535.268c-62.794-44.756-139.568-71.11-222.382-71.11-211.738 0-384 172.262-384 384z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea10%3B%22 glyph-name%3D%22success%22 d%3D%22M864 832l-480-480-224 224-160-160 384-384 640 640z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xea2e%3B%22 glyph-name%3D%22progress%22 d%3D%22M889.68 793.68c-93.608 102.216-228.154 166.32-377.68 166.32-282.77 0-512-229.23-512-512h96c0 229.75 186.25 416 416 416 123.020 0 233.542-53.418 309.696-138.306l-149.696-149.694h352v352l-134.32-134.32zM928 448c0-229.75-186.25-416-416-416-123.020 0-233.542 53.418-309.694 138.306l149.694 149.694h-352v-352l134.32 134.32c93.608-102.216 228.154-166.32 377.68-166.32 282.77 0 512 229.23 512 512h-96z%22 %2F%3E%0D%3Cglyph unicode%3D%22%26%23xf07e%3B%22 glyph-name%3D%22connect%22 d%3D%22M1024 438.857c0-9.714-4-18.857-10.857-25.714l-146.286-146.286c-6.857-6.857-16-10.857-25.714-10.857-20 0-36.571 16.571-36.571 36.571v73.143h-585.143v-73.143c0-20-16.571-36.571-36.571-36.571-9.714 0-18.857 4-25.714 10.857l-146.286 146.286c-6.857 6.857-10.857 16-10.857 25.714s4 18.857 10.857 25.714l146.286 146.286c6.857 6.857 16 10.857 25.714 10.857 20 0 36.571-16.571 36.571-36.571v-73.143h585.143v73.143c0 20 16.571 36.571 36.571 36.571 9.714 0 18.857-4 25.714-10.857l146.286-146.286c6.857-6.857 10.857-16 10.857-25.714z%22 %2F%3E%0D%3C%2Ffont%3E%3C%2Fdefs%3E%3C%2Fsvg%3E") format("svg");font-weight:400;font-style:normal;font-display:block}[class^=ngx-fileupload-icon--],[class*=" ngx-fileupload-icon--"]{font-family:ngx-fileupload!important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1rem;font-size:inherit;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.ngx-fileupload-icon--start:before{color:#0073b1;content:"\\f07e"}.ngx-fileupload-icon--progress{color:#0073b1;display:inline-block;animation:rotating 2s linear infinite}.ngx-fileupload-icon--progress:before{content:"\\ea2e"}.ngx-fileupload-icon--invalid,.ngx-fileupload-icon--error{color:#d8000c}.ngx-fileupload-icon--invalid:before,.ngx-fileupload-icon--error:before{content:"\\ea07"}.ngx-fileupload-icon--upload:before{content:"\\e900"}.ngx-fileupload-icon--pending:before{content:"\\e94e"}.ngx-fileupload-icon--idle:before{content:"\\e979"}.ngx-fileupload-icon--reload:before{content:"\\e984"}.ngx-fileupload-icon--remove:before{content:"\\ea0d"}.ngx-fileupload-icon--add:before{content:"\\ea0a"}.ngx-fileupload-icon--cancel:before,.ngx-fileupload-icon--canceled:before{content:"\\ea0e"}.ngx-fileupload-icon--completed.success{color:#4bb543}.ngx-fileupload-icon--completed.success:before{content:"\\ea10"}.ngx-fileupload-icon--completed.error:before{content:"\\ea07"}:host{display:flex;flex-direction:column}:host .fileupload{overflow:auto;display:flex;flex-direction:row-reverse;flex:1;border:1px solid #D2D2D2}:host .file-upload--list{box-sizing:border-box;flex:1;overflow-x:hidden;flex-shrink:0;flex-grow:0;flex-basis:100%;padding:.5rem 1rem;max-height:50vh;overflow-y:auto}:host ngx-file-upload-ui--item:not(:last-child){margin-bottom:.5rem}:host .file-browser{padding:1rem 0;cursor:pointer;display:flex;flex:1;align-items:center;justify-content:center;flex-direction:column;color:#37474f}:host .file-browser .ngx-fileupload-icon--add{font-size:2.5rem;border:1px dashed #9aaeb8;width:4rem;line-height:4rem;text-align:center;border-radius:50%;margin-bottom:.5rem}\n']
    }]
  }], function() {
    return [{
      type: NgxFileUploadFactory,
      decorators: [{
        type: Inject,
        args: [NgxFileUploadFactory]
      }]
    }, {
      type: NgxFileUploadUiI18nProvider
    }];
  }, {
    itemTemplate: [{
      type: Input
    }],
    url: [{
      type: Input
    }],
    useFormData: [{
      type: Input
    }],
    formDataName: [{
      type: Input
    }],
    headers: [{
      type: Input
    }],
    validator: [{
      type: Input
    }],
    storage: [{
      type: Input
    }]
  });
})();
var NgxFileUploadUiToolbarModule = class _NgxFileUploadUiToolbarModule {
  static {
    this.ɵfac = function NgxFileUploadUiToolbarModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxFileUploadUiToolbarModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NgxFileUploadUiToolbarModule,
      declarations: [UploadToolbarComponent],
      exports: [UploadToolbarComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxFileUploadUiToolbarModule, [{
    type: NgModule,
    args: [{
      exports: [UploadToolbarComponent],
      declarations: [UploadToolbarComponent]
    }]
  }], null, null);
})();
var ProgressbarComponent = class _ProgressbarComponent {
  set duration(duration) {
    this.animationDuration = Math.max(duration, 0);
  }
  set gap(gap) {
    this.progressbarGap = Math.max(gap, 1);
  }
  set parts(count) {
    this.progressbarParts = Math.max(count, 1);
  }
  set progress(progress) {
    if (progress > 0) {
      this.updateProgress(progress);
    }
  }
  constructor(renderer, zone) {
    this.renderer = renderer;
    this.zone = zone;
    this.dashArrayCSS = `1`;
    this.animate = true;
    this.animationDuration = 250;
    this.progressbarGap = 1;
    this.progressBuffer = [];
    this.isAnimated = false;
    this.progressbarParts = 1;
  }
  ngOnInit() {
    const {
      width
    } = this.progressbar?.nativeElement.getBoundingClientRect() ?? {
      width: 0
    };
    const gap = this.progressbarParts === 1 ? 0 : this.progressbarGap;
    const widthWithoutGap = width - this.progressbarParts * gap;
    const dashArrayWidth = Math.ceil(widthWithoutGap / this.progressbarParts);
    this.dashArrayCSS = `${dashArrayWidth} ${gap}`;
  }
  updateProgress(progress) {
    if (this.animate) {
      this.isAnimated ? this.progressBuffer.push(progress) : this.animateProgress(progress);
      return;
    }
    if (this.progressLine) {
      const el = this.progressLine.nativeElement;
      this.renderer.setAttribute(el, "x2", `${progress}%`);
    }
  }
  /**
   * animate progress
   *
   * @see https://javascript.info/js-animation
   */
  animateProgress(progress) {
    const start = performance.now();
    const self = this;
    const el = this.progressLine?.nativeElement;
    if (!el) {
      return;
    }
    const curProgress = progress;
    const oldProgress = parseInt(el.getAttribute("x2") ?? "0", 10);
    this.isAnimated = true;
    this.zone.runOutsideAngular(() => {
      requestAnimationFrame(function animate(time) {
        const timeFraction = Math.min((time - start) / self.animationDuration, 1);
        const progressed = timeFraction;
        const progressDelta = curProgress - oldProgress;
        const newProgress = oldProgress + progressed * progressDelta;
        self.renderer.setAttribute(el, "x2", `${newProgress}%`);
        if (timeFraction < 1) {
          requestAnimationFrame(animate);
          return;
        }
        if (self.progressBuffer.length > 0) {
          self.animateProgress(self.progressBuffer.shift());
          return;
        }
        self.isAnimated = false;
      });
    });
  }
  static {
    this.ɵfac = function ProgressbarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProgressbarComponent)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(NgZone));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ProgressbarComponent,
      selectors: [["ngx-file-upload-ui--progressbar"]],
      viewQuery: function ProgressbarComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c3, 7, ElementRef);
          ɵɵviewQuery(_c4, 7, ElementRef);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.progressbar = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.progressLine = _t.first);
        }
      },
      inputs: {
        animate: "animate",
        duration: "duration",
        gap: "gap",
        parts: "parts",
        progress: "progress"
      },
      decls: 5,
      vars: 6,
      consts: [["progressbar", ""], ["progressLine", ""], ["xmlns", "http://www.w3.org/2000/svg", 1, "progressbar"], ["x1", "0", "y1", "50%", "x2", "100%", "y2", "50%", "shape-rendering", "crispEdges", 1, "background", 2, "stroke-dashoffset", "0", 3, "ngStyle"], ["x1", "0", "x2", "0", "y1", "50%", "y2", "50%", "shape-rendering", "crispEdges", 1, "progress", 3, "ngStyle"]],
      template: function ProgressbarComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵnamespaceSVG();
          ɵɵelementStart(0, "svg", 2, 0);
          ɵɵelement(2, "line", 3)(3, "line", 4, 1);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵadvance(2);
          ɵɵproperty("ngStyle", ɵɵpureFunction1(2, _c5, ctx.dashArrayCSS));
          ɵɵadvance();
          ɵɵproperty("ngStyle", ɵɵpureFunction1(4, _c5, ctx.dashArrayCSS));
        }
      },
      dependencies: [NgStyle],
      styles: ["[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   .progressbar[_ngcontent-%COMP%]{width:100%;height:1rem}[_nghost-%COMP%]   .progressbar[_ngcontent-%COMP%]   line[_ngcontent-%COMP%]{stroke-width:.5rem}[_nghost-%COMP%]   .progressbar[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]{stroke:#004261}[_nghost-%COMP%]   .progressbar[_ngcontent-%COMP%]   .progress[_ngcontent-%COMP%]{stroke:#0582ca}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressbarComponent, [{
    type: Component,
    args: [{
      selector: "ngx-file-upload-ui--progressbar",
      template: `<!--\r
<div class="progressbar" role="progressbar" [ngStyle]="{'flex-basis': progressed + '%'}"></div>\r
-->\r
<svg xmlns="http://www.w3.org/2000/svg" #progressbar class="progressbar">\r
\r
    <line class="background"\r
          x1="0"\r
          y1="50%"\r
          x2="100%"\r
          y2="50%" \r
          shape-rendering="crispEdges"\r
          style="stroke-dashoffset: 0;"\r
          [ngStyle]="{'stroke-dasharray': dashArrayCSS}">\r
    </line>\r
    \r
    <line \r
          class="progress"\r
          #progressLine\r
          x1="0" \r
          x2="0"\r
          y1="50%"\r
          y2="50%" \r
          shape-rendering="crispEdges"\r
          [ngStyle]=" {'stroke-dasharray': dashArrayCSS}">\r
    </line>\r
</svg>\r
`,
      styles: [":host{display:block}:host .progressbar{width:100%;height:1rem}:host .progressbar line{stroke-width:.5rem}:host .progressbar .background{stroke:#004261}:host .progressbar .progress{stroke:#0582ca}\n"]
    }]
  }], function() {
    return [{
      type: Renderer2
    }, {
      type: NgZone
    }];
  }, {
    animate: [{
      type: Input
    }],
    duration: [{
      type: Input
    }],
    gap: [{
      type: Input
    }],
    parts: [{
      type: Input
    }],
    progress: [{
      type: Input
    }],
    progressbar: [{
      type: ViewChild,
      args: ["progressbar", {
        read: ElementRef,
        static: true
      }]
    }],
    progressLine: [{
      type: ViewChild,
      args: ["progressLine", {
        read: ElementRef,
        static: true
      }]
    }]
  });
})();
var ProgressbarCircleData = class {
  constructor() {
    this.radius = 0;
    this.circumferences = 0;
    this.offset = 0;
    this.progress = 0;
  }
};
var ProgressbarCircleComponent = class _ProgressbarCircleComponent {
  set radius(radius) {
    this.data.radius = radius;
  }
  set parts(parts) {
    this.circleParts = Math.max(parts, 1);
  }
  set gap(gap) {
    this.circleGap = Math.max(gap, 1);
  }
  set progress(progressed) {
    this.data.progress = progressed;
    this.updateOffset();
  }
  constructor(zone) {
    this.zone = zone;
    this.data = new ProgressbarCircleData();
    this.dashArray = `1`;
    this.maskId = Math.random().toString(32);
    this.circleParts = 1;
    this.circleGap = 1;
  }
  ngOnInit() {
    this.initializeData(performance.now());
  }
  /**
   * initialize data, currently we running into a problem if data comes straight
   * from storage, then the css properties are not set correctly but element is allready
   * rendered. Seems it belongs to a document fragment but not the page / parent component.
   *
   * So we need to run into an loop to ensure we have all data we need, this loop will break
   * after 100ms to ensure we dont run into infinite loop and take what we have.
   *
   * Neither zone.onStable nor afterViewInit are working for me here. Maybe afterViewChecked but this
   * will trigger multiple times.
   *
   * @todo check for better ways to solve this without loop
   * @todo think about second option make size and radius mandatory could be bad for responsive design but will work without loop
   */
  initializeData(start, time = 0) {
    if (!this.progressbar) {
      return;
    }
    const {
      width,
      height
    } = this.progressbar.nativeElement.getBoundingClientRect();
    const sideLength = Math.min(width, height);
    if (!this.data.radius && sideLength === 0 && (time - start) / 100 < 1) {
      this.zone.runOutsideAngular(() => {
        requestAnimationFrame((ellapsed) => this.initializeData(start, ellapsed));
      });
    } else {
      this.data.radius = this.data.radius || this.calcRadius(sideLength) || 0;
      this.data.circumferences = 2 * Math.PI * this.data.radius;
      this.updateOffset();
      this.calcDashArray();
    }
  }
  /** calculate dasharray offset for mask */
  updateOffset() {
    this.data.offset = (100 - this.data.progress) / 100 * this.data.circumferences;
  }
  /**
   * calculate circle radius if no one is passed
   */
  calcRadius(sideLength) {
    if (sideLength === 0 || !this.progressbar || !this.progressbar.nativeElement) {
      return 0;
    }
    const svgElement = this.progressbar.nativeElement;
    const strokeProgressEl = svgElement.querySelector("circle.progress");
    const strokeBackgroundEl = svgElement.querySelector("circle.progress-bar");
    console.log(strokeProgressEl);
    console.log(strokeBackgroundEl);
    if (!strokeProgressEl || !strokeBackgroundEl) {
      return 0;
    }
    const strokeProgress = getComputedStyle(strokeProgressEl).strokeWidth;
    const strokeBackground = getComputedStyle(strokeBackgroundEl).strokeWidth;
    const strokeWidth = Math.max(parseFloat(strokeProgress), parseFloat(strokeBackground));
    return sideLength / 2 - strokeWidth / 2;
  }
  calcDashArray() {
    const partWidth = this.data.circumferences / this.circleParts;
    const gap = this.circleParts === 1 ? 0 : partWidth - Math.floor(partWidth) + this.circleGap;
    this.dashArray = `${partWidth - gap} ${gap}`;
  }
  static {
    this.ɵfac = function ProgressbarCircleComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProgressbarCircleComponent)(ɵɵdirectiveInject(NgZone));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ProgressbarCircleComponent,
      selectors: [["ngx-file-upload-ui--progressbar-circle"]],
      viewQuery: function ProgressbarCircleComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c3, 7, ElementRef);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.progressbar = _t.first);
        }
      },
      inputs: {
        radius: "radius",
        parts: "parts",
        gap: "gap",
        progress: "progress"
      },
      decls: 11,
      vars: 18,
      consts: [["progressbar", ""], ["xmlns", "http://www.w3.org/2000/svg"], ["cx", "50%", "cy", "50%", "fill", "transparent", "shape-rendering", "geometricPrecision", 1, "progress-bar"], ["cx", "50%", "cy", "50%", "shape-rendering", "geometricPrecision", "fill", "transparent", 1, "progress"], ["maskUnits", "userSpaceOnUse", 3, "id"], ["shape-rendering", "geometricPrecision", "cx", "50%", "cy", "50%", "stroke", "white", "fill", "black", 1, "progress", "mask", 3, "ngClass"], ["shape-rendering", "geometricPrecision", "cx", "50%", "cy", "50%", "fill", "black", 1, "progress-bar", "mask", 3, "ngClass"]],
      template: function ProgressbarCircleComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵnamespaceSVG();
          ɵɵelementStart(0, "svg", 1, 0);
          ɵɵelement(2, "circle", 2)(3, "circle", 3);
          ɵɵelementStart(4, "defs")(5, "mask", 4);
          ɵɵelement(6, "circle", 5);
          ɵɵelementEnd();
          ɵɵelementStart(7, "mask", 4);
          ɵɵelement(8, "circle", 6);
          ɵɵelementEnd()()();
          ɵɵnamespaceHTML();
          ɵɵelementStart(9, "span");
          ɵɵtext(10);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵadvance(2);
          ɵɵattribute("r", ctx.data.radius)("stroke-dasharray", ctx.dashArray)("mask", "url(#inverted-" + ctx.maskId + ")");
          ɵɵadvance();
          ɵɵattribute("r", ctx.data.radius)("stroke-dasharray", ctx.dashArray)("mask", "url(#" + ctx.maskId + ")");
          ɵɵadvance(2);
          ɵɵpropertyInterpolate("id", ctx.maskId);
          ɵɵadvance();
          ɵɵproperty("ngClass", ctx.data.progress > 0 ? "animate" : "");
          ɵɵattribute("r", ctx.data.radius)("stroke-dasharray", ctx.data.circumferences)("stroke-dashoffset", ctx.data.offset);
          ɵɵadvance();
          ɵɵpropertyInterpolate1("id", "inverted-", ctx.maskId, "");
          ɵɵadvance();
          ɵɵproperty("ngClass", ctx.data.progress > 0 ? "animate" : "");
          ɵɵattribute("r", ctx.data.radius)("stroke-dasharray", ctx.data.circumferences)("stroke-dashoffset", ctx.data.offset - ctx.data.circumferences);
          ɵɵadvance(2);
          ɵɵtextInterpolate1("", ctx.data.progress, " %");
        }
      },
      dependencies: [NgClass],
      styles: ["[_nghost-%COMP%]{display:block;position:relative}[_nghost-%COMP%]   svg[_ngcontent-%COMP%]{transform:rotate(-90deg)}[_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle.mask[_ngcontent-%COMP%]{stroke:#fff!important}[_nghost-%COMP%]   svg[_ngcontent-%COMP%]   circle.mask.animate[_ngcontent-%COMP%]{transition:stroke-dashoffset .15s linear}[_nghost-%COMP%]   span[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressbarCircleComponent, [{
    type: Component,
    args: [{
      selector: "ngx-file-upload-ui--progressbar-circle",
      template: `<svg xmlns="http://www.w3.org/2000/svg" #progressbar>\r
\r
    <circle class="progress-bar"\r
        cx="50%"\r
        cy="50%"\r
        fill="transparent"\r
        shape-rendering="geometricPrecision"\r
        [attr.r]="data.radius"\r
        [attr.stroke-dasharray]="dashArray"\r
        [attr.mask]="'url(#inverted-' + maskId +')'"></circle>\r
\r
    <!-- progresssbar circle -->\r
    <circle class="progress" \r
        cx="50%"\r
        cy="50%"\r
        [attr.r]="data.radius"\r
        [attr.stroke-dasharray]="dashArray"\r
        [attr.mask]="'url(#' + maskId +')'"\r
        shape-rendering="geometricPrecision"\r
        fill="transparent">\r
    </circle>\r
\r
    <!--\r
        declare masks for circles\r
\r
        first mask show progress, second mask remove progressbar background\r
        if both circles overlap, the edges looks a bit ugly so ensure we only see one\r
        of both progressbar circles\r
    -->\r
    <defs>\r
        <mask id="{{maskId}}" maskUnits="userSpaceOnUse">\r
            <circle class="progress mask" [ngClass]="data.progress > 0 ? 'animate' : ''"\r
                shape-rendering="geometricPrecision"\r
                cx="50%"\r
                cy="50%"\r
                [attr.r]="data.radius"\r
                [attr.stroke-dasharray]="data.circumferences"\r
                [attr.stroke-dashoffset]="data.offset"\r
                stroke="white"\r
                fill="black">\r
            </circle>\r
        </mask>\r
        <mask id="inverted-{{maskId}}" maskUnits="userSpaceOnUse">\r
            <circle class="progress-bar mask" [ngClass]="data.progress > 0 ? 'animate' : ''"\r
                shape-rendering="geometricPrecision"\r
                cx="50%"\r
                cy="50%"\r
                [attr.r]="data.radius"\r
                [attr.stroke-dasharray]="data.circumferences"\r
                [attr.stroke-dashoffset]="data.offset - data.circumferences"\r
                fill="black">\r
            </circle>\r
        </mask>\r
    </defs>\r
</svg>\r
\r
<span>{{data.progress}} %</span>\r
`,
      styles: [":host{display:block;position:relative}:host svg{transform:rotate(-90deg)}:host svg circle.mask{stroke:#fff!important}:host svg circle.mask.animate{transition:stroke-dashoffset .15s linear}:host span{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}\n"]
    }]
  }], function() {
    return [{
      type: NgZone
    }];
  }, {
    progressbar: [{
      type: ViewChild,
      args: ["progressbar", {
        read: ElementRef,
        static: true
      }]
    }],
    radius: [{
      type: Input
    }],
    parts: [{
      type: Input
    }],
    gap: [{
      type: Input
    }],
    progress: [{
      type: Input
    }]
  });
})();
var NgxFileUploadUiProgressbarModule = class _NgxFileUploadUiProgressbarModule {
  static {
    this.ɵfac = function NgxFileUploadUiProgressbarModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxFileUploadUiProgressbarModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NgxFileUploadUiProgressbarModule,
      declarations: [ProgressbarComponent, ProgressbarCircleComponent],
      imports: [CommonModule],
      exports: [ProgressbarComponent, ProgressbarCircleComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [CommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxFileUploadUiProgressbarModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      exports: [ProgressbarComponent, ProgressbarCircleComponent],
      declarations: [ProgressbarComponent, ProgressbarCircleComponent],
      providers: []
    }]
  }], null, null);
})();
var NgxFileUploadUiFileBrowserModule = class _NgxFileUploadUiFileBrowserModule {
  static {
    this.ɵfac = function NgxFileUploadUiFileBrowserModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxFileUploadUiFileBrowserModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NgxFileUploadUiFileBrowserModule,
      declarations: [FileBrowserDirective],
      exports: [FileBrowserDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxFileUploadUiFileBrowserModule, [{
    type: NgModule,
    args: [{
      imports: [],
      exports: [FileBrowserDirective],
      declarations: [FileBrowserDirective],
      providers: []
    }]
  }], null, null);
})();
var NgxFileUploadUiCommonModule = class _NgxFileUploadUiCommonModule {
  static {
    this.ɵfac = function NgxFileUploadUiCommonModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxFileUploadUiCommonModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NgxFileUploadUiCommonModule,
      declarations: [StateToStringPipe, FileSizePipe, CancelAblePipe],
      exports: [StateToStringPipe, FileSizePipe, CancelAblePipe]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxFileUploadUiCommonModule, [{
    type: NgModule,
    args: [{
      imports: [],
      exports: [StateToStringPipe, FileSizePipe, CancelAblePipe],
      declarations: [StateToStringPipe, FileSizePipe, CancelAblePipe],
      providers: []
    }]
  }], null, null);
})();
var NgxFileUploadUiItemModule = class _NgxFileUploadUiItemModule {
  static {
    this.ɵfac = function NgxFileUploadUiItemModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxFileUploadUiItemModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NgxFileUploadUiItemModule,
      declarations: [UploadItemComponent],
      imports: [CommonModule, NgxFileUploadUiCommonModule],
      exports: [UploadItemComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [CommonModule, NgxFileUploadUiCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxFileUploadUiItemModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, NgxFileUploadUiCommonModule],
      exports: [UploadItemComponent],
      declarations: [UploadItemComponent],
      providers: []
    }]
  }], null, null);
})();
var NgxFileUploadUiModule = class _NgxFileUploadUiModule {
  static {
    this.ɵfac = function NgxFileUploadUiModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxFileUploadUiModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NgxFileUploadUiModule,
      declarations: [UploadViewComponent],
      imports: [CommonModule, NgxFileUploadUiProgressbarModule, NgxFileUploadUiCommonModule, NgxFileUploadUiToolbarModule, NgxFileUploadUiItemModule, NgxFileUploadUiFileBrowserModule],
      exports: [NgxFileUploadUiCommonModule, NgxFileUploadUiProgressbarModule, NgxFileUploadUiCommonModule, NgxFileUploadUiToolbarModule, NgxFileUploadUiItemModule, NgxFileUploadUiFileBrowserModule, UploadViewComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [CommonModule, NgxFileUploadUiProgressbarModule, NgxFileUploadUiCommonModule, NgxFileUploadUiToolbarModule, NgxFileUploadUiItemModule, NgxFileUploadUiFileBrowserModule, NgxFileUploadUiCommonModule, NgxFileUploadUiProgressbarModule, NgxFileUploadUiCommonModule, NgxFileUploadUiToolbarModule, NgxFileUploadUiItemModule, NgxFileUploadUiFileBrowserModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxFileUploadUiModule, [{
    type: NgModule,
    args: [{
      declarations: [UploadViewComponent],
      imports: [CommonModule, NgxFileUploadUiProgressbarModule, NgxFileUploadUiCommonModule, NgxFileUploadUiToolbarModule, NgxFileUploadUiItemModule, NgxFileUploadUiFileBrowserModule],
      exports: [NgxFileUploadUiCommonModule, NgxFileUploadUiProgressbarModule, NgxFileUploadUiCommonModule, NgxFileUploadUiToolbarModule, NgxFileUploadUiItemModule, NgxFileUploadUiFileBrowserModule, UploadViewComponent]
    }]
  }], null, null);
})();
export {
  CancelAblePipe,
  Control,
  FileBrowserDirective,
  FileSizePipe,
  NGX_FILE_UPLOAD_UI_I18N,
  NgxFileUploadUiCommonModule,
  NgxFileUploadUiFileBrowserModule,
  NgxFileUploadUiItemModule,
  NgxFileUploadUiModule,
  NgxFileUploadUiProgressbarModule,
  NgxFileUploadUiToolbarModule,
  ProgressbarCircleComponent,
  ProgressbarComponent,
  StateToStringPipe,
  UploadItemComponent,
  UploadToolbarComponent,
  UploadViewComponent
};
//# sourceMappingURL=@ngx-file-upload_ui.js.map
