import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import SistemaAtendimento from 'src/script/sistemaAtendimento/SistemaAtendimento';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  styleUrls: ['./relatorio.page.scss'],
})
export class RelatorioPage implements OnInit {
  sa = new SistemaAtendimento()
  relatorioAtual = this.sa.gerarRelatorio()

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    let saParam = this.route.snapshot.paramMap.get('sa') || ""
    if (saParam !== "") { 
      let sa:SistemaAtendimento = JSON.parse(saParam)
      this.sa.currentTicket = sa.currentTicket
      this.sa.endTime = sa.endTime
      this.sa.excededTime = sa.excededTime
      this.sa.yourTicket = sa.yourTicket
      this.sa.filaAtendimento = sa.filaAtendimento
      this.sa.filaEspera = sa.filaEspera
      this.sa.time = sa.time
      this.sa.quantitySP = sa.quantitySP
      this.sa.quantitySG = sa.quantitySG
      this.sa.quantitySE = sa.quantitySE
      this.sa.guiche = sa.guiche
      this.relatorioAtual = this.sa.gerarRelatorio()
    }
  }

  gotoAtendimento(){
    this.router.navigate(['/atendimento',{sa:JSON.stringify(this.sa)}])
  }
}
