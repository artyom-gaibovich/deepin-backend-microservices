import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { CreateAbonentUseCase } from '../abonents/application/use-cases/create-abonent.use-case';
import { ConfigService } from '@nestjs/config';
import { CreateAbonentDto } from '../abonents/infrastructure/dto/create-abonent.dto';
import { AbonentRepository } from '../abonents/application/repositories/abonent.repository';

@Injectable()
export class AuthService {
	constructor(
		private createAbonentUseCase: CreateAbonentUseCase,
		private jwtService: JwtService,
		private abonentRepository: AbonentRepository,
		private configService: ConfigService,
	) {}

	async signUp(createUserDto: CreateAbonentDto): Promise<any> {
		const userExists = await this.abonentRepository.findByEmail(createUserDto.email);
		if (userExists) {
			throw new BadRequestException('User already exists');
		}

		const hash = await this.hashData(createUserDto.password);
		const newUser = await this.createAbonentUseCase.execute({
			...createUserDto,
			passwordHash: hash,
		});
		const tokens = await this.getTokens(newUser.id, newUser.email);
		await this.updateRefreshToken(newUser.id, tokens.refreshToken);
		return tokens;
	}

	async signIn(data: AuthDto) {
		const user = await this.abonentRepository.findByEmail(data.email);
		if (!user) throw new BadRequestException('User does not exist');
		const passwordMatches = await argon2.verify(user.passwordHash, data.password);
		if (!passwordMatches) throw new BadRequestException('Password is incorrect');
		const tokens = await this.getTokens(user.id, user.email);
		await this.updateRefreshToken(user.id, tokens.refreshToken);
		return tokens;
	}

	async logout(userId: string) {
		return this.abonentRepository.update(userId, { refreshToken: null });
	}

	hashData(data: string) {
		return argon2.hash(data);
	}

	async updateRefreshToken(userId: string, refreshToken: string) {
		const hashedRefreshToken = await this.hashData(refreshToken);
		await this.abonentRepository.update(userId, {
			refreshToken: hashedRefreshToken,
		});
	}

	async refreshTokens(userId: string, refreshToken: string) {
		const user = await this.abonentRepository.findById(userId);
		if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');
		const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);
		if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
		const tokens = await this.getTokens(user.id, user.email);
		await this.updateRefreshToken(user.id, tokens.refreshToken);
		return tokens;
	}

	async getTokens(userId: string, username: string) {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(
				{
					sub: userId,
					username,
				},
				{
					secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
					expiresIn: '5s',
				},
			),
			this.jwtService.signAsync(
				{
					sub: userId,
					username,
				},
				{
					secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
					expiresIn: '10s',
				},
			),
		]);

		return {
			accessToken,
			refreshToken,
		};
	}
}
