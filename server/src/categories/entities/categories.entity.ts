import { TaskEntity } from 'src/task/entities/tasks.entity'
import { User } from 'src/user/entities/user.entity'

import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
} from 'typeorm'

@Entity({ name: 'categories' })
export class CategoryEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ nullable: false })
	title: string

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	dateCreated: Date

	@ManyToOne(() => User, (user) => user.categories)
	user: User

	@OneToMany(() => TaskEntity, (task) => task.category)
	tasks: TaskEntity[]
}
