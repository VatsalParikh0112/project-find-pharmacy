import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShieldIcon } from './shield-icon';

describe('ShieldIcon', () => {
  let component: ShieldIcon;
  let fixture: ComponentFixture<ShieldIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShieldIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(ShieldIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
