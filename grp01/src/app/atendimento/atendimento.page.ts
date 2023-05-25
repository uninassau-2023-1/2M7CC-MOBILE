import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SistemaAtendimento from 'src/script/sistemaAtendimento/SistemaAtendimento';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.page.html',
  styleUrls: ['./atendimento.page.scss'],
})
export class AtendimentoPage implements OnInit {
  sa = new SistemaAtendimento()
  ticketType = ""

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
      this.ticketType = this.getTicketType(this.sa.currentTicket)
      console.log(this.ticketType);
        
    }
  }

  getTicketType(ticket:string){
    if (ticket.search("SG") !== -1) 
      return "Senha Normal" 

    if (ticket.search("SE") !== -1) 
      return "Retirada de exame" 
      
    if (ticket.search("SP") !== -1) 
      return "Senha Preferencial" 

    return ""    
  }

  gotoSenha(){
    this.router.navigate(['/chamando-senha',{sa:JSON.stringify(this.sa)}])
  }

  gotoRelatorio(){
    this.router.navigate(['/relatorio',{sa:JSON.stringify(this.sa)}])
  }

  onClickProxSenha(){
    this.sa.proximaSenha()
    this.ticketType = this.getTicketType(this.sa.currentTicket)    
    
  }

}
