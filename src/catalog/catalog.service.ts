import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchBookDTO } from './dto';
import { CatalogRepository } from './repository/catalogRepository';

@Injectable()
export class CatalogService {
    constructor(private readonly catalogRepository: CatalogRepository) {}

    async getBooksByName(book: SearchBookDTO) {
        const booksFound = await this.catalogRepository.getBooksByName(book.field);
        if (booksFound.length === 0) {
            throw new NotFoundException(`No se encontraron coincidencias con el libro ${book.field}`);
        }

        return booksFound;
    }

    async getBookByISBN(isbn: string) {
        const bookFound = await this.catalogRepository.getBookByISBN(isbn);
        if (bookFound.length === 0) {
            throw new NotFoundException(`No se encontraron coincidencias con el libro ${isbn}`);
        }
        return bookFound;
    }

    async getBorrowedBooks(cardnumber:number){
        return await this.catalogRepository.getBorrowedBooks(cardnumber);
    }

    async getHistorialBorrowedBooks(cardnumber: number) {
        return await this.catalogRepository.getHistoricalBorrowedBooks(cardnumber);
    }
}
