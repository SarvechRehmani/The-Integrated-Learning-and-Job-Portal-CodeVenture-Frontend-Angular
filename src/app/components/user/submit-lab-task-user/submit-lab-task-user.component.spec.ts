import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitLabTaskUserComponent } from './submit-lab-task-user.component';

describe('SubmitLabTaskUserComponent', () => {
  let component: SubmitLabTaskUserComponent;
  let fixture: ComponentFixture<SubmitLabTaskUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitLabTaskUserComponent]
    });
    fixture = TestBed.createComponent(SubmitLabTaskUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
