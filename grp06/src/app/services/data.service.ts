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
  public userTokenType: TokenType | undefined = undefined;
  private lastType: TokenType = TokenType.SP;

  public tokens: Token[] = [
    {
      id: 0,
      value: "230403-SG01",
      type: TokenType.SG,
      userId: "1",
    },
    {
      id: 1,
      value: "230403-SE02",
      type: TokenType.SE,
      userId: "2",
    },
    {
      id: 2,
      value: "230403-SP03",
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
    const itemType = await this._storage?.get("userTokenType");
    if (item && item != null) {
      this.setItem("userToken", item);
      this.userToken = JSON.parse(item);
    }
    if (itemType !== null) {
      console.log("ITEM TYPE", itemType);
      this.userTokenType = parseInt(JSON.parse(itemType), 10);
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
    const newTokens = [...this.tokens];
    newTokens.splice(
      this.tokens.findIndex((item) => item.id === token.id),
      1
    );
    this.tokens = newTokens;
    this.setItem("tokens", JSON.stringify(newTokens));
  }

  public findTokenByUserId(userId: string): Token | undefined {
    return this.tokens.find((token) => token.userId === userId);
  }

  public generateNewToken(userId: string, customType?: TokenType): Token {
    const type = customType
      ? customType
      : this.userTokenType
      ? this.userTokenType
      : TokenType.SG;
    const tokenValue = `${new Date().getFullYear()}${
      new Date().getMonth() + 1
    }${new Date().getDate()}-${TokenType[type]}${this.tokens.length + 1}`;

    const userToken = this.findTokenByUserId(userId);
    if (Boolean(userToken) && userToken != undefined) return userToken;
    const newToken: Token = {
      id: new Date().getTime(),
      value: tokenValue,
      type: type,
      userId,
    };
    this.addToken(newToken);
    if (!this.userToken.value) {
      this.userToken = newToken;
      this.setItem("userToken", JSON.stringify(newToken));
    }
    return newToken;
  }

  private checkType(item: Token): boolean {
    const hasPriority = this.tokens.find((item) => item.type === TokenType.SP);
    switch (this.lastType) {
      case TokenType.SE: {
        if (hasPriority) return item.type === TokenType.SP;
        if (!hasPriority && item.type !== TokenType.SE)
          return item.type === TokenType.SG;

        return item.type === TokenType.SE;
      }
      case TokenType.SG: {
        if (hasPriority) return item.type === TokenType.SP;
        if (!hasPriority) return item.type === TokenType.SE;

        return item.type === TokenType.SE;
      }
      default: {
        if (![TokenType.SG, TokenType.SE].includes(item.type) && hasPriority)
          return item.type === TokenType.SP;
        return [TokenType.SG, TokenType.SE].includes(item.type);
      }
    }
  }

  public getNextToken(): Token | undefined {
    console.log(this.lastType);
    const next = this.tokens.find((item) => this.checkType(item));
    if (next) {
      if (this.userToken.value === next.value) {
        this.userToken.value = `É a sua vez! ${this.userToken.value}`;
        this.setItem("userToken", JSON.stringify(this.userToken));
      }
      if (!this.tokens.find((item) => item.id === this.userToken.id)) {
        this.userToken = {} as Token;
        this.userTokenType = undefined;
        this._storage?.remove("userToken");
        this._storage?.remove("userTokenType");
      }
      this.nextToken = next;
      this.lastType = next.type;
      this.setItem("nextToken", JSON.stringify(next));

      this.removeToken(next);
    }
    return next;
  }

  public setUserTokenType(type: TokenType) {
    if (Boolean(this.userTokenType)) return;
    this.userTokenType = type;
    this.setItem("userTokenType", JSON.stringify(type));
  }
}
