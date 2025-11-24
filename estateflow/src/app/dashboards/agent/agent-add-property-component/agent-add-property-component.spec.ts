import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAddPropertyComponent } from './agent-add-property-component';

describe('AgentAddPropertyComponent', () => {
  let component: AgentAddPropertyComponent;
  let fixture: ComponentFixture<AgentAddPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentAddPropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentAddPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
