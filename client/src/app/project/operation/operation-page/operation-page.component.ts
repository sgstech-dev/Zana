import { ChangeDetectionStrategy, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { OperationTemplateComponent } from "../operation-template/operation-template.component";
import { SignalRService } from 'app/project/services/signal-r.service';
import { Target } from 'app/project/services/target-service.service';
import { GisObject } from 'app/project/services/gis-object.service';
import { NgFor } from '@angular/common';
import { SaherTemplateComponent } from '../saher-template/saher-template.component';
import { JaberTemplateComponent } from "../jaber-template/jaber-template.component";
import { SadidTemplateComponent } from "../sadid-template/sadid-template.component";
import { JammerGonbadiTemplateComponent } from "../jammer-gonbadi-template/jammer-gonbadi-template.component";
import { AssignedTarget, AssignedTargetsService } from '@shared/services/assignedTargets';
import { LaserTemplateComponent } from '../laser-template/laser-template.component';

@Component({
  selector: 'app-operation-page',
  standalone: true,
  imports: [
    PageHeaderComponent, 
    OperationTemplateComponent, 
    SaherTemplateComponent, 
    JaberTemplateComponent, 
    SadidTemplateComponent, 
    JammerGonbadiTemplateComponent,
    LaserTemplateComponent],
  templateUrl: './operation-page.component.html',
  styleUrl: './operation-page.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export default class OperationPageComponent implements OnInit {

  constructor(
    private ngZone: NgZone,
    private assignedTargetsService: AssignedTargetsService) { }

  gisObjectsAssined: AssignedTarget[] = [];
  @ViewChild('JaberOperator') JaberOperator: JaberTemplateComponent;
  @ViewChild('LaserOperator') laserOperator: LaserTemplateComponent;

  ngOnInit(): void {
    this.initAssigning();
  }

  initAssigning(): void {
    this.assignedTargetsService.gisObjectsAssigned$.subscribe(value => {
      this.gisObjectsAssined = value;
    });

    this.assignedTargetsService.target$.subscribe(value => {
      if (value != undefined) {
        if (value.gisObject.objectType.name == "JaberSystem" && this.JaberOperator != undefined) {
          this.JaberOperator.updateTargetList(value.target);
        }
        if (value.gisObject.objectType.name == "LaserSystem" && this.laserOperator != undefined) {
          this.laserOperator.updateTargetList(value.target);
        }
      }
    });
  }

  // getValues(): Array<any> {
  //   return Array.from(this.gisObjectsAssined.values());
  // }
}
