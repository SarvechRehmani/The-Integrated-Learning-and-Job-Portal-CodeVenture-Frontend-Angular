import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssignmentMentorComponent } from './update-assignment-mentor.component';

describe('UpdateAssignmentMentorComponent', () => {
  let component: UpdateAssignmentMentorComponent;
  let fixture: ComponentFixture<UpdateAssignmentMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAssignmentMentorComponent]
    });
    fixture = TestBed.createComponent(UpdateAssignmentMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
