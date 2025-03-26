import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BaseHttpClientService } from './base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService extends BaseHttpClientService{
  public static currentScenarioId : number
  apiUrl = ConfigService.apiBaseUrl + "/api/scenario";
  // Subject to broadcast scenario changes
  private scenarioChangeSource = new Subject<number>();
  // Observable to which other components can subscribe
  scenarioChange$ = this.scenarioChangeSource.asObservable();

  // Method to call for changing the scenario
  changeScenario(scenarioId: number) {
    ScenarioService.currentScenarioId = scenarioId;
    this.scenarioChangeSource.next(scenarioId);
  }
}
export interface Scenario{
  id:number,
  name:string,
  dateOfCreate:Date
}
