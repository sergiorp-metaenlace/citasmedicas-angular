import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente';
import { Router } from '@angular/router';
import { Cita } from '../../models/cita';
import { CitaService } from '../../services/cita.service';
import { first } from 'rxjs/operators';
import { Medico } from '../../models/medico';

@Component({
  selector: 'app-ver-citas-paciente',
  templateUrl: './ver-citas-paciente.component.html',
  styleUrls: ['./ver-citas-paciente.component.css']
})
export class VerCitasPacienteComponent implements OnInit {

  paciente: Paciente;
  citas: Cita[];
  medicos: Medico[];
  constructor(
    private router: Router,
    private citaService: CitaService
  ) {
    this.paciente = JSON.parse(localStorage.getItem('paciente'));
  }

  ngOnInit() {
    this.loadAllCitas();
  }


  loadAllCitas() {
    this.citaService.getCitasPaciente(this.paciente.id)
      .pipe(first())
      .subscribe(citas => this.citas = citas);
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
