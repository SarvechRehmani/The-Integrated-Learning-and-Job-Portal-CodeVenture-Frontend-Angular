import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicationCompanyComponent } from './view-application-company.component';

describe('ViewApplicationCompanyComponent', () => {
  let component: ViewApplicationCompanyComponent;
  let fixture: ComponentFixture<ViewApplicationCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewApplicationCompanyComponent]
    });
    fixture = TestBed.createComponent(ViewApplicationCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
