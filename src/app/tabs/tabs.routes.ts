import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadComponent: () => import('../tab1/tab1.page').then(m => m.Tab1Page)
          },
          {
            path: 'details/:pokemonName',
            loadComponent: () => import('../pokemon-details/pokemon-details.page').then(m => m.PokemonDetailsPage)
          }
        ]
      },
      {
        path: 'tab2',
        loadComponent: () => import('../tab2/tab2.page').then(m => m.Tab2Page)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  }
];
