import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  public async findAll() {
    return this.service.findAll();
  }
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
