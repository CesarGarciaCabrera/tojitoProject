import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/app/interfaces/usuario';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {

  user = {} as Usuario;

  constructor(
    private modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    private ctrlService: ControlService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getInfoUser();
  }

  async getInfoUser(){
    this.afAuth.onAuthStateChanged( data => {
      this.user.id = data.uid;
      this.user.nombre = data.displayName;
      this.user.correo = data.email;
    })
  }

  cancel(){
    this.modalCtrl.dismiss();
  }

  async delete(){
    let user = this.afAuth.currentUser;
    let loader = this.loadingCtrl.create({
      message: 'Eliminando cuenta.'
    });
    (await loader).present();

    (await user).delete().then( d => {
      this.ctrlService.showToast('Cuenta eliminada');
      this.modalCtrl.dismiss();
      this.navCtrl.navigateBack('login');
      
    }).catch(e => {
      this.ctrlService.showToast('Ha ocurrido un error, intente más tarde');
      this.modalCtrl.dismiss();
    });
    (await loader).dismiss();
  }

}
