import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { FindOneParams } from 'utils/param-validator';
import { UserPatchDto } from './dto/patch-user.dto';
import { isEmailExist } from './validators/db.validator';
import { Public } from 'src/decorators/decorators';
import { SameUserGuard } from 'utils/validation.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const emailExist = await isEmailExist(createUserDto.email);
    if (emailExist) {
      throw new HttpException(
        {
          message: 'Email already used',
        },
        HttpStatus.CONFLICT,
      );
    }
    await this.userService.create(createUserDto);
    return { statusCode: HttpStatus.CREATED };
  }

  @Get()
  async findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: '',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  async findUser(
    _params: FindOneParams,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    try {
      return this.userService.findOne(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @UseGuards(SameUserGuard)
  @Patch(':id')
  async editUser(
    //params: FindOneParams,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUserDto: UserPatchDto,
  ) {
    if (isNaN(id)) {
      throw new BadRequestException('El parámetro id debe ser un número');
    }
    await this.userService.findOne(id); //valida si el user existe
    this.userService.editUser(id, updateUserDto);
  }

  //@UseGuards(SameUserGuard)
  @Delete(':id')
  remove(_params: FindOneParams, @Param('id', new ParseIntPipe()) id: number) {
    try {
      if (isNaN(id)) {
        throw new BadRequestException('El parámetro id debe ser un número');
      }
      return this.userService.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
