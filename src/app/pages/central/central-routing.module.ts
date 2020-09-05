import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CentralPage } from './central.page';

const routes: Routes = [
  {
    path: 'central',
    component: CentralPage,
    children: [
      {
        path: 'home',
        children: [
          { path: '', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule) }
        ]
      },
      {
        path: 'settings',
        children: [
          { path: '', loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule) }
        ]
      },
      {
        path: 'favoritos',
        children: [
          { path: '', loadChildren: () => import('../favoritos/favoritos.module').then( m => m.FavoritosPageModule) }
        ]
      },
      {
        path: '', redirectTo: '/central/home', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/central/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CentralPageRoutingModule {}
