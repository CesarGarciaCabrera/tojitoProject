import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  dataneg: any;
  numfav: number;
  user = {} as Usuario;
  serv: ControlService = this.ctrlService;

  constructor(
    private ctrlService: ControlService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.getInfoUser();
  }

  ionViewWillEnter(){
    this.getFavs();
  }

  async getFavs(){
    try{
      this.firestore.collection(this.user.id).snapshotChanges().subscribe( data => {
        if(data.length > 0){
          this.numfav = data.length;
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
          this.numfav = 0;
        }
      });
    } catch(e){
      this.serv.showToast(e);
    }
  }

  async getInfoUser(){
    this.afAuth.onAuthStateChanged( data => {
      this.user.id = data.uid;
      this.user.nombre = data.displayName;
      this.user.correo = data.email;
    })
  }

}
