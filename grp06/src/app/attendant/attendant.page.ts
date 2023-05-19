import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { IonicModule, RefresherCustomEvent } from "@ionic/angular";

import { TokenComponent } from "../components/token/token.component";
import { DataService, Token } from "../services/data.service";

@Component({
  selector: "app-attendant",
  templateUrl: "attendant.page.html",
  styleUrls: ["attendant.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, TokenComponent],
})
export class AttendantPage {
  private data = inject(DataService);
  public tokens: Token[] = [];
  private readonly userId = new Date().toTimeString();
  public nextToken: Token = {} as Token;
  constructor() {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  ngOnInit(): void {
    this.getTokens();
  }

  getTokens(): Token[] {
    this.data
      .getTokens()
      .subscribe((tokens: Token[]) => (this.tokens = tokens));
    this.nextToken = this.data.tokens[0];
    return this.tokens;
  }

  callNewToken() {
    /*     this.userToken = this.data.generateNewToken(this.userId);
    console.log(this.userToken); */
  }
}
