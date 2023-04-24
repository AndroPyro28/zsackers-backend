import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Public, Roles } from 'src/common/decorators';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @Roles(['ADMIN'])
  async create(@Body() createStaffDto: CreateAdminDto) {
    return this.adminService.create(createStaffDto);
  }

  @Get()
  @Public()
  async findAll(
  ) {
    return this.adminService.findAll();
  }

  @Roles(['ADMIN'])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Roles(['ADMIN'])
  @Patch(':id')
  async update(@Param('id') id: string, @Body('status') status: "INACTIVE" | "ACTIVE") {
    return this.adminService.update(+id, status);
  }
  @Roles(['ADMIN'])
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.remove(+id);
  }
}
