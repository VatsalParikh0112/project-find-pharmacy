import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CheckIconSvg } from "./check-icon";

describe("CheckIconSvg", () => {
  let component: CheckIconSvg;
  let fixture: ComponentFixture<CheckIconSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckIconSvg],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckIconSvg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
