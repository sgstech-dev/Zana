import {
  HttpClient,
  HttpClientModule,
  HttpEventType,
  HttpHeaders
} from "./chunk-6FVM5ZDU.js";
import {
  InjectionToken,
  NgModule,
  inject,
  setClassMetadata,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-57TCTXNO.js";
import {
  merge
} from "./chunk-O6VDDHVS.js";
import {
  ReplaySubject,
  Subject,
  bufferCount,
  concat,
  distinctUntilKeyChanged,
  filter,
  map,
  of,
  switchMap,
  take,
  takeUntil,
  tap,
  timer
} from "./chunk-BONRK7YY.js";
import {
  __spreadValues
} from "./chunk-PEHFQLBM.js";

// node_modules/@ngx-file-upload/core/fesm2022/ngx-file-upload-core.mjs
var NgxFileUploadCoreModule = class _NgxFileUploadCoreModule {
  static {
    this.ɵfac = function NgxFileUploadCoreModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxFileUploadCoreModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NgxFileUploadCoreModule,
      imports: [HttpClientModule]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [HttpClientModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxFileUploadCoreModule, [{
    type: NgModule,
    args: [{
      imports: [HttpClientModule]
    }]
  }], null, null);
})();
var NgxFileUploadState;
(function(NgxFileUploadState2) {
  NgxFileUploadState2[NgxFileUploadState2["INVALID"] = 0] = "INVALID";
  NgxFileUploadState2[NgxFileUploadState2["CANCELED"] = 1] = "CANCELED";
  NgxFileUploadState2[NgxFileUploadState2["IDLE"] = 2] = "IDLE";
  NgxFileUploadState2[NgxFileUploadState2["PENDING"] = 3] = "PENDING";
  NgxFileUploadState2[NgxFileUploadState2["START"] = 4] = "START";
  NgxFileUploadState2[NgxFileUploadState2["PROGRESS"] = 5] = "PROGRESS";
  NgxFileUploadState2[NgxFileUploadState2["COMPLETED"] = 6] = "COMPLETED";
})(NgxFileUploadState || (NgxFileUploadState = {}));
var NgxFileUploadFile = class {
  constructor(file) {
    this.validationErrors = null;
    this.raw = file;
    this.size = file.size;
    this.type = file.type;
    this.name = file.name;
  }
};
var NgxFileUploadRequestModel = class {
  constructor(file) {
    this.filesToUpload = [];
    this.response = {
      body: null,
      errors: null,
      success: false
    };
    this.state = NgxFileUploadState.IDLE;
    this.uploaded = 0;
    this.progress = 0;
    this.hasError = false;
    this.filesToUpload = !Array.isArray(file) ? [file] : file;
  }
  get files() {
    return this.filesToUpload;
  }
  get name() {
    return this.files.map((file) => file.name);
  }
  get size() {
    return this.files.reduce((size, file) => size + file.size, 0);
  }
  get validationErrors() {
    const validationErrors = this.files.reduce((errors, file) => {
      if (file.validationErrors) {
        errors[file.name] = __spreadValues({}, file.validationErrors);
      }
      return errors;
    }, {});
    return Object.keys(validationErrors).length ? validationErrors : null;
  }
  toJson() {
    return {
      files: this.files,
      hasError: this.hasError,
      name: this.name,
      progress: this.progress,
      response: this.response,
      size: this.size,
      state: this.state,
      uploaded: this.uploaded,
      validationErrors: this.validationErrors
    };
  }
};
var NgxFileUploadRequest = class {
  get change() {
    return this.change$.asObservable();
  }
  get destroyed() {
    return this.destroyed$.asObservable();
  }
  get data() {
    return this.model.toJson();
  }
  set state(state) {
    this.model.state = state;
  }
  get state() {
    return this.model.state;
  }
  constructor(http, files, options) {
    this.http = http;
    this.cancel$ = new Subject();
    this.change$ = new Subject();
    this.destroyed$ = new Subject();
    this.totalSize = -1;
    this.options = {
      url: "",
      formData: {
        enabled: true,
        name: "file"
      },
      withCredentials: false
    };
    this.hooks = {
      beforeStart: []
    };
    this.requestId = "";
    this.model = new NgxFileUploadRequestModel(files);
    this.state = this.isInvalid() ? NgxFileUploadState.INVALID : NgxFileUploadState.IDLE;
    this.options = __spreadValues(__spreadValues({}, this.options), options);
  }
  beforeStart(hook) {
    this.hooks.beforeStart = [...this.hooks.beforeStart, hook];
  }
  /**
   * cancel current file upload, this will complete change subject
   */
  cancel() {
    if (this.isProgress() || this.isPending()) {
      this.model.state = NgxFileUploadState.CANCELED;
      this.notifyObservers();
      this.cancel$.next(true);
    }
  }
  destroy() {
    this.finalizeUpload();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  /**
   * return true if upload was not completed since the server
   * sends back an error response
   */
  hasError() {
    return this.model.state === NgxFileUploadState.COMPLETED && !this.model.response?.success;
  }
  isCompleted(ignoreError = false) {
    let isCompleted = this.isRequestCompleted();
    isCompleted = isCompleted && (ignoreError || !this.hasError());
    isCompleted = isCompleted || this.model.state === NgxFileUploadState.CANCELED;
    return isCompleted;
  }
  isCanceled() {
    return this.model.state === NgxFileUploadState.CANCELED;
  }
  isInvalid() {
    return this.state === NgxFileUploadState.INVALID || this.model.validationErrors !== null;
  }
  isProgress() {
    return this.state === NgxFileUploadState.PROGRESS || this.state === NgxFileUploadState.START;
  }
  isPending() {
    return this.state === NgxFileUploadState.PENDING;
  }
  isIdle() {
    return this.state === NgxFileUploadState.IDLE;
  }
  isRequestCompleted() {
    return this.state === NgxFileUploadState.COMPLETED;
  }
  /**
   * restart download again
   * reset state, and reset errors
   */
  retry() {
    if (this.isRequestCompleted() && this.hasError() || this.isCanceled()) {
      this.model = new NgxFileUploadRequestModel(this.model.files);
      this.start();
    }
  }
  /**
   * start file upload
   */
  start() {
    if (!this.isIdle() && !this.isPending()) {
      return;
    }
    this.beforeStartHook$.pipe(filter((isAllowedToStart) => isAllowedToStart), tap(() => (this.model.state = NgxFileUploadState.START, this.notifyObservers())), switchMap(() => this.startUploadRequest())).subscribe({
      next: (event) => this.handleHttpEvent(event),
      error: (error) => this.handleError(error)
    });
  }
  removeInvalidFiles() {
    if (this.state !== NgxFileUploadState.INVALID) {
      return;
    }
    const files = this.data.files.filter((file) => file.validationErrors === null);
    if (files.length) {
      this.model = new NgxFileUploadRequestModel(files);
      this.state = NgxFileUploadState.IDLE;
      this.notifyObservers();
    } else {
      this.destroy();
    }
  }
  /**
   * call hooks in order, see playground
   * @see https://rxviz.com/v/58GkkYv8
   */
  get beforeStartHook$() {
    const initialState = this.model.state;
    let hook$ = of(true);
    if (this.hooks.beforeStart.length) {
      hook$ = concat(...this.hooks.beforeStart).pipe(bufferCount(this.hooks.beforeStart.length), map((result) => result.every((isAllowed) => isAllowed)), tap(() => this.model.state !== initialState ? this.notifyObservers() : void 0));
    }
    return hook$;
  }
  /**
   * build form data and send request to server
   */
  startUploadRequest() {
    const uploadBody = this.createUploadBody();
    const headers = this.createUploadHeaders();
    this.totalSize = this.model.size;
    return this.http.post(this.options.url, uploadBody, {
      reportProgress: true,
      withCredentials: this.options.withCredentials,
      observe: "events",
      headers
    }).pipe(takeUntil(merge(this.cancel$, this.destroyed$)));
  }
  /**
   * create upload body which will should be send
   */
  createUploadBody() {
    if (this.options.formData?.enabled) {
      const formDataOptions = this.options.formData;
      const formData = new FormData();
      const label = formDataOptions.name ?? "fileupload";
      this.model.files.forEach((file) => {
        formData.append(label, file.raw, file.name);
      });
      const additionalData = formDataOptions.additionalData;
      if (additionalData && Object.keys(additionalData).length > 0) {
        for (let [key, value] of Object.entries(additionalData)) {
          formData.append(key, value);
        }
      }
      if (formDataOptions.metadata) {
        formData.append("metadata", JSON.stringify(formDataOptions.metadata));
      }
      return formData;
    }
    return this.model.files[0].raw;
  }
  /**
   * create upload request headers
   */
  createUploadHeaders() {
    if (this.options.headers) {
      let headers = new HttpHeaders();
      if (this.options.headers.authorization) {
        headers = this.createAuthroizationHeader(headers);
      }
      Object.keys(this.options.headers).filter((header) => header !== "authorization").forEach((header) => headers = headers.append(header, this.options.headers?.[header]));
      return headers;
    }
    return void 0;
  }
  /**
   * create authorization header which will send
   */
  createAuthroizationHeader(headers) {
    const authHeader = this.options.headers?.authorization;
    if (authHeader) {
      if (typeof authHeader === "string") {
        headers = headers.append("Authorization", `Bearer ${authHeader}`);
      } else {
        headers = headers.append("Authorization", `${authHeader.key || "Bearer"} ${authHeader.token}`);
      }
    }
    return headers;
  }
  /**
   * request responds with an error
   */
  handleError(response) {
    let errors = response.error instanceof ProgressEvent || response.status === 404 ? response.message : response.error;
    errors = Array.isArray(errors) ? errors : [errors];
    const uploadResponse = {
      success: false,
      body: null,
      errors
    };
    this.model.state = NgxFileUploadState.COMPLETED;
    this.model.response = uploadResponse;
    this.model.hasError = true;
    this.notifyObservers();
  }
  /**
   * handle all http events
   */
  handleHttpEvent(event) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        this.handleProgress(event);
        break;
      case HttpEventType.Response:
        this.handleResponse(event);
        break;
    }
  }
  /**
   * handle http progress event
   */
  handleProgress(event) {
    const loaded = event.loaded;
    const progress = loaded * 100 / this.totalSize;
    this.model.state = NgxFileUploadState.PROGRESS;
    this.model.uploaded = Math.min(loaded, this.totalSize);
    this.model.progress = Math.min(Math.round(progress), 100);
    this.notifyObservers();
  }
  /**
   * upload completed with an success
   */
  handleResponse(res) {
    const uploadResponse = {
      success: res.ok,
      body: res.body,
      errors: null
    };
    this.model.response = uploadResponse;
    this.model.state = NgxFileUploadState.COMPLETED;
    this.notifyObservers();
    this.finalizeUpload();
  }
  /**
   * send notification to observers
   */
  notifyObservers() {
    this.change$.next(this.data);
  }
  /**
   * upload has been completed, canceled or destroyed
   */
  finalizeUpload() {
    this.change$.complete();
    this.cancel$.complete();
  }
};
var Factory = class {
  /**
   * construct upload factory
   */
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  createUploadRequest(file, options, validator) {
    const files = Array.isArray(file) ? file : [file];
    if (files.length) {
      const fileModels = files.map((file2) => {
        const model = new NgxFileUploadFile(file2);
        if (validator) {
          model.validationErrors = "validate" in validator ? validator.validate(file2) : validator(file2);
        }
        return model;
      });
      return new NgxFileUploadRequest(this.httpClient, fileModels, options);
    }
    return null;
  }
};
var NgxFileUploadFactory = new InjectionToken("Ngx Fileupload Factory", {
  providedIn: "root",
  factory: () => new Factory(inject(HttpClient))
});
var NgxFileUploadQueue = class {
  constructor() {
    this.active = 0;
    this.queuedUploads = [];
    this.concurrentCount = -1;
    this.observedUploads = /* @__PURE__ */ new WeakSet();
  }
  set concurrent(count) {
    this.concurrentCount = count;
  }
  register(upload) {
    upload.beforeStart(this.createBeforeStartHook(upload));
  }
  /**
   * create before start hook, if any upload wants to start we have to check
   */
  createBeforeStartHook(request) {
    return of(true).pipe(
      /**
       * before any download starts we registers on it
       * to get notified when it starts and when it is completed, destroyed
       */
      tap(() => this.registerUploadChange(request)),
      /**
       * check active uploads and max uploads we could run
       */
      map(() => this.active < this.concurrentCount),
      /**
       * if we could not start upload push it into queue
       */
      tap((isStartAble) => {
        if (!isStartAble) {
          this.writeToQueue(request);
        }
      })
    );
  }
  /**
   * register to upload change
   */
  registerUploadChange(request) {
    if (!this.observedUploads.has(request)) {
      this.observedUploads.add(request);
      const change$ = request.change;
      const uploadComplete$ = change$.pipe(filter(() => request.isCompleted(true)), take(1));
      change$.pipe(filter((data) => data.state === NgxFileUploadState.START), takeUntil(merge(request.destroyed, uploadComplete$))).subscribe({
        next: () => this.active += 1,
        complete: () => {
          this.requestCompleted(request);
        }
      });
    }
  }
  writeToQueue(request) {
    request.state = NgxFileUploadState.PENDING;
    this.queuedUploads = [...this.queuedUploads, request];
  }
  /**
   * requests gets completed, this means request is pending or was progressing and the user
   * cancel request, remove it or even destroys them
   */
  requestCompleted(request) {
    this.isInUploadQueue(request) ? this.removeFromQueue(request) : this.startNextInQueue();
    this.observedUploads.delete(request);
  }
  /**
   * checks upload is in queue
   */
  isInUploadQueue(request) {
    return this.queuedUploads.indexOf(request) > -1;
  }
  /**
   * remove upload request from queued uploads
   */
  removeFromQueue(request) {
    this.queuedUploads = this.queuedUploads.filter((upload) => upload !== request);
  }
  /**
   * try to start next upload in queue, returns false if no further uploads
   * exists
   */
  startNextInQueue() {
    this.active = Math.max(this.active - 1, 0);
    if (this.queuedUploads.length > 0) {
      const nextUpload = this.queuedUploads.shift();
      nextUpload.start();
    }
  }
};
var defaultStoreConfig = {
  concurrentUploads: 5,
  autoStart: false
};
var NgxFileUploadStorage = class {
  constructor(config) {
    this.uploads = /* @__PURE__ */ new Map();
    this.destroyed$ = new Subject();
    this.bulkProcess = [];
    this.change$ = new ReplaySubject(1);
    this.uploadQueue = new NgxFileUploadQueue();
    this.storeConfig = __spreadValues(__spreadValues({}, defaultStoreConfig), config || {});
    this.uploadQueue.concurrent = this.storeConfig.concurrentUploads;
  }
  /**
   * submits if any upload changes his state, uploads
   * gets removed or added
   */
  change() {
    return this.change$;
  }
  /**
   * add new upload to store
   */
  add(upload) {
    const requests = Array.isArray(upload) ? upload : [upload];
    requests.forEach((request) => {
      if (request.requestId && this.uploads.has(request.requestId)) {
        return;
      }
      request.requestId = request.requestId || this.generateUniqeRequestId();
      this.uploads.set(request.requestId, request);
      this.registerUploadEvents(request);
    });
    this.afterUploadsAdd(requests);
    this.notifyObserver();
  }
  destroy() {
    this.destroyed$.next(true);
    this.stopAll();
    this.destroyed$.complete();
    this.change$.complete();
  }
  remove(upload) {
    const id = typeof upload === "string" ? upload : upload.requestId;
    const request = this.uploads.get(id);
    request?.destroy();
  }
  purge() {
    let notify = false;
    this.uploads.forEach((request) => {
      if (request.isCompleted() || request.isInvalid()) {
        this.bulkProcess.push(request.requestId);
        notify = true;
        request.destroy();
      }
    });
    if (notify) {
      this.notifyObserver();
    }
  }
  startAll() {
    this.uploads.forEach((upload) => {
      if (upload.isIdle()) {
        this.bulkProcess.push(upload.requestId);
        upload.start();
      }
    });
    this.notifyObserver();
  }
  stopAll() {
    this.uploads.forEach((upload) => {
      this.bulkProcess.push(upload.requestId);
      upload.destroy();
    });
    this.notifyObserver();
  }
  removeInvalid() {
    this.uploads.forEach((upload) => {
      if (upload.isInvalid()) {
        this.bulkProcess.push(upload.requestId);
        upload.destroy();
      }
    });
    this.notifyObserver();
  }
  registerUploadEvents(request) {
    if (!request.isInvalid()) {
      this.queueRequest(request);
    } else {
      request.change.pipe(filter((data) => data.state === NgxFileUploadState.IDLE), take(1), takeUntil(request.destroyed)).subscribe(() => {
        this.queueRequest(request);
        this.notifyObserver();
      });
    }
    request.destroyed.pipe(tap(() => this.uploads.delete(request.requestId)), take(1)).subscribe(() => this.isBulkProcess(request) ? this.removeBulkProcess(request) : this.notifyObserver());
  }
  queueRequest(request) {
    this.uploadQueue.register(request);
    this.handleRequestChange(request);
  }
  /**
   * @description register to request change events, this will notify all observers
   * if state from upload state has been changed, this will not notify
   * if amount of uploaded size has been changed
   */
  handleRequestChange(request) {
    const isAutoRemove = !!(this.storeConfig.removeCompleted ?? 0);
    request.change.pipe(
      distinctUntilKeyChanged("state"),
      tap(() => {
        this.isBulkProcess(request) ? this.removeBulkProcess(request) : this.notifyObserver();
      }),
      /* only continue if completed with no errors and autoremove is enabled */
      filter(() => request.data.state === NgxFileUploadState.COMPLETED && !request.hasError() && isAutoRemove),
      /** wait for given amount of time before we remove item */
      switchMap(() => timer(this.storeConfig.removeCompleted ?? 0)),
      /* automatically unsubscribe if request gets destroyed */
      takeUntil(request.destroyed)
    ).subscribe(() => this.remove(request));
  }
  afterUploadsAdd(requests) {
    if (this.storeConfig.autoStart) {
      requests.forEach((uploadRequest) => uploadRequest.start());
    }
  }
  generateUniqeRequestId() {
    let reqId;
    do {
      reqId = Array.from({
        length: 4
      }, () => Math.random().toString(32).slice(2)).join("-");
    } while (this.uploads.has(reqId));
    return reqId;
  }
  notifyObserver() {
    this.change$.next(Array.from(this.uploads.values()));
  }
  removeBulkProcess(request) {
    this.bulkProcess = this.bulkProcess.filter((id) => request.requestId !== id);
  }
  isBulkProcess(request) {
    return this.bulkProcess.indexOf(request.requestId) > -1;
  }
};
var NgxFileUploadGroupedvalidator = class {
  constructor(validators) {
    this.validators = Array.isArray(validators) ? validators : [];
  }
  /**
   * add validators
   */
  add(...validators) {
    this.validators = this.validators.concat(validators);
  }
  /**
   * clean up all validators
   */
  clean() {
    this.validators = [];
  }
  /**
   * executes validator and returns validation result
   */
  execValidator(validator, file) {
    if ("validate" in validator) {
      return validator.validate(file);
    }
    return validator(file);
  }
};
var NgxFileUploadAndValidator = class extends NgxFileUploadGroupedvalidator {
  validate(file) {
    const validationResult = {};
    let hasErrors = false;
    for (const validator of this.validators) {
      const result = this.execValidator(validator, file);
      if (result !== null) {
        Object.assign(validationResult, result);
        hasErrors = true;
      }
    }
    return hasErrors ? validationResult : null;
  }
};
var NgxFileUploadOrValidator = class extends NgxFileUploadGroupedvalidator {
  validate(file) {
    let validationResult = {};
    for (const validator of this.validators) {
      const result = this.execValidator(validator, file);
      if (result === null) {
        validationResult = null;
        break;
      }
      Object.assign(validationResult, result);
    }
    return validationResult;
  }
};
var NgxFileUploadValidationBuilder = class {
  static and(...validators) {
    return new NgxFileUploadAndValidator(validators);
  }
  static or(...validators) {
    return new NgxFileUploadOrValidator(validators);
  }
};

export {
  NgxFileUploadCoreModule,
  NgxFileUploadState,
  NgxFileUploadFile,
  NgxFileUploadRequest,
  NgxFileUploadFactory,
  NgxFileUploadQueue,
  NgxFileUploadStorage,
  NgxFileUploadGroupedvalidator,
  NgxFileUploadAndValidator,
  NgxFileUploadOrValidator,
  NgxFileUploadValidationBuilder
};
//# sourceMappingURL=chunk-4YZEFOLS.js.map
