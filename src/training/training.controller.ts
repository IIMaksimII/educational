

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TrainingService } from './training.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @UseGuards(JwtAuthGuard)
  @Get('modules')
  getAllModules() {
    return this.trainingService.getAllTrainingModules();
  }

  @UseGuards(JwtAuthGuard)
  @Get('lesson/:id/exercises')
  getExercisesForLesson(@Param('id') id: string) {
    return this.trainingService.getExercisesForLesson(Number(id));
  }

  
}
