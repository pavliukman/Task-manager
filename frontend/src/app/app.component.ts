import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user';
import { DataService } from './services/data.service';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	user: User;

	constructor(public auth: AuthService,
		public data: DataService,
		private router: Router) {
		if (localStorage.getItem('token') === null) {
			this.router.navigate(['/login']);
			return;
		}
	}

	logout() {
		this.auth.logout();
	}
}
