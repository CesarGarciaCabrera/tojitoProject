import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/app/interfaces/usuario';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.page.html',
  styleUrls: ['./pass.page.scss'],
})
export class PassPage implements OnInit {

  serv: ControlService = this.ctrlService;
  email: string;

  constructor(
    private modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private ctrlService: ControlService
  ) { }

  ngOnInit() {
  }

  cancel(){
    this.modalCtrl.dismiss();
  }

  updatePass(){
    this.serv.emailPass(this.email).then(d => {
      this.cancel();
      console.log('Correo enviado');
    }).catch(err => {
      console.log('Ocurrió un error, intente más tarde');
    })
  }

}
