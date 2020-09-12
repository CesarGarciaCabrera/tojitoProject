import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-configpass',
  templateUrl: './configpass.page.html',
  styleUrls: ['./configpass.page.scss'],
})
export class ConfigpassPage implements OnInit {

  passw1: string
  passw2: string
  passw3: string

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async cancel(){
    this.modalCtrl.dismiss()
  }

}
