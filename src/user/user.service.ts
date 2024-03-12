/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserDTO) {
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    return this.prismaService.user.create({
      data,
    });
  }

  async list() {
    return this.prismaService.user.findMany();
  }

  async show(id: number) {
    await this.exists(id);
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdatePatchUserDTO) {
    await this.exists(id);
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    return this.prismaService.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    await this.exists(id);
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number) {
    const countUsers: number = await this.prismaService.user.count({
      where: {
        id,
      },
    });
    if (!countUsers) {
      throw new NotFoundException(`O usuario ${id} nao existe`);
    }
  }
}
