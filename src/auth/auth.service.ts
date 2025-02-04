import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma.servec';

@Injectable()
export class AuthService {
  constructor(private prisma:PrismaService){}
 

  async getUsers(){
    
    return 1
  }


}
