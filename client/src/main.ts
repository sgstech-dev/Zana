import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { SignalRService } from 'app/project/services/signal-r.service';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
SignalRService.startConnection();
