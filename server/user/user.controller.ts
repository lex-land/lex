import { Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  public async create() // @Body() body: CreateUserDto,
  // @Session() session: Express.SessionData,
  {
    //
  }
}
