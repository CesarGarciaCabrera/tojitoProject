import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/app/interfaces/usuario';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user = {} as Usuario;

  constructor(
    private ctrlService: ControlService,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getInfoUser();
  }

  ionViewWillEnter(){
    this.getInfoUser();
  }

  async confirmExit(){
    let alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: 'Esta a punto de cerrar la sesión, ¿Desea continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Continuar',
          handler: () => {
            this.ctrlService.singOut();
          }
        }
      ]
    });
    await alert.present();
  };

  rutaSettings(){
    this.navCtrl.navigateRoot('/ajusteuno');
  }

  async getInfoUser(){
    await this.afAuth.onAuthStateChanged( data => {
      this.user.id = data.uid;
      this.user.nombre = data.displayName;
      this.user.correo = data.email;
      this.user.photo = data.photoURL;
    })
  }

  message(){
    this.ctrlService.showToast('Pronto podrás personalizar tu cuenta, estamos trabajando en ello, agradecemos tu paciencia');
  }

}
