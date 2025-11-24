import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletHeader } from './outlet-header';

describe('OutletHeader', () => {
  let component: OutletHeader;
  let fixture: ComponentFixture<OutletHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutletHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutletHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
