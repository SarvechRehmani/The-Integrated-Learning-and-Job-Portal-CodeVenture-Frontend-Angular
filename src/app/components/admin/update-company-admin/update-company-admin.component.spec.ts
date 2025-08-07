import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCompanyAdminComponent } from './update-company-admin.component';

describe('UpdateCompanyAdminComponent', () => {
  let component: UpdateCompanyAdminComponent;
  let fixture: ComponentFixture<UpdateCompanyAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCompanyAdminComponent]
    });
    fixture = TestBed.createComponent(UpdateCompanyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
