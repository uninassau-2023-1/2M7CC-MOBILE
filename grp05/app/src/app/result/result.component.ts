import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {

constructor(private dataService:DataService){}

getTicket() {
  const ticket = this.dataService.getData()
  return(ticket)
}

}
