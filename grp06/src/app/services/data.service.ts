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

  public usedTokens: Token[] = [] as Token[];

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

  private setItem(key: string, value: any) {
    this._storage?.set(key, JSON.stringify(value));
  }

  private async getItem(key: string): Promise<any> {
    const result = await this._storage?.get(key);
    if (result && result != null) return JSON.parse(result);
  }

  private async removeItem(key: string): Promise<any> {
    await this._storage?.remove(key);
  }

  private generateRandomType(maxValue: number = 2) {
    return [TokenType.SG, TokenType.SE, TokenType.SP][
      Math.floor(Math.random() * (maxValue - 0 + 1) + 0)
    ];
  }
  private async getUserTokenStorage() {
    const item = await this.getItem("userToken");
    const itemType = await this.getItem("userTokenType");
    if (item) {
      this.setItem("userToken", item);
      this.userToken = item;
    }
    if (itemType) {
      this.userTokenType = parseInt(itemType, 10);
    }
  }

  private async getNextTokenStorage() {
    const item = await this.getItem("nextToken");
    if (item) {
      this.setItem("nextToken", item);
      this.nextToken = item;
    }
  }

  private async populateStorage() {
    const item = await this.getItem("tokens");
    if (!item) {
      this.setItem("tokens", this.tokens);
    } else {
      this.tokens = item;
    }
  }
  public async getTokens(): Promise<Token[]> {
    const items = await this.getItem("tokens");
    if (items) {
      this.tokens = items;
      return items;
    }
    return this.tokens;
  }

  public async generateTokens(): Promise<void> {
    const oldTokens = await this.getTokens();

    oldTokens.push(
      this.generateNewToken(
        new Date().getTime().toString(),
        this.generateRandomType()
      )
    );

    this.setItem("tokens", oldTokens);
    this.tokens = oldTokens;
  }

  public getTokenById(id: number): Token {
    return this.tokens[id];
  }

  public async addToken(token: Token): Promise<Token[]> {
    this.tokens.push(token);

    const oldTokens = await this.getTokens();
    oldTokens.push(token);
    this.setItem("tokens", oldTokens);
    this.tokens = oldTokens;

    return this.tokens;
  }

  public removeToken(token: Token) {
    const newTokens = [...this.tokens];
    newTokens.splice(
      this.tokens.findIndex((item) => item.id === token.id),
      1
    );
    this.tokens = newTokens;
    this.setItem("tokens", newTokens);
  }

  public findTokenByUserId(userId: string): Token | undefined {
    return this.tokens.find((token) => token.userId === userId);
  }

  private tokenValueBuilder(tokenType: TokenType) {
    return `${new Date().getFullYear()}${
      new Date().getMonth() + 1
    }${new Date().getDate()}-${TokenType[tokenType]}${this.tokens.length + 1}`;
  }

  private tokenBuilder(type: TokenType, value: string, userId: string): Token {
    return {
      id: new Date().getTime(),
      value,
      type,
      userId,
    };
  }

  public generateNewToken(userId: string, customType?: TokenType): Token {
    const userToken = this.findTokenByUserId(userId);
    if (Boolean(userToken) && userToken != undefined) return userToken;

    const type = (customType ? customType : this.userTokenType) || TokenType.SG;
    const tokenValue = this.tokenValueBuilder(type);

    const newToken: Token = this.tokenBuilder(type, tokenValue, userId);

    this.addToken(newToken);

    if (!this.userToken.value) {
      this.userToken = newToken;
      this.setItem("userToken", newToken);
    }
    return newToken;
  }

  private checkType(
    item: Token,
    lastType: TokenType,
    hasPriority: boolean
  ): boolean {
    switch (lastType) {
      case TokenType.SE: {
        if (hasPriority) return item.type === TokenType.SP;
        if (!hasPriority && item.type !== TokenType.SE)
          return item.type === TokenType.SG;
        return item.type === TokenType.SE;
      }
      case TokenType.SG: {
        if (hasPriority) return item.type === TokenType.SP;
        if (!hasPriority) return item.type === TokenType.SE;
        return item.type === TokenType.SG;
      }
      default: {
        if (![TokenType.SG, TokenType.SE].includes(item.type) && hasPriority)
          return item.type === TokenType.SP;
        return [TokenType.SG, TokenType.SE].includes(item.type);
      }
    }
  }

  public getNextToken(): Token | undefined {
    const hasPriority = this.tokens.find((item) => item.type === TokenType.SP);
    const next = this.tokens.find((item) =>
      this.checkType(item, this.lastType, Boolean(hasPriority))
    );

    if (next) {
      if (this.userToken.value === next.value) {
        this.userToken.value = `É a sua vez! ${this.userToken.value}`;
        this.setItem("userToken", this.userToken);
      }
      if (!this.tokens.find((item) => item.id === this.userToken.id)) {
        this.userToken = {} as Token;
        this.userTokenType = undefined;
        this.removeItem("userToken");
        this.removeItem("userTokenType");
      }
      this.nextToken = next;
      this.lastType = next.type;
      this.setItem("nextToken", next);

      this.removeToken(next);
    }
    return next;
  }

  public setUserTokenType(type: TokenType) {
    if (Boolean(this.userTokenType)) return;
    this.userTokenType = type;
    this.setItem("userTokenType", type);
  }
}
