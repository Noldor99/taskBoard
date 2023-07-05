import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoryDto {
	@ApiProperty({ example: 'Заголовок поста', description: 'Заголовок поста' })
	readonly title: string

	@ApiProperty({
		example: '2023-09-02',
		description: 'Дата створення категоріїі',
	})
	readonly dateCreated: Date
}
