import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAccountPanelComponent } from './loan-account-panel.component';

describe('LoanAccountPanelComponent', () => {
  let component: LoanAccountPanelComponent;
  let fixture: ComponentFixture<LoanAccountPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAccountPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAccountPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
