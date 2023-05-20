import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Storage } from "@ionic/storage-angular";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  standalone: true,
  imports: [IonicModule],
  providers: [Storage],
})
export class AppComponent {
  constructor() {}
}
