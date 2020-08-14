import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {

  txtBuscar = '';
  nomRes: any;

  constructor(
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.getBussines();
  }

  onSearchChange(event){
    this.txtBuscar = event.detail.value;
  }

  async getBussines(){
    try{
      this.firestore.collection("negocios").snapshotChanges().subscribe( data => {
        this.nomRes = data.map( e => {
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
      });
    } catch(e){
      console.log(e);
    }
  }

}
