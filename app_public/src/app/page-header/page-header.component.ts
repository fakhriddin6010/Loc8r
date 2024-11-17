import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  // standalone: true,
  // imports: [],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})

export class PageHeaderComponent implements OnInit {

  @Input() content: any ;

  constructor() { }

  ngOnInit(): void {
  }

}