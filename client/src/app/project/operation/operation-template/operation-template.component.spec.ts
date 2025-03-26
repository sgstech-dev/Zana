import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTemplateComponent } from './operation-template.component';

describe('OperationTemplateComponent', () => {
  let component: OperationTemplateComponent;
  let fixture: ComponentFixture<OperationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
