import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, numberAttribute, OnInit, Output, signal, ViewChild, ViewEncapsulation } from '@angular/core';
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
    GithubButtonComponent,
    NotificationComponent,
    TranslateComponent,
    UserComponent,
    MatOption,
    MatSelectModule,
    NgIf,
  ],
})
export class HeaderComponent implements OnInit, AfterViewInit, AfterContentInit {
  currentScenario_id: string;
  public scenarios: Scenario[] = [];
  isPlayed: Map<number, boolean> = new Map<number, boolean>();

  @Input() showToggle = true;
  @Input() showBranding = false;

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();

  constructor(private scenarioService: ScenarioService) { }
  ngAfterContentInit(): void {

  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.loadScenariosData();
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
    SignalRService.getConnection().invoke('changeScenario', Number(this.currentScenario_id));
  }

  startScenario() {
    SignalRService.getConnection().invoke('start', Number(this.currentScenario_id));
    this.isPlayed.set(Number(this.currentScenario_id), !this.isPlayed.get(Number(this.currentScenario_id)));
  }

  stopScenario() {
    SignalRService.getConnection().invoke('stop', Number(this.currentScenario_id));
    this.isPlayed.set(Number(this.currentScenario_id), !this.isPlayed.get(Number(this.currentScenario_id)));
  }

  getState() {
    return this.isPlayed.get(Number(this.currentScenario_id));
  }
}
