import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repository/userRepository';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository
  ){}

  async findOne(id: number) {
    const user=await this.userRepository.getById(id);
    if(user.length==0) throw new NotFoundException("El usuario no existe");
    return user;
  }
}
