import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, tap } from 'rxjs';
import { User } from './user.model';
import { Storage } from '@ionic/storage-angular';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.create();
  }
  private _user = new BehaviorSubject<User>(null);

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  // get userId() {
  //   return this._user.asObservable().pipe(
  //     map((user) => {
  //       if (user) {
  //         return user.id;
  //       } else {
  //         return false;
  //       }
  //     })
  //   );
  // }

  autoLogin() {
    return from(this.storage.get('authData')).pipe(
      map((storedData) => {
        const parsedData = JSON.parse(storedData) as {
          token: string;
          tokenExpirationDate: string;
          email: string;
        };

        if (!parsedData) {
          return null;
        }

        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const user = new User(
          parsedData.email,
          parsedData.token,
          expirationTime
        );
        return user;
      }),
      tap((user) => {
        if (user) {
          this._user.next(user);
        }
      }),
      map((user) => {
        return !!user;
      })
    );
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhJq5QOL4XXM_Rc_8Cwq4j-4Q3r7Avs5U',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhJq5QOL4XXM_Rc_8Cwq4j-4Q3r7Avs5U',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    this._user.next(null);
    this.storage.clear();
  }

  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );

    this._user.next(new User(userData.email, userData.idToken, expirationTime));
    this.storeAuthData(
      userData.email,
      userData.idToken,
      expirationTime.toISOString()
    );
  }

  private storeAuthData(
    email: string,
    token: string,
    tokenExpirationDate: string
  ) {
    const data = JSON.stringify({
      email: email,
      token: token,
      tokenExpirationDate: tokenExpirationDate,
    });
    this.storage.set('authData', data);
  }
}
