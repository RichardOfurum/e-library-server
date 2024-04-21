import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './entities/category.entity';


@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private categoryModel: Model<Category>) { }

  async getTotalCategories(): Promise<number> {
    try {
      const totalCategories = await this.categoryModel.countDocuments().exec();
      return totalCategories;
    } catch (error) {
      throw new Error('Failed to fetch total number of categories');
    }
  }

  async create(createCategoryDto: CreateCategoryDto) {

    const { name } = createCategoryDto;
    const category = await this.categoryModel.findOne({ name });

    if (category) {
      throw new HttpException('Category already exist', HttpStatus.BAD_REQUEST);
    } else {

      const createCategory = new this.categoryModel(createCategoryDto);

      if (!createCategory) {
        throw new HttpException('Please check your data and try again', HttpStatus.CONFLICT)
      }

      if (!await createCategory.save()) {
        throw new HttpException('Record not saved please check your input data and try again', HttpStatus.BAD_REQUEST)
      }

      return createCategory;
    }

  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const categoryeData = await this.categoryModel.find().skip(skip).limit(limit).exec();

    if (!categoryeData || categoryeData.length == 0) {
      throw new NotFoundException('No record found');
    }
    return categoryeData;
  }

  async findOne(id: string) {
    const existingCategory = await this.categoryModel.findById(id).exec();
    if (!existingCategory) {
      throw new NotFoundException(`Category id #${id} not found`)
      ;
    }
    return existingCategory;
  }

  async findCategoryByName(name: string) {

    const existingCategory = await this.categoryModel.findOne({ name });
    if (!existingCategory) {
      throw new NotFoundException(`Category not found`)
      ;
    }
    return existingCategory;
  }

  async update(id: string, updateCategory: UpdateCategoryDto) {
    const { name } = updateCategory;
    const existingCategory = await this.categoryModel.findByIdAndUpdate(id, updateCategory, { new: true });

    if (!existingCategory) {
      throw new NotFoundException('category not found');
    }

    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException(`${name} not found`);
    }

    return category;
  }

  async remove(id: string) {
    const deletedProfile = await this.categoryModel.findByIdAndDelete(id);
    if (!deletedProfile) {
      throw new NotFoundException(`Category id #${id} not found`)
    }
    return deletedProfile;
  }
}
