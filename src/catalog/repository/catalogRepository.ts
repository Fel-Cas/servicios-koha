import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class CatalogRepository {
    constructor(
        @InjectDataSource()
        private readonly connection: DataSource
    ) {}

    async getBooksByName(book: String) {
        return await this.connection
            .query(`select title as titulo, author as autor, bitm.isbn, bitm.publicationyear, count(isbn) as cantidad  from biblio bi 
        inner join biblioitems bitm on bi.biblionumber=bitm.biblioitemnumber
        where bi.title like '%${book}%' or bi.author like '%${book}%' group by bitm.isbn ;    `);
    }

    async getBookByISBN(isbn: String) {
        return await this.connection
            .query(`select title as titulo, author as autor, abstract as resumen, bitm.editionstatement  as edicion,i.barcode, i.onloan as fecha_prestamo  from biblio bi inner join biblioitems bitm on bi.biblionumber=bitm.biblionumber 
        inner join items i on i.biblioitemnumber=bitm.biblioitemnumber
        where bitm.isbn=${isbn}; `);
    }

    async getHistoricalBorrowedBooks(cardnumber: number) {
        return await this.connection.query(`select b.title, b.author, b2.isbn, s.datetime  from statistics s 
        inner join items i on i.itemnumber = s.itemnumber 
        inner join biblioitems b2 on i.biblioitemnumber =b2.biblioitemnumber 
        inner join  biblio b on b.biblionumber = i.biblionumber
        inner join borrowers2 b3 on b3.borrowernumber =s.borrowernumber
        where b3. =${cardnumber} `);
    }
}
