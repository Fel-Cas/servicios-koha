import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/userRepository';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository
  ){}

  async findAll() {
    return await  this.userRepository.getAll();
  }

  async findOne(id: number) {
    const user=await this.userRepository.getById(id);
    if(user.length==0) throw new NotFoundException("El usuario no existe");
    return user;
  }
}
