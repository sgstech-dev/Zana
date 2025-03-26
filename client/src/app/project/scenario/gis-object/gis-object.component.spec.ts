import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GisObjectComponent } from './gis-object.component';

describe('GisObjectComponent', () => {
  let component: GisObjectComponent;
  let fixture: ComponentFixture<GisObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GisObjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GisObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
