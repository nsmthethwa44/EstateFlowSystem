import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentOffersComponent } from './agent-offers-component';

describe('AgentOffersComponent', () => {
  let component: AgentOffersComponent;
  let fixture: ComponentFixture<AgentOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentOffersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
