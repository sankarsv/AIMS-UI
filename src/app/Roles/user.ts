import { Role } from "./roles";

export class User {
    password: string;
    userId: number;
    role: Role;
    token?: string;
    constructor(){
        
    }
}