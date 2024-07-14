import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLectureComponent } from './update-lecture.component';

describe('UpdateLectureComponent', () => {
  let component: UpdateLectureComponent;
  let fixture: ComponentFixture<UpdateLectureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateLectureComponent]
    });
    fixture = TestBed.createComponent(UpdateLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
