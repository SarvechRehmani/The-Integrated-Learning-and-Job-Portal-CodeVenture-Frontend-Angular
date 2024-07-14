import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuestionMentorComponent } from './update-question-mentor.component';

describe('UpdateQuestionMentorComponent', () => {
  let component: UpdateQuestionMentorComponent;
  let fixture: ComponentFixture<UpdateQuestionMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateQuestionMentorComponent]
    });
    fixture = TestBed.createComponent(UpdateQuestionMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
