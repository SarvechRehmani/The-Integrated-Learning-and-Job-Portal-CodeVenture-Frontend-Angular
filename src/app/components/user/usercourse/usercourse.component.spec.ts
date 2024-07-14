import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercourseComponent } from './usercourse.component';

describe('UsercourseComponent', () => {
  let component: UsercourseComponent;
  let fixture: ComponentFixture<UsercourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsercourseComponent]
    });
    fixture = TestBed.createComponent(UsercourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
