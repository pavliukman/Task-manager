import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  // api service url
  API_URL: string = 'http://localhost:8000';
  // api service url to request token
  API_URL_AUTH: string = this.API_URL + '/auth-jwt/';
  // api service url to verify token
  API_URL_VERIFY = this.API_URL + '/auth-jwt-verify/';

  constructor() { }

}
