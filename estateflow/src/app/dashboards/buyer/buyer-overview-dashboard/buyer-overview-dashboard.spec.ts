import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerOverviewDashboard } from './buyer-overview-dashboard';

describe('BuyerOverviewDashboard', () => {
  let component: BuyerOverviewDashboard;
  let fixture: ComponentFixture<BuyerOverviewDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerOverviewDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerOverviewDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
