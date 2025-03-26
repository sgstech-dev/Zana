import { NgFor } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatLabel, MatError, MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Category, CategoryService } from 'app/project/services/category.service';
import { Field, FieldService, OwnerTypes } from 'app/project/services/field.service';
import { GisObjectMetaData, GisObjectMetaDataService } from 'app/project/services/gis-object-meta-data.service';
import { GisObject } from 'app/project/services/gis-object.service';
import { ObjectType, ObjectTypeService } from 'app/project/services/object-type.service';
import { FieldTypes } from 'app/project/shared/enums/share-enums.enum';
import { Guid } from "guid-typescript";
import { json } from 'stream/consumers';

@Component({
  selector: 'app-gis-object',
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
    MatFormFieldModule,
    TranslateModule,
    MatDialogModule,
    MatTabsModule,

  ],
  templateUrl: './gis-object.component.html',
  styleUrl: './gis-object.component.scss'
})
export class GisObjectComponent implements OnInit {
  gisObject: GisObject;
  gisObjectForm: FormGroup;
  metaDataForm: FormGroup;
  categories: Category[] = [];
  objectTypes: ObjectType[] = [];
  fieldGrouped: {};
  tabs: string[] = [];
  FieldTypes = FieldTypes;
  private readonly translate = inject(TranslateService);
  private identityNo: Guid;
  public selectedObjectType: ObjectType;
  public metadata: Map<number, object> = new Map<number, object>;
  public layerType: string;

  constructor(
    private formBuilder: FormBuilder,
    private objectTypeService: ObjectTypeService,
    private categoryService: CategoryService,
    private fieldService: FieldService,
    private gisObjectMetaDataService: GisObjectMetaDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.gisObjectForm = formBuilder.group({
      id: [0],
      identityNo: [''],
      name: ['', Validators.required],
      ObjectType_id: [0, Validators.required],
      selectedCategory_id: [0]
    });
    this.metaDataForm = formBuilder.group({});

  }
  ngOnInit(): void {
    this.categoryService.get().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.gisObject = this.data.gisObject;
      this.layerType = this.data.type;

      if (this.gisObject) {
        this.changeCategory(this.gisObject.objectType.category_id, true);
        if (this.gisObject) {
          this.gisObjectForm.setValue(
            {
              id: this.gisObject.id,
              identityNo: this.gisObject.identityNo,
              name: this.gisObject.name,
              ObjectType_id: this.gisObject.objectType_id.toString(),
              selectedCategory_id: this.gisObject.objectType.category_id.toString()
            });
          this.selectedObjectType = this.gisObject.objectType;
        }
      }
      else {
        if (this.layerType == "polyline") {
          let tmpcategory_id = categories.filter(c => c.key == 'aircraft')[0].id;
          this.gisObjectForm.controls['selectedCategory_id'].setValue(tmpcategory_id.toString());
          this.changeCategory(tmpcategory_id, true);
        }
      }
    });
    this.identityNo = Guid.create();

    //this.fieldForm.controls["category_id"].setValue(field.category_id.toString());
  }

  save() {
    let fullData = { gisObject: {}, metadata: {} };
    this.gisObject = {
      id: this.gisObjectForm.controls["id"].value,
      identityNo: this.identityNo.toString(),
      name: this.gisObjectForm.controls["name"].value,
      objectType_id: Number(this.gisObjectForm.controls["ObjectType_id"].value),
      objectType: this.selectedObjectType,
      parent_id: 0,
      scenario_id: this.data.currentScenario_id,
      parent: undefined,
      status :undefined
    }
    fullData.gisObject = this.gisObject;
    // this.metaDataForm.v.forEach(element => {
    //fullData.metadata = this.metaDataForm.value;
    const formValues = this.metaDataForm.value;

    // Convert all values to strings
    const stringifiedValues = Object.keys(formValues).reduce((acc, key) => {
      acc[key] = String(formValues[key]);
      return acc;
    }, {});
    fullData.metadata = stringifiedValues;
    // });
    return JSON.stringify(fullData);
  }

  slelectCategory($event: MatSelectChange) {
    this.changeCategory($event.value, false);
  }

  changeCategory(category_id: number, oninit: boolean) {
    this.objectTypeService.get().subscribe((result: ObjectType[]) => {
      this.objectTypes = result.filter(ot => ot.category_id == category_id);
      if (!oninit)
        this.gisObjectForm.controls["ObjectType_id"].setValue("");
      this.gisObjectForm.controls["ObjectType_id"].updateValueAndValidity();
    });
    this.fieldService.getByCategory(category_id, OwnerTypes.Object).subscribe((fields: Field[]) => {
      this.addFormControls(fields);
      this.gisObjectMetaDataService.getGisObjectMetaDatasByObjectId(this.gisObject.id).subscribe((gisObjectMetaDatas: GisObjectMetaData[]) => {
        gisObjectMetaDatas.forEach(gisObjectMetaData => {
          if (gisObjectMetaData.field.fieldType == FieldTypes.ItemListMultiSelect)
            this.metaDataForm.controls['field_' + gisObjectMetaData.field_id].setValue(gisObjectMetaData.value.split(','));
          else if (gisObjectMetaData.field.fieldType == FieldTypes.Boolean)
            this.metaDataForm.controls['field_' + gisObjectMetaData.field_id].setValue(gisObjectMetaData.value == "true");
          else
            this.metaDataForm.controls['field_' + gisObjectMetaData.field_id].setValue(gisObjectMetaData.value);
        });
      });
      this.fieldGrouped = this.groupBy(fields, item => item.group);
      this.tabs = Object.keys(this.fieldGrouped);
    });
  }

  selectObjectType($event: MatSelectChange) {
    this.selectedObjectType = this.objectTypes.find(ot => ot.id == $event.value);
  }

  groupBy<T, K extends keyof any>(array: T[], key: (item: T) => K): Record<K, T[]> {
    return array.reduce((result, current) => {
      const group = key(current);
      if (!result[group]) {
        result[group] = [];
      }
      result[group].push(current);
      return result;
    }, {} as Record<K, T[]>);
  }

  addFormControls(fields: Field[]) {
    fields.forEach(field => {
      switch (field.fieldType) {
        case FieldTypes.Boolean: this.metaDataForm.addControl('field_' + field.id, this.formBuilder.control<boolean>(false));
          break;
        case FieldTypes.Integer: this.metaDataForm.addControl('field_' + field.id, this.formBuilder.control<Number>(0));
          break;
        case FieldTypes.Double: this.metaDataForm.addControl('field_' + field.id, this.formBuilder.control<number>(0));
          break;
        case FieldTypes.String:
          this.metaDataForm.addControl('field_' + field.id, this.formBuilder.control<string>(''));
          break;
        case FieldTypes.ItemList:
          this.metaDataForm.addControl('field_' + field.id, this.formBuilder.control<string>(''));
          break;
        case FieldTypes.ItemListMultiSelect:
          this.metaDataForm.addControl('field_' + field.id, this.formBuilder.control<string[]>([]));
          break;
        case FieldTypes.DateTime:
          this.metaDataForm.addControl('field_' + field.id, this.formBuilder.control<Date>(new Date));
          break;
        case FieldTypes.Color:
          this.metaDataForm.addControl('field_' + field.id, this.formBuilder.control<string>(''));
          break;
      }

    });

  }
}
