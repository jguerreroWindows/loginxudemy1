import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private baseUrl = 'http://localhost:8090/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password }).pipe(
      tap(response => {
        console.log('Respuesta del servicio: ', response);
      }),
      map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          return response;
        } else {
          throw new Error('No hay token para el acceso');
        }
      }),
      catchError(error => {
        console.log('Error en la solicitud', error);
        return throwError(() => error);
      })
    );
  }


  register(username:string,password:string):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/registro`, { username, password }).pipe(
      catchError(this.handleError)
    )
  }

  getToken():string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated():boolean{
    const token = this.getToken();
    return !!token;
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }





  // cartel de errores
  handleError(error:any){
    console.error('Error en la solicitud: ', error)
    return throwError(()=>error);
  }































}