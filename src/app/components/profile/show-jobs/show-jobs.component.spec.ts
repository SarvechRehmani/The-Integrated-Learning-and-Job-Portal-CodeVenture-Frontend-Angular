import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowJobsComponent } from './show-jobs.component';

describe('ShowJobsComponent', () => {
  let component: ShowJobsComponent;
  let fixture: ComponentFixture<ShowJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowJobsComponent]
    });
    fixture = TestBed.createComponent(ShowJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
