import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  users: User[];

  constructor() {
    this.users = [];
  }

  create(createUserDto: CreateUserDto) {
    const { id, first_name, last_name, email } = createUserDto;
    if (!id) throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
    if (!first_name)
      throw new HttpException('First name is required', HttpStatus.BAD_REQUEST);
    if (!last_name)
      throw new HttpException('Last name is required', HttpStatus.BAD_REQUEST);
    if (!email)
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);

    this.users.push(createUserDto);
    return {
      message: 'User created successfully',
      user: createUserDto,
    };
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);
    user.first_name = updateUserDto.first_name;
    user.last_name = updateUserDto.last_name;
    user.email = updateUserDto.email;
    return {
      message: `User with id ${id} updated successfully`,
      user,
    };
  }

  remove(id: number): object {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users.splice(userIndex, 1);
    return { message: `User with id ${id} deleted successfully` };
  }
}
