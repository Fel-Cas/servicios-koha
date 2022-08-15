import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchBookDTO } from './dto';
import { CatalogRepository } from './repository/catalogRepository';

@Injectable()
export class CatalogService {
  constructor(
    private readonly catalogRepository: CatalogRepository
  ){}

  async getBooksByName(book: SearchBookDTO){

    const booksFound = await this.catalogRepository.getBooksByName(book.field);
    console.log(booksFound);
    if(booksFound.length===0){
      throw new NotFoundException(`No se encontraron coincidencias con el libro ${book}`);
    }

    return booksFound;
  }
}
