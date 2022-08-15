import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable()
export class CatalogRepository {
    constructor(
        @InjectDataSource()
        private readonly connection: DataSource
    ){}

    async getBooksByName(book: String){
        return await this.connection.query(`select title as titulo, author as autor, bitm.isbn, bitm.publicationyear  from biblio bi 
        inner join biblioitems bitm on bi.biblionumber=bitm.biblioitemnumber
        where bi.title like '%${book}%' or bi.author like '%${book}%';   `);
    }

    async getBookByISBN(isbn:String){
        return await this.connection.query(`select title as titulo, author as autor, abstract as resumen, bitm.editionstatement  as edicion,i.barcode, i.onloan as fecha_prestamo  from biblio bi inner join biblioitems bitm on bi.biblionumber=bitm.biblionumber 
        inner join items i on i.biblioitemnumber=bitm.biblioitemnumber
        where bitm.isbn=${isbn}; `);
    }
}