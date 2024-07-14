import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabTaskMentorComponent } from './add-lab-task-mentor.component';

describe('AddLabTaskMentorComponent', () => {
  let component: AddLabTaskMentorComponent;
  let fixture: ComponentFixture<AddLabTaskMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLabTaskMentorComponent]
    });
    fixture = TestBed.createComponent(AddLabTaskMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
