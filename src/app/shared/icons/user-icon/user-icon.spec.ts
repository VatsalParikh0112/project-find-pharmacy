import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserIconSvg } from "./user-icon";

describe("UserIconSvg", () => {
  let component: UserIconSvg;
  let fixture: ComponentFixture<UserIconSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserIconSvg],
    }).compileComponents();

    fixture = TestBed.createComponent(UserIconSvg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
