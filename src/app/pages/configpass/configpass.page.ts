import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-configpass',
  templateUrl: './configpass.page.html',
  styleUrls: ['./configpass.page.scss'],
})
export class ConfigpassPage implements OnInit {

  user = {} as Usuario;
  passw2: string
  passw3: string

  constructor(
    private modalCtrl: ModalController,
    private CtrlService: ControlService,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getInfoUser()
  }

  async getInfoUser(){
    this.afAuth.onAuthStateChanged( data => {
      this.user.correo = data.email;
    })
  }

  async cancel(){
    this.modalCtrl.dismiss()
  }

  async updatePass(){
    let loader = this.loadingCtrl.create({
      message: 'Comprobando información...'
    });
    (await loader).present();

    try {
      await this.afAuth.signInWithEmailAndPassword(this.user.correo, this.user.contrasena).then(() => {
        if(this.passw2 == this.passw3){
          this.CtrlService.updatePass(this.passw2).then(() => {
            this.CtrlService.showToast('Contraseña actualizada con éxito');
            this.cancel();
          }).catch(() => {
            this.CtrlService.showToast('La contraseña debe más de 8 caratéres, intente de nuevo.');
          });
        }
        else{
          this.CtrlService.showToast('La nueva contraseña no coincide en la validación');
        }
      });
    }
    catch(e) {
      this.CtrlService.showToast('La contraseña actual que ingresó es incorrecta');
    }
    (await loader).dismiss();
  }

}
