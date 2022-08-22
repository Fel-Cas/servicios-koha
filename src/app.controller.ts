import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
    @Get()
    description() {
        return {
            university: 'Universidad de Antioquia',
            message: `Este proyecto se realiza con el fin de crear servicios para que sean utilizados por la aplicación biblioApp, ya que con el cambio de software utilizado en la biblioteca  no se tendrían estos servicios que son indispensables para el funcionamiento de la aplicación. `,
        };
    }
}
