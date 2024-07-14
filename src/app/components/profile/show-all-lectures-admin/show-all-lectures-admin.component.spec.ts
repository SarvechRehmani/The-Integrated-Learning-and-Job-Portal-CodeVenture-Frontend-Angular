import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllLecturesAdminComponent } from './show-all-lectures-admin.component';

describe('ShowAllLecturesAdminComponent', () => {
  let component: ShowAllLecturesAdminComponent;
  let fixture: ComponentFixture<ShowAllLecturesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAllLecturesAdminComponent]
    });
    fixture = TestBed.createComponent(ShowAllLecturesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
