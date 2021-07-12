export class LoginAuth {
    static readonly type = '[Auth] Login Auth';
    constructor(public auth: any, public data: any) {}
}

export class ClearAuth {
    static readonly type = '[Auth] Clear Auth';
    constructor() {}
}

export class GetLogged {
    static readonly type ='[Auth] Get Logged';
    constructor() {}
}

export class SetToken {
    static readonly type = '[Auth] Set Token';
    constructor(public token: string) {}
}