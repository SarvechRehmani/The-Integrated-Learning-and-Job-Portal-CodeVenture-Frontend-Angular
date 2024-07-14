import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCompanyComponent } from './sidebar-company.component';

describe('SidebarCompanyComponent', () => {
  let component: SidebarCompanyComponent;
  let fixture: ComponentFixture<SidebarCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarCompanyComponent]
    });
    fixture = TestBed.createComponent(SidebarCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
