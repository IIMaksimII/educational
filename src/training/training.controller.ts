import { Controller, Get, UseGuards } from '@nestjs/common';
import { TrainingService } from './training.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @UseGuards(JwtAuthGuard)
  @Get('modules')
  getAllModules() {
    return this.trainingService.getAllTrainingModules();
  }
}
