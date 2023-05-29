import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-senha1',
  templateUrl: './senha1.page.html',
  styleUrls: ['./senha1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Senha1Page implements OnInit {

  constructor(
    private router: Router
  ) { }

  goToTotem(){
    this.router.navigateByUrl('totem')
  }
  ngOnInit() {
  }

}
