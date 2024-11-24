import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  // standalone: true,
  // imports: [],
  templateUrl: './rating-stars.component.html',
  styleUrl: './rating-stars.component.css'
})
export class RatingStarsComponent implements OnInit {

  @Input() rating: number = 0;
  constructor() { }

  ngOnInit(): void {
  }
}

