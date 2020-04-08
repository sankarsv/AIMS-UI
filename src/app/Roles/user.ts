import { Role } from "./roles";

export class User {
    userName: string;
    id: number;
    role: Role;
    token?: string;
    constructor(){
        
    }
}