import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {

  user = {} as Usuario
  photo: SafeResourceUrl

  constructor(
    private afAuth: AngularFireAuth,
    private domSanitizer: DomSanitizer,
    private ctrlService: ControlService,
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
      this.user.photo = data.photoURL;
    })
  }

  close(){
    this.navCtrl.navigateBack('/central/settings');
  }

  async takePhoto(){
    const pic = await Plugins.Camera.getPhoto({
      quality: 50,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      saveToGallery: true,
      width: 600,
      height: 600
    });
    this.photo = this.domSanitizer.bypassSecurityTrustResourceUrl(pic && (pic.dataUrl));
    this.ctrlService.upload(pic.dataUrl, this.user.id);
    this.close();
  }

  //Tomar de galería
  async gallery(){
    const pic = await Plugins.Camera.getPhoto({
      quality: 50,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      saveToGallery: true,
      width: 600,
      height: 600
    });
    this.photo = this.domSanitizer.bypassSecurityTrustResourceUrl(pic && (pic.dataUrl));
    this.ctrlService.upload(pic.dataUrl, this.user.id);
    this.close();
  }

  //Eliminar foto
  async deletePhoto(){
    let img = 'assets/icon/userNull.jpg'
    this.ctrlService.userPhoto(img);
    this.close();
  }

}
