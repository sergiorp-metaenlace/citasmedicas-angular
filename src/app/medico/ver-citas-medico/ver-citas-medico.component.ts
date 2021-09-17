import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medico } from '../../models/medico';
import { Cita } from '../../models/cita';
import { CitaService } from '../../services/cita.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-ver-citas-medico',
  templateUrl: './ver-citas-medico.component.html',
  styleUrls: ['./ver-citas-medico.component.css']
})
export class VerCitasMedicoComponent implements OnInit {

  medico: Medico;
  citas: Cita[];

  constructor(
    private router: Router,
    private citaService: CitaService
  ) {
    this.medico = JSON.parse(localStorage.getItem('medico'));
  }

  ngOnInit() {
    this.loadAllCitas();
  }

  loadAllCitas() {
    this.citaService.getCitasMedico(this.medico.id)
      .pipe(first())
      .subscribe(citas => this.citas = citas);
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
