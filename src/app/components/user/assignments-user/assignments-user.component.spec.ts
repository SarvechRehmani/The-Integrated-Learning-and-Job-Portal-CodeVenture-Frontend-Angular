import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsUserComponent } from './assignments-user.component';

describe('AssignmentsUserComponent', () => {
  let component: AssignmentsUserComponent;
  let fixture: ComponentFixture<AssignmentsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentsUserComponent]
    });
    fixture = TestBed.createComponent(AssignmentsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
