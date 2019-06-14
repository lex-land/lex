import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from '../user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async findAll() {
    return this.service.findAll();
  }

  @Post()
  public async create(@Body() body: CreateUserDto) {
    return await this.service.create(body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  public async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
