import {
  Body,
  Controller,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PropertyService } from './property.service';
import { User } from '../user/user.entity';
import _ from 'lodash';

@Controller('property')
export class PropertyController {
  constructor(
    private readonly propService: PropertyService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor(''))
  public async create(@Body() body: any, @Query() query: any, @Req() req: any) {
    const sessionUser: User = await this.authService.getUserByToken(
      req.cookies.accessToken,
    );
    const { id, ...other } = body;
    const queryData = _.mapValues(query, (_id: any) => ({ id: _id }));
    if (id) {
      return this.propService.update(query.repository, {
        ...other,
        ...queryData,
        creator: sessionUser,
      });
    } else {
      return this.propService.create({
        ...other,
        ...queryData,
        creator: sessionUser,
      });
    }
  }
}
