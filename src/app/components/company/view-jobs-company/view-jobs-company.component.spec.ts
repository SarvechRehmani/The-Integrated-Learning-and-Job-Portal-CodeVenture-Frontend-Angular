import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobsCompanyComponent } from './view-jobs-company.component';

describe('ViewJobsCompanyComponent', () => {
  let component: ViewJobsCompanyComponent;
  let fixture: ComponentFixture<ViewJobsCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewJobsCompanyComponent]
    });
    fixture = TestBed.createComponent(ViewJobsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
