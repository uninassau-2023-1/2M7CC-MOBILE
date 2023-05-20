import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
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
  providedIn: "root",
})
export class DataService {
  private _storage: Storage | null = null;
  public nextToken: Token = {} as Token;
  public userToken: Token = {} as Token;

  public tokens: Token[] = [
    {
      id: 0,
      value: "230403-SG01",
      type: TokenType.SG,
      userId: "1",
    },
    {
      id: 1,
      value: "230403-SE01",
      type: TokenType.SE,
      userId: "2",
    },
    {
      id: 2,
      value: "230403-SP02",
      type: TokenType.SP,
      userId: "3",
    },
  ];

  constructor(private storage: Storage) {
    this.ngOnInit();
  }

  async ngOnInit() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);

    const storage = await this.storage["create"]();
    this._storage = storage;
    this.populateStorage();
    this.getUserTokenStorage();
    this.getNextTokenStorage();
  }

  private generateRandomType() {
    return [TokenType.SG, TokenType.SE, TokenType.SP][
      Math.floor(Math.random() * (2 - 0 + 1) + 0)
    ];
  }
  private async getUserTokenStorage() {
    const item = await this._storage?.get("userToken");
    if (item && item != null) {
      this.setItem("userToken", item);
      this.userToken = JSON.parse(item);
    }
  }

  private async getNextTokenStorage() {
    const item = await this._storage?.get("nextToken");
    if (item && item != null) {
      this.setItem("nextToken", item);
      this.nextToken = JSON.parse(item);
    }
  }

  private async populateStorage() {
    const item = await this._storage?.get("tokens");
    if (!item || item == null) {
      this.setItem("tokens", JSON.stringify(this.tokens));
    } else {
      this.tokens = JSON.parse(item);
    }
  }

  private setItem(key: string, value: string) {
    this._storage?.set(key, value);
  }

  public async generateTokens(): Promise<void> {
    const item = await this._storage?.get("tokens");
    if (item && item !== null) {
      const oldTokens = JSON.parse(item);
      oldTokens.push(
        this.generateNewToken(
          new Date().getTime().toString(),
          this.generateRandomType()
        )
      );

      this.setItem("tokens", JSON.stringify(oldTokens));
      this.tokens = oldTokens;
    }
  }

  public async getTokens(): Promise<Token[]> {
    const item = await this._storage?.get("tokens");
    if (item && item !== null) {
      this.tokens = JSON.parse(item);
      return JSON.parse(item);
    }

    return this.tokens;
  }

  public getTokenById(id: number): Token {
    return this.tokens[id];
  }

  public async addToken(token: Token): Promise<Token[]> {
    this.tokens.push(token);
    const item = await this._storage?.get("tokens");
    if (item && item !== null) {
      const oldTokens = JSON.parse(item);
      oldTokens.push(token);
      this.setItem("tokens", JSON.stringify(oldTokens));
      this.tokens = oldTokens;
    }
    return this.tokens;
  }

  public removeToken(token: Token) {
    this.tokens.splice(
      this.tokens.findIndex((item) => item.id === token.id),
      1
    );
    this.setItem("tokens", JSON.stringify(this.tokens));
  }

  public findTokenByUserId(userId: string): Token | undefined {
    return this.tokens.find((token) => token.userId === userId);
  }

  public generateNewToken(userId: string, customType?: TokenType): Token {
    const tokenValue = `${new Date().getFullYear()}${
      new Date().getMonth() + 1
    }${new Date().getDate()}-${TokenType[this.generateRandomType()]}${
      this.tokens.length
    }`;

    const userToken = this.findTokenByUserId(userId);
    if (Boolean(userToken) && userToken != undefined) return userToken;

    const newToken: Token = {
      id: new Date().getTime(),
      value: tokenValue,
      type: customType || TokenType.SG,
      userId,
    };

    this.addToken(newToken);
    if (!this.userToken.value) {
      this.userToken = newToken;
      this.setItem("userToken", JSON.stringify(newToken));
    }
    return newToken;
  }

  public getNextToken(): Token | undefined {
    if (this.nextToken) {
      if (this.userToken.value === this.nextToken.value) {
        this.userToken.value = `É a sua vez! ${this.userToken.value}`;
      }
      this.removeToken(this.nextToken);
    }
    const next = this.tokens.find((item) =>
      [TokenType.SG, TokenType.SE].includes(this.nextToken.type)
        ? item.type === TokenType.SP
        : item.type !== TokenType.SP
    );
    if (next) {
      this.nextToken = next;
      this.setItem("nextToken", JSON.stringify(next));
    }
    return this.nextToken;
  }
}
