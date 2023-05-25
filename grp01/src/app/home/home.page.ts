import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SistemaAtendimento from 'src/script/sistemaAtendimento/SistemaAtendimento';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{  
  sa = new SistemaAtendimento()
  typeTicket = "SG" 

  constructor(private route: ActivatedRoute, private router: Router){
    console.log(this.sa.excededTime);
  }

  ngOnInit() {    
    let saParam = this.route.snapshot.paramMap.get('sa') || ""
    if (saParam !== "") { 
      let sa:SistemaAtendimento = JSON.parse(saParam)
      this.sa.currentTicket = sa.currentTicket
      this.sa.endTime = sa.endTime
      this.sa.excededTime = sa.excededTime
      this.sa.filaAtendimento = sa.filaAtendimento
      this.sa.filaEspera = sa.filaEspera
      this.sa.yourTicket = sa.yourTicket
      this.sa.time = sa.time
      this.sa.quantitySP = sa.quantitySP
      this.sa.quantitySG = sa.quantitySG
      this.sa.quantitySE = sa.quantitySE
      this.sa.guiche = sa.guiche
      
      
    }
  }
  
  gotoChamandoSenha(){
    this.sa.addQueue(this.typeTicket)
    this.router.navigate(['/chamando-senha',{sa:JSON.stringify(this.sa)}])
  } 
}
