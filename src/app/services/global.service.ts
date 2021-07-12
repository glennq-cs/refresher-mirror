import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetLogged } from '../states/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private logged: any;

  constructor(
    private _store: Store
  ) { 
    this.logged = false;
  }

  getToken(): string {
    const token = localStorage.getItem('token') || '';
    return token;
  }

  getLogStatus(): void {
    this._store.dispatch(new GetLogged)
      .subscribe((status: any) => {
        this.logged = status.auth.logged;
      });

      return this.logged;
  }
}
