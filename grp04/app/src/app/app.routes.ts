import { Routes } from '@angular/router';
import { Tab2comfirmationPage } from './tab2comfirmation/tab2comfirmation.page';
import { yourPassIs } from './your-pass-is/your-pass-is.page';
import { Tab2Page } from './tab2/tab2.page';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'tab2comfirmation', component: Tab2comfirmationPage
    //loadComponent: () => import('./tab2comfirmation/tab2comfirmation.page').then( m => m.Tab2comfirmationPage)
  },
  {
    path: 'yourPassIs', component: yourPassIs
  },
  {
    path: 'tab2', component: Tab2Page
  },
  {
    path: 'your-pass-is',
    loadComponent: () => import('./your-pass-is/your-pass-is.page').then( m => m.YourPassIsPage)
  }
  
];
