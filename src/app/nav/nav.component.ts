import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GlobalService } from '../services/global.service';
import { ClearAuth } from '../states/auth.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogged: any;

  constructor(
    private _store: Store,
    private _globalService: GlobalService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.isLogged = this._globalService.getLogStatus();
    console.log(this.isLogged);
  }

  onLogout(): void {
    this._store.dispatch(new ClearAuth());
    this._store.subscribe((response: any) => {
      if (response.auth.logged === false) {
        this._router.navigate(['/login']);
        this.isLogged = false;
      }
    });
  }

}
