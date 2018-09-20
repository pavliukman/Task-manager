import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-profile-detail',
    templateUrl: './profile-detail.component.html',
    styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
    user: User = new User();

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getUser().subscribe(user => {
            this.user = user['user'];
        });
    }

}
