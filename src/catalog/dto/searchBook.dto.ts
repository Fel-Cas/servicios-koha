import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class SearchBookDTO {
    @ApiProperty({
        description:"Es el párametro que nos ayuda a buscar el libro, sea por el título del libro o el nombre del autor",
        example:"Calculo"
    })
    @MinLength(3)
    @MaxLength(50)
    @IsString()
    field: String;
}
