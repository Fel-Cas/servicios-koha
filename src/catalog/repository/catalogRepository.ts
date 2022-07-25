import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable()
export class CatalogRepository {
    constructor(
        @InjectDataSource()
        private readonly connection: DataSource
    ){}

    async getBooksByName(book: string){
        return await this.connection.query(`SELECT * FROM koha.biblio WHERE title LIKE '%${book}%';`);
    }
}