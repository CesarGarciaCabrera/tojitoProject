import { Component, OnInit } from '@angular/core';
import { Negocio } from 'src/app/interfaces/negocio';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  dataneg = {} as Negocio;
  id: string;

  constructor(
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore
  ) {
    this.id = this.actRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getPostById(this.id);
  }

  async getPostById(id: string){
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

}
