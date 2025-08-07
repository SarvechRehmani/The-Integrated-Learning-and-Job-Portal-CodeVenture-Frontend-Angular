import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuizAdminComponent } from './show-quiz-admin.component';

describe('ShowQuizAdminComponent', () => {
  let component: ShowQuizAdminComponent;
  let fixture: ComponentFixture<ShowQuizAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowQuizAdminComponent]
    });
    fixture = TestBed.createComponent(ShowQuizAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
