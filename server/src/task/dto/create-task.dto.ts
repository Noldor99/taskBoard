import { ApiProperty } from '@nestjs/swagger'

export class CreateTaskDto {
	@ApiProperty({
		example: 'Fix phone login input',
		description: 'Назва задачі',
	})
	readonly name: string

	@ApiProperty({
		example: 'Fix phone login input in registration component',
		description: 'Опис задачі',
	})
	readonly description: string

	@ApiProperty({ example: '2023-07-01', description: 'Початкова дата' })
	readonly dataStart: Date

	@ApiProperty({ example: '2023-07-02', description: 'Кінцева дата' })
	readonly dataEnd: Date

	@ApiProperty({ example: 1, description: 'Ідентифікатор категорії"' })
	readonly categoryId: number
}
