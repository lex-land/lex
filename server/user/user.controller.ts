import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('sync')
  public async sync() {
    const json = await import('./data/user.json');
    return Promise.all(
      json.data.map(user =>
        this.service.create({
          fullname: user.fullname,
          email: `${user.fullname}@sunmi.com`,
          password: 'sunmi388',
        }),
      ),
    );
  }

  @Get()
  public async findAll() {
    return this.service.findAll();
  }

  @Post()
  public async create(@Body() body: any) {
    return await this.service.create(body);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
