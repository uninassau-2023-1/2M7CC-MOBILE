import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { TokenComponent } from "../components/token/token.component";
import { AttendantPage } from "./attendant.page";

describe("AttendantPage", () => {
  let component: AttendantPage;
  let fixture: ComponentFixture<AttendantPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendantPage, IonicModule, TokenComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AttendantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
