import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PacienteHomeComponent } from './paciente/paciente-home/paciente-home.component';
import { MedicoHomeComponent } from './medico/medico-home/medico-home.component';
import { CrearCitaComponent } from './paciente/crear-cita/crear-cita.component';
import { VerMedicosComponent } from './paciente/ver-medicos/ver-medicos.component';
import { VerCitasMedicoComponent } from './medico/ver-citas-medico/ver-citas-medico.component';
import { VerPacientesComponent } from './medico/ver-pacientes/ver-pacientes.component';
import { VerCitasPacienteComponent } from './paciente/ver-citas-paciente/ver-citas-paciente.component';
import { NewMedicoComponent } from './paciente/new-medico/new-medico.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    PacienteHomeComponent,
    MedicoHomeComponent,
    CrearCitaComponent,
    VerMedicosComponent,
    VerCitasMedicoComponent,
    VerPacientesComponent,
    VerCitasPacienteComponent,
    NewMedicoComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'paciente', component: PacienteHomeComponent},
      { path: 'medico', component: MedicoHomeComponent },
      { path: 'paciente/ver-citas', component: VerCitasPacienteComponent },
      { path: 'paciente/crear-cita', component: CrearCitaComponent },
      { path: 'paciente/ver-medicos', component: VerMedicosComponent },
      { path: 'paciente/new-medico', component: NewMedicoComponent },
      { path: 'medico/ver-citas', component: VerCitasMedicoComponent },
      { path: 'medico/ver-pacientes', component: VerPacientesComponent },

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
