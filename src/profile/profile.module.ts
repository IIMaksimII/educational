import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getjwtConfig } from 'src/Configs/jwt.config';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports:[
    ConfigModule,
    JwtModule.registerAsync({
      imports:[
        ConfigModule
      ],
      inject:[
        ConfigService
      ],
      useFactory:getjwtConfig
    })
  ]
})
export class ProfileModule {}
