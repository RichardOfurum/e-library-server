import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private bookModel: Model<Book>) { }

  async create(createBookDto: CreateBookDto) {

    const createBook = new this.bookModel(createBookDto);

    if (!createBook) {
      throw new HttpException('Please check your data and try again', HttpStatus.CONFLICT)
    }

    if (!await createBook.save()) {
      throw new HttpException('Record not saved please check your payload and try again', HttpStatus.BAD_REQUEST)
    }

    return createBook;

  }

  async findAll(page: number, limit: number = 10) {
    const skip = (page - 1) * limit;

    const bookData = await this.bookModel.find().skip(skip).limit(limit).exec();

    if (!bookData || bookData.length == 0) {
      throw new NotFoundException('No record found');
    }
    return bookData;
  }

  async findByTitle(page: number, limit: number = 10, title: string) {
    const skip = (page - 1) * limit;

    const bookData = await this.bookModel.find().skip(skip).limit(limit).exec();

    if (!bookData || bookData.length == 0) {
      throw new NotFoundException('No record found');
    }
    return bookData;
  }

  async searchBooks(query: string): Promise<Book[]> {
    const regex = new RegExp(query, 'i'); // Case-insensitive search

    const books = await this.bookModel.find({
      $or: [
        { title: { $regex: regex } },
        { author: { $regex: regex } },
        { description: { $regex: regex } },
        { publisher: { $regex: regex } },
        { category: { $regex: regex } },
      ],
    }).exec();

    return books;
  }

  async findOne(id: string) {
    const existingBook = await this.bookModel.findById(id).exec();
    if (!existingBook) {
      throw new NotFoundException(`Book id #${id} not found`)
      ;
    }
    return existingBook;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const existingBook = await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true });

    if (!existingBook) {
      throw new NotFoundException('Profile not found');
    }

    const book = await this.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book id #${id} not found`);
    }

    return book;
  }

  async remove(id: string) {
    const deletedBook = await this.bookModel.findByIdAndDelete(id);
    if (!deletedBook) {
      throw new NotFoundException(`Book id #${id} not found`)
    }
    return deletedBook;
  }
}
