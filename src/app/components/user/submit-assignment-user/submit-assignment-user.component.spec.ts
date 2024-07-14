import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAssignmentUserComponent } from './submit-assignment-user.component';

describe('SubmitAssignmentUserComponent', () => {
  let component: SubmitAssignmentUserComponent;
  let fixture: ComponentFixture<SubmitAssignmentUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitAssignmentUserComponent]
    });
    fixture = TestBed.createComponent(SubmitAssignmentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
