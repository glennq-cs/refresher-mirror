import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AuthService } from '../services/auth.service';
import { LoginAuth, SetToken, ClearAuth, GetLogged } from "./auth.actions";