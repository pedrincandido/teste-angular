export class UserViewModel {
    login: string;
    password: string;


    constructor(u: any) {
        this.login = u.login ? u.loing : null;
        this.password = u.password ? u.password : null;
    }
}
