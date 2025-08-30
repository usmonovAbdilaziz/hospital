import { Injectable } from "@nestjs/common";
import { hash,compare } from "bcrypt";

@Injectable()
export class CryuptoServise{
    async encrypt(data:string){
        const hashed = await hash(data,10)
        return hashed
    }
    async decrypt(data:string,hashedData:string){
        return await compare(data,hashedData)
    }
}