import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export enum TokenType {
  SG = 0,
  SE = 1,
  SP = 2,
}
export interface Token {
  id: number;
  value: string;
  type: TokenType;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public tokens: Token[] = [
    {
      id: 0,
      value: '230403-SG01',
      type: TokenType.SG,
      userId: '1',
    },
    {
      id: 1,
      value: '230403-SE01',
      type: TokenType.SE,
      userId: '2',
    },
    {
      id: 2,
      value: '230403-SP02',
      type: TokenType.SP,
      userId: '3',
    },
  ];

  constructor() {}

  public getTokens(): Observable<Token[]> {
    const tokens = of(this.tokens);
    return tokens;
  }

  public getTokenById(id: number): Token {
    return this.tokens[id];
  }

  public addToken(token: Token): Token[] {
    this.tokens.push(token);
    return this.tokens;
  }

  public findTokenByUserId(userId: string): Token | undefined {
    return this.tokens.find((token) => token.userId === userId);
  }

  public generateNewToken(userId: string): Token {
    const tokenValue = `${new Date().getFullYear()}${
      new Date().getMonth() + 1
    }${new Date().getDate()}-SG${this.tokens.length}`;

    const userToken = this.findTokenByUserId(userId);
    if (Boolean(userToken) && userToken != undefined) return userToken;

    const newToken: Token = {
      id: new Date().getTime(),
      value: tokenValue,
      type: TokenType.SG,
      userId,
    };

    this.addToken(newToken);
    return newToken;
  }
}
