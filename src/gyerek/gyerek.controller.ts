import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put } from '@nestjs/common';
import { GyerekService } from './gyerek.service';
import { CreateGyerekDto } from './dto/create-gyerek.dto';
import { UpdateGyerekDto } from './dto/update-gyerek.dto';

@Controller('gyerek')
export class GyerekController {
  constructor(private readonly gyerekService: GyerekService) {}

  @Post()
  async letrehoz(
    @Body() createGyerekDto: CreateGyerekDto,
    @Res() res: any) {
    return this.gyerekService.create(createGyerekDto, res);
  }

  @Get()
  async osszes(@Res() res: any) {
    return this.gyerekService.findAll(res);
  }

  @Get(':id')
  async egy(
    @Param('id') id: number,
    @Res() res: any) {
    return this.gyerekService.findOne(id, res);
  }

  @Patch(':id')
  async modosit(
    @Param('id') id: number,
    @Body() updateGyerekDto: UpdateGyerekDto,
    @Res() res: any) {
    return this.gyerekService.update(id, updateGyerekDto, res);
  }

  @Put(':id/jatek')
  async jatekFelvetel(
    @Param('id') gyerekId: number,
    @Body('jatekId') jatekId: number,
    @Res() res: any) {
    return this.gyerekService.addJatek(gyerekId, jatekId, res);
  }

  @Delete(':id')
  async torol(
    @Param('id') id: number,
    @Res() res: any) {
    return this.gyerekService.remove(id, res);
  }
}
