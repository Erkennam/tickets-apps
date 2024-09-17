import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {JwtService} from '@nestjs/jwt'
import { SignUpDto } from 'src/dto/signup.dto';
import { LoginDto } from 'src/dto/login.dto';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  
  async signUp (signUpDto:SignUpDto | any) {
      const {username,email,password,role} = signUpDto;
      const hashed = await bcrypt.hash(password,10);
      const exist = await this.userModel.findOne({email});
      if(exist) {
        throw new Error('Invalid credentials');
      }
      const user = await this.userModel.create({
        username,
        email,
        password: hashed,
        role
      }) 
      const token = this.jwtService.sign({id: user._id});
      return {token};
  }

  async login(loginDto:LoginDto | any) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async findById(id:string){
    return this.userModel.findById(id).exec();
  }

  async getRoles(id:string){
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new Error('User not found');
    }
    return user.role;
  }
}
