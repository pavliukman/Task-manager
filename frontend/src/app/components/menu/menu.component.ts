import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    userName: String;
    id: String;

    constructor(private auth: AuthService, private user: UserService) { }

    ngOnInit() {
        let user = this.user.getUserLocal();
        this.userName = user['first_name'] + ' ' + user['last_name'] || '';
        this.id = user['username'];
    }

    logout(): void {
        this.auth.logout();
    }

}
