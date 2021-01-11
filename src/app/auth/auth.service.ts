import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface usernameAvailableResponse {
  availble: boolean
}

interface SignupCredentials {
  username: string,
  password: string,
  passwordConfirmation: string
}

interface SigninCredentials {
  username: string,
  password: string
}

interface SignupResponse {
  username: string
}

interface SignedinResponse {
  authenticated: boolean,
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<usernameAvailableResponse
    >(`${this.rootUrl}/auth/username`, {
      username
    })
  }

  signin(credentials: SigninCredentials) {
    return this.http.post<any>(`${this.rootUrl}/auth/signin`,
      credentials
    ).pipe(tap(() => {
      this.signedin$.next(true);
    }))
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`,
      credentials
    ).pipe(tap(() => {
      this.signedin$.next(true);
    }))
  }

  checkAuth() {
    return this.http.get<SignedinResponse>(`${this.rootUrl}/auth/signedin`).pipe(
      tap(({ authenticated }) => {
        this.signedin$.next(authenticated);
      })
    )
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {})
      .pipe(tap(() => {
        this.signedin$.next(false);
      }))
  }
}
