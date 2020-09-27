import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanAccountComponent } from './add-loan-account.component';

describe('AddLoanAccountComponent', () => {
  let component: AddLoanAccountComponent;
  let fixture: ComponentFixture<AddLoanAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLoanAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoanAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
