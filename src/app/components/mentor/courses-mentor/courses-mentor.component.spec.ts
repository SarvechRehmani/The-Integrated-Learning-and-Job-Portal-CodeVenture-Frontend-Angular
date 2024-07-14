import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesMentorComponent } from './courses-mentor.component';

describe('CoursesMentorComponent', () => {
  let component: CoursesMentorComponent;
  let fixture: ComponentFixture<CoursesMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesMentorComponent]
    });
    fixture = TestBed.createComponent(CoursesMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
