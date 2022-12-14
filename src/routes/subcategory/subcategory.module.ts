import { Module } from '@nestjs/common';
import { Subcategory } from 'src/models';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryService } from './subcategory.service';

@Module({
  controllers: [SubcategoryController],
  providers: [SubcategoryService, Subcategory]
})
export class SubcategoryModule {}
