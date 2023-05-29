import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-senha2',
  templateUrl: './senha2.page.html',
  styleUrls: ['./senha2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Senha2Page implements OnInit {

  constructor(
    private router: Router
  ) { }

  goToTotem(){
    this.router.navigateByUrl('totem')
  }
  
  ngOnInit() {
  }

}
