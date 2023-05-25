import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SistemaAtendimento from 'src/script/sistemaAtendimento/SistemaAtendimento';

@Component({
  selector: 'app-chamando-senha',
  templateUrl: './chamando-senha.page.html',
  styleUrls: ['./chamando-senha.page.scss'],
})
export class ChamandoSenhaPage implements OnInit {
  sa = new SistemaAtendimento()
  yourTypeTicketText =""
  typeCurrent = ""
  
  historic = [{ticket:'',type:''},{ticket:'',type:''},{ticket:'',type:''},{ticket:'',type:''},{ticket:'',type:''},{ticket:'',type:''}] 

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
      this.yourTypeTicketText = this.getYourTicketType(this.sa.yourTicket) 
      this.typeCurrent = this.getYourTicketType(this.sa.currentTicket) 
      this.getHistoric()          
    }
  }
  
  getHistoric(){
    let length = this.sa.filaAtendimento.length    
    if (length > 5 ) {      
      let aux = this.sa.filaAtendimento.slice(length - 6, length - 1)

      this.historic = aux.map(element => {
        return {ticket:element,type:this.getYourTicketType(element)}        
      }) 

    }else{
      this.historic = this.historic.concat( this.sa.filaAtendimento.map(element => {
        return {ticket:element,type:this.getYourTicketType(element)}        
      }))
    }
    console.log(this.historic);
    
    
    this.historic = this.historic.reverse()
    
  }

  getYourTicketType(ticket:string){
    if (ticket.search("SG") !== -1) 
      return "Senha Normal" 

    if (ticket.search("SE") !== -1) 
      return "Retirada de exame" 
      
    if (ticket.search("SP") !== -1) 
      return "Senha Preferencial" 

    return ""    
  }

  gotoSenha(){
    this.router.navigate(['/home',{sa:JSON.stringify(this.sa)}])
  }

  gotoAtendimento(){
    this.router.navigate(['/atendimento',{sa:JSON.stringify(this.sa)}])

  }

}
