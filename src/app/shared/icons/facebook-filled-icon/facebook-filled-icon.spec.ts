import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookFilledIconSvg } from './facebook-filled-icon';

describe('FacebookFilledIconSvg', () => {
  let component: FacebookFilledIconSvg;
  let fixture: ComponentFixture<FacebookFilledIconSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacebookFilledIconSvg],
    }).compileComponents();

    fixture = TestBed.createComponent(FacebookFilledIconSvg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
