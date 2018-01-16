import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;

  constructor(public auth: AuthService){}

  ngOnInit() {
    if(this.auth.getToken() !== '') {
      this.getUser();
    }
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  setProfileData(user): void {
    this.user = user;
  }

  logout() {
    this.auth.logout();
  }
}
