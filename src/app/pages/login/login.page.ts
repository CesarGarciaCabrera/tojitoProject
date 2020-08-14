import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as Usuario;
  serv: ControlService = this.ctrlService;
  r: boolean = false;
  opc: string;

  constructor(
    private ctrlService: ControlService
  ) { }

  ngOnInit() {
    this.changeScreen();
  }

  entrar(){
    this.serv.login(this.user);
  }

  registro(){
    this.serv.registro(this.user);
  }

  changeScreen(){
    if (this.r) {
      this.r = false;
      this.opc = 'Ya tengo una cuenta.';
    }
    else {
      this.r = true;
      this.opc = '¿No tienes cuenta? Crea una.'
    }
  }

}
