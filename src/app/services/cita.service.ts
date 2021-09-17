import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Cita } from '../models/cita';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const httpOption = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  serverUrl = 'https://localhost:44372/citas'

  constructor(private http: HttpClient) { }

  addCita(cita: Cita) {
    return this.http.post<Cita>(this.serverUrl, cita, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }
  getCitasPaciente(id: number) {
    return this.http.get<Cita[]>(`${this.serverUrl}/paciente/${id}`, httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCitasMedico(id: number) {
    return this.http.get<Cita[]>(`${this.serverUrl}/medico/${id}`, httpOption)
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
