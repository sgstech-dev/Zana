import { ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { OperationTemplateComponent } from "../operation-template/operation-template.component";
import { SignalRService } from 'app/project/services/signal-r.service';
import { Target } from 'app/project/services/target-service.service';
import { GisObject } from 'app/project/services/gis-object.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-operation-page',
  standalone: true,
  imports: [PageHeaderComponent, OperationTemplateComponent, NgFor],
  templateUrl: './operation-page.component.html',
  styleUrl: './operation-page.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export default class OperationPageComponent implements OnInit {
  constructor(private ngZone: NgZone){}

  gisObjectsAssined: any[] = [];

  ngOnInit(): void {
    this.initSignalR();
  }

  initSignalR(): void {
    SignalRService.startConnection().then(() => {
      SignalRService.getConnection().on("assignTarget", (target: Target, gisObject: GisObject) => {
        this.ngZone.run(() => {
          if (!this.ObjectsAssinedContain(gisObject.id))
            this.gisObjectsAssined.push({ target: target, gisObject: gisObject });
        });
      });
    });
  }

  ObjectsAssinedContain(id: number) {
    let result: Boolean = false;
    this.gisObjectsAssined.forEach(element => {
      if (element.gisObject.id === id) {
        result = true;
        return true;
      }
    });
    return result;
  }

  getValues(): Array<any> {
    return Array.from(this.gisObjectsAssined.values());
  }
}
