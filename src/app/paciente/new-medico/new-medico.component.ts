import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { Router } from '@angular/router';
import { Medico } from '../../models/medico';
import { Paciente } from '../../models/paciente';
import { first } from 'rxjs/operators';
import { MedicoService } from '../../services/medico.service';
import { MedicoPacienteId } from '../../models/medicopacienteId';

@Component({
  selector: 'app-new-medico',
  templateUrl: './new-medico.component.html',
  styleUrls: ['./new-medico.component.css']
})
export class NewMedicoComponent implements OnInit {

  paciente: Paciente;
  medicos: Medico[];


  constructor(
    private router: Router,
    private medService: MedicoService,
    private pacService: PacienteService
  ) {
    this.paciente = JSON.parse(localStorage.getItem('paciente'));
  }

  ngOnInit() {
    this.loadAllMedicos();


  }

  loadAllMedicos() {
    this.pacService.getMedicosNotPaciente(this.paciente.id)
      .pipe(first())
      .subscribe(medicos => this.medicos = medicos);
  }


  addMedico(med: Medico) {
    var medicoPacienteId: MedicoPacienteId = new MedicoPacienteId(med.id, this.paciente.id);

    this.pacService.addMedico(medicoPacienteId)
      .pipe(first())
      .subscribe(
        data => {
          this.loadAllMedicos();
        },
        error => {

        }
      );
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
