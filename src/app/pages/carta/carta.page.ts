import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.page.html',
  styleUrls: ['./carta.page.scss'],
})
export class CartaPage implements OnInit {

  @Input() nombre: string;
  @Input() menu: {};

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async cancel(){
    this.modalCtrl.dismiss();
  }

}
