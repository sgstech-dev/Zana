import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GisObjectTableComponent } from './gis-object-table.component';

describe('GisObjectTableComponent', () => {
  let component: GisObjectTableComponent;
  let fixture: ComponentFixture<GisObjectTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GisObjectTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GisObjectTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
