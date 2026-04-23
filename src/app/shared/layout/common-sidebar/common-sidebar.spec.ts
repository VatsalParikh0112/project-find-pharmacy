import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSidebar } from './common-sidebar';

describe('CommonSidebar', () => {
  let component: CommonSidebar;
  let fixture: ComponentFixture<CommonSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
