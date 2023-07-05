import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TasksService } from './tasks.service'

@Controller('tasks')
@ApiTags('tasks')
@ApiBearerAuth()
export class TasksController {
	constructor(private taskService: TasksService) {}

	@Post()
	createTask(@Body() dto: CreateTaskDto) {
		return this.taskService.create(dto)
	}

	@Get(':id')
	async getTaskById(@Param('id') id: number) {
		const task = await this.taskService.getTaskById(id)
		return task
	}

	@Patch(':id')
	async updateTaskById(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
		const updatedTask = await this.taskService.updateTaskById(id, dto)
		return updatedTask
	}

	@Delete(':id')
	async deleteTaskById(@Param('id') id: number) {
		const deletedTask = await this.taskService.deleteTaskById(id)
		return deletedTask
	}
}
