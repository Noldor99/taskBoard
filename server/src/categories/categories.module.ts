import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryEntity } from './entities/categories.entity'
import { User } from 'src/user/entities/user.entity'

@Module({
	providers: [CategoriesService],
	controllers: [CategoriesController],
	imports: [TypeOrmModule.forFeature([User, CategoryEntity])],
})
export class CategoriesModule {}
