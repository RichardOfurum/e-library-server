import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from 'src/auth/dto/LoginDto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {

  }

  async getTotalUsers(): Promise<number> {
    try {
      const totalUsers = await this.userModel.countDocuments().exec();
      return totalUsers;
    } catch (error) {
      throw new Error('Failed to fetch total number of categories');
    }
  }

  async findByLogin(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new HttpException('Invalid creadentials', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const user = await this.userModel.findOne({ username });

    if (user) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();

    return this.sanitizeUser(createdUser)
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const userData = await this.userModel.find().skip(skip).limit(limit).exec();

    if (!userData || userData.length == 0) {
      return [];
    }
    // return this.sanitizeUser(userData) ;
    return userData.map((user) => this.sanitizeUser(user));
  }

  async findOne(id: string) {
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }
    // return existingUser;
    return this.sanitizeUser(existingUser);;
  }

  async findByUsername(usrname: string) {
    const existingUser = await this.userModel.findById(usrname).exec();
    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }
    // return existingUser;
    return this.sanitizeUser(existingUser);;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });

    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }

    // const user = await this.findOne(existingUser.id);
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`Patient #${id} not found`);
    }

    return this.sanitizeUser(user);
  }

  async remove(id: string) {
    const deleteUser = await this.userModel.findByIdAndDelete(id);
    if (!deleteUser) {
      throw new NotFoundException(`User not found`)
    }
    return this.sanitizeUser(deleteUser);
  }

  private sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
