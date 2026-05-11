import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CommunityIcon } from "./community-icon";

describe("CommunityIcon", () => {
  let component: CommunityIcon;
  let fixture: ComponentFixture<CommunityIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
