import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveManagerComponent } from './approve-manager.component';

describe('ApproveManagerComponent', () => {
  let component: ApproveManagerComponent;
  let fixture: ComponentFixture<ApproveManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
