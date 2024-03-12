import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { ParamId } from 'src/decorators/param-id.decorator';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

// Pode ser usado no controller todo, ou unitariamente em rotas (Atualmente esta no main global)
// @UseInterceptors(LogInterceptor)
@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.ADMIN)
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
  async listOne(@ParamId() id) {
    return this.userService.show(id);
  }

  @Patch(':id')
  async updatePatch(@Body() body: UpdatePatchUserDTO, @ParamId() id) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  async delete(@ParamId() id) {
    return this.userService.delete(id);
  }
}
