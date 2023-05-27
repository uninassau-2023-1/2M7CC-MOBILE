import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TokenComponent } from "../components/token/token.component";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-report",
  templateUrl: "./report.page.html",
  styleUrls: ["./report.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TokenComponent],
})
export class ReportPage implements OnInit {
  public data = inject(DataService);

  constructor() {}

  ngOnInit() {}
}
