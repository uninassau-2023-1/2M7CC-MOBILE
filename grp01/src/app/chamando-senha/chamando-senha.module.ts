import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChamandoSenhaPageRoutingModule } from './chamando-senha-routing.module';

import { ChamandoSenhaPage } from './chamando-senha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChamandoSenhaPageRoutingModule
  ],
  declarations: [ChamandoSenhaPage]
})
export class ChamandoSenhaPageModule {}
