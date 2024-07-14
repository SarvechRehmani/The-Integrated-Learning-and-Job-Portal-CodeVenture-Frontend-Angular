import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraddingAssignmentMentorComponent } from './gradding-assignment-mentor.component';

describe('GraddingAssignmentMentorComponent', () => {
  let component: GraddingAssignmentMentorComponent;
  let fixture: ComponentFixture<GraddingAssignmentMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraddingAssignmentMentorComponent]
    });
    fixture = TestBed.createComponent(GraddingAssignmentMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
