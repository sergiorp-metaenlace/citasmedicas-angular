import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  logged: boolean;
  chosenRol: boolean;
  rolPaciente: boolean;

  constructor(private router: Router) {
    this.logged = false;
    this.chosenRol = false;
    this.rolPaciente = true;
  }

  ngOnInit() {
  }

  goLogin() {
    this.router.navigate(['login', { paciente: this.rolPaciente }]);
  }

  goRegister() {
    this.router.navigate(['register', { paciente: this.rolPaciente }]);
  }

  chooseRol(rolPaciente: boolean) {
    this.rolPaciente = rolPaciente;
    this.chosenRol = true;
  }

}
