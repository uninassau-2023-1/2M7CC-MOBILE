import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  SGcount = 0;
  SPcount = 0;
  SEcount = 0;

  private ticket: any;

  constructor() { }

  setData(ticket: any) {
    this.ticket = ticket;
  }

  getData(){
    return this.ticket;
  }

  generateTicket(type: string) {
    switch (type) {
      case 'SG':
        this.SGcount++;
        return this.getCurrentDate() + '-' + 'SG' + String(this.SGcount);
      case 'SP':
        this.SPcount++;
        return this.getCurrentDate() + '-' + 'SP' + String(this.SPcount);
      default:
        this.SEcount++;
        return this.getCurrentDate() + '-' + 'SE' + String(this.SEcount);
    }
  }

  private getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return year + month + day;
  }
}
