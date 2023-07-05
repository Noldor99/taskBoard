import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TaskEntity } from './entities/tasks.entity'

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TaskEntity)
		private taskRepository: Repository<TaskEntity>,
	) {}

	async create(dto: CreateTaskDto) {
		const { categoryId, ...taskData } = dto
		const task = this.taskRepository.create({
			...taskData,
			category: { id: categoryId },
		})
		await this.taskRepository.save(task)
		return task
	}

	async deleteTaskById(id: number): Promise<TaskEntity | null> {
		const task = await this.taskRepository.findOne({
			where: { id },
		})

		if (!task) {
			return null
		}

		await this.taskRepository.remove(task)
		return task
	}

	async updateTaskById(id: number, dto: UpdateTaskDto): Promise<TaskEntity> {
		const task = await this.taskRepository.findOne({
			where: { id },
		})
		if (!task) {
			throw new NotFoundException('Category not found')
		}
		task.name = dto.name
		task.description = dto.description
		task.dataStart = dto.dataStart
		task.dataEnd = dto.dataEnd
		await this.taskRepository.save(task)

		return task
	}

	async getTaskById(id: number) {
		const task = await this.taskRepository.findOne({
			where: { id },
		})
		return task
	}
}
