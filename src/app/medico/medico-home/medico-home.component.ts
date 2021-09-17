import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico-home',
  templateUrl: './medico-home.component.html',
  styleUrls: ['./medico-home.component.css']
})
export class MedicoHomeComponent implements OnInit {

  medico: Medico;

  constructor(private router: Router) {
    this.medico = JSON.parse(localStorage.getItem('medico'));
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['medico']);
  }

  verCitas() {
    this.router.navigate(['medico/ver-citas']);
  }

  verPacientes() {
    this.router.navigate(['medico/ver-pacientes']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
