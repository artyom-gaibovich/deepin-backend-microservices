import { Injectable } from '@nestjs/common';

interface AIGAEARequests {
	'POST v1/network/ping': (...args) => [string, any?, any?];
	'GET v1/session/auth': (...args) => [string, any?, any?];
}

@Injectable()
export class AIGAEARequestFactory {
	private activeRequests: Map<any, any> = new Map([
		[
			'POST v1/network/ping',
			({
				authConfig,
				browser_id,
				token,
				password,
				port,
				username,
				host,
			}: {
				token: string;
				password: string;
				port: string;
				host: string;
				username: string;
				browser_id: string;
				authConfig: Record<string, unknown>;
			}) => [
				`http://api.aigaea.net/api/network/ping`,
				{
					timestamp: Math.floor(Date.now() / 1000),
					version: '1.0.1',
					uid: authConfig.uid,
					browser_id,
				},
				{
					headers: {
						Accept: 'application/json, text/plain, *!/!*',
						origin: 'chrome-extension://cpjicfogbgognnifjgmenmaldnmeeeib',
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
						'User-Agent':
							'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
					},
					proxy: {
						host,
						port,
						auth: {
							username,
							password,
						},
					},
				},
			],
		],
		[
			'GET v1/session/auth',
			({
				token,
				password,
				port,
				username,
				host,
			}: {
				token: string;
				password: string;
				port: string;
				host: string;
				username: string;
			}) => [
				'http://api.aigaea.net/api/auth/session',
				{},
				{
					headers: {
						Accept: 'application/json, text/plain, *!/!*',
						origin: 'chrome-extension://cpjicfogbgognnifjgmenmaldnmeeeib',
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
						'User-Agent':
							'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
					},
					proxy: {
						host,
						port,
						auth: {
							username,
							password,
						},
					},
				},
			],
		],
	]);

	find(url: keyof AIGAEARequests): (...args) => [string, any?, any?] {
		return this.activeRequests.get(url);
	}
}
