import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	profileTitle: string = 'ProfileComponent';
	subscription: Subscription;

	constructor() { }

	ngOnInit() { }

}
