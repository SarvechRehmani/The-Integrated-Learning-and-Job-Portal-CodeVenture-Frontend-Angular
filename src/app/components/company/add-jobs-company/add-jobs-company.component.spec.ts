import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobsCompanyComponent } from './add-jobs-company.component';

describe('AddJobsCompanyComponent', () => {
  let component: AddJobsCompanyComponent;
  let fixture: ComponentFixture<AddJobsCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddJobsCompanyComponent]
    });
    fixture = TestBed.createComponent(AddJobsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
