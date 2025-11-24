import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerBrowsePropertiesComponent } from './buyer-browse-properties-component';

describe('BuyerBrowsePropertiesComponent', () => {
  let component: BuyerBrowsePropertiesComponent;
  let fixture: ComponentFixture<BuyerBrowsePropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerBrowsePropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerBrowsePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
