import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjusteunoPageRoutingModule } from './ajusteuno-routing.module';

import { AjusteunoPage } from './ajusteuno.page';
import { DeletePage } from '../delete/delete.page';
import { DeletePageModule } from '../delete/delete.module';

@NgModule({
  entryComponents: [
    DeletePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjusteunoPageRoutingModule,
    DeletePageModule
  ],
  declarations: [AjusteunoPage]
})
export class AjusteunoPageModule {}
