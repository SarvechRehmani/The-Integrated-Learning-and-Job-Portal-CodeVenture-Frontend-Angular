import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseMentorComponent } from './add-course-mentor.component';

describe('AddCourseMentorComponent', () => {
  let component: AddCourseMentorComponent;
  let fixture: ComponentFixture<AddCourseMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCourseMentorComponent]
    });
    fixture = TestBed.createComponent(AddCourseMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
