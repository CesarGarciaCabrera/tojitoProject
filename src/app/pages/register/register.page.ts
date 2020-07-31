import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as Usuario
  serv: ControlService = this.ctrlService;

  constructor(
    private ctrlService: ControlService
  ) { }

  ngOnInit() {
  }

  registro(){
    this.serv.registro(this.user);
  }



}
