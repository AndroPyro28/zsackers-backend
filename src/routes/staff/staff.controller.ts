import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Public, Roles } from 'src/common/decorators';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @Roles(['ADMIN'])
  async create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get()
  @Public()
  async findAll(
  ) {
    return this.staffService.findAll();
  }

  @Roles(['ADMIN'])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.staffService.findOne(+id);
  }

  @Roles(['ADMIN'])
  @Patch(':id')
  async update(@Param('id') id: string, @Body('status') status: "INACTIVE" | "ACTIVE") {
    return this.staffService.update(+id, status);
  }
  @Roles(['ADMIN'])
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.staffService.remove(+id);
  }
}
