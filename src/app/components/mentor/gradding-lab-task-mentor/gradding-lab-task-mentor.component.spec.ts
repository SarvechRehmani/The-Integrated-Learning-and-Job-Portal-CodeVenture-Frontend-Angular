import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraddingLabTaskMentorComponent } from './gradding-lab-task-mentor.component';

describe('GraddingLabTaskMentorComponent', () => {
  let component: GraddingLabTaskMentorComponent;
  let fixture: ComponentFixture<GraddingLabTaskMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraddingLabTaskMentorComponent]
    });
    fixture = TestBed.createComponent(GraddingLabTaskMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
