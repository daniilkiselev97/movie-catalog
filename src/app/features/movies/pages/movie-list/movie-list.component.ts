import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/movies.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  public allMovies: Movie[] = [];
  public movies: Movie[] = []
  public search = new FormControl('')
  public selectedMovie: Movie | null = null;
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(data => {
      this.allMovies = data
      this.movies = data
    })
    this.search.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      const term = value?.trim().toLowerCase();
      this.movies = term ? this.allMovies.filter(m => m.title.toLowerCase().includes(term)) : this.allMovies
    })
  }

  public openModal(movie: Movie) {
    this.selectedMovie = movie;
  }

  public closeModal() {
    this.selectedMovie = null;
  }
}
