import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigpassPage } from './configpass.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigpassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigpassPageRoutingModule {}
