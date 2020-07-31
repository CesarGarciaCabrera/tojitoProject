import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  dataneg: any;
  numneg: number;
  serv: ControlService = this.ctrlService;

  constructor(
    private afStorage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private ctrlService: ControlService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getBussines();
  }

  async getBussines(){
    let loader = await this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    loader.present();

    try{
      this.firestore.collection("negocios").snapshotChanges().subscribe( data => {
        if(data.length > 0){
          this.numneg = data.length;
          this.dataneg = data.map( e => {
            return {
              id: e.payload.doc.id,
              img: e.payload.doc.data()["img"],
              nombre: e.payload.doc.data()["nombre"],
              desc: e.payload.doc.data()["desc"],
              horario: e.payload.doc.data()["horario"],
              calle: e.payload.doc.data()["calle"],
              municipio: e.payload.doc.data()["municipio"]
            };
          });
        }
        else{
          this.numneg = data.length;
        }

        loader.dismiss();
      });
    } catch(e){
      this.serv.showToast(e);
    }
  }


}
