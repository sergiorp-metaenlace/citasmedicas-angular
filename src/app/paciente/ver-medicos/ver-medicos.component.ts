import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from '../../models/paciente';
import { MedicoService } from '../../services/medico.service';
import { first } from 'rxjs/operators';
import { Medico } from '../../models/medico';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-ver-medicos',
  templateUrl: './ver-medicos.component.html',
  styleUrls: ['./ver-medicos.component.css']
})
export class VerMedicosComponent implements OnInit {

  paciente: Paciente;
  medicos: Medico[];

  constructor(
    private router: Router,
    private pacService: PacienteService
    )
  {
    this.paciente = JSON.parse(localStorage.getItem('paciente'));
  }

  ngOnInit() {
    this.loadAllMedicos();
  }

  loadAllMedicos() {
    this.pacService.getMedicosPaciente(this.paciente.id)
      .pipe(first())
      .subscribe(medicos => this.medicos = medicos);
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
