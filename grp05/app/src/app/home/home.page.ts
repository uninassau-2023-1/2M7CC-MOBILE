import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResultComponent } from '../result/result.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private dataService: DataService) {}

  generateTicket(type: string) {
    return this.dataService.generateTicket(type);
  }

  generateAndSave(type: string) {
    const result = this.generateTicket(type);
    this.dataService.setData(result);
  }
}
