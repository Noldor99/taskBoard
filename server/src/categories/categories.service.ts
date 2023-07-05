import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { CategoryEntity } from './entities/categories.entity'

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(CategoryEntity)
		private categoryRepository: Repository<CategoryEntity>,
		@InjectRepository(User) // Inject the UserEntity repository
		private userRepository: Repository<User>, // Add this line
	) {}

	async getCategoriesPagination(id: number, page: number, limit: number) {
		return this.categoryRepository.find({
			where: {
				user: { id },
			},
			relations: { tasks: true },
			order: {
				dateCreated: 'DESC',
			},
			take: limit,
			skip: (page - 1) * limit,
		})
	}

	// async getCategoriesPagination(id: number, page: number, limit: number) {
	// 	const [categories, total] = await this.categoryRepository.findAndCount({
	// 		where: {
	// 			user: { id },
	// 		},
	// 		relations: { tasks: true },
	// 		order: {
	// 			dateCreated: 'DESC',
	// 		},
	// 		take: limit,
	// 		skip: (page - 1) * limit,
	// 	})

	// 	return {
	// 		categories,
	// 		total,
	// 	}
	// }

	async getAllCategories(id: number): Promise<CategoryEntity[]> {
		return this.categoryRepository.find({
			where: {
				user: { id },
			},
			relations: { tasks: true },
		})
	}

	async getCategoryById(id: number) {
		const category = await this.categoryRepository.findOne({
			where: { id },
			relations: { tasks: true },
		})
		return category
	}

	async create(dto: CreateCategoryDto, id: number) {
		const category = this.categoryRepository.create(dto)
		const user = await this.userRepository.findOne({
			where: { id },
		})
		category.user = user
		await this.categoryRepository.save(category)
		return category
	}

	async updateCategoryById(
		id: number,
		dto: UpdateCategoryDto,
	): Promise<CategoryEntity> {
		const category = await this.categoryRepository.findOne({
			where: { id },
		})

		if (!category) {
			throw new NotFoundException('Category not found')
		}
		category.title = dto.title

		await this.categoryRepository.save(category)

		return category
	}

	async deleteCategoryById(id: number): Promise<CategoryEntity | null> {
		const category = await this.categoryRepository.findOne({
			where: { id },
		})

		if (!category) {
			return null
		}

		await this.categoryRepository.remove(category)
		return category
	}
}
