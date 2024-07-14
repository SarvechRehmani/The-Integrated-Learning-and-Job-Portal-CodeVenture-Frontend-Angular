import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLabTaskMentorComponent } from './show-lab-task-mentor.component';

describe('ShowLabTaskMentorComponent', () => {
  let component: ShowLabTaskMentorComponent;
  let fixture: ComponentFixture<ShowLabTaskMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowLabTaskMentorComponent]
    });
    fixture = TestBed.createComponent(ShowLabTaskMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
