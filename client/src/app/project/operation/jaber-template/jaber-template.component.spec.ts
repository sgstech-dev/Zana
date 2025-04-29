import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaberTemplateComponent } from './jaber-template.component';

describe('JaberTemplateComponent', () => {
  let component: JaberTemplateComponent;
  let fixture: ComponentFixture<JaberTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JaberTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JaberTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
