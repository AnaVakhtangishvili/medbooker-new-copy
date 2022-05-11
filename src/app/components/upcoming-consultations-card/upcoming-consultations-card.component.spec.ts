import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingConsultationsCardComponent } from './upcoming-consultations-card.component';

describe('UpcomingConsultationsCardComponent', () => {
  let component: UpcomingConsultationsCardComponent;
  let fixture: ComponentFixture<UpcomingConsultationsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingConsultationsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingConsultationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
