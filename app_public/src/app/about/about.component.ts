import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  // standalone: true,
  // imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public pageContent = {
    header: {
      title: 'About Loc8r',
      strapline: ''
    },
    content: 'Loc8r was created to help people find places to sit \
      down and get a bit of work done. \n\nLorem ipsum dolor sit amat, \
      consectetur adipiscing elit.'
  }
  
}
