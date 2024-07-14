import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAssignmentMentorComponent } from './show-assignment-mentor.component';

describe('ShowAssignmentMentorComponent', () => {
  let component: ShowAssignmentMentorComponent;
  let fixture: ComponentFixture<ShowAssignmentMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAssignmentMentorComponent]
    });
    fixture = TestBed.createComponent(ShowAssignmentMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
