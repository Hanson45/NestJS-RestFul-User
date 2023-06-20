import {
  Controller,
  Get,
  Put,
  Delete,
  Header,
  HostParam,
  HttpCode,
  Module,
  Param,
  Post,
  Req,
  Body,
  Query,
} from '@nestjs/common';

import { CreateCatDto, UpdateCatDto, listAllCats } from './dto';
import { CatsService } from './cat.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {} // inyectamos dependencia service

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
  /*

  @Get()
  findAll(@Query() query: listAllCats) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
  */
}

/*
const cat_route = 'cat';
@Controller({ host: cat_route }) // host se usa pasar variables dinamicas
export class CatController {
  // aqui ponemos seteamos la ruta para /cat/all
  @Get('all')
  findAll(@Req() requests: Request): string {
    return 'getAll - Cats';
  }

  @Post()
  @HttpCode(204) // para cambiar codigo de respuesta HTTP
  @Header('Cache-Control', 'none') // para manipular datos del header con res.header()
  create(): string {
    return 'create - new cat';
  }

  // buscar por parametro
  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }
}
*/
