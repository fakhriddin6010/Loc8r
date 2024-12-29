import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-framework',
  // standalone: true,
  // imports: [],
  templateUrl: './framework.component.html',
  styleUrl: './framework.component.css'
})
export class FrameworkComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private historyService: HistoryService
  ) {}

  ngOnInit() {}

  public doLogout(): void {
    this.authenticationService.logout();
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public getUsername(): string {
    const user: User = this.authenticationService.getCurrentUser();
    return user ? user.name : 'Guest';
  }
}

