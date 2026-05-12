import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GoogleIconSvg } from "./google-icon";

describe("GoogleIconSvg", () => {
  let component: GoogleIconSvg;
  let fixture: ComponentFixture<GoogleIconSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleIconSvg],
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleIconSvg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
