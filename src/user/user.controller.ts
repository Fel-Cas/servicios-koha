import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CatalogService } from '../catalog/catalog.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, private readonly catalogService: CatalogService) {}

    @Get(':id')
    @ApiTags('User')
    @ApiOperation({summary:'Busca la información de un usuario por su número de identificación'})
    @ApiOkResponse({description:"Devuelve la información del usuario"})
    @ApiNotFoundResponse({description:"Devuelve una excepción, ya que no se encontró ningún usuario registrado con el número de documento enviado"})
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.findOne(id);
        if(!user){
            throw new NotFoundException('User not found');
        }
        const borrowedBooks= await this.catalogService.getBorrowedBooks(id);
        user[0].borrowedBooks = borrowedBooks;   
        return { meta: { message: 'Información del usuario' }, data: user[0] };
    }
}
