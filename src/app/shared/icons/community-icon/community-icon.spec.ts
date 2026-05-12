import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CommunityIconSvg } from "./community-icon";

describe("CommunityIconSvg", () => {
  let component: CommunityIconSvg;
  let fixture: ComponentFixture<CommunityIconSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityIconSvg],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityIconSvg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
