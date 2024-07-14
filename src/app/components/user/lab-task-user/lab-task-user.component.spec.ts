import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabTaskUserComponent } from './lab-task-user.component';

describe('LabTaskUserComponent', () => {
  let component: LabTaskUserComponent;
  let fixture: ComponentFixture<LabTaskUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabTaskUserComponent]
    });
    fixture = TestBed.createComponent(LabTaskUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
