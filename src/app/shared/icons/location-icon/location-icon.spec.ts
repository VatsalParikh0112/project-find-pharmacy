import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LocationIconSvg } from "./location-icon";

describe("LocationIconSvg", () => {
  let component: LocationIconSvg;
  let fixture: ComponentFixture<LocationIconSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationIconSvg],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationIconSvg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
