import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPaymetsComponent } from './loan-paymets.component';

describe('LoanPaymetsComponent', () => {
  let component: LoanPaymetsComponent;
  let fixture: ComponentFixture<LoanPaymetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanPaymetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanPaymetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
