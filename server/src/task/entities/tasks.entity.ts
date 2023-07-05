import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { CategoryEntity } from 'src/categories/entities/categories.entity'

@Entity({ name: 'tasks' })
export class TaskEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', nullable: false })
	name: string

	@Column({ type: 'varchar', nullable: false })
	description: string

	@Column({ type: 'timestamp', nullable: false })
	dataStart: Date

	@Column({ type: 'timestamp', nullable: false })
	dataEnd: Date

	@ManyToOne(() => CategoryEntity, (category) => category.tasks)
	category: CategoryEntity
}
