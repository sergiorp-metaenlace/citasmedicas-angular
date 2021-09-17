import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicoService } from '../services/medico.service';
import { PacienteService } from '../services/paciente.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  paciente: boolean;
  submitted = false;
  registerFormPaciente: FormGroup;
  registerFormMedico: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private medicoService: MedicoService,
    private pacienteService: PacienteService
  )
  {}

  ngOnInit() {
    this.paciente = this.route.snapshot.params['paciente'] == "true";

    this.registerFormPaciente = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      user: ['', Validators.required],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      nss: ['', Validators.required],
      numTarjeta: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required]
    });

    this.registerFormMedico = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      user: ['', Validators.required],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      numColegiado: ['', Validators.required]
    });
  }
  goHome() {
    this.router.navigate(['']);
  }

  onSubmit() {
    this.submitted = true;

    if (this.paciente) {

      if (this.registerFormPaciente.invalid) {
        return;
      }

      this.pacienteService.registerPaciente(this.registerFormPaciente.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/']);
          },
          error => {

          }
      );

    } else {

      if (this.registerFormMedico.invalid) {
        return;
      }

      this.medicoService.registerMedico(this.registerFormMedico.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/']);
          },
          error => {

          }
      );
    }
  }
}
