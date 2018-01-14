import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(private auth: AuthService, private router: Router, private app: AppComponent) { }

  ngOnInit() {
  }

  onLogin(): void {
    this.auth.login(this.user)
    .subscribe(user => {
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user.user));
      this.router.navigateByUrl('/profile');
    });
  }
}
