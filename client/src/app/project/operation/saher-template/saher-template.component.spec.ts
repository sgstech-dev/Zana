import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaherTemplateComponent } from './saher-template.component';

describe('SaherTemplateComponent', () => {
  let component: SaherTemplateComponent;
  let fixture: ComponentFixture<SaherTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaherTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaherTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
