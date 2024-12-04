import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGyerekDto {
  @IsString()
  @IsNotEmpty()
  nev: string;

  @IsString()
  @IsNotEmpty()
  cim: string;

  @IsBoolean()
  @IsNotEmpty()
  viselkedes: boolean;

  @IsNumber()
  jatekId?: number;
}
