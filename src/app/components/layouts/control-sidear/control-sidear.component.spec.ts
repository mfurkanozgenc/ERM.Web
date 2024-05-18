import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSidearComponent } from './control-sidear.component';

describe('ControlSidearComponent', () => {
  let component: ControlSidearComponent;
  let fixture: ComponentFixture<ControlSidearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlSidearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlSidearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
