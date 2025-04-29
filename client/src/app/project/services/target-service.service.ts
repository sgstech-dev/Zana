import { Injectable } from '@angular/core';
import { UUID } from 'crypto';
import { GisObject } from './gis-object.service';

@Injectable({
  providedIn: 'root'
})
export class TargetServiceService {

  constructor() { }
}
export enum TargetType {Position= 0, Direction = 1}
export interface Target{
    id:number,
    targetId:string,
    systemTargetId:number,
    targetType:TargetType,
    latitude :number,
    longitude:number,
    altitude:number,
    speed:number,
    heading:number,
    theta:number,
    elevation:number,
    range:number,
    detector_id:number,
    detector:GisObject,
    detectedTime:Date,
    simulated:boolean,
    deviceType:string,
    snr:number,
    bandWidth:number,
    centerFreq:number,
    enableHunted:boolean
}
