import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-your-pass-is',
  templateUrl: './your-pass-is.page.html',
  styleUrls: ['./your-pass-is.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class YourPassIsPage {
  constructor(private navCtrl: NavController, private renderer: Renderer2, private elementRef: ElementRef) {}
  senhaValor: string = '';

  ngOnInit(){
    this.senha()
  }
  senha(){
    try {
      axios.get('http://localhost:3000/passtemp')
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

}

export class yourPassIs {
  
}
