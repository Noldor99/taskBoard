import { ApiProperty } from '@nestjs/swagger'

export class UpdateCategoryDto {
	@ApiProperty({
		example: 'Новий заголовок поста',
		description: 'Заголовок поста',
	})
	readonly title?: string
}
