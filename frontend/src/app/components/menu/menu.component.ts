import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() username: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  logout(): void {
    this.auth.logout();
  }

}
