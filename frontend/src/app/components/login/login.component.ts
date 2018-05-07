import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { AppComponent } from '../../app.component';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: User = new User();

    constructor(private auth: AuthService,
        private router: Router,
        private app: AppComponent,
        private route: ActivatedRoute) { }

    ngOnInit() {
    }

    onLogin() {
        this.auth.login(this.user)
            .subscribe(user => {
                localStorage.setItem('user', JSON.stringify(user.user));
                localStorage.setItem('token', user.token);
                this.router.navigate(['../profile']);
            });
        return true;
    }
}
