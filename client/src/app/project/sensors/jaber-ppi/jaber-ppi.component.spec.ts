import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaberPPIComponent } from './jaber-ppi.component';

describe('JaberPPIComponent', () => {
  let component: JaberPPIComponent;
  let fixture: ComponentFixture<JaberPPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JaberPPIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JaberPPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
