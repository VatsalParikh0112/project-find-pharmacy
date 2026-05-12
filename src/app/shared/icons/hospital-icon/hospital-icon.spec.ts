import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HospitalIconSvg } from "./hospital-icon";

describe("HospitalIconSvg", () => {
  let component: HospitalIconSvg;
  let fixture: ComponentFixture<HospitalIconSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalIconSvg],
    }).compileComponents();

    fixture = TestBed.createComponent(HospitalIconSvg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
