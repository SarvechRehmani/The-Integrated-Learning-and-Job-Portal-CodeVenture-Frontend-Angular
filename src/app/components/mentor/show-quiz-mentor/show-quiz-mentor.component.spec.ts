import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuizMentorComponent } from './show-quiz-mentor.component';

describe('ShowQuizMentorComponent', () => {
  let component: ShowQuizMentorComponent;
  let fixture: ComponentFixture<ShowQuizMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowQuizMentorComponent]
    });
    fixture = TestBed.createComponent(ShowQuizMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
