import { Controller, Req ,Get ,Post , Body, UseGuards, } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './jwt-auth-guard';
import { User } from 'src/schemas/user.schema';
import { SignUpDto } from 'src/dto/signup.dto';
import { LoginDto } from 'src/dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('/signup')
  signUp(@Body() SignUpDto: SignUpDto):Promise<{token: string}> {
    return this.usersService.signUp(SignUpDto);
  }

  @Post('/login')
  loginUp(@Body() LoginDto: LoginDto):Promise<any> {
    return this.usersService.login(LoginDto);
  } 

  @Get('/profile')
  @UseGuards(JwtAuthGuard) 
  getProfile(@Req() req): Promise<User> {
    return this.usersService.findById(req.user.id);
  }
  
  @Get('/:id')
  getProfiles(@Req() req): Promise<User>{
    return this.usersService.findById(req);
  }
}
