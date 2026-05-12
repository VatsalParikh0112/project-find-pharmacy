import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShieldIconSvg } from "./shield-icon";

describe("ShieldIconSvg", () => {
  let component: ShieldIconSvg;
  let fixture: ComponentFixture<ShieldIconSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShieldIconSvg],
    }).compileComponents();

    fixture = TestBed.createComponent(ShieldIconSvg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
