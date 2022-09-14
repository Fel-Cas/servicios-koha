import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CatalogService } from '../catalog/catalog.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, private readonly catalogService: CatalogService) {}

    @Get(':id')
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
