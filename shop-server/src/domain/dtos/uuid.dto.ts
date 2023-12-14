import { IsUUID} from 'class-validator'

export class UUIDDto {
    @IsUUID()
    id: String

    createdAt: number

    updateAt: number
}