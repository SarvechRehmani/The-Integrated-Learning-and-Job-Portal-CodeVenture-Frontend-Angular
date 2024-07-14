import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllAssignmentsComponent } from './show-all-assignments.component';

describe('ShowAllAssignmentsComponent', () => {
  let component: ShowAllAssignmentsComponent;
  let fixture: ComponentFixture<ShowAllAssignmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAllAssignmentsComponent]
    });
    fixture = TestBed.createComponent(ShowAllAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
