import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjustedosPageRoutingModule } from './ajustedos-routing.module';

import { AjustedosPage } from './ajustedos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjustedosPageRoutingModule
  ],
  declarations: [AjustedosPage]
})
export class AjustedosPageModule {}
