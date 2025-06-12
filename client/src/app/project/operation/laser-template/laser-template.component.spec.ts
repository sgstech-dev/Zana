import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaserTemplateComponent } from './laser-template.component';
describe('LaserTemplateComponent', () => {
  let component: LaserTemplateComponent;
  let fixture: ComponentFixture<LaserTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaserTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaserTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
