import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateJatekDto {
  @IsString()
  @IsNotEmpty()
  nev: string;

  @IsString()
  @IsNotEmpty()
  anyag: string;

  @IsNumber()
  @IsNotEmpty()
  suly: number;

  gyerekId: number;
}
