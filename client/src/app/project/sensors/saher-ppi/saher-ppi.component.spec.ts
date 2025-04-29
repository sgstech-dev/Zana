import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaherPPIComponent } from './saher-ppi.component';

describe('SaherPPIComponent', () => {
  let component: SaherPPIComponent;
  let fixture: ComponentFixture<SaherPPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaherPPIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaherPPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
