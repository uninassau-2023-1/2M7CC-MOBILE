import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { IonicModule, RefresherCustomEvent } from "@ionic/angular";

import { TokenComponent } from "../components/token/token.component";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, TokenComponent],
})
export class HomePage {
  public data = inject(DataService);
  private readonly userId = new Date().toTimeString();
  constructor() {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getNewToken() {
    this.data.generateNewToken(this.userId);
    this.data.generateTokens();
  }
}
