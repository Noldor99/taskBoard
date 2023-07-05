import { Controller, Post, UseGuards, Request } from '@nestjs/common'
import { ApiBody, ApiResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				email: {
					type: 'string',
					default: 'qwerr@gmail.com',
				},
				password: {
					type: 'string',
					default: '123456',
				},
			},
		},
	})
	@UseGuards(LocalAuthGuard)
	@ApiResponse({ status: 200, description: 'Successful login' })
	async login(@Request() req) {
		return this.authService.login(req.user)
	}
}
