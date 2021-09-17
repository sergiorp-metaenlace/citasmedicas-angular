import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MedicoService } from '../services/medico.service';
import { PacienteService } from '../services/paciente.service';
import { Login } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted: boolean;
  loginForm: FormGroup;
  paciente: boolean;
  loginData: Login;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private medicoService: MedicoService,
              private pacienteService: PacienteService) { }

  ngOnInit() {
    this.paciente = this.route.snapshot.params['paciente'] == "true";

    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  goHome() {
    this.router.navigate(['']);
    this.router.navigate(['']);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    
  

    if (this.paciente) {

      this.loginData = this.loginForm.value;

      this.pacienteService.login(this.loginData)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['paciente']);
          },
          error => {
            this.router.navigate(['/']);

          });
    }
    else
    {
      this.loginData = this.loginForm.value;

      this.medicoService.login(this.loginData)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['medico']);
          },
          error => {
            this.router.navigate(['/']);

          });
    }
  }
}
