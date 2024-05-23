import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsPlanningComponent } from './requirements-planning.component';

describe('RequirementsPlanningComponent', () => {
  let component: RequirementsPlanningComponent;
  let fixture: ComponentFixture<RequirementsPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementsPlanningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequirementsPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
