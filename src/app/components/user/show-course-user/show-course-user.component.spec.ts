import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCourseUserComponent } from './show-course-user.component';

describe('ShowCourseUserComponent', () => {
  let component: ShowCourseUserComponent;
  let fixture: ComponentFixture<ShowCourseUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowCourseUserComponent]
    });
    fixture = TestBed.createComponent(ShowCourseUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
