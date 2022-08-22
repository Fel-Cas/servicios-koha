import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { SearchBookDTO } from './dto';

@Controller('catalogs')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}

    @Get('/books-by-name/')
    async getBooksByName(@Body() book: SearchBookDTO) {
        const bookFound = await this.catalogService.getBooksByName(book);
        return { meta: { message: `Información de los libros` }, bookFound };
    }

    @Get('/book-by-isbn/:isbn')
    async getBookByISBN(@Param('isbn') isbn: string) {
        const bookFound = await this.catalogService.getBookByISBN(isbn);
        return { meta: { message: `Información del libro` }, bookFound };
    }
}
