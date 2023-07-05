import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Delete,
	UseGuards,
	Request,
	Patch,
	Query,
} from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { CategoriesService } from './categories.service'
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { CategoryEntity } from './entities/categories.entity'

@Controller('categories')
@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CategoriesController {
	constructor(private categoryService: CategoriesService) {}

	@Post()
	createCategory(@Body() dto: CreateCategoryDto, @Request() req) {
		return this.categoryService.create(dto, req.user.id)
	}

	@Get('pagination')
	@ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
	@ApiQuery({ name: 'limit', type: Number, required: false, example: 4 })
	findAllWithPagination(
		@Request() req,
		@Query('page') page = 1,
		@Query('limit') limit = 4,
	) {
		return this.categoryService.getCategoriesPagination(
			req.user.id,
			page,
			limit,
		)
	}

	@Get()
	async getAllCategories(@Request() req): Promise<CategoryEntity[]> {
		return this.categoryService.getAllCategories(req.user.id)
	}

	@Get(':id')
	async getCategoryById(@Param('id') id: number) {
		const category = await this.categoryService.getCategoryById(id)
		return category
	}

	@Patch(':id')
	async updateCategoryById(
		@Param('id') id: number,
		@Body() dto: UpdateCategoryDto,
	) {
		const updatedCategory = await this.categoryService.updateCategoryById(
			id,
			dto,
		)
		return updatedCategory
	}

	@Delete(':id')
	async deleteCategoryById(@Param('id') id: number) {
		const deletedCategory = await this.categoryService.deleteCategoryById(
			id,
		)
		return deletedCategory
	}
}
