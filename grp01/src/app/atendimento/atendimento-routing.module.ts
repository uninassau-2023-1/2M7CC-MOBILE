import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtendimentoPage } from './atendimento.page';

const routes: Routes = [
  {
    path: '',
    component: AtendimentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtendimentoPageRoutingModule {}
