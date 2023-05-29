import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-tab2comfirmation',
  templateUrl: './tab2comfirmation.page.html',
  styleUrls: ['./tab2comfirmation.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class Tab2comfirmationPage {
  constructor(private navCtrl: NavController, private renderer: Renderer2, private elementRef: ElementRef) {}
  senhaValor: string = '';

  

redirectToPreviousPage() {
  this.navCtrl.navigateForward('/tabs/tab2');
  
}

passconfirm(){
  try{
  axios.get('http://localhost:3000/passconfirm')
  }catch(error){
  }
}
ngOnInit() {
  this.senha();
}
senha(){
  try {
    axios.get('http://localhost:3000/typetemp')
      .then(response => {
        this.senhaValor = response.data;
        const element = this.elementRef.nativeElement.querySelector('#senha-atual');
        this.renderer.setProperty(element, 'innerHTML', this.senhaValor);

      })
      .catch(error => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
}
redirectToNextPage() {
  this.navCtrl.navigateForward('/your-pass-is');
  setTimeout(() => this.redirectToPreviousPage(), 3000);
}
}

