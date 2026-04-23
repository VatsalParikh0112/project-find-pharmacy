import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonTopbar } from './common-topbar';

describe('CommonTopbar', () => {
  let component: CommonTopbar;
  let fixture: ComponentFixture<CommonTopbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonTopbar],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonTopbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
