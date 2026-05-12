import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PhoneIconSvg } from "./phone-icon";

describe("PhoneIconSvg", () => {
  let component: PhoneIconSvg;
  let fixture: ComponentFixture<PhoneIconSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneIconSvg],
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneIconSvg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
