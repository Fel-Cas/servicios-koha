import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatalogService } from './catalog.service';
import { SearchBookDTO } from './dto';

@Controller('catalogs')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}

    @Post('/books-by-name/')
    @HttpCode(200)
    @ApiOperation({summary:'Busca un libro por palabra clave, sea en el título o el autor'})
    @ApiResponse({status:200, description:'Devuelve la información de los libros que coinciden con la palabra clave enviada'})
    @ApiResponse({status:404, description:"Devuelve una excepción, ya que no se encuentra ningún libro que coincida con las especificaciones enviadas"})
    @ApiTags('Catalog')
    async getBooksByName(@Body() book: SearchBookDTO) {
        const bookFound = await this.catalogService.getBooksByName(book);
        return { meta: { message: `Información de los libros` }, bookFound };
    }

    @Get('/book-by-isbn/:isbn')
    @ApiOperation({summary:'Busca la información de libro por su isbn'})
    @ApiOkResponse({description:"Mustra la información de un libro específico"})
    @ApiNotFoundResponse({description:"Devuelve una excepción, ya que no se encontró ningún libro registrado con el isb suministrado "})
    @ApiTags('Catalog')
    async getBookByISBN(@Param('isbn') isbn: string) {
        const bookFound = await this.catalogService.getBookByISBN(isbn);
        return { meta: { message: `Información del libro` }, bookFound };
    }

    
    @Get('/historical-borrowed-books/:cardnumber')
    @ApiOperation({summary:'Busca el historico de prestamos realizados por un usuario'})
    @ApiOkResponse({description:"Mustra la cantidad de libros prestados por la persona que ingresó su número de identificación"})
    @ApiTags('Catalog')
    async getHistoricalBooks(@Param('cardnumber', ParseIntPipe) cardnumber: number) {
        const bookFound = await this.catalogService.getHistorialBorrowedBooks(cardnumber);
        return { meta: { message: `Historial de libros prestados` }, bookFound };
    }
}
