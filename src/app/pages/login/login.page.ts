import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { ControlService } from 'src/app/services/control.service';
import { PassPage } from '../pass/pass.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as Usuario;
  r: boolean = false;
  opc: string;

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
    this.ctrlService.registro(this.user);
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

}
