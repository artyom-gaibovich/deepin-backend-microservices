export class Abonent {
	constructor(
		public readonly id: string,
		public email: string,
		public passwordHash: string,
		public refreshToken: string,
		public readonly createdAt: Date,
		public readonly updatedAt: Date,
	) {}
}
