import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksAssignmentMentorComponent } from './marks-assignment-mentor.component';

describe('MarksAssignmentMentorComponent', () => {
  let component: MarksAssignmentMentorComponent;
  let fixture: ComponentFixture<MarksAssignmentMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarksAssignmentMentorComponent]
    });
    fixture = TestBed.createComponent(MarksAssignmentMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
