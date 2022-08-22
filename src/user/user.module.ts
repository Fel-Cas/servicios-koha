import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/userRepository';
import { CatalogModule } from '../catalog/catalog.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports:[CatalogModule]
})
export class UserModule {}
