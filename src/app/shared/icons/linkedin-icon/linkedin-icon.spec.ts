import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedinIconSvg } from './linkedin-icon';

describe('LinkedinIconSvg', () => {
  let component: LinkedinIconSvg;
  let fixture: ComponentFixture<LinkedinIconSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkedinIconSvg],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkedinIconSvg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
