import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { JatekService } from './jatek.service';
import { CreateJatekDto } from './dto/create-jatek.dto';
import { UpdateJatekDto } from './dto/update-jatek.dto';

@Controller('jatek')
export class JatekController {
  constructor(private readonly jatekService: JatekService) {}

  @Post()
  async letrehoz(@Body() createJatekDto: CreateJatekDto) {
    return this.jatekService.create(createJatekDto);
  }

  @Get()
  async osszes() {
    return this.jatekService.findAll();
  }

  @Get(':id')
  async egy(@Param('id') id: number) {
    return this.jatekService.findOne(id);
  }

  @Patch(':id')
  async modosit(@Param('id') id: number, @Body() updateJatekDto: UpdateJatekDto) {
    return this.jatekService.update(id, updateJatekDto);
  }

  @Delete(':id')
  async torol(@Param('id') id: number, @Res() res: any) {
    return this.jatekService.remove(id, res);
  }
}
