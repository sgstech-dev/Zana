import { AfterContentInit, AfterViewInit, Component, EventEmitter, inject, Input, NgZone, numberAttribute, OnInit, Output, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import screenfull from 'screenfull';

import { BrandingComponent } from '../widgets/branding.component';
import { GithubButtonComponent } from '../widgets/github.component';
import { NotificationComponent } from '../widgets/notification.component';
import { TranslateComponent } from '../widgets/translate.component';
import { UserComponent } from '../widgets/user.component';
import { NgIf } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Scenario, ScenarioService } from 'app/project/services/scenario.service';
import { SignalRService } from 'app/project/services/signal-r.service';
import { HubConnectionState } from '@microsoft/signalr';
import { AuthService } from '@core/authentication/auth.service';
import { User } from '@core/authentication/interface';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AssignedTargetsService } from '@shared/services/assignedTargets';
import { Target } from 'app/project/services/target-service.service';
import { GisObject } from 'app/project/services/gis-object.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    class: 'matero-header',
  },
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrandingComponent,
    NotificationComponent,
    TranslateComponent,
    UserComponent,
    MatOption,
    MatSelectModule,
    NgIf,
  ],
})
export class HeaderComponent implements OnInit, AfterViewInit, AfterContentInit {

  user: User;
  currentScenario_id: string;
  public scenarios: Scenario[] = [];
  isPlayed: Map<number, boolean> = new Map<number, boolean>();
  warningSituation: boolean = false;
  @Input() showToggle = true;
  @Input() showBranding = false;

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();
  readonly auth = inject(AuthService);
  warningSituationAlarmAudio = new Audio();
  normalSituationAlarmAudio = new Audio();

  constructor(
    private scenarioService: ScenarioService,
    private ngZone: NgZone,
    private router: Router,
    private assignedTargetsService: AssignedTargetsService
  ) {
    this.warningSituationAlarmAudio.src = "/audio/r.mp3";
    this.warningSituationAlarmAudio.load();
    this.normalSituationAlarmAudio.src = "/audio/w.mp3";
    this.normalSituationAlarmAudio.load();
  }
  ngAfterContentInit(): void {

  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.loadScenariosData();
    this.initSignalR();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        console.log('Route changed to:', event.urlAfterRedirects);
        this.changeScenario();  // تابعی که می‌خوای صدا بزنی
      });
    //  this.authService.user().subscribe(user => (this.user = user));
  }

  initSignalR(): void {
    SignalRService.startConnection().then(() => {
      SignalRService.getConnection().on("SendWarningSituation", (situation: boolean) => {
        this.ngZone.run(() => {
          this.warningSituation = situation;
          if (this.warningSituation)
            this.warningSituationAlarmAudio.play();
          else
            this.normalSituationAlarmAudio.play();
        });
      });
      SignalRService.getConnection().on("assignTarget", (target: Target, gisObject: GisObject) => {
        this.ngZone.run(() => {
          if (!this.ObjectsAssinedContain(gisObject.id)) {
            this.assignedTargetsService.addAssignTarget({ target: target, gisObject: gisObject });
          }
        });
      });
      
    });
  }

  ObjectsAssinedContain(id: number) {
    let result: Boolean = false;
    this.assignedTargetsService.getCurrentAssignedTargets().forEach(element => {
      if (element.gisObject.id === id) {
        result = true;
        return true;
      }
    });
    return result;
  }

  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

  private loadScenariosData() {
    this.scenarioService.get().subscribe((result: Scenario[]) => {
      this.scenarios = result;
      this.currentScenario_id = result[0].id.toString();
      this.changeScenario();
      result.forEach(scenario => {
        this.isPlayed.set(scenario.id, false);
      });
      let interval = setInterval(() => {
        if (SignalRService.getConnection().state === HubConnectionState.Connected) {
          SignalRService.getConnection().invoke('isStarted', Number(this.currentScenario_id)).then((result: boolean) => {
            this.isPlayed.set(Number(this.currentScenario_id), result);
          });
          clearInterval(interval);
        }
      }, 100);
    });
  }

  changeScenario() {
    this.scenarioService.changeScenario(Number(this.currentScenario_id));
    SignalRService.startConnection().then(() => {
      SignalRService.getConnection().invoke('changeScenario', Number(this.currentScenario_id));
    });
  }

  startScenario() {
    SignalRService.startConnection().then(() => {
      SignalRService.getConnection().invoke('start', Number(this.currentScenario_id));
      this.isPlayed.set(Number(this.currentScenario_id), !this.isPlayed.get(Number(this.currentScenario_id)));
    });
  }

  stopScenario() {
    SignalRService.startConnection().then(() => {
      SignalRService.getConnection().invoke('stop', Number(this.currentScenario_id));
      this.isPlayed.set(Number(this.currentScenario_id), !this.isPlayed.get(Number(this.currentScenario_id)));
    });
  }

  getState() {
    return this.isPlayed.get(Number(this.currentScenario_id));
  }
}
