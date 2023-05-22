import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2comfirmation',
  templateUrl: './tab2comfirmation.page.html',
  styleUrls: ['./tab2comfirmation.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab2comfirmationPage {

  constructor(private navCtrl: NavController) {}
  redirectToNextPage() {
  this.navCtrl.navigateForward('/your-pass-is');
}
redirectToPreviousPage() {
  this.navCtrl.navigateForward('/tab2');
}

}

