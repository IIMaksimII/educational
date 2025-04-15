import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getjwtConfig } from 'src/Configs/jwt.config';

@Module({
  controllers: [TrainingController],
  providers: [TrainingService],
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
export class TrainingModule {}
