import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CatalogService } from '../catalog/catalog.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, private readonly catalogService: CatalogService) {}

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.findOne(id);
        const borrowedBooks = await this.catalogService.getBorrowedBooks(user[0].borrowernumber);
        return { meta: { message: 'Información del usuario' }, data: user[0], borrowedBooks };
    }
}
