import { registerAs } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join} from "path";

function typeormModuleOptions(): TypeOrmModule{
    return{
        type:'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT,10),
        username:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: false,
        logging: true,
        logger: 'file',
    }
}

export default registerAs('database',()=>({
    config: typeormModuleOptions()
}))