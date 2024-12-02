import { Injectable } from '@nestjs/common';
import { CreateJatekDto } from './dto/create-jatek.dto';
import { UpdateJatekDto } from './dto/update-jatek.dto';
import { PrismaService } from 'src/prisma.service';
import * as mysql from 'mysql2/promise';

@Injectable()
export class JatekService {
  conn: mysql.Pool;
  DB: PrismaService;
  constructor(DB: PrismaService) {
    this.DB = DB;
  }

  async create(createJatekDto: CreateJatekDto) {
    try {
      return await this.DB.jatek.create({
        data: createJatekDto
      });
    }
    catch {
      return "Nem sikerült :(";
    }
  }

  async findAll() {
    try {
      return await this.DB.jatek.findMany();
    }
    catch {
      return "Nincs játék az adatbázisban";
    }
  }

  async findOne(id: number) {
    try {
      return await this.DB.jatek.findUnique(
        {  where: { id: id } }
      );
    }
    catch {
      return "Nincs ilyen játék az adatbázisban";
    }
  }

  async update(id: number, updateJatekDto: UpdateJatekDto) {
    try {
      return await this.DB.jatek.update(
        { where: { id: id }, data: updateJatekDto }
      );
    }
    catch {
      return "Nem sikerült frissíteni a játékot";
    }
  }

  async remove(id: number, res: any) {
    try {
      const jatek = await this.DB.jatek.findUnique({ where: { id: id } });
      if (!jatek) {
        return res.status(404).json({ error: "Nincs ilyen játék" });
      }
      await this.DB.jatek.delete(
        { where: { id: id } }
      );
      return res.status(200).json({ message:"Sikeres törlés" });
    }
    catch {
      throw new Error("Nem sikerült törölni a játékot");
    }
  }
}
