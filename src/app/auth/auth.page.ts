import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading: boolean = false;
  isLogin = true;
  constructor(
    private authservice: AuthService,
    private router: Router,
    private loadingctrl: LoadingController,
    private alrtCtrl: AlertController,
    private storage: Storage
  ) {}

  ngOnInit() {}

  onLogin(email: string, password: string) {
    // console.log('value', value);
    this.isLoading = true;
    this.loadingctrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then((loadingEl) => {
        loadingEl.present();
        let authobs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authobs = this.authservice.login(email, password);
        } else {
          authobs = this.authservice.signup(email, password);
        }
        authobs.subscribe(
          (res) => {
            console.log('response==============>>>>>', res);
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/places/search');
          },
          (errorRes) => {
            loadingEl.dismiss();
            const code = errorRes.error.error.message;
            let message = 'could not sign you up, please try again later!';
            if (code === 'EMAIL_EXISTS') {
              message = 'This Email exists already!';
            } else if (code == 'EMAIL_NOT_FOUND') {
              message = 'E-mail adress could not be found';
            } else if (code == 'INVALID_PASSWORD') {
              message = 'incorrect password';
            }
            this.showAlert(message);
          }
        );
      });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);

    this.onLogin(email, password);
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  private showAlert(message: string) {
    this.alrtCtrl
      .create({
        header: 'Login Failed',
        message: message,
        buttons: ['Okay'],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
