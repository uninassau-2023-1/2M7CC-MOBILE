import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { NavController } from '@ionic/angular';
import axios from 'axios';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent]
})
export class Tab2Page {
constructor(private navCtrl: NavController) {}
  senhaGeral(){
      axios.post('http://localhost:3000/passrequest', {"t":1})
    .then((response) => {
    console.log(response.data); 
    })
    .catch((error) => {
    console.error(error);
    });
  }
  senhaPref(){
    axios.post('http://localhost:3000/passrequest', {"t":2})
  .then((response) => {
  console.log(response.data); 
  })
  .catch((error) => {
  console.error(error);
  });
}
senhaExame(){
  axios.post('http://localhost:3000/passrequest', {"t":3})
.then((response) => {
console.log(response.data); 
})
.catch((error) => {
console.error(error);
});
}

  redirectToOtherPage() {
  this.navCtrl.navigateForward('/tab2comfirmation');
}
}
