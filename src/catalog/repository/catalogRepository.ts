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
        return await this.connection.query(`select title as titulo, author as autor, bitm.isbn, bitm.publicationyear  from biblio bi 
        inner join biblioitems bitm on bi.biblionumber=bitm.biblioitemnumber
        where bi.title like '%${book}%' or bi.author like '%${book}%';   `);
    }
}