import { Injectable } from '@angular/core';
import { UUID } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class TargetServiceService {

  constructor() { }
}
export enum TargetType {Real = 0, Simulation = 1}
export interface Target{
    id:number,
    targetId:UUID,
    systemTargetId:number,
    targetType:TargetType,
    latitude :number,
    longitude:number,
    altitude:number,
    speed:number,
    heading:number,
    theta:number,
    range:number
}
