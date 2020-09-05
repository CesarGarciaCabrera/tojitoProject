import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjusteunoPage } from './ajusteuno.page';

const routes: Routes = [
  {
    path: '',
    component: AjusteunoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjusteunoPageRoutingModule {}
