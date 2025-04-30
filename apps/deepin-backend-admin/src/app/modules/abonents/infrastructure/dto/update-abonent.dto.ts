import { IsEmail, IsOptional } from 'class-validator';

export class UpdateAbonentDto {
	@IsEmail()
	email: string;
}
