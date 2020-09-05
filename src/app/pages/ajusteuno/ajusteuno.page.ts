import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-ajusteuno',
  templateUrl: './ajusteuno.page.html',
  styleUrls: ['./ajusteuno.page.scss'],
})
export class AjusteunoPage implements OnInit {

  user = {} as Usuario;
  newName: string;
  newEmail: string;
  serv: ControlService = this.ctrlService;

  constructor(
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private ctrlService: ControlService
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

  async updateName(){
    let alert = await this.alertCtrl.create({
      header: 'Nuevo nombre de usuario',
      message: 'Ingresa el nuevo nombre de usuario.',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: this.user.nombre
        }
      ],
      buttons: [
        {
          text: 'Confirmar'
        }
      ]
    });
    alert.present();
    let result = await alert.onDidDismiss();
    this.newName = result.data.values.nombre;
    if(this.newName != ''){
      this.data(this.newName);
      this.serv.showToast('Tu nombre de usuario ha sido actualizado.');
    }
    else{
      this.serv.showToast('¡Oh no! No haz introducido un nombre. Intenta de nuevo.');
    }
  }

  async data(name: string){
    (await this.afAuth.currentUser).updateProfile({
      displayName: name
    });
  }

}
