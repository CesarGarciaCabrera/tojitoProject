import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigpassPageRoutingModule } from './configpass-routing.module';

import { ConfigpassPage } from './configpass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigpassPageRoutingModule
  ],
  declarations: [ConfigpassPage]
})
export class ConfigpassPageModule {}
