import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Movie } from 'src/app/movies.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private _baseUrl = 'http://localhost:3333/movies'

  constructor(private _http: HttpClient) { }

  public getMovies(): Observable<Movie[]> {
    return this._http.get<Movie[]>(this._baseUrl).pipe(
      catchError(err => {
        console.error('Ошибка загрузки фильмов:', err)
        throw err
      })
    )
  }

  public getMovie(id: number): Observable<Movie> {
    return this._http.get<Movie>(`${this._baseUrl}/${id}`)
  }
}
