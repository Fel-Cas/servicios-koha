import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_CONFIG } from './config/constants';
import { UserModule } from './user/user.module';
import { CatalogModule } from './catalog/catalog.module';
import databaseConfig from './config/database.config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => config.get(TYPEORM_CONFIG),
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig],
        }),
        UserModule,
        CatalogModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
