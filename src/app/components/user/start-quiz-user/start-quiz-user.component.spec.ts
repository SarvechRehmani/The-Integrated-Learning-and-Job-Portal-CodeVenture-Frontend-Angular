import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartQuizUserComponent } from './start-quiz-user.component';

describe('StartQuizUserComponent', () => {
  let component: StartQuizUserComponent;
  let fixture: ComponentFixture<StartQuizUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartQuizUserComponent]
    });
    fixture = TestBed.createComponent(StartQuizUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
