import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksLabTaskMentorComponent } from './marks-lab-task-mentor.component';

describe('MarksLabTaskMentorComponent', () => {
  let component: MarksLabTaskMentorComponent;
  let fixture: ComponentFixture<MarksLabTaskMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarksLabTaskMentorComponent]
    });
    fixture = TestBed.createComponent(MarksLabTaskMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
