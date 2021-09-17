import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Paciente } from '../models/paciente';
import { Login } from '../models/login';
import { Medico } from '../models/medico';
import { MedicoPacienteId } from '../models/medicopacienteId';

const httpOption = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class PacienteService {
   
  serverUrl = 'https://localhost:44372/pacientes'

  constructor(private http: HttpClient) { }

  registerPaciente(paciente: Paciente) : Observable<Paciente> {
    return this.http.post<Paciente>(this.serverUrl, paciente, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  login(loginData: Login) {
    return this.http.post<any>(`${this.serverUrl}/login`, loginData)
      .pipe(map(user => {
        localStorage.setItem("paciente", JSON.stringify(user));
        return user;
      }))
  }

  addMedico(medicoPacienteId: MedicoPacienteId) {
    return this.http.post<any>(`${this.serverUrl}/medico`, medicoPacienteId)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMedicosPaciente(id: number) {
    return this.http.get<Medico[]>(`${this.serverUrl}/medicos/${id}`, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMedicosNotPaciente(id: number) {
    return this.http.get<Medico[]>(`${this.serverUrl}/notmedicos/${id}`, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
