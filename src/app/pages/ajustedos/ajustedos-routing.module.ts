import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjustedosPage } from './ajustedos.page';

const routes: Routes = [
  {
    path: '',
    component: AjustedosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjustedosPageRoutingModule {}
