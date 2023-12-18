import { validate, IsEnum, IsNumber, IsString, IsOptional, IsNumberString } from "class-validator"
import { Directions } from "enums/direction.enum"
import { SortFields } from "enums/sortField.enum"

export class SearchDto {
    categoryName?: string

    @IsString()
    @IsOptional()
    searchTerm?: string

    @IsEnum(SortFields)
    @IsOptional()
    sortBy?: SortFields

    @IsEnum(Directions)
    @IsOptional()
    direction?: Directions

    @IsNumberString()
    @IsOptional()
    minPrice?: string

    @IsNumberString()
    @IsOptional()
    maxPrice?: string

    static from(dto?: SearchDto) {
        const it = new SearchDto();
        it.categoryName = dto?.categoryName;
        it.searchTerm = dto.searchTerm
        it.sortBy = dto?.sortBy
        it.direction = dto?.direction
        it.minPrice = dto?.minPrice
        it.maxPrice = dto?.maxPrice
        return it;
      }

    static async validate(dto: SearchDto) {
        const errors = await validate(dto);
        return errors.length ? errors : false;
      }
}   