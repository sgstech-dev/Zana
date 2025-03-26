import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarPPIComponent } from './radar-ppi.component';

describe('RadarPPIComponent', () => {
  let component: RadarPPIComponent;
  let fixture: ComponentFixture<RadarPPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadarPPIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadarPPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
