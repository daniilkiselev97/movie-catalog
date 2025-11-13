import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/movies.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  public search = new FormControl('');
  public movies$ = this.movieService.getMovies().pipe(
    switchMap(allMovies =>
      this.search.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        map(value => {
          const term = value?.trim().toLowerCase() || '';
          return term
            ? allMovies.filter(m => m.title.toLowerCase().includes(term))
            : allMovies;
        })
      )
    )
  );

  public selectedMovie: Movie | null = null;

  constructor(private movieService: MovieService) { }

  public openModal(movie: Movie) {
    this.selectedMovie = movie;
  }

  public closeModal() {
    this.selectedMovie = null;
  }
}
