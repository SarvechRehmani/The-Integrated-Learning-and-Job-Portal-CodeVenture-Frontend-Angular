import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAssignmentAdminComponent } from './show-assignment-admin.component';

describe('ShowAssignmentAdminComponent', () => {
  let component: ShowAssignmentAdminComponent;
  let fixture: ComponentFixture<ShowAssignmentAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAssignmentAdminComponent]
    });
    fixture = TestBed.createComponent(ShowAssignmentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
