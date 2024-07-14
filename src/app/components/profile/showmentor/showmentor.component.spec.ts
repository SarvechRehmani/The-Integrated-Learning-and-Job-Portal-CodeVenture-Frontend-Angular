import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowmentorComponent } from './showmentor.component';

describe('ShowmentorComponent', () => {
  let component: ShowmentorComponent;
  let fixture: ComponentFixture<ShowmentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowmentorComponent]
    });
    fixture = TestBed.createComponent(ShowmentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
