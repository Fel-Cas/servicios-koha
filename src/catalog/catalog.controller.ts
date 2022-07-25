import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalogs')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('/books-by-name/:nameBook')
  async getBooksByName(@Param('nameBook') nameBook: string){
    const bookFound = await this.catalogService.getBooksByName(nameBook);

    return {meta: {message: `Información de los libros`}, bookFound};
  }
}
