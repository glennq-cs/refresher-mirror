import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Login } from 'src/app/model/login.model';
import { GlobalService } from 'src/app/services/global.service';
import { LoginAuth } from 'src/app/states/auth.actions';
import { __decorate } from 'tslib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged: any;
  loginForm: any;

  login: Login = {
    username: '',
    password: ''
  }

  constructor(
    private _store: Store,
    private _globalService: GlobalService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.isLogged = this._globalService.getLogStatus();

    if (this.isLogged) {
      this._router.navigate(['/'])
    }

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onLogin(): void {
    if (this.loginForm) {
      let ctr = 0;
      let ectr = 0;

      this.login = Object.assign({}, this.loginForm.value);
      this._store.dispatch( new LoginAuth(this.login, {}) );
      this._store.subscribe((status: any) => {

        if (status.auth.logged == true) {
          ++ctr;
        } else {
          if (status.auth.error && ectr === 1) {
            console.log('Invalid username or password');
            ++ectr;
          }
          ++ectr;
        }

        if (ctr === 1) {
          console.log('Success');
          this._router.navigate(['/']);          
        }
      });
    } else {
      console.log('Invalid Form');
    }
  } 
}
