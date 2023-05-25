import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatorioPageRoutingModule } from './relatorio-routing.module';

import { RelatorioPage } from './relatorio.page';
import SistemaAtendimento from 'src/script/sistemaAtendimento/SistemaAtendimento';
import { ActivatedRoute, Router } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatorioPageRoutingModule
  ],
  declarations: [RelatorioPage]
})
export class RelatorioPageModule {}
