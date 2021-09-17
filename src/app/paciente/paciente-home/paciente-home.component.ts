import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente-home',
  templateUrl: './paciente-home.component.html',
  styleUrls: ['./paciente-home.component.css']
})
export class PacienteHomeComponent implements OnInit {

  paciente: Paciente;

  constructor(private router: Router)
  {
    this.paciente = JSON.parse(localStorage.getItem('paciente'));
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['paciente']);
  }

  crearCita() {
    this.router.navigate(['paciente/crear-cita']);
  }

  verCitas() {
    this.router.navigate(['paciente/ver-citas']);
  }

  verMedicos() {
    this.router.navigate(['paciente/ver-medicos']);
  }

  newMedico() {
    this.router.navigate(['paciente/new-medico']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
