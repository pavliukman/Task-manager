import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router, 
    private authService: AuthService,
    private data: DataService) {}

  canActivate() {
    if (this.authService.getToken() == '') {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}