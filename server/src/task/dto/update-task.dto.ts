import { ApiProperty } from '@nestjs/swagger'

export class UpdateTaskDto {
	@ApiProperty({
		example: 'Fix phone login input',
		description: 'Нова назва задачі',
	})
	readonly name: string

	@ApiProperty({
		example: 'Fix phone login input in registration component',
		description: 'Новий опис задачі',
	})
	readonly description: string

	@ApiProperty({ example: '2023-07-01', description: 'Початкова дата' })
	readonly dataStart: Date

	@ApiProperty({ example: '2023-07-02', description: 'Кінцева дата' })
	readonly dataEnd: Date
}
