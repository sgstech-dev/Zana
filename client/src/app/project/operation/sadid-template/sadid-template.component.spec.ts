import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SadidTemplateComponent } from './sadid-template.component';

describe('SadidTemplateComponent', () => {
  let component: SadidTemplateComponent;
  let fixture: ComponentFixture<SadidTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SadidTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SadidTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
