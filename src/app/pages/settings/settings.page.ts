import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/app/interfaces/usuario';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user = {} as Usuario;
  serv: ControlService = this.ctrlService;

  constructor(
    private ctrlService: ControlService,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.getInfoUser();
  }

  async confirmExit(){
    let alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: 'Esta a punto de cerrar la sesión, ¿Desea continuar?',
      buttons: [
        {
          text: 'Continuar',
          handler: () => {
            this.serv.singOut();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  };

  getInfoUser(){
    this.afAuth.onAuthStateChanged( data => {
      if (data) {
        this.user.id = data.uid;
        this.user.nombre = data.displayName;
        this.user.correo = data.email;
      }
      else {
        console.log('Usuario ha cerrado sesión');
      }
    })
  }

}
