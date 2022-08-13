import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

@Injectable()
export class UserRepository{
    constructor(
       /**
        * @InjectEntityManager()
        private readonly connection: EntityManager
        */       
         
        @InjectDataSource()
        private readonly connection: DataSource
    ){
        
    }

   async getById(id:number){
        return  this.connection
        .query(`SELECT borrowernumber,cardnumber,firstname,surname,email,phone,mobile FROM borrowers2 WHERE cardnumber=${id};`);
    }
}