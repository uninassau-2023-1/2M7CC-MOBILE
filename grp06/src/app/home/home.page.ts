import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule, RefresherCustomEvent } from '@ionic/angular';

import { DataService, Token } from '../services/data.service';
import { TokenComponent } from '../token/token.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TokenComponent],
})
export class HomePage {
  private data = inject(DataService);
  public tokens: Token[] = [];
  private readonly userId = new Date().toTimeString();
  public userToken: Token = {} as Token;
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

  getNewToken() {
    this.userToken = this.data.generateNewToken(this.userId);
  }
}
