import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserProfilePopup } from './update-user-profile-popup';

describe('UpdateUserProfilePopup', () => {
  let component: UpdateUserProfilePopup;
  let fixture: ComponentFixture<UpdateUserProfilePopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserProfilePopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserProfilePopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
