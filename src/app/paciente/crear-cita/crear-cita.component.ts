import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from '../../models/paciente';
import { Medico } from '../../models/medico';
import { PacienteService } from '../../services/paciente.service';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {

  paciente: Paciente;
  medicos: Medico[];
  crearCitaForm: FormGroup;

  constructor(private router: Router, private pacService: PacienteService, private formBuilder: FormBuilder, private citaService: CitaService) {
    this.paciente = JSON.parse(localStorage.getItem('paciente'));
  }

  ngOnInit() {
    this.loadAllMedicos();

    this.crearCitaForm = this.formBuilder.group({
      medico: ['', Validators.required],
      paciente: [''],
      motivoCita: ['', Validators.required],
      fechaHora: ['', Validators.required],
    });

    this.crearCitaForm.patchValue({
      paciente: this.paciente.id,
    });
  }

  loadAllMedicos() {
    this.pacService.getMedicosPaciente(this.paciente.id)
      .pipe(first())
      .subscribe(medicos => this.medicos = medicos);
  }

  addCita() {
    if (this.crearCitaForm.invalid) {
      return;
    }
    this.citaService.addCita(this.crearCitaForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.goHome();
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
