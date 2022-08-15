import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { SearchBookDTO } from './dto';

@Controller('catalogs')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('/books-by-name/:nameBook')
  async getBooksByName(book:SearchBookDTO){
    const bookFound = await this.catalogService.getBooksByName(book);
    return {meta: {message: `Información de los libros`}, bookFound};
  }
}
