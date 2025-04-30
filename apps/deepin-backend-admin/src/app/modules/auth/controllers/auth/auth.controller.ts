import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../../auth.service';
import { CreateAbonentDto } from '../../../abonents/infrastructure/dto/create-abonent.dto';
import { AuthDto } from '../../dto/auth.dto';
import { AccessTokenGuard } from '../../guards/accessToken.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	signup(@Body() createUserDto: CreateAbonentDto) {
		return this.authService.signUp(createUserDto);
	}

	@Post('signin')
	signin(@Body() data: AuthDto) {
		return this.authService.signIn(data);
	}

	@UseGuards(AccessTokenGuard)
	@Get('logout')
	logout(@Req() req: Request & { user: string[] }) {
		this.authService.logout(req.user['sub']);
	}

	@Get('refresh')
	refreshTokens(@Req() req: Request & { user: string[] }) {
		const userId = req.user['sub'];
		const refreshToken = req.user['refreshToken'];
		return this.authService.refreshTokens(userId, refreshToken);
	}
}
