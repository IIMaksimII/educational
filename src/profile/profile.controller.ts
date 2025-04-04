import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';


import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { request } from 'http';



@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
 @Get('info')
 @HttpCode (200)
 @UseGuards (JwtAuthGuard)
  async getprofile(){
    return { message: "Маршрут Профиля Работает" }; 
  }

  

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Req() req) {
    const profileData = await this.profileService.getProfileById(req.user.sub);
    console.log(req.user.sub); 
    return profileData; 
  }
}
