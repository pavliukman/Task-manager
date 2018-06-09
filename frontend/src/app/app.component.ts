import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user';
import { error } from 'selenium-webdriver';
import { DataService } from './services/data.service';
import { MenuComponent } from './components/menu/menu.component';
import { UserService } from './services/user.service';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	user: User;
	isUserLoggedIn: boolean;

	constructor(public auth: AuthService,
		public data: DataService,
		public userService: UserService) { }

	ngOnInit() { }

	logout() {
		this.auth.logout();
	}
}
