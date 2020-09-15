import { Component, OnInit } from '@angular/core';
import { Negocio } from 'src/app/interfaces/negocio';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from 'src/app/interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  dataneg = {} as Negocio;
  user = {} as Usuario;
  idneg: string;
  check: boolean;
  icono: string;

  constructor(
    private ctrlService: ControlService,
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.idneg = this.actRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getInfoUser();
  }

  ionViewWillEnter(){
    this.getPostByIdHome(this.idneg);
    this.checkFav(this.user.id, this.idneg);
  }


  async getInfoUser(){
    this.afAuth.onAuthStateChanged( data => {
      this.user.id = data.uid;
      this.user.nombre = data.displayName;
      this.user.correo = data.email;
    })
  }

  async getPostByIdHome(id: string){
    let loader = this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    (await loader).present();

    this.firestore.doc("negocios/"+id).valueChanges().subscribe( data => {
      this.dataneg.nombre = data["nombre"];
      this.dataneg.descripcion = data["desc"];
      this.dataneg.horario = data["horario"];
      this.dataneg.calle = data["calle"];
      this.dataneg.municipio = data["municipio"];
      this.dataneg.img = data["img"];
    });

    (await loader).dismiss();
  }

  async checkFav(iduser: string, idfav: string){
    this.firestore.doc(iduser+"/"+idfav).ref.get().then( d => {
      if (d.exists) {
        this.check = true;
        this.icono = 'star';
      } else {
        this.check = false;
        this.icono = 'star-outline';
      }
    }).catch(e => {
      console.log(e);
    })
  }

  addFav(){
    if (this.check) {
      this.check = false;
      this.icono = 'star-outline';
      this.ctrlService.eliminarPost(this.user.id, this.idneg)
      console.log('Eliminado de fav');
    }
    else {
      this.check = true;
      this.icono = 'star';
      this.ctrlService.crearPost(this.dataneg, this.user.id, this.idneg);
      console.log('Agregado a fav');
    }
  }

}
