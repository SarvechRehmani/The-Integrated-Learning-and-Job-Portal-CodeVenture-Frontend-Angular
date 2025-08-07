import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMentorComponent } from './update-mentor.component';

describe('UpdateMentorComponent', () => {
  let component: UpdateMentorComponent;
  let fixture: ComponentFixture<UpdateMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMentorComponent]
    });
    fixture = TestBed.createComponent(UpdateMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
