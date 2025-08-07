import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLectureAdminComponent } from './show-lecture-admin.component';

describe('ShowLectureAdminComponent', () => {
  let component: ShowLectureAdminComponent;
  let fixture: ComponentFixture<ShowLectureAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowLectureAdminComponent]
    });
    fixture = TestBed.createComponent(ShowLectureAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
