import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssignmentMentorComponent } from './add-assignment-mentor.component';

describe('AddAssignmentMentorComponent', () => {
  let component: AddAssignmentMentorComponent;
  let fixture: ComponentFixture<AddAssignmentMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAssignmentMentorComponent]
    });
    fixture = TestBed.createComponent(AddAssignmentMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
