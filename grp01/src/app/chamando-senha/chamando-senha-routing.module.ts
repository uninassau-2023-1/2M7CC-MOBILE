import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChamandoSenhaPage } from './chamando-senha.page';

const routes: Routes = [
  {
    path: '',
    component: ChamandoSenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChamandoSenhaPageRoutingModule {}
