import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerMakeOfferPopupComponent } from './buyer-make-offer-popup-component';

describe('BuyerMakeOfferPopupComponent', () => {
  let component: BuyerMakeOfferPopupComponent;
  let fixture: ComponentFixture<BuyerMakeOfferPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerMakeOfferPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerMakeOfferPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
