import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface usernameAvailableResponse {
  availble: boolean
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<usernameAvailableResponse
     >('https://api.angular-email.com/auth/username', {
      username
    })
  }
}
