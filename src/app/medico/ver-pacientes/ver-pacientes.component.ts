import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico';
import { Router } from '@angular/router';
import { Paciente } from '../../models/paciente';
import { MedicoService } from '../../services/medico.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-ver-pacientes',
  templateUrl: './ver-pacientes.component.html',
  styleUrls: ['./ver-pacientes.component.css']
})
export class VerPacientesComponent implements OnInit {

  medico: Medico;
  pacientes: Paciente[]

  constructor(
    private router: Router,
    private mecService: MedicoService
  )
  {
    this.medico = JSON.parse(localStorage.getItem('medico'));
  }

  ngOnInit() {
    this.loadPacientes();
  }

  loadPacientes() {
    this.mecService.getPacientesMedico(this.medico.id)
      .pipe(first())
      .subscribe(pacientes => this.pacientes = pacientes);
  }

  goHome() {
    this.router.navigate(['medico']);
  }

  verCitas() {
    this.router.navigate(['medico/ver-citas']);
  }

  verPacientess() {
    this.router.navigate(['medico/ver-pacientes']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
