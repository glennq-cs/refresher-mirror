import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Refresher';

  isLogged: any;

  constructor(
    private _store: Store,
    private _router: Router
  ) { };

  ngOnInit(): void {
    this._store.subscribe((status: any) => {
        this.isLogged = status.auth.logged;
        if (status.auth.logged === false) {
            this._router.navigate(['/login']);
        }
      }
    );
  }
}

