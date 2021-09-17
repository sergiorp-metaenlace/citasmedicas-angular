import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Medico } from '../models/medico';
import { catchError, map } from 'rxjs/operators';
import { Login } from '../models/login';
import { Paciente } from '../models/paciente';

const httpOption = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  serverUrl = 'https://localhost:44372/medicos'

  constructor(private http: HttpClient) { }

  registerMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(this.serverUrl, medico, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  login(loginData: Login) {
    return this.http.post<any>(`${this.serverUrl}/login`, loginData)
      .pipe(map(user => {
        localStorage.setItem("medico", JSON.stringify(user));
        return user;
      }))
  }

  getPacientesMedico(id: number) {
    return this.http.get<Paciente[]>(`${this.serverUrl}/pacientes/${id}`, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllMedicos() {
    return this.http.get<Medico[]>(this.serverUrl, httpOption)
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
