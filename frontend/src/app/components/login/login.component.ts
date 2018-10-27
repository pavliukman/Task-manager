import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	user: User = new User();
	errorMsg: string;

	constructor(private auth: AuthService,
		private router: Router,
		public snackBar: MatSnackBar) { }

	ngOnInit() {
		this.auth.isLoggedIn().subscribe(user => {
			if (user.token) {
				this.router.navigate(['profile']);
			}
		});
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}

	onLogin() {
		this.auth.login(this.user).subscribe(
			user => {
				localStorage.setItem('user', JSON.stringify(user.user));
				localStorage.setItem('token', user.token);
				this.router.navigate(['']);
			},
			error => {
				this.errorMsg = 'Username or password not correct, try again.';
				this.openSnackBar(this.errorMsg, '');
			});
		return true;
	}
}
