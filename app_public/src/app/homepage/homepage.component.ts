import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  // standalone: true,
  // imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})

export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public pageContent = {
    header:{
      title: 'Loc8r',
      strapline:'Find places to work with wifi near you!'
    },
    sidebar: 'Looking for wifi and a seat? Loc8r helps you\
    find places to work when out and about. Perhaps with coffee,\
    cake or a pint? Let Loc8r help you find the place you\'re looking for.'
  }
}

