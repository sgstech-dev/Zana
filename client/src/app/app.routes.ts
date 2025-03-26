import { Routes } from '@angular/router';
import { authGuard } from '@core';
import { AdminLayoutComponent } from '@theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { Error403Component } from './routes/sessions/403.component';
import { Error404Component } from './routes/sessions/404.component';
import { Error500Component } from './routes/sessions/500.component';
import { LoginComponent } from './routes/sessions/login/login.component';
import { RegisterComponent } from './routes/sessions/register/register.component';
import MapComponent from './project/map/map.component';
import OperationPageComponent from './project/operation/operation-page/operation-page.component';
import SensorPageComponent from './project/sensors/sensor-page/sensor-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'map', pathMatch: 'full' },
      { path: 'map', component: MapComponent },
      { path: '403', component: Error403Component },
      { path: '404', component: Error404Component },
      { path: '500', component: Error500Component },
      {
        path: 'design',
        loadChildren: () => import('./routes/design/design.routes').then(m => m.routes),
      },
      {
        path: 'operationPage',
        component:OperationPageComponent,
      },
      {
        path: 'sensorPage',
        component:SensorPageComponent
      },
      {
        path: 'initialize-setting',
        loadChildren: () => import('./routes/initializing-settings/initializing-settings.routes').then(m => m.routes),
      },
      {
        path: 'model-managment',
        loadChildren: () => import('./routes/model-managment/model-managment.routes').then(m => m.routes),
      },
      {
        path: 'scenario',
        loadChildren: () => import('./routes/scenario/scenario.routes').then(m => m.routes),
      },
      {
        path: 'material',
        loadChildren: () => import('./routes/material/material.routes').then(m => m.routes),
      },
      {
        path: 'media',
        loadChildren: () => import('./routes/media/media.routes').then(m => m.routes),
      },
      {
        path: 'forms',
        loadChildren: () => import('./routes/forms/forms.routes').then(m => m.routes),
      },
      {
        path: 'tables',
        loadChildren: () => import('./routes/tables/tables.routes').then(m => m.routes),
      },
      {
        path: 'profile',
        loadChildren: () => import('./routes/profile/profile.routes').then(m => m.routes),
      },
      {
        path: 'permissions',
        loadChildren: () => import('./routes/permissions/permissions.routes').then(m => m.routes),
      },
      {
        path: 'utilities',
        loadChildren: () => import('./routes/utilities/utilities.routes').then(m => m.routes),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'map', component: MapComponent },
    ],
  },
  { path: '**', redirectTo: 'map' },
];
