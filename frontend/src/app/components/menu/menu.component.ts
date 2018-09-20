import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
	@ViewChild('sidenav') sidenav: MatSidenav;
	userName: String;
	id: String;
	menuCollapse: Boolean = true;
	toolbarTitle: any = 'Projects';

	constructor(private auth: AuthService,
		private user: UserService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private titleService: Title) { }

	ngOnInit() {
		// set user data in menu
		let user = this.user.getUserLocal();
		this.userName = user['first_name'] + ' ' + user['last_name'] || '';
		this.id = user['username'];

		// change toolbar title by router events
		this.router.events
			.filter((event) => event instanceof NavigationEnd)
			.map(() => this.activatedRoute)
			.map((route) => {
				while (route.firstChild) route = route.firstChild;
				return route;
			})
			.filter((route) => route.outlet === 'primary')
			.mergeMap((route) => route.data)
			.subscribe((data) => {
				let title = data.title;
				this.titleService.setTitle(title);
				this.toolbarTitle = title || 'Task manager';
			});
	}

	collapseMenu() {
		this.menuCollapse = !this.menuCollapse;
	}

	sidenavClose() {
		this.sidenav.close();
	}

	sidenavOpen() {
		this.sidenav.open();
	}

	logout(): void {
		this.auth.logout();
	}
}
