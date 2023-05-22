import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent]
})
export class Tab2Page {
constructor(private navCtrl: NavController) {}


  redirectToOtherPage() {
  this.navCtrl.navigateForward('/tab2comfirmation');
}
}
export class tab2 {
  // Component code here
}