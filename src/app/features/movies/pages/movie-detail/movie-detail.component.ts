import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Movie } from 'src/app/movies.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent {

  @Input() movie!: Movie;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
