import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClockIconSvg } from "./clock-icon";

describe("ClockIconSvg", () => {
  let component: ClockIconSvg;
  let fixture: ComponentFixture<ClockIconSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockIconSvg],
    }).compileComponents();

    fixture = TestBed.createComponent(ClockIconSvg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
