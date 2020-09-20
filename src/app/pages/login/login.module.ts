import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { PassPageModule } from '../pass/pass.module';
import { PassPage } from '../pass/pass.page';
import { TermsPage } from '../terms/terms.page';
import { TermsPageModule } from '../terms/terms.module';

@NgModule({
  entryComponents: [
    PassPage,
    TermsPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    PassPageModule,
    TermsPageModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
