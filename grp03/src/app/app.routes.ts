
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';



export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'totem',
    loadComponent: () => import('./pages/totem/totem.page').then( m => m.TotemPage)
  },
  {
    path: 'senha1',
    loadComponent: () => import('./pages/senha1/senha1.page').then( m => m.Senha1Page)
  },
  {
    path: 'senha2',
    loadComponent: () => import('./pages/senha2/senha2.page').then( m => m.Senha2Page)
  },
  {
    path: 'senha3',
    loadComponent: () => import('./pages/senha3/senha3.page').then( m => m.Senha3Page)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ]
})

export class AppRoutingModule{}