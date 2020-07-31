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

  constructor(
    private ctrlService: ControlService
  ) { }

  ngOnInit() {
  }

  entrar(){
    this.serv.login(this.user);
  }

}
