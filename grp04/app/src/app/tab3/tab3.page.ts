import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Tab3Page {
  constructor(private navCtrl: NavController, private renderer: Renderer2, private elementRef: ElementRef) {}
  senhaValor: string = '';
  proximaSenha() {
      try {
        axios.get('http://localhost:3000/nextpassword')
          .then(response => {
            this.senhaValor = response.data?.p0;
            const element = this.elementRef.nativeElement.querySelector('#senha-atual');
            this.renderer.setProperty(element, 'innerHTML', JSON.stringify(this.senhaValor).replace(/["]/g,''));
          })
          .catch(error => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
  }
  ngOnInit() {
    this.senha();
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
