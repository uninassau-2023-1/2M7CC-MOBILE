import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'chamando-senha',
    loadChildren: () => import('./chamando-senha/chamando-senha.module').then( m => m.ChamandoSenhaPageModule)
  },
  {
    path: 'atendimento',
    loadChildren: () => import('./atendimento/atendimento.module').then( m => m.AtendimentoPageModule)
  },
  {
    path: 'relatorio',
    loadChildren: () => import('./relatorio/relatorio.module').then( m => m.RelatorioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
