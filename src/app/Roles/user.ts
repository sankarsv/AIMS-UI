import { Role } from "./roles";

export class User {
    password: string;
    userid: number;
    role: Role;
    token?: string;
    constructor(){
        
    }
}