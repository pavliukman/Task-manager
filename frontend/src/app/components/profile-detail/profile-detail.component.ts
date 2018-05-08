import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
    selector: 'app-profile-detail',
    templateUrl: './profile-detail.component.html',
    styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
    user: User;

    constructor(private userService: UserService) { }

    ngOnInit() {

        this.userService.getUser().subscribe(user => {
            let userObj = user['user'];
            localStorage.setItem('user', JSON.stringify(user['user']));
            this.user.name = userObj['first_name'];
        });
    }

}
