import { Routes } from '@angular/router';
import FieldsComponent from 'app/project/model-managment/fields/fields.component';
import { ObjectTypeComponent } from 'app/project/model-managment/object-type/object-type.component';

export const routes: Routes = [
  { path: 'fields', component: FieldsComponent },
  { path: 'objectType', component: ObjectTypeComponent },
];
