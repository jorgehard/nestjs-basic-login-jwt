import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @Get()
  async listAll() {
    return this.userService.list();
  }

  @Get(':id')
  async listOne(@Param('id', ParseIntPipe) id) {
    return this.userService.show(id);
  }

  @Patch(':id')
  async updatePatch(
    @Body() body: UpdatePatchUserDTO,
    @Param('id', ParseIntPipe) id,
  ) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return this.userService.delete(id);
  }
}
