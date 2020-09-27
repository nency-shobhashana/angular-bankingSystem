import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDebitcardComponent } from './add-debitcard.component';

describe('AddDebitcardComponent', () => {
  let component: AddDebitcardComponent;
  let fixture: ComponentFixture<AddDebitcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDebitcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDebitcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
