export class User{
    name: string;
    password: string;
    username: string;
    emailId: string;
    nationalId: string;
    gender: string;
    age: number;
    address: string;
    score: number;
    role: string;
    constructor(name: string, password: string, username: string, emailId: string,nationalId: string,gender: string,age: number, address: string, score: number, role: string){
        this.address = address;
        this.age = age;
        this.emailId = emailId;
        this.name = name;
        this.password = password;
        this.username = username;
        this.score = score;
        this.role = role;
        this.nationalId = nationalId;
        this.gender = gender;
    }
}