import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLabTaskMentorComponent } from './update-lab-task-mentor.component';

describe('UpdateLabTaskMentorComponent', () => {
  let component: UpdateLabTaskMentorComponent;
  let fixture: ComponentFixture<UpdateLabTaskMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateLabTaskMentorComponent]
    });
    fixture = TestBed.createComponent(UpdateLabTaskMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
