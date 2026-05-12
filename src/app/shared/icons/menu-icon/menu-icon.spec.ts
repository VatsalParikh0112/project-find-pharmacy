import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MenuIconSvg } from "./menu-icon";

describe("MenuIconSvg", () => {
  let component: MenuIconSvg;
  let fixture: ComponentFixture<MenuIconSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuIconSvg],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuIconSvg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
