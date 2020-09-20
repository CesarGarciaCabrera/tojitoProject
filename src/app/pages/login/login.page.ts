import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { ControlService } from 'src/app/services/control.service';
import { PassPage } from '../pass/pass.page';
import { TermsPage } from '../terms/terms.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as Usuario;
  r: boolean = false;
  opc: string;
  check: boolean = false;
  dataCheck = {
    eti: 'Acepto términos y condiciones',
    value: false
  }

  constructor(
    private ctrlService: ControlService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.changeScreen();
  }

  entrar(){
    this.ctrlService.login(this.user);
  }

  registro(){
    this.ctrlService.registro(this.user, this.dataCheck.value);
  }

  changeScreen(){
    if (this.r) {
      this.r = false;
      this.opc = 'Ya tengo una cuenta.';
    }
    else {
      this.r = true;
      this.opc = '¿No tienes cuenta? Crea una.'
    }
  }

  async passModal(){
    const modal = await this.modalCtrl.create({
      component: PassPage
    })
    await modal.present();
  }

  async openTerms(){
    const modal = await this.modalCtrl.create({
      component: TermsPage
    });
    await modal.present();
  }

}
