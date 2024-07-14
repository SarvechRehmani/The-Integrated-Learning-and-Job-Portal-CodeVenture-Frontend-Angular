import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeMentorComponent } from './welcome-mentor.component';

describe('WelcomeMentorComponent', () => {
  let component: WelcomeMentorComponent;
  let fixture: ComponentFixture<WelcomeMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeMentorComponent]
    });
    fixture = TestBed.createComponent(WelcomeMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
