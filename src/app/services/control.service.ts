import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController, NavController, ActionSheetController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  user = {} as Usuario;

  constructor(
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private actionSheetCtrl: ActionSheetController
  ) { }

  //Página de inicio de sesión (Login Page)
  async login( us: Usuario ){
    let loader = this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    (await loader).present();

    try{
      await this.afAuth.signInWithEmailAndPassword(us.correo, us.contrasena).then(data => {
        console.log(data);
        this.showToast('Bienvenido ' + data.user.displayName)
        this.navCtrl.navigateRoot('central');
      })
    }
    catch(e){
      this.showToast(e)
    }
    (await loader).dismiss();
  }

  //Página de registro de usuario (Register Page)
  async registro(us: Usuario){
    let loader = this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    (await loader).present();

    try{
      await this.afAuth.createUserWithEmailAndPassword(us.correo, us.contrasena).then(data => {
        this.data(us);
        this.showToast('Usuario registrado');
      });
    } catch(e){
      console.log(e);
    }
    (await loader).dismiss();
  }

  async data(us: Usuario){
    this.login(us);
    (await this.afAuth.currentUser).updateProfile({
      displayName: us.nombre
    });
  }

  //Mensaje
  showToast(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then( toasData => toasData.present());
  }

  //Cerrar sesión
  async singOut(){
    let loader = this.loadingCtrl.create({
      message: 'Cerrando sesión'
    });
    (await loader).present();
    this.afAuth.signOut().then( exit => {
      console.log('Se ha cerrado la sesión');
      this.navCtrl.navigateRoot('login');
    }).catch( exit => {
      console.log(exit);
    });
    (await loader).dismiss();
  }
}
