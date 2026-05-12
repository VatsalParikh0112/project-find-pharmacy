import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PatientLoginDialog } from "./patient-login-dialog";

describe("PatientLoginDialog", () => {
  let component: PatientLoginDialog;
  let fixture: ComponentFixture<PatientLoginDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientLoginDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientLoginDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
