import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { UsersComponent } from './pages/users/users.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthState } from './states/auth.state';

import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CategoriesComponent,
    TicketsComponent,
    UsersComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      AuthState,
    ]),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
