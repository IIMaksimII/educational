import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

export const getjwtConfig = async(ConfigService:ConfigService) :Promise<JwtModuleOptions> => ({
    secret:ConfigService.get("JWT_SECRET")
})