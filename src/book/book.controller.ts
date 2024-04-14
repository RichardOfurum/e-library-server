import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizeAdmin } from 'src/guards/authenticatAdmin.guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @UseGuards(AuthenticationGuard,AuthorizeAdmin)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.bookService.findAll(page, limit);
  }

  @Get('/search/category')
  async searchCategory(
    @Query('category') searchTerm: string,
    @Query('pageNumber') page: number,
    @Query('limit') limit: number,
  ) {
    return this.bookService.searchCategory(searchTerm, page, limit);
  }

  @Get('search')
  async searchBooks(@Query('query') query: string) {
    return this.bookService.searchBooks(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
