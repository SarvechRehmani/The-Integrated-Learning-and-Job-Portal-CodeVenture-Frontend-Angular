import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLectureMentorComponent } from './add-lecture-mentor.component';

describe('AddLectureMentorComponent', () => {
  let component: AddLectureMentorComponent;
  let fixture: ComponentFixture<AddLectureMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLectureMentorComponent]
    });
    fixture = TestBed.createComponent(AddLectureMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
