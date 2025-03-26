import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import { MatLabel, MatError, MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { PageHeaderComponent } from '@shared';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Field, FieldService } from 'app/project/services/field.service';
import { FieldTypes, OwnerType } from 'app/project/shared/enums/share-enums.enum';
import { Category, CategoryService } from 'app/project/services/category.service';

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatLabel,
    MatError,
    MatOption,
    MatCardModule,
    MatFormField,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MtxGridModule,
    PageHeaderComponent,
    MatFormFieldModule,
    TranslateModule,
  ],
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})

export default class FieldsComponent implements AfterViewInit {

  private readonly translate = inject(TranslateService);
  private readonly dialog = inject(MtxDialog);
  list: Field[] = [];
  isLoading = true;

  fieldForm: FormGroup;
  categories: Category[] = [];

  constructor(private formBuilder: FormBuilder, private fieldService: FieldService, private categoryService: CategoryService) {
    this.fieldForm = formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      caption: ['', Validators.required],
      fieldType: ['', Validators.required],
      showInHUD: [false],
      category_id: ['', Validators.required],
      ownerType: ['', Validators.required],
      listOfValue: [''],
      systemCol: [false],
      unit: [''],
      category: [{}],
      group: ['']
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
      header: this.translate.stream('caption'),
      field: 'caption',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('fieldType'),
      field: 'fieldType',
      minWidth: 100,
      formatter: (data: Field) => getfieldTypeString(data.fieldType)
    },
    {
      header: this.translate.stream('category'),
      field: 'category.name',
      minWidth: 100,
    },
    {
      header: this.translate.stream('ownerType'),
      field: 'ownerType',
      minWidth: 100,
      formatter: (data: Field) => getOwnerTypeString(data.ownerType)
    },
    {
      header: this.translate.stream('showInHUD'),
      field: 'showInHUD',
      minWidth: 100,
      type: 'tag',
      tag: {
        true: { text: 'Yes' },
        false: { text: 'No' },
      },
    },
    {
      header: this.translate.stream('group'),
      field: 'group',
      minWidth: 100
    },
    {
      header: this.translate.stream('systemCol'),
      field: 'systemCol',
      minWidth: 100,
      type: 'tag',
      tag: {
        true: { text: 'Yes' },
        false: { text: 'No' },
      },
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
          click: (record: Field) => this.delete(record.id),
        },
      ],
    },
  ];

  ngAfterViewInit(): void {
    this.fieldService.get().subscribe((result: any) => {
      this.list = result;
      this.isLoading = false;
    });
    this.categoryService.get().subscribe((category: Category[]) => {
      this.categories = category;
    });
  }

  cancel() {
    this.fieldForm.reset({
      id: 0,
      name: '',
      caption: '',
      fieldType: '',
      showInHUD: false,
      category_id: '',
      category: [{}],
      ownerType: '',
      listOfValue: '',
      systemCol: false,
      unit: ''
    }, { emitEvent: false });
    this.fieldForm.updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }

  save() {
    let field: Field = {
      id: this.fieldForm.value.id,
      name: this.fieldForm.value.name,
      caption: this.fieldForm.value.caption,
      fieldType: Number(this.fieldForm.value.fieldType) as FieldTypes,
      showInHUD: this.fieldForm.value.showInHUD,
      category_id: this.fieldForm.value.category_id,
      category: this.categories.find(c => c.id == this.fieldForm.value.category_id),
      ownerType: Number(this.fieldForm.value.ownerType) as OwnerType,
      listOfValue: this.fieldForm.value.listOfValue,
      systemCol: this.fieldForm.value.systemCol,
      unit: this.fieldForm.value.unit,
      group: this.fieldForm.value.group
    };

    if (this.fieldForm.controls["id"].value == '0') {
      this.fieldService.post(field).subscribe((insertdata: any) => {
        this.list.push(insertdata);
        this.list = [...this.list];
        this.cancel();
      });
    }
    else {
      this.fieldService.put(field.id, field).subscribe(() => {
        let foundField = this.list.find((x: { id: any; }) => x.id === field.id);
        Object.assign(foundField!, field);
        this.list = [...this.list];
        this.cancel();
      });
    }
  }

  edit(field: Field) {
    this.fieldForm.setValue(field);
    this.fieldForm.controls["ownerType"].setValue(field.ownerType.toString());
    this.fieldForm.controls["fieldType"].setValue(field.fieldType.toString());
    this.fieldForm.controls["category_id"].setValue(field.category_id.toString());
  }

  delete(id: number) {

    this.fieldService.delete(id).subscribe({
      next: () => {
        let foundFieldIdx = this.list.findIndex((x: { id: number; }) => x.id === id);
        this.list.splice(foundFieldIdx, 1);
        this.list = [...this.list];
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
function getfieldTypeString(fieldType: FieldTypes): string {
  switch (fieldType) {
    case FieldTypes.Boolean:
      return 'Boolean';
    case FieldTypes.Double:
      return 'Double';
    case FieldTypes.DateTime:
      return 'DateTime';
    case FieldTypes.Integer:
      return 'Integer';
    case FieldTypes.String:
      return 'String';
    case FieldTypes.ItemList:
      return 'Item List';
    case FieldTypes.ItemListMultiSelect:
      return 'Item List MultiSelect';
    case FieldTypes.Color:
      return 'Color';
    default:
      return 'Unknown';
  }
}

function getOwnerTypeString(ownerType: OwnerType): string {
  switch (ownerType) {
    case OwnerType.Object:
      return 'Object';
    case OwnerType.ObjectType:
      return 'ObjectType';
    default:
      return 'Unknown';
  }
}

