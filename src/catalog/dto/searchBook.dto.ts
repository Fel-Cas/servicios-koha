import { IsString, MaxLength, MinLength } from 'class-validator';

export class SearchBookDTO {
    @MinLength(3)
    @MaxLength(50)
    @IsString()
    field: String;
}
