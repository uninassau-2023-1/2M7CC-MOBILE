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
  calledTime?: number;
  order: number;
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
  public userCalled?: boolean = false;

  private counterTokenType = {
    0: 0,
    1: 0,
    2: 0,
  };

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

  private getSequenceNumber(typeCheck: TokenType) {
    this.counterTokenType[typeCheck] += 1;
    this.setItem("counterTokenType", this.counterTokenType);
    return this.counterTokenType[typeCheck];
  }

  private populateTokens() {
    if (this.tokens.length) return;
    for (let i = 0; i < 10; ++i) {
      const randomType = Math.floor(Math.random() * 3);
      this.addToken({
        id: new Date().getTime() + 1,
        type: randomType,
        userId: new Date().getTime().toString(),
        value: tokenValueGenerator(
          randomType,
          this.getSequenceNumber(randomType)
        ),
        order: this.tokens.length + 1,
      });
    }
  }

  private async getInformations() {
    const userToken = await this.getItem("userToken");
    const tokens = await this.getItem("tokens");
    const nextToken = await this.getItem("nextToken");
    const usedTokens = await this.getItem("usedTokens");
    const userCalled = await this.getItem("userCalled");
    const counterTokenType = await this.getItem("counterTokenType");
    if (userToken) this.userToken = userToken;
    if (tokens) this.tokens = tokens;
    if (nextToken) this.nextToken = nextToken;
    if (usedTokens) this.usedTokens = usedTokens;
    if (userCalled) this.userCalled = userCalled;
    if (counterTokenType) this.counterTokenType = counterTokenType;
    this.populateTokens();
  }

  private async addToken(token: Token) {
    this.tokens.push(token);
    this.setItem("tokens", this.tokens);
  }

  private sortTokens() {
    return [...this.tokens].slice().sort((a, b) => a.order - b.order);
  }

  private findNextToken() {
    const tokens = this.sortTokens();
    const lastCalledType = this.usedTokens[this.usedTokens.length - 1]?.type;
    const beforeLastType = this.usedTokens[this.usedTokens.length - 2]?.type;
    const seTokens = tokens.filter((item) => item.type === TokenType.SE);
    const sgTokens = tokens.filter((item) => item.type === TokenType.SG);
    const spTokens = tokens.filter((item) => item.type === TokenType.SP);

    let idx = 0;
    if (!this.usedTokens.length) {
      idx = tokens.findIndex((item) => item.type === TokenType.SP);
      return { next: tokens[idx], idx: idx };
    }
    if (lastCalledType === TokenType.SP) {
      if (beforeLastType === TokenType.SG && !seTokens.length) {
        idx = tokens.findIndex((item) => item.type === TokenType.SG);
      } else if (beforeLastType === TokenType.SG && seTokens.length) {
        idx = tokens.findIndex((item) => item.type === TokenType.SE);
      } else if (beforeLastType === TokenType.SE && !sgTokens.length) {
        idx = tokens.findIndex((item) => item.type === TokenType.SE);
      } else if (beforeLastType === TokenType.SE && sgTokens.length) {
        idx = tokens.findIndex((item) => item.type === TokenType.SG);
      }

      if (spTokens.length && !seTokens.length && !sgTokens.length)
        idx = tokens.findIndex((item) => item.type === TokenType.SP);
    } else {
      if (spTokens.length)
        idx = tokens.findIndex((item) => item.type === TokenType.SP);
      else if (beforeLastType === TokenType.SG && !seTokens.length) {
        idx = tokens.findIndex((item) => item.type === TokenType.SG);
      } else if (beforeLastType === TokenType.SG && seTokens.length) {
        idx = tokens.findIndex((item) => item.type === TokenType.SE);
      } else if (beforeLastType === TokenType.SE && !sgTokens.length) {
        idx = tokens.findIndex((item) => item.type === TokenType.SE);
      } else if (beforeLastType === TokenType.SE && sgTokens.length) {
        idx = tokens.findIndex((item) => item.type === TokenType.SG);
      }
    }

    return { next: tokens[idx], idx: idx };
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
    const { next, idx } = this.findNextToken();
    if (next == null) return;
    const tokens = [...this.tokens];
    tokens.splice(idx, 1);
    this.tokens = tokens;
    this.nextToken = next;
    next.calledTime = new Date().getTime();
    this.usedTokens.push(next);
    if (next.userId === this.userToken.userId)
      this.userCalled = true;
    await this.setItem("nextToken", this.nextToken);
    await this.setItem("tokens", this.tokens);
    await this.setItem("usedTokens", this.usedTokens);
    await this.setItem("userCalled", this.userCalled);
  }

  public getReportValues() {
    const mergedTokens = [...this.usedTokens, ...this.tokens];
    return {
      generatedTokens: this.usedTokens.length + this.tokens.length,
      calledTokens: this.usedTokens.length,
      priorityGeneratedTokens: mergedTokens.filter(
        (item) => item.type === TokenType.SP
      ).length,
      priorityCalledTokens: mergedTokens.filter(
        (item) => item.type === TokenType.SP && item.calledTime
      ).length,
      mergedTokens,
    };
  }
}

function tokenValueGenerator(type: TokenType, sequenceNumber: number) {
  const year = new Date().getFullYear().toString().substring(2, 4);
  const month =
    new Date().getMonth() >= 10
      ? new Date().getMonth() + 1
      : `0${new Date().getMonth() + 1}`;
  const day =
    new Date().getDate() >= 10
      ? new Date().getDate()
      : `0${new Date().getDate()}`;

  let localSequence =
    sequenceNumber >= 10 ? sequenceNumber : `0${sequenceNumber}`;
  return `${year}${month}${day}-${TypeString[type]}${localSequence}`;
}
