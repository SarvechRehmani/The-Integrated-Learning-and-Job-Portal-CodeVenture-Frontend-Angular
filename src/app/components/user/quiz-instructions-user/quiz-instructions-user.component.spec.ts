import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizInstructionsUserComponent } from './quiz-instructions-user.component';

describe('QuizInstructionsUserComponent', () => {
  let component: QuizInstructionsUserComponent;
  let fixture: ComponentFixture<QuizInstructionsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizInstructionsUserComponent]
    });
    fixture = TestBed.createComponent(QuizInstructionsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
