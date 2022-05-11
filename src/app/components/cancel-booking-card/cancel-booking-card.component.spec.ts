import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelBookingCardComponent } from './cancel-booking-card.component';

describe('CancelBookingCardComponent', () => {
  let component: CancelBookingCardComponent;
  let fixture: ComponentFixture<CancelBookingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelBookingCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelBookingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
