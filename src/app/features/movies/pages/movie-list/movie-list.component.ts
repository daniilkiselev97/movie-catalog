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
  public movies: Movie[] = []
  public search = new FormControl('')
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data
    })
    this.search.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.movies = this.movies.filter(m => {
        m.title.toLowerCase().includes(value!.toLowerCase())
      })
    })
  }
}
