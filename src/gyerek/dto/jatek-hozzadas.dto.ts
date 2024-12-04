import { Type } from "class-transformer"
import { IsInt } from "class-validator"

export class JatekHozzadasDto {

    constructor(gyerekId, jatekId) {
        this.gyerekId = gyerekId
        this.jatekId = jatekId
    }

    @IsInt()
    @Type(() => Number)
    readonly gyerekId : number

    @IsInt()
    @Type(() => Number)
    readonly jatekId : number
}
