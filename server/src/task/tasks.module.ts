import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryEntity } from '../categories/entities/categories.entity'
import { TaskEntity } from './entities/tasks.entity'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'

@Module({
	providers: [TasksService],
	controllers: [TasksController],
	imports: [TypeOrmModule.forFeature([TaskEntity, CategoryEntity])],
})
export class TasksModule {}
