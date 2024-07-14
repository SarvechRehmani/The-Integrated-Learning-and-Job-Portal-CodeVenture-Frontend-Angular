import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoursesAdminComponent } from './view-courses-admin.component';

describe('ViewCoursesAdminComponent', () => {
  let component: ViewCoursesAdminComponent;
  let fixture: ComponentFixture<ViewCoursesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCoursesAdminComponent]
    });
    fixture = TestBed.createComponent(ViewCoursesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
