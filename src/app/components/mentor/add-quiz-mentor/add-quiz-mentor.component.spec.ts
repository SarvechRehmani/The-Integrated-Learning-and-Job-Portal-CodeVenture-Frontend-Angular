import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizMentorComponent } from './add-quiz-mentor.component';

describe('AddQuizMentorComponent', () => {
  let component: AddQuizMentorComponent;
  let fixture: ComponentFixture<AddQuizMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuizMentorComponent]
    });
    fixture = TestBed.createComponent(AddQuizMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
