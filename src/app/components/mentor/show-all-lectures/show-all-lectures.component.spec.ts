import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllLecturesComponent } from './show-all-lectures.component';

describe('ShowAllLecturesComponent', () => {
  let component: ShowAllLecturesComponent;
  let fixture: ComponentFixture<ShowAllLecturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAllLecturesComponent]
    });
    fixture = TestBed.createComponent(ShowAllLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
