import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  // standalone: true,
  // imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  @Input() content: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}

