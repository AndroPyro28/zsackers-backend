import { Module } from '@nestjs/common';
import { Category } from 'src/models';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, Category]
})
export class CategoryModule {}
