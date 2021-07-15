import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AuthService } from '../services/auth.service';
import { LoginAuth, SetToken, ClearAuth, GetLogged } from './auth.actions';
import { AuthStateModel } from '../model/auth.model';

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        auth: '',
        token: '',
        logged: false,
        error: ''
    }
})
@Injectable()
export class AuthState {
    constructor(private _authService: AuthService) {}

    @Selector()
    static auth(state: AuthStateModel): any {
        return state.auth;
    }

    @Selector()
    static token(state: AuthStateModel): any {
        return state.token;
    }

    @Selector()
    static logged(state: AuthStateModel): any {
        return state.logged;
    }

    @Selector()
    static error(state: AuthStateModel): any {
        return state.error;
    }

    @Action(LoginAuth, { cancelUncompleted: true })
    loginAuth({ patchState, dispatch }: StateContext<AuthStateModel>, { auth }: LoginAuth): void {
        this._authService.login(auth).subscribe(
            (response: any) => {
                console.log(response);
                if (response.code === 'success') {
                    patchState({ logged: true });
                    dispatch( new SetToken(response.access_token) );
                }
            },

            (response: any) => {
                if (response.error) {
                    const error = response.error;
                    error.code = response.code;
                    console.log(response.error);
                    patchState({ error: response.error });
                }
            }
        );
    }

    @Action(ClearAuth)
    clearAuth({ patchState }: StateContext<AuthStateModel>, {}: LoginAuth): void {
        
        localStorage.removeItem('token');
        
        patchState({ logged: false });

    };

    @Action(SetToken)
    setToken({ patchState }: StateContext<AuthStateModel>, { token }: SetToken): void {
        
        patchState({ token });

        localStorage.setItem('token', token);
    }

    @Action(GetLogged)
    getLogged({ patchState }: StateContext<AuthStateModel>, {}: GetLogged): void {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            patchState({ token: storedToken, logged: true });
        }
    }
}