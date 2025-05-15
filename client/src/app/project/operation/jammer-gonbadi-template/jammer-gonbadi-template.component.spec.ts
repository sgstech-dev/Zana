import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JammerGonbadiTemplateComponent } from './jammer-gonbadi-template.component';
describe('JammerGonbadiTemplateComponent', () => {
  let component: JammerGonbadiTemplateComponent;
  let fixture: ComponentFixture<JammerGonbadiTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JammerGonbadiTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JammerGonbadiTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
