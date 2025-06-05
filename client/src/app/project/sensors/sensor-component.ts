import { UUID } from 'crypto';
import { Target, TargetType } from "../services/target-service.service";
import { AfterViewInit, ChangeDetectorRef, inject, Injectable, Input, NgZone, OnInit, QueryList, ViewChildren, ViewContainerRef } from "@angular/core";
import * as L from 'leaflet';
import { PpiUtilityService } from "../services/ppi-utility.service";
import { MtxGridColumn } from "@ng-matero/extensions/grid";
import { v4 as uuidv4 } from 'uuid';
import { SignalRService } from '../services/signal-r.service';
import { GisObject } from '../services/gis-object.service';

@Injectable()
export abstract class SensorCompenent implements AfterViewInit, OnInit {
    private center: L.LatLng;
    private map: L.Map;
    private readonly ppiUtilityService = inject(PpiUtilityService);
    private readonly ngZone = inject(NgZone);
    public readonly cdr = inject(ChangeDetectorRef);
    public isLoading: boolean = false;
    public targetList: Target[] = [];
    public columns: MtxGridColumn[] = [];
    public mapId: UUID = uuidv4();

    protected centerLat!: number;
    protected centerLng!: number;
    protected radius!: number;
    protected sensorName!: string;
    protected sensorGisObject : GisObject;

    constructor(

    ) { }
    ngOnInit(): void {
        this.setColumns();
    }

    async ngAfterViewInit() {
        this.center = L.latLng(this.centerLat, this.centerLng);
        this.initializeMap();
        this.ppiUtilityService.drawPPIAxis(this.map, this.center, this.radius);
    }

    protected initializeMap() {
        this.map = L.map(this.mapId, {
            contextmenu: true,
            center: this.center,
            zoom: 7,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            zoomControl: false,
            attributionControl: false,
            dragging: false, // Disable panning
            scrollWheelZoom: false, // Disable zooming with the scroll wheel
            doubleClickZoom: false, // Disable zooming on double click
            touchZoom: false,
        });
    }

    public init(sensorGisObject:GisObject , centerLat: number,centerLng: number,radius: number,sensorName: string)
    {
        this.centerLat = centerLat;
        this.centerLng = centerLng;
        this.radius = radius;
        this.sensorName = sensorName;
        this.sensorGisObject = sensorGisObject;
    }
    public addBlip(lat: number, lng: number) {
        this.ppiUtilityService.drawFadingCircle(this.map, lat, lng);
    }

    public addDirection(theta: number, range: number = this.radius) {
        this.ppiUtilityService.drawFadingLine(this.map, this.center, range, theta, "red");
    }

    public updateTargetList(target: Target) {
        if (target.detector_id != this.sensorGisObject.id)
            return;
        let existsTargetIdx = -1;
        if (target.targetType == TargetType.Position) {
            this.addBlip(target.latitude, target.longitude);
            existsTargetIdx = this.targetList.findIndex((t: Target) => t.targetId == target.targetId);
        }
        else if (target.targetType == TargetType.Direction)
            this.addDirection(target.theta, this.radius);
        this.ngZone.run(() => {
            if (existsTargetIdx < 0)
                this.targetList.unshift(target);
            else
                this.targetList[existsTargetIdx] = target;

            if (this.targetList.length > 5)
                this.targetList.pop();
            this.targetList = [...this.targetList];
        });
        this.cdr.detectChanges();
    }

    abstract setColumns(): void;
}
