import { Injectable } from '@nestjs/common';
import { CreateGyerekDto } from './dto/create-gyerek.dto';
import { UpdateGyerekDto } from './dto/update-gyerek.dto';
import { PrismaService } from 'src/prisma.service';
import * as mysql from 'mysql2/promise';

@Injectable()
export class GyerekService {
  conn: mysql.Pool;
  DB: PrismaService;
  constructor(DB: PrismaService) {
    this.DB = DB;
  }

  async create(createGyerekDto: CreateGyerekDto, res: any) {
    try {
      return await this.DB.gyerek.create({
        data: createGyerekDto
      });
    }
    catch {
      return res.status(404).json({ error: 'Nem sikerült létrehozni a gyereket' });
    }
  }
  async findAll(res: any) {
    try {
      return await this.DB.gyerek.findMany();
    }
    catch {
      return res.status(404).json({ error: 'Nincs gyerek az adatbázisban' });
    }
  }

  async findOne(id: number, res: any) {
    try {
      return await this.DB.gyerek.findUnique(
        {  where: { id: id } }
      );
    }
    catch {
      return res.status(404).json({ error: 'Nem található a gyerek' });
    }
  }

  async addJatek(gyerekId: number, jatekId: number, res: any) {
    const gyerek = await this.DB.gyerek.findUnique({
      where: { id: gyerekId },
    });

    if (!gyerek) {
      return res.status(404).json({ error: 'Nem található a gyerek' });
    }

    if (!gyerek.viselkedes) {
      return res.json({ error: 'A gyereknek rosszul viselkedett' });
    }

    try {
      return await this.DB.jatek.update({
        where: { id: jatekId },
        data: { gyerekId },
      });
    } catch {
      return res.json({ error: 'Nem sikerült hozzárendelni a játékot' });
    }
  }

  async update(id: number, updateGyerekDto: UpdateGyerekDto, res: any) {
    try {
      return await this.DB.gyerek.update(
        { where: { id: id }, data: updateGyerekDto }
      );
    }
    catch {
      return res.json({ error: 'Nem sikerült módosítani a gyereket' });
    }
  }

  async remove(id: number, res: any) {
    try {
      return this.DB.gyerek.delete(
        { where: { id: id } }
      );
    }
    catch {
      return res.json({ error: 'Nem sikerült törölni a gyereket' });
    }
  }
}
