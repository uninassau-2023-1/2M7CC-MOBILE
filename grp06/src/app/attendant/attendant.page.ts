import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { IonicModule, RefresherCustomEvent } from "@ionic/angular";

import { TokenComponent } from "../components/token/token.component";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-attendant",
  templateUrl: "attendant.page.html",
  styleUrls: ["attendant.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, TokenComponent],
})
export class AttendantPage {
  public data = inject(DataService);
  constructor() {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }
}
