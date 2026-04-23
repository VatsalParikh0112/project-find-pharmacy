import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFooter } from './common-footer';

describe('CommonFooter', () => {
  let component: CommonFooter;
  let fixture: ComponentFixture<CommonFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
