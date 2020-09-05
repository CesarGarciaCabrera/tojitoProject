import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjusteunoPageRoutingModule } from './ajusteuno-routing.module';

import { AjusteunoPage } from './ajusteuno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjusteunoPageRoutingModule
  ],
  declarations: [AjusteunoPage]
})
export class AjusteunoPageModule {}
