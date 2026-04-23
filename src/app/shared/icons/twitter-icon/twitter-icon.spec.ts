import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterIcon } from './twitter-icon';

describe('TwitterIcon', () => {
  let component: TwitterIcon;
  let fixture: ComponentFixture<TwitterIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwitterIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(TwitterIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
