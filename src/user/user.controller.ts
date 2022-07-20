import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  

  @Get()
  async findAll() {
    const users=await this.userService.findAll();
    return { meta:{message:"Todos los usuarios"},data: users}
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user=await this.userService.findOne(id);
    return {meta:{message:"Información del usuario"},data:user[0]};

  }

 
}
