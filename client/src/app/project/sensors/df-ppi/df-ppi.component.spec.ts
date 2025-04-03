import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DfPPIComponent } from './df-ppi.component';

describe('DfPPIComponent', () => {
  let component: DfPPIComponent;
  let fixture: ComponentFixture<DfPPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DfPPIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DfPPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
