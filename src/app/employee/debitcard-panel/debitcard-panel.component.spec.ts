import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitcardPanelComponent } from './debitcard-panel.component';

describe('DebitcardPanelComponent', () => {
  let component: DebitcardPanelComponent;
  let fixture: ComponentFixture<DebitcardPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitcardPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitcardPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
