import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Senha1Page } from '../senha1/senha1.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-totem',
  templateUrl: './totem.page.html',
  styleUrls: ['./totem.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TotemPage implements OnInit {

  constructor(
    private router: Router
  ) { 
  }

  goToSenha1(){
    this.router.navigateByUrl('senha1')
  }

  goToSenha2(){
    this.router.navigateByUrl('senha2')
  }

  goToSenha3(){
    this.router.navigateByUrl('senha3')
  }

  ngOnInit() {
  }

}
