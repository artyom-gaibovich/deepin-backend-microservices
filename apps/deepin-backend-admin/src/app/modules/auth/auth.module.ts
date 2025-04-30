import { Module, Provider } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AbonentsModule } from '../abonents/abonents.module';
import { CreateAbonentUseCase } from '../abonents/application/use-cases/create-abonent.use-case';
import { FindAbonentUseCase } from '../abonents/application/use-cases/find-abonent.use-case';
import { FindAbonentsUseCase } from '../abonents/application/use-cases/find-abonents.use-case';
import { DeleteAbonentUseCase } from '../abonents/application/use-cases/delete-abonent.use-case';
import { UpdateAbonentUseCase } from '../abonents/application/use-cases/update-abonent.use-case';
import { PrismaAbonentRepository } from '../abonents/infrastructure/prisma/repositories/prisma-abonent.repository';
import { AbonentRepository } from '../abonents/application/repositories/abonent.repository';
import { ConfigModule } from '@nestjs/config';

const application: Provider[] = [
  CreateAbonentUseCase,
  FindAbonentUseCase,
  FindAbonentsUseCase,
  DeleteAbonentUseCase,
  UpdateAbonentUseCase,
];
const infrastructure: Provider[] = [
	{
		useClass: PrismaAbonentRepository,
		provide: AbonentRepository,
	},
];

@Module({
	imports: [AbonentsModule, JwtModule.register({}), ConfigModule],
	controllers: [AuthController],
	providers: [
		...infrastructure,
		...application,
		AuthService,
		AccessTokenStrategy,
		RefreshTokenStrategy,
	],
})
export class AuthModule {}
