import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOutLet } from './main-out-let';

describe('MainOutLet', () => {
  let component: MainOutLet;
  let fixture: ComponentFixture<MainOutLet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainOutLet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainOutLet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
