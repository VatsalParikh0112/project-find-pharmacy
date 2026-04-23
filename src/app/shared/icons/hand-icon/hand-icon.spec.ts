import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandIconSvg } from './hand-icon';

describe('HandIconSvg', () => {
  let component: HandIconSvg;
  let fixture: ComponentFixture<HandIconSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandIconSvg],
    }).compileComponents();

    fixture = TestBed.createComponent(HandIconSvg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
