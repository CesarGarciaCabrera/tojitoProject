import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesPageRoutingModule } from './detalles-routing.module';

import { DetallesPage } from './detalles.page';
import { CartaPage } from '../carta/carta.page';
import { CartaPageModule } from '../carta/carta.module';

@NgModule({
  entryComponents: [
    CartaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesPageRoutingModule,
    CartaPageModule
  ],
  declarations: [DetallesPage]
})
export class DetallesPageModule {}
