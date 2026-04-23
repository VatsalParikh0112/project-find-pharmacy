import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalIcon } from './hospital-icon';

describe('HospitalIcon', () => {
  let component: HospitalIcon;
  let fixture: ComponentFixture<HospitalIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(HospitalIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
