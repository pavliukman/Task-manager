import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user';
import { error } from 'selenium-webdriver';
import { DataService } from './services/data.service';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user: User;
  isUserLoggedIn: boolean;

  constructor(public auth: AuthService, public data: DataService){}

  ngOnInit() {
    this.isUserLoggedIn = false;
    if(this.auth.getToken() !== '') {
      this.getUser();
      this.isUserLoggedIn = true;
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
