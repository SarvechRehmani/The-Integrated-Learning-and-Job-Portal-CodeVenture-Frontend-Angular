import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionMentorComponent } from './add-question-mentor.component';

describe('AddQuestionMentorComponent', () => {
  let component: AddQuestionMentorComponent;
  let fixture: ComponentFixture<AddQuestionMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuestionMentorComponent]
    });
    fixture = TestBed.createComponent(AddQuestionMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
