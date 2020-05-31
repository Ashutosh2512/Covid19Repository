export class AuthenticationResponse{
    private jwt: string;
    private role: string;
    private expireDate: Date;

    constructor(jwt: string,role: string,expiredate: Date){
        this.jwt = jwt;
        this.role = role;
        this.expireDate = expiredate;
    }
    get _jwt(){
        return this.jwt;
    }
    get _role(){
        return this.role;
    }
    get _expireDate(){
        return this.expireDate;
    }
}