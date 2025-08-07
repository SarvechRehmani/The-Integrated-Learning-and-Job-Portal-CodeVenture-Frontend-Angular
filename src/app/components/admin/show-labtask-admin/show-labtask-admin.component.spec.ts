import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLabtaskAdminComponent } from './show-labtask-admin.component';

describe('ShowLabtaskAdminComponent', () => {
  let component: ShowLabtaskAdminComponent;
  let fixture: ComponentFixture<ShowLabtaskAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowLabtaskAdminComponent]
    });
    fixture = TestBed.createComponent(ShowLabtaskAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
