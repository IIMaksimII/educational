import { Body, Controller, Get, HttpCode, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { RatingService } from './rating.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PublishProgressDto } from './rating.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  @HttpCode(200)
  async getMyRating(@Req() req) {
    return this.ratingService.getMyProgress(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @HttpCode(200)
  async getAllProgress() {
    return this.ratingService.getAllProgress();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/complete')
  @HttpCode(200)
  async putUserProgress(@Req() req, @Body(new ValidationPipe()) data: PublishProgressDto) {
    return this.ratingService.putUserProgress(req.user.sub, data);
  }
}
