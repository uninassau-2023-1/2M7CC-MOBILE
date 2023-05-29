import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Tab1Page {
  constructor(private navCtrl: NavController, private renderer: Renderer2, private elementRef: ElementRef) {}
  senhap0: string = '';
  senhap1: string = '';
  senhap2: string = '';
  senhap3: string = '';
  senhap4: string = '';
  senhap5: string = '';
  ngOnInit() {
    this.takevalues();
  }
  takevalues() {
    try {
      axios.get('http://localhost:3000/allpasswords')
        .then(response => {
          let element
          this.senhap0 = response.data?.p0;
          this.senhap1 = response.data?.p1;
          this.senhap2 = response.data?.p2;
          this.senhap3 = response.data?.p3;
          this.senhap4 = response.data?.p4;
          this.senhap5 = response.data?.p5;
          element = this.elementRef.nativeElement.querySelector('#ele0');
          this.renderer.setProperty(element, 'innerHTML', JSON.stringify(this.senhap0).replace(/["]/g,''));
          element = this.elementRef.nativeElement.querySelector('#ele1');
          this.renderer.setProperty(element, 'innerHTML', JSON.stringify(this.senhap1).replace(/["]/g,''));
          element = this.elementRef.nativeElement.querySelector('#ele2');
          this.renderer.setProperty(element, 'innerHTML', JSON.stringify(this.senhap2).replace(/["]/g,''));
          element = this.elementRef.nativeElement.querySelector('#ele3');
          this.renderer.setProperty(element, 'innerHTML', JSON.stringify(this.senhap3).replace(/["]/g,''));
          element = this.elementRef.nativeElement.querySelector('#ele4');
          this.renderer.setProperty(element, 'innerHTML', JSON.stringify(this.senhap4).replace(/["]/g,''));
          element = this.elementRef.nativeElement.querySelector('#ele5');
          this.renderer.setProperty(element, 'innerHTML', JSON.stringify(this.senhap5).replace(/["]/g,''));
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }

  }
}
