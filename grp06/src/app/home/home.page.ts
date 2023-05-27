import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { IonicModule, RefresherCustomEvent } from "@ionic/angular";

import { TokenComponent } from "../components/token/token.component";
import { DataService, TokenType } from "../services/data.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, TokenComponent],
})
export class HomePage {
  public data = inject(DataService);
  public tokenTypeArr = [
    {
      title: "Senha Prioritária",
      value: TokenType.SP,
    },
    {
      title: "Senha de Retirada de Exames",
      value: TokenType.SE,
    },
    {
      title: "Senha Geral",
      value: TokenType.SG,
    },
  ];

  constructor() {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getNewToken() {
    this.data.generateUserToken();
  }
}
