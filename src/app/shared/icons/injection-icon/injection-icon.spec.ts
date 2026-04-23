import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectionIcon } from './injection-icon';

describe('InjectionIcon', () => {
  let component: InjectionIcon;
  let fixture: ComponentFixture<InjectionIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InjectionIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(InjectionIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
