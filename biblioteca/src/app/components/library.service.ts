import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = 'http://localhost:3000/api/libraries';

  constructor(private http: HttpClient) {}

  getAllLibraries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener las bibliotecas:', error);
        return throwError(() => new Error('Error al obtener las bibliotecas'));
      })
    );
  }

  getLibraryById(idLibrary: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idLibrary}`).pipe(
      catchError(error => {
        console.error('Error al obtener la biblioteca:', error);
        return throwError(() => new Error('Error al obtener la biblioteca'));
      })
    );
  }  

  getLibraryByEmail(correo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/correo/${correo}`).pipe(
      catchError((error) => {
        console.error('Error al obtener la biblioteca por correo:', error);
        return throwError(() => new Error('Error al obtener la biblioteca por correo'));
      })
    );
  }

  getLibrariesByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`).pipe(
      catchError((error) => {
        console.error('Error al obtener las bibliotecas del usuario:', error);
        return throwError(() => new Error('Error al obtener las bibliotecas del usuario'));
      })
    );
  }

  addLibrary(library: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, library).pipe(
      catchError((error) => {
        if (error.status === 400 && error.error.message === 'Usuario no encontrado con ese correo') {
          return throwError(() => new Error('Correo no registrado'));
        }
        console.error('Error al crear la biblioteca:', error);
        return throwError(() => new Error('Error al crear la biblioteca'));
      })
    );
  }

  updateLibrary(id: number, libraryData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, libraryData).pipe(
      catchError((error) => {
        console.error('Error al actualizar la biblioteca:', error);
        return throwError(() => new Error('Error al actualizar la biblioteca'));
      })
    );
  }

  deleteLibrary(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar la biblioteca:', error);
        return throwError(() => new Error('Error al eliminar la biblioteca'));
      })
    );
  }
}
