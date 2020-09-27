import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcardPanelComponent } from './creditcard-panel.component';

describe('CreditcardPanelComponent', () => {
  let component: CreditcardPanelComponent;
  let fixture: ComponentFixture<CreditcardPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditcardPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditcardPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
