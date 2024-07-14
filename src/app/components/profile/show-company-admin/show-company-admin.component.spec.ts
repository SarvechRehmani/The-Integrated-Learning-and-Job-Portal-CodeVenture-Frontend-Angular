import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCompanyAdminComponent } from './show-company-admin.component';

describe('ShowCompanyAdminComponent', () => {
  let component: ShowCompanyAdminComponent;
  let fixture: ComponentFixture<ShowCompanyAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowCompanyAdminComponent]
    });
    fixture = TestBed.createComponent(ShowCompanyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
