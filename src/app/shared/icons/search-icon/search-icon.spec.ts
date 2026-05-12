import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchIconSvg } from "./search-icon";

describe("SearchIconSvg", () => {
  let component: SearchIconSvg;
  let fixture: ComponentFixture<SearchIconSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchIconSvg],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchIconSvg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
