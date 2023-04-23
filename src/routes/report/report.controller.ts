import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Public, Roles } from 'src/common/decorators';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // @Post()
  // create(@Body() createReportDto: CreateReportDto) {
  //   return this.reportService.create(createReportDto);
  // }
  @Roles(['ADMIN'])
  @Get('weekly')
  generateReportByWeek() {
    return this.reportService.generateReportByWeek();
  }

  @Roles(['ADMIN'])
  @Get('yearly')
  generateReportByYear() {
    return this.reportService.generateReportByYear();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.reportService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
  //   return this.reportService.update(+id, updateReportDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reportService.remove(+id);
  // }
}
