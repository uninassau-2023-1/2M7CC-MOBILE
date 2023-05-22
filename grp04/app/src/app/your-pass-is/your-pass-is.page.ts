import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-your-pass-is',
  templateUrl: './your-pass-is.page.html',
  styleUrls: ['./your-pass-is.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class YourPassIsPage {
  constructor(private navCtrl: NavController) {}


}

export class yourPassIs {
  // Component code here
}
