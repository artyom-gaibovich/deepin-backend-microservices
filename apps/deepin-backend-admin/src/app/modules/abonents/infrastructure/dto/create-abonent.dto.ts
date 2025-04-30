import { IsEmail, IsString } from 'class-validator';

export class CreateAbonentDto {
	@IsEmail()
	email: string;

	@IsString()
	password: string;
}
