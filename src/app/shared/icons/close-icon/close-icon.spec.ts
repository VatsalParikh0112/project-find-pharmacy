import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseIconSvg } from './close-icon';

describe('CloseIconSvg', () => {
  let component: CloseIconSvg;
  let fixture: ComponentFixture<CloseIconSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseIconSvg],
    }).compileComponents();

    fixture = TestBed.createComponent(CloseIconSvg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
