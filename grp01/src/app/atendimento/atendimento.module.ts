import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtendimentoPageRoutingModule } from './atendimento-routing.module';

import { AtendimentoPage } from './atendimento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtendimentoPageRoutingModule
  ],
  declarations: [AtendimentoPage]
})
export class AtendimentoPageModule {}
