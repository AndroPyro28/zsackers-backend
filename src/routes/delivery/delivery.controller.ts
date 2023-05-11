import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { Public, Roles } from 'src/common/decorators';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  @Roles(['ADMIN', 'DELIVERY'])
  async create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryService.create(createDeliveryDto);
  }

  @Get()
  @Public()
  async findAll(
  ) {
    return this.deliveryService.findAll();
  }

  @Roles(['ADMIN', 'DELIVERY'])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.deliveryService.findOne(+id);
  }

  @Roles(['ADMIN', 'DELIVERY'])
  @Patch(':id')
  async update(@Param('id') id: string, @Body('status') status: "INACTIVE" | "ACTIVE") {
    return this.deliveryService.update(+id, status);
  }
  @Roles(['ADMIN', 'DELIVERY'])
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryService.remove(+id);
  }
}
