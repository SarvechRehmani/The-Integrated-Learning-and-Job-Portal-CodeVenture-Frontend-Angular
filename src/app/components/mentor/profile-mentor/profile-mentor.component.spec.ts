import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMentorComponent } from './profile-mentor.component';

describe('ProfileMentorComponent', () => {
  let component: ProfileMentorComponent;
  let fixture: ComponentFixture<ProfileMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileMentorComponent]
    });
    fixture = TestBed.createComponent(ProfileMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
