import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { CatalogRepository } from './repository/catalogRepository';

@Module({
  controllers: [CatalogController],
  providers: [CatalogService, CatalogRepository]
})
export class CatalogModule {}
