import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllLabTaskMentorComponent } from './show-all-lab-task-mentor.component';

describe('ShowAllLabTaskMentorComponent', () => {
  let component: ShowAllLabTaskMentorComponent;
  let fixture: ComponentFixture<ShowAllLabTaskMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAllLabTaskMentorComponent]
    });
    fixture = TestBed.createComponent(ShowAllLabTaskMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
