import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLectureUserComponent } from './show-lecture-user.component';

describe('ShowLectureUserComponent', () => {
  let component: ShowLectureUserComponent;
  let fixture: ComponentFixture<ShowLectureUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowLectureUserComponent]
    });
    fixture = TestBed.createComponent(ShowLectureUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
