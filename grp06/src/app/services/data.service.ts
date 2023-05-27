import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
export enum TokenType {
  SG = 0,
  SE = 1,
  SP = 2,
}

export const TypeString = {
  0: "SG",
  1: "SE",
  2: "SP",
};

export interface Token {
  id: number;
  value: string;
  type: TokenType;
  userId: string;
  called?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class DataService {
  private _storage: Storage | null = null;
  public nextToken: Token = {} as Token;
  public userToken: Token = {} as Token;

  public tokens: Token[] = [];
  public usedTokens: Token[] = [] as Token[];

  constructor(private storage: Storage) {
    this.ngOnInit();
  }

  async ngOnInit() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage["create"]();
    this._storage = storage;
    this.getInformations();
  }

  private async setItem(key: string, value: any) {
    await this._storage?.set(key, JSON.stringify(value));
  }

  private async getItem(key: string): Promise<any> {
    const result = await this._storage?.get(key);
    if (result && result != null) return JSON.parse(result);
  }

  private async removeItem(key: string): Promise<any> {
    await this._storage?.remove(key);
  }

  private getSequenceNumber(typeCheck: TokenType) {
    return this.tokens.filter((item) => item.type === typeCheck).length + 1;
  }

  private populateTokens() {
    for (let i = 0; i < 10; ++i) {
      const randomType = Math.floor(Math.random() * 3);
      this.addToken({
        id: new Date().getTime(),
        type: randomType,
        userId: new Date().getTime().toString(),
        value: tokenValueGenerator(
          randomType,
          this.getSequenceNumber(randomType)
        ),
      });
    }
  }

  private async getInformations() {
    const userToken = await this.getItem("userToken");
    const tokens = await this.getItem("tokens");
    const nextToken = await this.getItem("nextToken");
    const usedTokens = await this.getItem("usedTokens");
    if (userToken) this.userToken = userToken;
    if (tokens) {
      // Temp
      if (!tokens.length) this.populateTokens();
      this.tokens = tokens;
    }
    if (nextToken) this.nextToken = nextToken;
    if (usedTokens) this.usedTokens = usedTokens;
  }

  private async addToken(token: Token) {
    this.tokens.push(token);
    this.setItem("tokens", this.tokens);
  }

  private sortTokens(types: TokenType[]) {
    return this.tokens.sort((a, b) => {
      if (a.type === types[0]) {
        return -1;
      } else if (b.type === types[0]) {
        return 1;
      } else if (a.type === types[1]) {
        return -1;
      } else if (b.type === types[1]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  private findNextToken() {
    const lastItem = this.usedTokens[this.usedTokens.length - 1];
    if (lastItem?.type)
      if (lastItem.type === TokenType.SP) {
        this.tokens = this.sortTokens([TokenType.SE, TokenType.SG]);
      } else {
        this.tokens = this.sortTokens([TokenType.SP, TokenType.SP]);
      }
    else this.tokens = this.sortTokens([TokenType.SP, TokenType.SE]);
    return this.tokens;
  }

  public setUserTokenType(tokenType: TokenType) {
    this.userToken.type = tokenType;
  }

  public async generateUserToken() {
    if (Boolean(this.userToken.value)) return;
    const sequenceNumber = this.getSequenceNumber(this.userToken.type);
    this.userToken = {
      ...this.userToken,
      userId: "1",
      value: tokenValueGenerator(this.userToken.type, sequenceNumber),
    };
    await this.setItem("userToken", this.userToken);
    await this.addToken(this.userToken);
  }

  public async getNextToken() {
    const next = this.findNextToken()[0];
    this.tokens.splice(0, 1);
    this.nextToken = next;
    next.called = true;
    this.usedTokens.push(next);

    await this.setItem("nextToken", this.nextToken);
    await this.setItem("tokens", this.tokens);
    await this.setItem("usedTokens", this.usedTokens);
  }
}

function tokenValueGenerator(type: TokenType, sequenceNumber: number) {
  const year = new Date().getFullYear().toString().substring(2, 4);
  const month =
    new Date().getMonth() > 10
      ? new Date().getMonth() + 1
      : `0${new Date().getMonth() + 1}`;
  const day =
    new Date().getDate() > 10
      ? new Date().getDate()
      : `0${new Date().getDate()}`;

  let localSequence =
    sequenceNumber > 10 ? sequenceNumber : `0${sequenceNumber}`;
  return `${year}${month}${day}-${TypeString[type]}${localSequence}`;
}
