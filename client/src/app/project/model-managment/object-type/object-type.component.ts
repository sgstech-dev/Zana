import { NgIf } from '@angular/common';
import { AfterViewInit, Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { NgxFileUploadCoreModule, NgxFileUploadFactory, NgxFileUploadOptions, NgxFileUploadStorage } from '@ngx-file-upload/core';
import { NgxFileUploadUiCommonModule, NgxFileUploadUiToolbarModule } from '@ngx-file-upload/ui';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PageHeaderComponent } from '@shared';
import { Category, CategoryService } from 'app/project/services/category.service';
import { ObjectType, ObjectTypeService } from 'app/project/services/object-type.service';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { ModelViewerComponent } from '../model-viewer/model-viewer.component';

@Component({
  selector: 'app-object-type',
  standalone: true,
  imports: [
    NgxFileUploadCoreModule,
    NgxFileUploadUiCommonModule,
    NgxFileUploadUiToolbarModule,
    NgxFileDropModule,
    PageHeaderComponent,
    MatFormFieldModule,
    TranslateModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatLabel,
    MatError,
    MatOption,
    MatInputModule,
    MatSelectModule,
    MatFormField,
    MatButtonModule,
    MtxGridModule,
    ModelViewerComponent
  ],
  templateUrl: './object-type.component.html',
  styleUrl: './object-type.component.scss'
})

export class ObjectTypeComponent implements OnInit, AfterViewInit {
  browseModel() {
    throw new Error('Method not implemented.');
  }

  iconPreview = "";
  picPreview = "";
  modelPreview = "";
  list: ObjectType[] = [];
  isLoading = true;
  selectedFiles?: FileList;
  currentFile?: File;
  objectTypeForm: FormGroup;
  categories: Category[] = [];
  private readonly translate = inject(TranslateService);
  snackBar = inject(MatSnackBar);

  constructor(
    private formBuilder: FormBuilder,
    private objecttypeService: ObjectTypeService,
    private categoryService: CategoryService
  ) {
    this.objectTypeForm = formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      category_id: [-1, Validators.required],
      category: [{}],
    });
  }

  ngAfterViewInit(): void {
    this.objecttypeService.get().subscribe((result: any) => {
      this.list = result;
      this.isLoading = false;
    });
    this.categoryService.get().subscribe((category: Category[]) => {
      this.categories = category;
    });
  }

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('name'),
      field: 'name',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('category'),
      field: 'category.name',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('icon'),
      field: 'iconBase64',
      minWidth: 100,
      type: 'image',
    },
    {
      header: this.translate.stream('operation'),
      field: 'operation',
      minWidth: 140,
      width: '140px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translate.stream('edit'),
          click: record => this.edit(record),
        },
        {
          type: 'icon',
          color: 'warn',
          icon: 'delete',
          tooltip: this.translate.stream('delete'),
          pop: {
            title: this.translate.stream('confirm_delete'),
            closeText: this.translate.stream('close'),
            okText: this.translate.stream('ok'),
          },
          click: (record: ObjectType) => this.delete(record.id),
        },
      ],
    },
  ]

  ngOnInit(): void {

  }

  selectModelFile($event: Event) {
    this.selectFile(event).then((preview) => {
      this.modelPreview = preview;
    }).catch((error) => {
      console.error('Error reading file:', error);
    });
  }

  selectPicFile(event: any) {
    this.selectFile(event).then((preview) => {
      this.picPreview = preview; // Handle the preview here
    }).catch((error) => {
      console.error('Error reading file:', error);
    });
  }

  selectIconFile(event: any) {
    this.selectFile(event).then((preview) => {
      this.iconPreview = preview; // Handle the preview here
    }).catch((error) => {
      console.error('Error reading file:', error);
    });
  }

  selectFile(event: any): Promise<string> {
    return new Promise((resolve, reject) => {
      let preview = '';
      this.selectedFiles = event.target.files;

      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);

        if (file) {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            preview = e.target.result;
            resolve(preview); // Return the preview when loading completes
          };

          reader.onerror = (error) => {
            reject(error); // Handle any errors
          };

          reader.readAsDataURL(file);
        } else {
          reject('No file selected');
        }
      } else {
        reject('No files found');
      }
    });
  }

  browseIcon() {
    document!.getElementById("iconFile")!.click();
  }

  browsePic() {
    document!.getElementById("picFile")!.click();
  }
  cancel() {
    this.objectTypeForm.reset({
      id: 0,
      name: '',
      category_id: -1,
      category: [{}],
    }, { emitEvent: false });
    this.objectTypeForm.updateValueAndValidity({ onlySelf: true, emitEvent: true });
    this.picPreview = "";
    this.iconPreview = "";
  }

  save() {
    let objectType: ObjectType = {
      id: this.objectTypeForm.value.id,
      name: this.objectTypeForm.value.name,
      iconBase64: this.iconPreview,
      picBase64: this.picPreview,
      category_id: Number(this.objectTypeForm.value.category_id),
      category: this.categories.find(c => c.id == this.objectTypeForm.value.category_id),
      modelBase64:""
    };

    if (this.objectTypeForm.controls["id"].value == '0') {
      this.objecttypeService.post(objectType).subscribe((insertdata: any) => {
        this.list.push(insertdata);
        this.list = [...this.list];
        this.cancel();
      });
    }
    else {
      this.objecttypeService.put(objectType.id, objectType).subscribe(() => {
        let foundField = this.list.find((x: { id: any; }) => x.id === objectType.id);
        Object.assign(foundField!, objectType);
        this.list = [...this.list];
        this.cancel();
      });
    }
  }

  delete(id: number): void {
    this.objecttypeService.delete(id).subscribe({
      next: () => {
        let foundObjecttypeIdx = this.list.findIndex((x: { id: number; }) => x.id === id);
        this.list.splice(foundObjecttypeIdx, 1);
        this.list = [...this.list];
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  edit(objectType: ObjectType): void {
    this.objectTypeForm.setValue({
      id: objectType.id,
      name: objectType.name,
      category_id: objectType.category_id,
      category: this.categories.find(c => c.id == objectType.category_id)
    });
    this.picPreview = objectType.picBase64;
    this.iconPreview = objectType.iconBase64;
    this.objectTypeForm.controls["category_id"].setValue(objectType.category_id.toString());
  }
}
