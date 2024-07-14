import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLectureMentorComponent } from './show-lecture-mentor.component';

describe('ShowLectureMentorComponent', () => {
  let component: ShowLectureMentorComponent;
  let fixture: ComponentFixture<ShowLectureMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowLectureMentorComponent]
    });
    fixture = TestBed.createComponent(ShowLectureMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
