// shared.service.ts
import { Injectable } from '@angular/core';
import { GisObject } from 'app/project/services/gis-object.service';
import { Target } from 'app/project/services/target-service.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignedTargetsService {
  private gisObjectsAssinedSubject = new BehaviorSubject<AssignedTarget[]>([]);
  private targetSubject = new BehaviorSubject<AssignedTarget>(undefined);
  target$ = this.targetSubject.asObservable();
  gisObjectsAssigned$ = this.gisObjectsAssinedSubject.asObservable();

  addAssignTarget(object: AssignedTarget): void {
    const current = this.gisObjectsAssinedSubject.getValue();
    this.targetSubject.next(object);
    this.gisObjectsAssinedSubject.next([...current, object]); // اضافه کردن یکی
  }

  getCurrentAssignedTargets(): AssignedTarget[] {
    return this.gisObjectsAssinedSubject.getValue();
  }
}
export interface AssignedTarget {
    target : Target;
    gisObject : GisObject;
}