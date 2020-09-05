import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-central',
  templateUrl: './central.page.html',
  styleUrls: ['./central.page.scss'],
})
export class CentralPage implements OnInit {

  serv: ControlService = this.ctrlService;

  constructor(
    private ctrlService: ControlService,
  ) { }

  ngOnInit() {
  }

  disabled(){
    this.serv.showToast('Esta opcion aún no esta disponible por el momento, seguiremoe trabajando.')
  }

}
