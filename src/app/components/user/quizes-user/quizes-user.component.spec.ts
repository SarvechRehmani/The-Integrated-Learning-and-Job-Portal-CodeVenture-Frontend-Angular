import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizesUserComponent } from './quizes-user.component';

describe('QuizesUserComponent', () => {
  let component: QuizesUserComponent;
  let fixture: ComponentFixture<QuizesUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizesUserComponent]
    });
    fixture = TestBed.createComponent(QuizesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
